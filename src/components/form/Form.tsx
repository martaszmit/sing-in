import React from "react";
import '../../styles/form/Form.scss'
import {Button, Typography} from "@material-ui/core";

interface FormProps {
    title: String,
    submitButtonText: String,
    submitClicked(): void;
    children: any
}

export default function Form(props: FormProps) {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const enterKeyCode = 13;
        if (e.keyCode === enterKeyCode){
            props.submitClicked();
        }
    };

return (
    <div className='form__container' onKeyDown={handleKeyDown}>
        <Typography variant="h4" className='form__title'>
            {props.title}
        </Typography>
        {props.children}
        <div className='form__action'>
            <Button variant="outlined" color="primary" onClick={props.submitClicked}>
                {props.submitButtonText}
            </Button>
        </div>
    </div>
)
}

//
