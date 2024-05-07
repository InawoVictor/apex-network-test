import './style.css'
import App from './App.vue'
import { createApp } from "vue";
import { createPinia } from 'pinia'

// Vue Toastification
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

//Vue Select
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const options = {
    // Default toast options
    position: POSITION.TOP_RIGHT,
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    closeButton: "button",
    icon: true,
    rtl: false,
  };

const pinia = createPinia()
const app = createApp(App)

app
.use(pinia)
.use(Toast, options)
.component('v-select', vSelect)
.mount('#app')
