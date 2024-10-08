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
                  <q-select
                    filled bg-color="teal-2" label-color="black"
                    v-model="selectedPhone"
                    :options="phoneOptions"
                    label="Escolha a Unidade"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-4 q-ma-sm">
                  <q-input filled bg-color="teal-2" label-color="black"
                    v-model="formattedRamal"
                    label="Digite seu Ramal"
                    hint="Ex. 501 ou 8909"
                    lazy-rules
                    mask="####"
                    max-lenght="4"
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
              <div class="row">
                <div class="col">
                  <q-btn label="Gerar" type="submit" color="secondary" />
                </div>
                <div class="col">
                  <q-btn icon="help" label="Tutorial" color="secondary" v-model="help" @click="toggleHelp"/>
                </div>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
      <q-separator vertical inset></q-separator>
      <q-card v-if="emailAssignature" class="signature-div">
        <div ref="signatureDiv">
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
                  <span class="user-data">{{ selectedPhone.value }} Ramal {{ ramal }}</span>
                </q-item-section>
              </q-item>
            </q-list>
            <img src="~assets/tarja.png" aria-hidden="true">
          </q-card-section>
        </div>
      </q-card>
      <div class="q-mt-md" v-if="emailAssignature">
        <q-btn icon="save" label="Salvar" @click="captureSignature" color="primary" push class="q-ml-sm" />
        <q-btn icon="arrow_back" label="Voltar" @click="voltar()" color="secondary" push class="q-ml-sm" />
      </div>
      <q-separator></q-separator>
        <div class="tutorial" v-if="help" ref="videoContainer">
          <VideoTutorial />
        </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { LocalStorage, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import html2canvas from 'html2canvas'
import VideoTutorial from 'src/components/VideoTutorial.vue'
import { config } from '../boot/phoneConfig'

export default {

  components: {
    VideoTutorial
  },
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
    const selectedPhone = ref(null)

    const captureSignature = async () => {
      if (signatureDiv.value) {
        const canvas = await html2canvas(signatureDiv.value, {
          scrollX: 0,
          scrollY: 0,
          width: 900,
          height: 426
        })
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

    const copyToClipboard = async (canvas) => {
      try {
        const blob = canvas.toDataURL('image/png')
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

    const phoneOptions = computed(() => {
      if (config.phones) {
        return [
          { label: 'Escritório Corporativo', value: config.phones.corporativo },
          { label: 'Unidade Industrial', value: config.phones.industrial }
        ]
      }
      return []
    })

    const formattedRamal = computed({
      get: () => ramal.value,
      set: (newValue) => {
        ramal.value = newValue.replace(/^0+/, '')
      }
    })

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
      formattedRamal,
      selectedPhone,
      phoneOptions,
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

.signature-div {
  width: 900px;
  height: 426px;
  overflow: hidden;
  transform: scale(1);
  transform-origin: top left;
}

.signature-div img {
  width: 100%;
  height: auto;
}

.user-font {
  font-family: 'arial-unicode-ms';
}

.container {
  max-width: 900px;
  width: 900px;
  height: auto;
}

.name {
  font-size: 25px;
}

.user-data {
  font-size: 20px;
}

.info {
  margin-left: -20px;
}

.card {
  opacity: 0.8;
}
</style>
