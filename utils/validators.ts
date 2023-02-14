interface Validators {
    required: boolean;
    minLength: number;
    maxLength: number;
}

export const validators = ({required, minLength, maxLength}: Validators) => {
    let validatorObject = {};

    if (required !== undefined && required) {
        validatorObject = {
            ...validatorObject,
            required: 'This field is required!'
        }
    }

    if (minLength !== undefined) {
        validatorObject = {
            ...validatorObject,
            minLength: {
                value: minLength,
                message: `Max length is ${minLength} symbols!`
            }
        }
    }

    if (maxLength !== undefined) {
        validatorObject = {
            ...validatorObject,
            maxLength: {
                value: maxLength,
                message: `Max length is ${maxLength} symbols!`
            }
        }
    }

    return validatorObject;
}