<template>
  <q-layout>
    <q-page class=" flex justify-center">
      <div v-if="user" class="form-container">
        <div class="user-font">
          <h2>Bem-vindo, <b>{{ user.cn }}</b></h2>
          <p>Email: <b class="text-primary">{{ user.mail }}</b></p>
          <p>Departamento: <b class="text-primary">{{ user.department }}</b></p>
          <p>Telefone: <b class="text-primary">{{ user.telephoneNumber }}</b></p>
          <p>Celular: <b class="text-primary">{{ user.mobile }}</b></p>
        </div>
      </div>
      <div v-else>
        <p>Carregando...</p>
      </div>
    </q-page>
  </q-layout>

</template>

<script>
import { ref, onMounted } from 'vue'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const user = ref(null)
    const router = useRouter()

    onMounted(() => {
      const storedData = LocalStorage.getItem('user')
      console.log('Dados armazenados no LocalStorage:', storedData)
      if (storedData && storedData.user) {
        user.value = storedData.user
      } else {
        // Redireciona para a página de login se o usuário não estiver no local storage
        router.push({ name: 'login' })
      }
    })

    return {
      user
    }
  }
}
</script>

<style>
 @font-face {
  font-family: arial-unicode-ms;
  src: url('../assets/font/arial-unicode-ms.ttf');
 }

 .user-font {
  font-family: 'arial-unicode-ms';
 }
</style>
