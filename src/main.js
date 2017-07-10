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
            if (response.status == 200) {
              vm.self = response.data;
              vm.$notify({
                title: 'Login Successful',
                message: 'Logged in as ' + vm.self.name + '.',
                type: 'success'
              });
              EventBus.$emit('renderUser', vm.self);
            } else {
              console.log(response);
              vm.$notify({
                title: 'Login Failed',
                message: 'A validation issue has occurred.',
                type: 'error'
              });
            }
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
        if (response.status == 201) {
          vm.$notify({
            title: 'Account Created',
            message: 'Your account was created successfully.',
            type: 'success'
          });
        } else {
          vm.$notify({
            title: 'Account Creation Failed',
            message: 'A validation issue has occurred.',
            type: 'error'
          });
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
        vm.$notify({
          title: 'Account Creation Failed',
          message: 'Unable to contact server.',
          type: 'error'
        });
      })
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
