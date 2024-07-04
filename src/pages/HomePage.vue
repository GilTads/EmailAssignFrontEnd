<template>
  <q-layout>
    <q-page>
      <div v-if="user">
        <h2>Bem-vindo, <b>{{ user.cn }}</b></h2>
        <p>Email: <b>{{ user.mail }}</b></p>
        <p>Departamento: <b>{{ user.department }}</b></p>
        <p>Telefone: <b>{{ user.telephoneNumber }}</b></p>
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
