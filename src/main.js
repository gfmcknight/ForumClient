import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue'

Vue.use(ElementUI, { locale })

export const EventBus = new Vue();

axios.defaults.baseURL = 'http://localhost:49975/api/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

var vm = new Vue({
  el: '#app',
  render: h => h(App),
  created: function() {
    axios.get('board/')
    .then (function (response) {
      vm.loadTopic(response.data.id);
    })
    .catch(function (errror) {
      console.log(error);
    });
  },
  data: {
    token: '',
    self: {},
    users: [],
    currentTopic: {},
    subtopics: [],
    threads: [],
    currentThread: {},
    posts: []
  },
  methods:{
    tryLogin : function(userParameters) {
      vm.$notify({
        title: 'Logging In',
        message: 'Contacting server...',
        type: 'info'
      });

      axios.post('login/', userParameters)
      .then(function (response) {
        if (response.data == '') {
          vm.$notify({
            title: 'Login Failed',
            message: 'Invalid username/password combination.',
            type: 'error'
          });
        } else {
          axios.defaults.headers.common['session'] = response.data;
          vm.token = response.data;
          vm.showLogin = false;

          axios.get('users/self')
          .then(function (response) {
            vm.self = response.data;
            vm.$notify({
              title: 'Login Successful',
              message: 'Logged in as ' + vm.self.name + '.',
              type: 'success'
            });
            EventBus.$emit('renderUser', vm.self);
          })
          .catch(function (error) {
            console.log(error);
            vm.$notify({
              title: 'Login Failed',
              message: 'Unable to contact server.',
              type: 'error'
            });
          })
        }
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Login Failed',
          message: 'Unable to contact server.',
          type: 'error'
        });
      });
    },

    tryCreateUser : function(userParameters) {
      vm.$notify({
        title: 'Creating Account',
        message: 'Contacting server...',
        type: 'info'
      });

      axios.post('users/', userParameters)
      .then(function (response) {
        vm.$notify({
          title: 'Account Created',
          message: 'Your account was created successfully.',
          type: 'success'
        });
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Account Creation Failed',
          message: 'Unable to contact server.',
          type: 'error'
        });
      })
    },

    tryCreateThread : function(postParameters) {
      console.log(postParameters);
      vm.$notify({
        title: 'Posting',
        message: 'Contacting server...',
        type: 'info'
      });

      axios.post('threads/', postParameters)
      .then (function (response) {
        vm.$notify({
          title: 'Posted',
          message: 'Your post was submitted successfully.',
          type: 'success'
        });
        vm.loadThread(response.data.id);
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Posting Failed',
          message: 'There was an issue making your post.',
          type: 'error'
        });
      });
    },

    tryCreatePost : function(postParameters) {
      vm.$notify({
        title: 'Posting',
        message: 'Contacting server...',
        type: 'info'
      });

      axios.post('threads/' + vm.currentThread.id + '/posts/', postParameters)
      .then (function (response) {
        vm.$notify({
          title: 'Posted',
          message: 'Your post was submitted successfully.',
          type: 'success'
        });
        vm.loadThread(vm.currentThread.id);
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Posting Failed',
          message: 'There was an issue making your post.',
          type: 'error'
        });
      });
    },

    loadThread : function(id) {
      axios.get('threads/' + id + '/')
      .then(function (response) {
        vm.currentThread = response.data;
        axios.get('threads/' + id + '/posts/')
        .then(function (response) {
          vm.posts = response.data;
          EventBus.$emit('renderThread', {
            thread: vm.currentThread,
            posts: vm.posts
          });
        })
        .catch (function (error) {
          console.log(error);
        });
      })
      .catch (function (error) {
        console.log(error);
      });
    },

    loadTopic : function(id) {
      axios.get('board/' + id + '/')
      .then(function (response) {
        vm.currentTopic = response.data;
        axios.get('board/' + id + '/topics/')
        .then(function (response) {
          vm.subtopics = response.data;
          axios.get('board/' + id + '/threads/')
          .then(function (response) {
            vm.threads = response.data;
            EventBus.$emit('renderTopic', {
              topic: vm.currentTopic,
              subtopics: vm.subtopics,
              threads: vm.threads
            });
          })
          .catch (function (error) {
            console.log(error);
          })
        })
        .catch (function (error) {
          console.log(error);
        });
      })
      .catch (function (error) {
        console.log(error);
      });
    }
  }
});

EventBus.$on('sendLogin', userParameters =>{
  vm.tryLogin(userParameters);
});

EventBus.$on('sendNewUser', userParameters =>{
  vm.tryCreateUser({ username: userParameters.username,
                     email: userParameters.email,
                     password: userParameters.password,
                     hasSignature: userParameters.hasSignature,
                     signature: userParameters.signature
  });
})

EventBus.$on('sendNewPost', postParameters => {
  vm.tryCreatePost({
    text: postParameters
  });
})

EventBus.$on('sendNewThread', threadParameters => {
  vm.tryCreateThread({
    title: threadParameters,
    ownerid: vm.currentTopic.id
  });
})

EventBus.$on('loadThread', id => {
  vm.loadThread(id);
})

EventBus.$on('loadTopic', id => {
  vm.loadTopic(id);
})
