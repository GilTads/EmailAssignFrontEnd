<template>
  <div class="flex justify-center q-mt-lg">
    <div ref="videoContainer">
      <q-card class="q-mt-lg">
        <video controls poster="../assets/poster.png" width="900">
          <source src="../assets/videos/tutorial.mp4">
          <source src="../assets/videos/tutorial.webm">
          Seu navegador não suporta esse vídeo
        </video>
        <q-card-section class="q-mb-lg text-h6 text-secondary flex flex-center">
          Siga as instruções do vídeo e altere facilmente sua assinatura digital.
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'

const videoContainer = ref(null)

export default {
  setup () {
    return {
      videoContainer
    }
  }
}

</script>
