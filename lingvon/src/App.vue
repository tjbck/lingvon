<template>
  <div id="app">
    <Navbar />
    <b-container style="padding-top: 4.5rem; width: 100%" class="text-center" fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  components: {
    Navbar
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Hind+Siliguri&display=swap');
#app {
  font-family: 'Hind Siliguri', sans-serif;
}
</style>