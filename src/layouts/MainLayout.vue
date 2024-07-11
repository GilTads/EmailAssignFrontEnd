<template>
  <q-layout view="hHh lpR fFf" no-scroll>
    <q-header elevated reveal>
      <q-toolbar>
        <q-toolbar-title>
          Assinatura Eletrônica SH
        </q-toolbar-title>

        <div>
          <img
            alt="SH logo"
            src="~assets/sh_toolbar.jpg"
            style="width: 70px; height: 70px; margin-bottom: -5px; margin-right: -10px"
    >
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

defineOptions({
  name: 'MainLayout'
})

</script>
