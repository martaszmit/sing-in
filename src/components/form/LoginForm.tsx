import React, {useState} from "react";
import '../../styles/form/LoginForm.scss';
import '../../styles/main.scss';
import FormInput from "./FormInput";
import {CircularProgress, IconButton, InputAdornment} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {Visibility, VisibilityOff, Close} from "@material-ui/icons";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Form from "./Form";
import {ValidationService} from "../../services/ValidationService";

interface User {
    id: number,
    name: string,
    password: string,
    email: string;
}

export default function LoginForm() {

    const API_SERVER = 'https://5ec01edf00eabe0016fa4152.mockapi.io';

    const history = useHistory();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState({email: false, password: false});
    const [errorMsg, setErrorMsg] = useState({email: '', password: '' });
    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [invalidUserError, setInvalidUserError] = useState(false);
    const [loaderVisible, setLoaderVisibility] = useState(false);

    const onPasswordChange = (value: string) => {
        setPassword(value);
    };

    const onEmailChange = (value: string) => {
        setEmail(value);
    };

    const handlePasswordVisibility = () => {
        if (passwordVisible){
            setPasswordVisibility(false);
            return;
        }
        setPasswordVisibility(true)
    };

    const inputIcon = () => {
        return (
            <InputAdornment position="end">
                <IconButton
                    aria-label="toggle password visibility"
                    onClick={handlePasswordVisibility}
                    edge="end"
                    disableRipple
                >
                    {passwordVisible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
            </InputAdornment>
        )
    };

    const inputType = () => {
        if (passwordVisible){
            return 'text';
        }
        return 'password'
    };

    const validate = () => {
        const emailValidationResult = ValidationService.emailValidate(email);
        const passwordValidationResult = ValidationService.passwordValidate(password);
        if(!emailValidationResult.hasError && !passwordValidationResult.hasError ) return true;

        setError({
            email: emailValidationResult.hasError,
            password: passwordValidationResult.hasError
        });
        setErrorMsg({
            email: emailValidationResult.errorMessage,
            password: passwordValidationResult.errorMessage
        });

        return false;
    };

    const clearError = () => {
        setError({email: false, password: false});
        setErrorMsg({email: '', password: ''});
    };

    const submitClicked = () => {
        clearError();
        if(validate()) {
            setLoaderVisibility(true);
            axios.get(`${API_SERVER}/users`)
                .then((response) => {
                        setLoaderVisibility(false);
                        const user = response.data.find((user: User) => user.email === email && user.password === password);
                        if(user) {
                            localStorage.setItem('user', user.name);
                            history.push('/welcome');
                        } else {
                            setInvalidUserError(true);
                        }
                    }
                )
        }
    };

    const showLoader = () => {
        if (loaderVisible) {
            return (
                <div className='login__loader'>
                    <CircularProgress />
                </div>
            )
        }
        return null
    };

    const closeInvalidUserAlert = () => {
        setPassword('');
        setInvalidUserError(false)
    };

    return (
        <div className='blue-container'>
            <div className={`${loaderVisible ? 'login__background--blurred' : ''}`} >
                <Form
                    title='Sign in'
                    submitButtonText='Sign in'
                    submitClicked={submitClicked}
                >
                    <div className='login__input-container'>
                        <FormInput
                            label='Email'
                            type='text'
                            value={email}
                            onChange={onEmailChange}
                            hasError={error.email}
                            errorMessage={errorMsg.email}
                        />
                        <FormInput
                            label='Password'
                            type={inputType()}
                            value={password}
                            onChange={onPasswordChange}
                            inputIcon={inputIcon()}
                            hasError={error.password}
                            errorMessage={errorMsg.password}
                        />
                    </div>
                </Form>
                <div className={`login__invalid-user-container ${invalidUserError ? 'login__invalid-user-container--visible' : ''}`}>
                    <div className='login__invalid-user-elements'>
                        <Alert severity="error" action={ <Close onClick={closeInvalidUserAlert}/> }>
                            Incorrect email or password.
                            <div onClick={() => history.push('/register')}>
                                Don't have an account?
                                <span>Sign up!</span>
                            </div>
                        </Alert>
                    </div>
                </div>
            </div>
            {showLoader()}
        </div>
    )
}
