import React from "react";
import '../styles/WelcomePage.scss'
import {Button, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export default function WelcomePage() {

    const history = useHistory();

    function userName() {
        const userName = localStorage.getItem('user');
        if(userName){
            return userName
        }
    }

    const logout = () => {
        localStorage.clear();
        history.push('/')
    };


    return(
        <div className='welcome-page__container'>
            <Typography variant="h4"> Welcome {userName()} !</Typography>
            <Button onClick={logout} variant='outlined'>
                Logout
            </Button>
        </div>
    )
}
