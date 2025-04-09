import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from './assets/Pages/Login.vue'
import SignIn from './assets/Pages/SignIn.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/SignIn', component: SignIn }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')