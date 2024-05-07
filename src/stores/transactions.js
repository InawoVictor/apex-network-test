import { defineStore } from 'pinia';
import { http } from './services';
import { useDialogStore } from './dialog';
import { useToast } from 'vue-toastification';

export const useTransactionsStore = defineStore('transactions', () => {
    const toast = useToast();
    const dialog = useDialogStore();

    function searchFilterQuery(endpoint, payload) {
        const queryParams = [];
        if (payload.params.state !== "") {
            queryParams.push(`state=${payload.params.state}`);
        }
        if (payload.params.page) {
            queryParams.push(`page=${payload.params.page}`);
        }
        const queryString = queryParams.join('&');
        return `${endpoint}?${queryString}`;
    }

    async function getTransactions(payload) {
        try {
            dialog.showLoading();
            const queryUrl = searchFilterQuery('/transactions', payload);
            const response = await http.get(queryUrl);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            toast.error('Failed to load transactions. Please try again.');
            throw error;
        } finally {
            dialog.closeLoading();
        }
    }

    return {
        getTransactions
    };
});
