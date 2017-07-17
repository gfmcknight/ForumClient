<template>
  <div>
    <el-menu :default-active="navState" class="navbarstate"
              mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">{{ root.name }}</el-menu-item>
    <el-menu-item index="2" v-show="showTopic">{{ currentTopic.name }}</el-menu-item>
    <el-menu-item index="3" v-show="showThread">{{ currentThread.title }}</el-menu-item>
    <el-submenu index="4"v-show="showUser">
      <template slot="title" >{{ username }}</template>
      <el-menu-item index="4-1">Log Out</el-menu-item>
      <el-menu-item index="4-2">Change Password</el-menu-item>
      <el-menu-item index="4-3">Account Details</el-menu-item>
      <el-menu-item index="4-4">Deactivate Account</el-menu-item>
    </el-submenu>
  </el-menu>
  </div>
</template>

<script>
import { EventBus } from './../main.js';

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
        showUser: false,
        username: '',
        rootInitialized: false,
        root: {
          "id": 1,
          "name": "Root",
          "description": "This is the root board",
          "allowsThreads": true
        },
        currentTopic: {
          "id": 1,
          "name": "Index",
          "description": "This is the root board",
          "allowsThreads": true
        },
        showTopic: false,
        currentThread: {
          "id": 1,
          "title": "My first topic!",
          "created": "2017-07-11T18:53:53.1608594",
          "locked": false,
          "ownerID": 2,
          "authorID": 1,
          "author": {
            "id": 1,
            "name": "Graham",
            "email": "graham.mcknight2@gmail.com",
            "created": "2017-07-11T18:29:45.4903222",
            "status": "Administrator",
            "hasSignature": true,
            "signature": "null"
          }
        },
        showThread: false
    }
  },
  methods: {
    handleSelect : function(key, path) {
      if (key == '1') {
        EventBus.$emit('loadTopic', this.root.id);
      } else if (key == '2') {
        EventBus.$emit('loadTopic', this.currentTopic.id);
      } else if (key == '3') {
        EventBus.$emit('loadThread', this.currentThread.id);
      }
    },
    renderUser : function(userParameters) {
      this.username = userParameters.name;
      this.showUser = true;
    },
    renderTopic : function(topicParameters) {
      if (!this.rootInitialized) {
        this.root = topicParameters.topic;
        this.navState = '1';
        this.rootInitialized = true;
      } else if (topicParameters.topic.id == this.root.id) {
        this.navState = '1';
      } else {
        this.currentTopic = topicParameters.topic;
        this.showTopic = true;
        this.navState = '2';
      }
    },
    renderThread : function (threadParameters) {
      this.currentThread = threadParameters.thread;
      this.showThread = true;
      this.navState = '3';
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
