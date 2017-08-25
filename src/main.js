import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App.vue'

import Data from './data.js';

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
          Data.state.token = response.data;

          axios.get('users/self')
          .then(function (response) {
            Data.user.ref = response.data;
            Data.state.loggedIn = true;
            vm.$notify({
              title: 'Login Successful',
              message: 'Logged in as ' + Data.user.ref.name + '.',
              type: 'success'
            });
            EventBus.$emit('renderUser', Data.user.ref);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Login Failed',
          message: error.response.data,
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
        console.log(error.response);
        vm.$notify({
          title: 'Account Creation Failed',
          message: error.response.data,
          type: 'error'
        });
      })
    },

    tryCreateThread : function(postParameters) {
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
          message: error.response.data,
          type: 'error'
        });
      });
    },

    tryCreateTopic : function(topicParameters) {
      vm.$notify({
        title: 'Posting',
        message: 'Contacting server...',
        type: 'info'
      });

      axios.post('board/' + Data.topic.ref.id, topicParameters)
      .then (function (response) {
        vm.$notify({
          title: 'Posted',
          message: 'Your topic was submitted successfully.',
          type: 'success'
        });
        vm.loadTopic(response.data.id);
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Posting Failed',
          message: error.response.data,
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

      axios.post('threads/' + Data.thread.ref.id + '/posts/', postParameters)
      .then (function (response) {
        vm.$notify({
          title: 'Posted',
          message: 'Your post was submitted successfully.',
          type: 'success'
        });
        vm.loadThread(Data.thread.ref.id);
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Posting Failed',
          message: error.response.data,
          type: 'error'
        });
      });
    },

    loadThread : function(id) {
      axios.get('threads/' + id + '/')
      .then(function (response) {
        Data.thread.ref = response.data;
        axios.get('threads/' + id + '/posts/')
        .then(function (response) {
          Data.posts.ref = response.data;
          EventBus.$emit('renderThread', {
            thread: Data.thread.ref,
            posts: Data.posts.ref
          });
        });
      })
      .catch (function (error) {
        console.log(error);
      });
    },

    loadTopic : function(id) {
      axios.get('board/' + id + '/')
      .then(function (response) {
        Data.topic.ref = response.data;
        axios.get('board/' + id + '/topics/')
        .then(function (response) {
          Data.subtopics.ref = response.data;
          axios.get('board/' + id + '/threads/')
          .then(function (response) {
            Data.threads.ref = response.data;
            EventBus.$emit('renderTopic', {
              topic: Data.topic.ref,
              subtopics: Data.subtopics.ref,
              threads: Data.threads.ref
            });
          });
        });
      })
      .catch (function (error) {
        console.log(error);
      });

    },

    tryChangePassword : function(userParameters) {
      vm.$notify({
        title: 'Changing Password',
        message: 'Contacting server...',
        type: 'info'
      });

      axios.put('users/' + Data.user.ref.id + '/', userParameters)
      .then(function(response) {
        vm.$notify({
          title: 'Changed',
          message: 'Your password was changed successfully.',
          type: 'success'
        });
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Password Change Failed',
          message: error.response.data,
          type: 'error'
        });
      });
    },

    tryChangeSignature : function(userParameters) {
      vm.$notify({
        title: 'Changing Signature',
        message: 'Contacting server...',
        type: 'info'
      });

      axios.put('users/' + Data.user.ref.id + '/', userParameters)
      .then(function(response) {
        vm.$notify({
          title: 'Changed',
          message: 'Your signature was changed successfully.',
          type: 'success'
        });
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Signature Change Failed',
          message: error.response.data,
          type: 'error'
        });
      });
    },

    tryDeactivate : function(userParameters) {
      axios.put('users/' + Data.user.ref.id + '/', userParameters);
      Data.state.loggedIn = false;
    }
  },
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
    ownerid: Data.topic.ref.id
  });
})

EventBus.$on('loadThread', id => {
  vm.loadThread(id);
})

EventBus.$on('loadTopic', id => {
  vm.loadTopic(id);
})

EventBus.$on('changePassword', password => {
  vm.tryChangePassword({ username: Data.user.ref.name,
                         email: '',
                         password: password,
                         status: Data.user.ref.status,
                         hasSignature: Data.user.ref.hasSignature,
                         signature: Data.user.ref.signature

  });
})

EventBus.$on('changeSignature', signatureParameters => {
  vm.tryChangeSignature({ username: Data.user.ref.name,
                         email: '',
                         status: Data.user.ref.status,
                         hasSignature: signatureParameters.hasSignature,
                         signature: signatureParameters.signature

  });
})

EventBus.$on('deactivateAccount', function() {
  vm.tryDeactivate({ username: Data.user.ref.name,
                     email: '',
                     status: 'Deactivated',
                     hasSignature: Data.user.ref.hasSignature,
                     signature: Data.user.ref.signature
  })
})

EventBus.$on('sendNewTopic', topicParameters => {
  vm.tryCreateTopic(topicParameters);
})
