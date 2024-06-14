/**
 * Function to process form submission data.
 *
 * @param {Event} event - The event object triggering the submission.
 * @param {Array} fields - The fields to extract from the form data.
 * @return {Object} An object containing the extracted form data.
 */
export const extractFormData = (event, fields = []) => {
    const form = event.target;
    const formData = new FormData(form);
    const data = {};

    fields.forEach((value) => {
        data[value] = formData.get(value);
    });

    return data;
}