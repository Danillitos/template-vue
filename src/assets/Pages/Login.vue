<script setup>
  import { ref } from 'vue';	
  import axios from "axios";
  let username;
  let senha;
  const resposta = ref('');

  function getLogin() {
    axios.get('http://localhost:3000/consulta', {
      params: {
        username: username,
        senha: senha
      }
    })
    .then(response => {
      resposta.value = response.data.messagem
    })   
  }


</script>

<template>
  <div class="flex flex-col gap-4 justify-center items-center h-screen w-screen">
    <div class="shadow-md bg-slate-100 p-4 rounded-lg justify-center items-center flex flex-col">
      <div class="flex flex-col">
        <label for="login">Login</label>
        <input v-model="username" class="border border-slate-400 bg-white rounded h-8 px-2">
      </div>
      <div class="flex flex-col mt-2">
        <label for="senha">Senha</label>
        <input v-model="senha" type="password" class="border border-slate-500 bg-white rounded h-8 px-2">
      </div>
      <button class="flex justify-center items-center bg-green-800 px-4 h-8 mt-4 rounded w-full cursor-pointer shadow text-white hover:opacity-80 transition duration-150 will-change-auto" @click="getLogin()">
        Enviar
      </button>
    </div>
    <div>
      <label class="text-sm">Ou</label>
    </div>
    <div>
      <p class="text-green-800 hover:opacity-80 cursor-pointer"><router-link to="/SignIn">Criar conta</router-link></p>
    </div>
    <div>
      <p class="mt-4 text-red-500" v-if="resposta">{{ resposta }}</p>
    </div>
  </div>
</template>


