<template>
    <q-page class="flex flex-column justify-center q-ml-md">
      <div v-if="user" class="container">
        <div>
          <h3 class="text-secondary">Olá, <b class="text-primary">{{ user.cn }}</b></h3>
        </div>
        <q-card v-if="!emailAssignature" class="card text-primary">
          <q-card-section>
            <div class="text-h5 text-primary flex flex-left">
              Insira as informações abaixo:
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md">
              <q-form @submit="onSubmit" class="q-gutter-md q-pa-md justify-between">
                <div class="row">
                  <div class="col-xs-12 col-sm-6 col-md-4 q-ma-sm">
                    <q-input filled bg-color="teal-2" label-color="black" v-model="ramal" label="Digite seu Ramal" hint="Ex. 501 ou 8909" lazy-rules
                      mask="####" max-lenght="4"
                      :rules="[val => val && val.length == 3 || val && val.length == 4  || 'Informe os três dígitos do ramal']" />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-4 q-ma-sm">
                    <q-input v-if="accept" filled bg-color="teal-2" label-color="black" type="text" v-model="celular" label="Celular Corporativo" lazy-rules
                      mask="(##)#####-####" hint="Somente números" max-lenght="14"
                      :rules="[val => val && val !== '' && val.length == 14 || 'Campo Obrigatório']" />
                  </div>
                </div>
                <div class="text-h6 flex justify-start">
                  <q-toggle color="secondary" v-model="accept" label="Possui celular corporativo" />
                </div>
                <div>
                  <q-btn label="Gerar" type="submit" color="secondary" />
                </div>
              </q-form>
            </div>
          </q-card-section>
        </q-card>
        <q-separator vertical inset></q-separator>
        <q-card v-if="emailAssignature">
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
              <!-- <q-img :src="url" /> -->
              <!-- <img class="q-img__image q-img__image--with-transition q-img__image--loaded" loading="lazy" fetchpriority="auto" aria-hidden="true" draggable="false" src="../src/assets/tarja.png" style="object-fit: cover; object-position: 50% 50%;"> -->
              <img src="~assets/tarja.png" class="q-img__image q-img__image--with-transition q-img__image--loaded"
                   loading="lazy" fetchpriority="auto" aria-hidden="true">
            </q-card-section>
          </div>
        </q-card>
        <div class="q-mt-md" v-if="emailAssignature">
          <q-btn icon="save" label="Salvar" @click="captureSignature" color="primary" push class="q-ml-sm" />
          <q-btn icon="arrow_back" label="Voltar" @click="voltar()" color="secondary" push class="q-ml-sm" />
        </div>
        <div class="flex justify-center q-mt-lg">
          <q-card class="">
            <q-card-section class="bg-secondary text-white">
              <div class="row">
                <div class="col-12 text-h6">Veja o tutorial abaixo</div>
              </div>
                <div class="flex flex-center">
                  <q-icon name="arrow_downward" size="3em"/>
              </div>
              <div class=""></div>
            </q-card-section>
          </q-card>
          <div ref="videoContainer">
            <q-card class="q-mt-lg">
              <video controls width="900">
                <source src="../assets/videos/video.mp4">
              </video>
              <q-card-section class="q-mb-lg text-h6 text-secondary flex flex-center">
                Siga as instruções do vídeo e altere facilmente sua assinatura digital.
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <q-separator></q-separator>
    </q-page>

</template>

<script>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { LocalStorage, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import html2canvas from 'html2canvas'

export default {

  setup () {
    const $q = useQuasar()
    const user = ref(null)
    const router = useRouter()
    const ramal = ref(null)
    const accept = ref(false)
    const celular = ref(null)
    const emailAssignature = ref(false)
    const url = ref('../src/assets/tarja.png')
    const signatureDiv = ref(null)
    const help = ref(false)
    const videoContainer = ref(null)

    const captureSignature = async () => {
      if (signatureDiv.value) {
        const canvas = await html2canvas(signatureDiv.value)
        const imgData = canvas.toDataURL('image/png')
        downloadImage(imgData, 'assinaturaEletronicaSH.png')
        copyToClipboard(canvas)
      }
    }
    const downloadImage = (data, filename) => {
      const link = document.createElement('a')
      link.href = data
      link.download = filename
      link.click()
    }
    /*
    const copyToClipboard = async (canvas) => {
      try {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
        await write([new ClipboardItem({ 'image/png': blob })])
        $q.notify({
          type: 'positive',
          message: 'Assinatura Eletrônica copiada para a área de transferência.',
          timeout: 6000,
          icon: 'expand_circle_down'
        })
        $q.notify({
          type: 'positive',
          message: 'Download realizado com sucesso.',
          timeout: 6000,
          icon: 'expand_circle_down'
        })
      } catch (err) {
        $q.notify({
          type: 'negative',
          timeout: 6000,
          message: 'Erro ao copiar assinatura. Tente novamente',
          icon: 'error'
        })
      }
    } */
    const copyToClipboard = async (canvas) => {
      try {
        const blob = canvas.toDataURL('image/png') // Obter data URL da imagem
        const item = new ClipboardItem({ 'image/png': await fetch(blob).then(res => res.blob()) })
        await navigator.clipboard.write([item])

        $q.notify({
          type: 'positive',
          message: 'Assinatura Eletrônica copiada para a área de transferência.',
          timeout: 6000,
          icon: 'expand_circle_down'
        })
        $q.notify({
          type: 'positive',
          message: 'Download realizado com sucesso.',
          timeout: 6000,
          icon: 'expand_circle_down'
        })
      } catch (err) {
        $q.notify({
          type: 'negative',
          timeout: 6000,
          message: 'Erro ao copiar assinatura. Tente novamente',
          icon: 'error'
        })
      }
    }

    const toggleHelp = () => {
      help.value = !help.value
      if (help.value) {
        setTimeout(() => {
          scrollToVideo()
        }, 100)
      }
    }

    const scrollToVideo = () => {
      if (videoContainer.value) {
        videoContainer.value.scrollIntoView({ behavior: 'smooth' })
      }
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
      toggleHelp,
      help,
      videoContainer,
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

.name {
  font-size: 25px
}

.user-data {
  font-size: 20px;
}

.info {
  margin-left: -20px
}

.card {
  opacity: 0.8;
}
</style>
