import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App);
app.use(router);
app.config.globalProperties.emitter = emitter;
app.mount('#app');

//createApp(App).use(router).mount('#app')