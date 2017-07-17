<template>
  <div v-show="showLogin">
    <el-row type="flex" justify="center">
      <el-col :span="0">
        <div>
          <el-button type="primary" @click="newuserVisible = true">New User</el-button>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-input placeholder="Username" v-model="form.username"></el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <el-input placeholder="Password" type="password" v-model="form.password" v-on:keyup.enter.native="login()"></el-input>
        </div>
      </el-col>
      <el-col :span="0">
        <div>
          <el-button type="primary" v-on:click="login()">Login</el-button>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="New User" :visible.sync="newuserVisible">
      <el-form :model="form">
        <el-form-item>
          <el-input v-model="form.username" placeholder="Username" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.email" placeholder="Email" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.password" placeholder="Password" type="password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.confirm" placeholder="Confirm Password" type="password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.signature" placeholder="Signature" auto-complete="off">
            <template slot="prepend">
              <el-checkbox v-model="form.hasSignature"></el-checkbox>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <el-alert
        title="Your two passwords don't match!"
        type="error" v-show="passwordsMustMatchVisible">
      </el-alert>

      <br v-show="passwordsMustMatchVisible && fillDialogVisisble">

      <el-alert
        title="You must enter all fields before creating a new account."
        type="error" v-show="fillDialogVisisble">
      </el-alert>

      <span slot="footer" class="dialog-footer">
        <el-button @click="newuserVisible = false">Cancel</el-button>
        <el-button type="primary" @click="create">Confirm</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { EventBus } from './../main.js';

export default {
  name: 'login',
  data () {
    return {
      showLogin : true,
      newuserVisible: false,
      form: {
        username: '',
        email: '',
        password: '',
        confirm: '',
        hasSignature: false,
        signature: ''
      },
      fillDialogVisisble: false,
      passwordsMustMatchVisible: false
    }
  },
  methods: {
    showNewUserForm : function() {
      this.newuserVisible = true;
      this.fillDialogVisisble = false;
      this.passwordsMustMatchVisible = false;
    },
    hide : function() {
      this.showLogin = false;
      EventBus.$off('renderUser', this.hide);
    },
    login : function() {
      EventBus.$emit('sendLogin', { username: this.form.username, password : this.form.password });
      EventBus.$on('renderUser', this.hide);
    },
    create : function() {
      if (this.form.password != this.form.confirm) {
        this.passwordsMustMatchVisible = true;
      } else if (this.form.username == '' || this.form.email == '' ||
                 this.form.password == '') {
        this.fillDialogVisisble = true;
      } else {
        this.newuserVisible = false;
        console.log('Sending new user!');
        EventBus.$emit('sendNewUser', this.form);
      }
    }
  }
}

</script>

<style lang="scss">
</style>
