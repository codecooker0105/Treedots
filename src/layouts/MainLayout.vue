<template>
  <q-layout view="lHh Lpr lFf">
    
    <q-header elevated>
      <q-toolbar class="text-center bg-white text-black q-py-md">
        <q-toolbar-title>
          Locate Hub
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

  export default {
    name: 'MainLayout',
    data() {
      return {
        drawerRight: false
      }
    }
  }
</script>
