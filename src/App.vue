<template>
  <div id="app">
    <login></login>
    <user></user>
    <br>
    <boardview></boardview>
    <threadview></threadview>
  </div>
</template>

<script>
import Login from './components/Login.vue';
import UserHeader from './components/UserHeader.vue';
import ThreadView from './components/ThreadView.vue';
import BoardView from './components/BoardView.vue'

export default {
  name: 'app',
  components: {
    "login" : Login,
    "user" : UserHeader,
    "threadview" : ThreadView,
    "boardview" : BoardView
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
