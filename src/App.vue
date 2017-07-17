<template>
  <div id="app">
    <navbar></navbar>
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
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: {
    'login' : Login,
    'user' : UserHeader,
    'threadview' : ThreadView,
    'boardview' : BoardView,
    'navbar' : Navbar
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
