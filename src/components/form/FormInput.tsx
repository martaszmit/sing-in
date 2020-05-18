import {
    FormControl, FormHelperText,
    InputLabel,
    OutlinedInput
} from "@material-ui/core";
import React, {createRef, useEffect, useState} from "react";
import '../../styles/form/FormInput.scss'

interface FormInputProps {
    type: string,
    value: string,
    label: string,
    onChange(value: string): void,
    inputIcon?: React.ReactNode,
    hasError?: boolean,
    errorMessage?: string
}

export default function FormInput (props: FormInputProps) {

    const label = createRef<HTMLSpanElement>();
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
        if(label !== null && label.current !== null) {
            setLabelWidth(label.current.offsetWidth)
        }
    }, [label]);

    const showError = () => {
        if(props.hasError) {
            return (
                <FormHelperText>
                    {props.errorMessage}
                </FormHelperText>
            )
        }
        return null
    };

    return (
        <FormControl variant="outlined" className='form-input__container'>
            <InputLabel>
                <span className='form-input__label' ref={label}>
                     {props.label}
                </span>
            </InputLabel>
            <OutlinedInput
                type={props.type}
                value={props.value}
                onChange={(e) => {props.onChange(e.target.value)}}
                endAdornment={ props.inputIcon }
                labelWidth={labelWidth}
                error={props.hasError}
            />
            {showError()}
        </FormControl>
    )
}
