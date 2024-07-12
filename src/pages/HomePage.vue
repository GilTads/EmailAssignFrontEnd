<template>
  <q-layout class="user-font">
    <q-page class="flex justify-center">
      <div v-if="user" class="container">
        <div class="user-font">
          <h3>Olá, <b>{{ user.cn }}</b></h3>
        </div>
        <q-card v-if="!emailAssignature">
          <q-card-section>
            <div class="text-h6 flex justify-start">
              Insira as informações abaixo:
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md">
              <q-form @submit="onSubmit" class="q-gutter-md q-pa-md justify-between">
                <div class="row">
                  <div class="col-xs-12 col-sm-6 col-md-4 q-ma-sm">
                    <q-input
                      filled
                      type="text"
                      v-model="ramal"
                      label="Digite seu Ramal"
                      hint="Ex. 501"
                      lazy-rules
                      mask="###"
                      max-lenght="3"
                      :rules="[ val => val && val.length == 3 || 'Informe os três dígitos do ramal']"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 q-ma-sm">
                    <q-input
                      v-if="accept"
                      filled
                      type="text"
                      v-model="celular"
                      label="Celular Corporativo"
                      lazy-rules
                      mask="(##)#####-####"
                      hint="Somente números"
                      max-lenght="14"
                      :rules="[ val => val && val !== '' && val.length == 14  || 'Campo Obrigatório']"
                    />
                  </div>
              </div>
                <div class="text-h6 flex justify-start">
                  <q-toggle color="secondary" v-model="accept" label="Possui celular corporativo" />
                </div>
                <div>
                  <q-btn label="Gerar" type="submit" color="secondary"/>
                </div>
              </q-form>
            </div>
          </q-card-section>
        </q-card>
        <q-separator vertical inset></q-separator>
        <q-card v-if="emailAssignature" >
          <div class="signature-div" ref="signatureDiv">
            <q-card-section>
              <q-list class="text-primary">
                <q-item class="info">
                  <q-item-section v-if="celular">
                    <span class="name"><b>{{ user.cn }}</b></span>
                    <span class="user-data">{{ user.department }}</span>
                    <span class="user-data">(67)3441-0500 Ramal {{ ramal }} / {{ celular }}</span>
                  </q-item-section>
                  <q-item-section v-if="!celular">
                    <span class="name"><b>{{ user.cn }}</b></span>
                    <span class="user-data">{{ user.department }}</span>
                    <span class="user-data">(67)3441-0500 Ramal {{ ramal }}</span>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-img :src="url"/>
            </q-card-section>
          </div>
        </q-card>
        <div class="q-mt-md" v-if="emailAssignature">
          <q-btn icon="save" label="Salvar" @click="captureSignature" color="primary" push class="q-ml-sm" />
          <q-btn icon="arrow_back" label="Voltar" @click="voltar()" color="secondary" push class="q-ml-sm" />
        </div>
      </div>
      <q-separator ></q-separator>
    </q-page>
  </q-layout>

</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'
import html2canvas from 'html2canvas'

export default {
  setup () {
    const user = ref(null)
    const router = useRouter()
    const ramal = ref(null)
    const accept = ref(false)
    const celular = ref(null)
    const emailAssignature = ref(false)
    const url = ref('../src/assets/santahelena.png')
    const signatureDiv = ref(null)

    const captureSignature = async () => {
      if (signatureDiv.value) {
        const canvas = await html2canvas(signatureDiv.value)
        const imgData = canvas.toDataURL('image/png')
        downloadImage(imgData, 'signature.png')
      }
    }
    const downloadImage = (data, filename) => {
      const link = document.createElement('a')
      link.href = data
      link.download = filename
      link.click()
    }

    watch(accept, (newVal) => {
      if (!newVal) {
        celular.value = null
      }
    })

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
    onUnmounted(() => {
      LocalStorage.clear()
    })

    return {
      user,
      ramal,
      celular,
      accept,
      url,
      emailAssignature,
      captureSignature,
      signatureDiv,
      onSubmit () {
        emailAssignature.value = true
      },
      voltar () {
        emailAssignature.value = false
        ramal.value = null
        celular.value = null
      }
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

 .container {
  max-width: 900px;
  width: 100%;
  height: auto
 }
 .name{
  font-size: 25px
 }

 .user-data {
  font-size: 15px;
 }

 .info {
  margin-left: -20px
 }
</style>
