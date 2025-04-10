<script setup>
import { ref } from 'vue';
import axios from 'axios';

let username; 
let senha;
let senhaConfirm = ref('');
let savedUsername = ref('');
let savedSenha = ref('');
let notifyError = ref('');

function saveLogin() {
    savedUsername.value = username;
    savedSenha.value = senha;

    if (savedSenha.value===senhaConfirm.value && username != null) {
        console.log(senha)
        notifyError.value = false
        axios.post('http://localhost:3000/enviar', {
            username: username,
            senha: senha
        })
        .then(response => {
            resposta.value = response.data.mensagem;
            console.log(username, senha);
        })
    }
    else {
        notifyError.value = true
    }

}



</script>

<template>
    <div class="flex flex-col gap-4 justify-center items-center h-screen w-screen">
    <div class="shadow-md bg-slate-100 p-4 rounded-lg justify-center items-center flex flex-col">

        <div class="flex flex-col">
            <label for="login" class="flex justify-center">Usuario</label>
            <input v-model="username" class="border border-slate-400 bg-white rounded h-8 px-2">
        </div>

        <div class="flex flex-col mt-2">
            <label for="senha" class="flex justify-center">Senha</label>
            <input v-model="senha" type="password" class="border border-slate-500 bg-white rounded h-8 px-2">
        </div>

        <div class="flex flex-col mt-2">
            <label for="senha" class="flex justify-center">confirme a senha</label>
            <input v-model="senhaConfirm" type="password" class="border border-slate-500 bg-white rounded h-8 px-2">
        </div>

        <button class="flex justify-center items-center bg-green-800 px-4 h-8 mt-4 rounded w-full cursor-pointer shadow text-white hover:opacity-80 transition duration-150 will-change-auto" @click="saveLogin()">
        Confirmar
        </button>
    </div>
        <div>
            <p class="text-green-800 hover:opacity-80 cursor-pointer"><router-link to="/">Já tenho uma conta</router-link></p>
        </div>
        <div>
            <p v-if="notifyError" class="text-red-800">Favor, preencha todos os campos corretamente!</p>
        </div>
    </div>
</template>


