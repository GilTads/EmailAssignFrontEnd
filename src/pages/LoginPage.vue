<template>
  <q-layout>
    <q-page class=" flex flex-center" >
      <div class="form-container">
        <div class="row justify-center">
            <h5 class="text-h5 text-secondary q-my-md">Gerador de Assinatura</h5>
        </div>
        <q-card class="form-card">
          <q-card-section>
                <q-form class="q-gutter-md col-12 col-md-6 col-lg-4">
                  <q-input square filled clearable v-model="email" type="email" label="Usuário" hint="Ex. Joao.Silva" />
                  <q-input square filled clearable v-model="password" type="password" label="Senha" />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-py-md justify-start">
                  <q-btn unelevated color="light-green-7" size="lg" class="full-width" label="Gerar Assinatura" />
              </q-card-actions>
        </q-card>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit () {
      // lógica de envio do formulário
    }
  }
}
</script>

<style>
body, html {
  overflow: hidden; /* Desabilita a rolagem da página */
}
.q-page {
  height: 100vh;
}

.form-container {
  margin-top: -15%;
  width: 90%;
  max-width: 600px; /* Define um tamanho máximo */
  padding: 20px;
  box-sizing: border-box;
}

.form-card {
  width: 100%; /* O card ocupa toda a largura do contêiner */
}

</style>
