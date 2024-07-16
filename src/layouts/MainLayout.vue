<template>
  <q-layout view="hHh lpR fFf" class="gradient-background">
    <q-header elevated reveal>
      <q-toolbar class="layout-toolbar">
        <div>
          <img alt="SH logo" src="~assets/sh_toolbar.jpg"
            style="width: 70px; height: 70px; margin-bottom: -5px; margin-left: -10px;" />
        </div>
        <q-toolbar-title> Gerador de Assinatura Eletrônica SH </q-toolbar-title>
        <div v-if="user" class=" float-right">
          <q-btn icon="logout" @click="logoff" label="Sair" color="red" push size="lg"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { onUpdated, ref } from 'vue'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'

export default {

  setup () {
    const user = ref(null)
    const router = useRouter()

    onUpdated(() => {
      const storedData = LocalStorage.getItem('user')
      user.value = storedData
    })

    return {
      user,
      logoff () {
        LocalStorage.clear()
        router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style scoped>
.gradient-background {
  background-color: transparent;
  background-image: linear-gradient(180deg, #006a3e 0%, #f48533 91%);
  opacity: 0.78;
  transition: background 0.3s, border-radius 0.3s, opacity 0.3s;
  min-height: 100vh; /* Isso garante que o gradient cubra toda a altura da página */
}

.layout-toolbar {
  background: #fff;
  color: #006a3e;
}
</style>
