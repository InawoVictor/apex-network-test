import {defineStore} from 'pinia';

export const useDialogStore = defineStore('dialog', () => {
  const loading = ref(false)

  function showLoading() {
    loading.value = true
  }
  
  function closeLoading() {
      loading.value = false
  }

  return {
      loading,
      showLoading,
      closeLoading
  }
})