<template>
  <q-layout>
    <q-page class=" flex flex-center">
      <div class="form-container">
        <div class="row justify-center">
          <h5 class="text-h5 text-secondary q-my-md">Gerador de Assinatura</h5>
        </div>
        <q-card class="form-card">
          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input filled v-model="username" label="Usuário *" hint="Ex. Joao.Silva" lazy-rules
                :rules="[val => val && val.length > 0 || 'Campo Obrigatório']" />

              <q-input filled type="password" v-model="password" label="Senha" lazy-rules :rules="[
                val => val !== null && val !== '' || 'Senha',
                val => val !== null && val !== '' || 'Campo Obrigatório'
              ]" />
              <q-card-actions class="q-py-md justify-start">
                <q-btn unelevated type="submit" color="light-green-7" size="lg" class="full-width" label="Gerar Assinatura" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import Services from '../services'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const $q = useQuasar()
    const router = useRouter()

    const username = ref(null)
    const password = ref(null)

    const onSubmit = async () => {
      console.log('Submit')
      $q.loading.show({
        spinnerColor: 'secondary',
        message: 'Conectando ao servidor...',
        messageColor: 'white'
      })

      try {
        const data = {
          username: username.value,
          password: password.value
        }
        console.log(data)
        await Services.login(data)
        // Redireciona para a página inicial
        router.push('home')
      } catch (error) {
        if (error.response) {
          if (error.response.status === 403) {
            $q.notify({
              type: 'negative',
              message: 'Credenciais Inválidas',
              icon: 'announcement'
            })
          }
        } else {
          console.log(error)
          $q.notify({
            type: 'negative',
            message: 'Servidor fora do ar. Por favor, tente mais tarde.',
            icon: 'announcement'
          })
        }
      } finally {
        $q.loading.hide()
      }
    }

    const onReset = () => {
      username.value = null
      password.value = null
    }

    return {
      username,
      password,
      onSubmit,
      onReset
    }
  }
}
</script>

<style>
body,
html {
  overflow: hidden;
  /* Desabilita a rolagem da página */
}

.q-page {
  height: 100vh;
}

.form-container {
  margin-top: -15%;
  width: 90%;
  max-width: 600px;
  /* Define um tamanho máximo */
  padding: 20px;
  box-sizing: border-box;
}

.form-card {
  width: 100%;
  /* O card ocupa toda a largura do contêiner */
}
</style>
