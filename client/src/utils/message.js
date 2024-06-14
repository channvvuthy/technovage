import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();

export const successMessage = (message = 'Success') => {
    $toast.success(message);
}

export const errorMessage = (message = 'Error') => {
    $toast.error(message);
}