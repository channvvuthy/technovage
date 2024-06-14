
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

/**
 * Defines the validation rule for a specific field based on predefined rules.
 *
 * @param {string} field - The field for which the validation rule is defined.
 * @return {string} The validation rule for the field or a default 'required' rule.
 */
const spacialRequired = (field) => {
    const validations = {
        phone: 'phone',
        email: 'email',
        confirm_password: 'confirm_password:password',
    };
    return validations[field] || 'required';
};


const removeUnderscore = (str) => str.split('_').join(' ');


/**
 * Creates a new array of fields with the 'required' validation rule applied.
 *
 * @param {Object} data - The data object to extract fields from.
 * @return {Array} An array of fields with the 'required' validation rule applied.
 */
export const makeDataRequired = (data) =>
    Object.entries(data).map(([field, val]) => ({
        field,
        validate: spacialRequired(field),
        val
    }));

/**
 * Creates a new array of fields with the 'required' validation rule applied.
 *
 * @param {Array} fields - An array of fields to apply the 'required' validation rule to.
 * @return {Array} - A new array of fields with the 'required' validation rule applied.
 */
export const makeRequiredOnly = (fields) => {
    return fields.map((field) => {
        return {
            ...field,
            validate: 'required'
        }
    })
}


/**
 * Validates an array of fields based on the provided validation rules.
 *
 * @param {Array} fields - An array of fields to validate. Each field object should have the following properties:
 *   - field: The name of the field.
 *   - validate: The validation rules for the field, separated by '|'. Each rule should be in the format 'ruleName:ruleValue'.
 *   - val: The value of the field.
 * @return {Array} An array of error messages. Each error message is a string describing the validation error for the corresponding field.
 */
export function validateFields(fields) {
    const errors = [];
    const $toast = useToast();
    const fieldValues = {};

    // Store field values for later comparison
    fields.forEach(({ field, val }) => {
        fieldValues[field] = val;
    });

    fields.forEach(({ validate, val, field: fieldName }) => {
        const validations = validate.split('|');

        validations.forEach(rule => {
            const [ruleName, ruleValue] = rule.split(':');

            switch (ruleName) {
                case 'required':
                    if (val.trim() === '') errors.push(`The field ${removeUnderscore(fieldName)} is required`);
                    break;
                case 'min':
                    if (val.length < parseInt(ruleValue)) errors.push(`The field ${removeUnderscore(fieldName)} must be at least ${ruleValue} characters long`);
                    break;
                case 'max':
                    if (val.length > parseInt(ruleValue)) errors.push(`The field ${removeUnderscore(fieldName)} must not exceed ${ruleValue} characters`);
                    break;
                case 'email':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) errors.push(`The field ${removeUnderscore(fieldName)} is not a valid email`);
                    break;
                case 'phone':
                    if (!/^\+?[0-9]{6,}$/.test(val)) errors.push(`The field ${removeUnderscore(fieldName)} is not a valid phone number`);
                    break;
                case 'confirm_password':
                    if (val !== fieldValues[ruleValue]) errors.push(`The field ${removeUnderscore(fieldName)} does not match the ${removeUnderscore(ruleValue)}`);
                    break;
                default:
                    errors.push(`Unknown validation rule for the field ${removeUnderscore(fieldName)}`);
                    break;
            }
        });
    });

    if (errors.length > 0) {
        const errorList = errors.map(error => `<li>• ${error}</li>`).join('');
        $toast.error(`<ul style="list-style:none;padding:0px;margin:0px;">${errorList}</ul>`, { icon: false });
    }

    return errors;
}
