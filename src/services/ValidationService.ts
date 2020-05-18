import {IValidationResult} from "./IValidationResult";

export enum PasswordValidationError {
    MISSING_PASSWORD = 'Missing password.',
    SHORT_PASSWORD = 'The password should have at least 5 characters.',
}

export enum EmailValidationError {
    MISSING_EMAIL = 'Missing email.',
    INVALID_EMAIL = 'Invalid email.'
}

export class ValidationService {

    static emailValidate(email: string): IValidationResult {
        if(!email) {
            return ValidationService.validationResult(true, EmailValidationError.MISSING_EMAIL)
        }

        const emailRegex = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');
        if(email.match(emailRegex) === null) {
            return ValidationService.validationResult(true, EmailValidationError.INVALID_EMAIL)
        }
        return ValidationService.validationResult();
    }

    static passwordValidate(password: string): IValidationResult {
        if(!password) {
            return ValidationService.validationResult(true, PasswordValidationError.MISSING_PASSWORD )
        }
        if(password.length < 5) {
            return ValidationService.validationResult(true, PasswordValidationError.SHORT_PASSWORD );
        }
        return ValidationService.validationResult();
    }

    private static validationResult (hasError: boolean = false, errorMessage: string = ''): IValidationResult  {
        return {
            hasError,
            errorMessage
        }
    }

}
