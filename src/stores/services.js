import axios from 'axios';
import { useDialogStore } from './dialog';
import { useToast } from 'vue-toastification';

const toast = useToast();

export const http = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL || 'https://apex-payments-eca4dc83534e.herokuapp.com/api'
});
