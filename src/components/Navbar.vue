<template>
  <div>
    <el-menu :default-active="navState" class="navbarstate"
              mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">{{ root.ref.name }}</el-menu-item>
      <el-menu-item index="2" v-show="showTopic">{{ currentTopic.ref.name }}</el-menu-item>
      <el-menu-item index="3" v-show="showThread">{{ currentThread.ref.title }}</el-menu-item>
      <el-submenu index="4"v-show="showUser">
        <template slot="title" >{{ username }}</template>
        <el-menu-item index="4-1">Log Out</el-menu-item>
        <el-menu-item index="4-2">Change Password</el-menu-item>
        <el-menu-item index="4-3">Change Signature</el-menu-item>
        <el-menu-item index="4-4">Deactivate Account</el-menu-item>
      </el-submenu>
    </el-menu>

    <el-dialog title="Change Password" :visible.sync="modifyPasswordVisible">
      <el-form>
        <el-form-item>
          <el-input v-model="newPassword" placeholder="Password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="newPasswordConfirm" placeholder="Confirm Password" type="password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-alert
        title="Your two passwords don't match!"
        type="error" v-show="passwordsMustMatchVisible">
      </el-alert>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeModifyPassword">Cancel</el-button>
        <el-button type="primary" @click="submitModifiedPassword">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Change Signature" :visible.sync="modifySignatureVisible">
      <el-form>
        <el-form-item>
          <el-input v-model="signature" placeholder="Signature" auto-complete="off">
            <template slot="prepend">
              <el-checkbox v-model="hasSignature"></el-checkbox>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifySignatureVisible = false">Cancel</el-button>
        <el-button type="primary" @click="submitModifiedSignature">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { EventBus } from './../main.js';
import Data from './../data.js'

export default {
  name: 'userHeader',
  created: function() {
    EventBus.$on('renderUser', this.renderUser);
    EventBus.$on('renderTopic', this.renderTopic);
    EventBus.$on('renderThread', this.renderThread);
  },
  data () {
    return {
        navState: '1',
        username: '',
        modifySignatureVisible: false,
        modifyPasswordVisible: false,
        state: Data.state,
        root: Data.root,
        currentTopic: Data.topic,
        showTopic: false,
        currentThread: Data.thread,
        showThread: false,

        newPassword: '',
        newPasswordConfirm: '',
        passwordsMustMatchVisible: false,

        hasSignature: false,
        signature: ''

    };
  },
  computed: {
    showUser: function() {
      return this.state.loggedIn;
    }
  },
  methods: {
    handleSelect : function(key, path) {
      if (key == '1') {
        EventBus.$emit('loadTopic', this.root.ref.id);
      } else if (key == '2') {
        EventBus.$emit('loadTopic', this.currentTopic.ref.id);
      } else if (key == '3') {
        EventBus.$emit('loadThread', this.currentThread.ref.id);
      } else if (key == '4-1') {
        this.state.loggedIn = false;
      } else if (key == '4-2') {
        this.modifyPasswordVisible = true;
      } else if (key == '4-3') {
        this.hasSignature = Data.user.ref.signature,
        this.signature = Data.user.ref.signature,
        this.modifySignatureVisible = true;
      } else if (key == '4-4') {
        EventBus.$emit('deactivateAccount');
      }
    },
    renderUser : function(userParameters) {
      this.username = userParameters.name;
    },
    renderTopic : function(topicParameters) {
      if (!this.state.rootInitialized) {
        this.root.ref = topicParameters.topic;
        this.navState = '1';
        this.state.rootInitialized = true;
      } else if (topicParameters.topic.id == this.root.id) {
        this.navState = '1';
      } else {
        this.showTopic = true;
        this.navState = '2';
      }
    },
    renderThread : function (threadParameters) {
      this.showThread = true;
      this.navState = '3';
    },
    closeModifyPassword : function() {
      modifyPasswordVisible = false;
      this.newPassword = '';
      this.newPasswordConfirm = '';
    },
    submitModifiedPassword : function() {
      if (this.newPassword == this.newPasswordConfirm) {
        EventBus.$emit('changePassword', this.newPassword);
        this.modifyPasswordVisible = false;
      } else {
        this.passwordsMustMatchVisible = true;
      }
    },
    submitModifiedSignature : function() {
      EventBus.$emit('changeSignature', {
        hasSignature: this.hasSignature,
        signature: this.signature
      });
    }
  }
}
</script>

<style lang="scss">
.navbarstate {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
}
</style>
