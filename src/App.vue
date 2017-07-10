<template>
  <div id="app">
    <login></login>
    <user></user>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import userHeader from './components/userHeader.vue';

export default {
  name: 'app',
  components: {
    "login" : Login,
    "user" : userHeader
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
