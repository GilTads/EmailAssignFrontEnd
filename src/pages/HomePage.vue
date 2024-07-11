<template>
  <q-layout class="user-font">
    <q-page class=" flex justify-center">
      <div v-if="user" class="form-container">
        <div class="user-font">
          <h3>Bem-vindo, <b>{{ user.cn }}</b></h3>
          <!-- <p>Email: <b class="text-primary">{{ user.mail }}</b></p>
          <p>Departamento: <b class="text-primary">{{ user.department }}</b></p>
          <p>Telefone: <b class="text-primary">{{ user.telephoneNumber }}</b></p>
          <p>Celular: <b class="text-primary">{{ user.mobile }}</b></p> -->
        </div>
        <q-card>
          <q-card-section>
            <div class="text-h6 flex justify-start">
              Insira as informações abaixo:
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-pa-md flex justify-start">
              <q-form class="q-gutter-md">
                <q-input
                  filled
                  type="text"
                  v-model="ramal"
                  label="Digite seu Ramal"
                  hint="Ex. 501"
                  lazy-rules
                  mask="###"
                  max-lenght="3"
                  :rules="[ val => val && val.length > 0  || 'Campo Obrigatório']"
                />
                <div class="text-h6 flex justify-start">
                  <q-toggle color="secondary" v-model="accept" label="Possui celular corporativo" />
                </div>
                <q-input
                  v-if="accept"
                  filled
                  type="text"
                  v-model="celular"
                  label="Celular Corporativo"
                  lazy-rules
                  mask="(##)#####-####"
                  hint="Ex.(99)99999-9999"
                  max-lenght="14"
                  :rules="[ val !== null && val !== ''  || 'Campo Obrigatório']"
                />
                <div>
                  <q-btn label="Gerar" type="submit" color="secondary"/>
                  <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
              </q-form>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div v-else>
        <p>Carregando...</p>
      </div>
    </q-page>
  </q-layout>

</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const user = ref(null)
    const router = useRouter()
    const ramal = ref(null)
    const accept = ref(false)

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
      // LocalStorage.clear()
    })

    return {
      user,
      ramal,
      accept
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

<!--

<template>
  <q-page>
    <div ref="signatureDiv" class="signature-div">
      // Conteúdo da assinatura
    </div>
    <q-btn @click="captureSignature" label="Capturar Assinatura" />
  </q-page>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  methods: {
    captureSignature() {
      const signatureDiv = this.$refs.signatureDiv;
      html2canvas(signatureDiv).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        this.downloadImage(imgData, 'signature.png');
      });
    },
    downloadImage(data, filename) {
      const link = document.createElement('a');
      link.href = data;
      link.download = filename;
      link.click();
    }
  }
}
</script>

<style>
.signature-div {
   Estilos para a div da assinatura
}
</style>

-->
