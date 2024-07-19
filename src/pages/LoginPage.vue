<template>
  <q-page class="flex flex-top justify-center">
    <div class="form-container">
      <q-card class="form-card">
        <q-card-section>
          <div class="text-h6 text-primary flex flex-left">
            Insira suas credenciais de rede
          </div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled bg-color="teal-1" label-color="black" v-model="username" label="Usuário *" hint="Ex. Joao.Silva"
              :rules="[val => val && val.length > 0 || 'Campo Obrigatório']" />

            <q-input filled bg-color="teal-1" label-color="black" type="password" v-model="password" label="Senha" :rules="[
              val => val !== null && val !== '' || 'Senha',
              val => val !== null && val !== '' || 'Campo Obrigatório'
            ]" />
            <q-card-actions class="q-py-md justify-start">
              <q-btn unelevated type="submit" color="light-green-7" size="lg" class="full-width" label="Acessar" />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
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
          if (error.response.status === 401) {
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

<style scoped>
.form-container {
  margin-top: 100px;
  width: 100%;
  max-width: 600px;
  /* Define um tamanho máximo */
  box-sizing: border-box;
}

.form-card {
  opacity: 0.85;
}
</style>
