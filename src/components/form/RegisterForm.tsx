import React from "react";
import '../../styles/form/RegisterForm.scss'
import '../../styles/main.scss'
import {useHistory} from 'react-router-dom';
import Form from "./Form";

export default function RegisterForm() {

    const history = useHistory();

    const register = () => {
        history.push('/')
    };

    return (
        <div className='blue-container'>
            <Form title='Sign up' submitButtonText='Sign up' submitClicked={register}>
                <div className='register-form__inputs'>
                    Not implemented yet :)
                </div>
            </Form>
        </div>
    )
}
