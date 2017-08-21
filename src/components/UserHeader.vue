<template>
  <div v-show="showUser">
    <el-row type="flex" justify="center">
      <el-col :span="8" class="userheader">
        <div>
          {{ user.name }}
        </div>
      </el-col>
      <el-col :span="8" class="userheader">
        <div>
          Created on: {{ user.created }}
        </div>
      </el-col>
      <el-col :span="8" class="userheader">
        <div>
          {{ user.status }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { EventBus } from './../main.js';
import Data from './../data.js'

export default {
  name: 'userHeader',
  created: function() {
    EventBus.$on('renderUser', this.show);
  },
  data () {
    return {
      state: Data.state,
      user : Data.user
    }
  },
  methods: {
    show : function(userParameters) {
      this.user = userParameters;
      this.showUser = true;
    }
  },
  computed: {
    showUser: function() {
      return this.state.loggedIn;
    }
  }
}
</script>

<style lang="scss">
.userheader {
  background-color: white;
  border-radius: 4px;
  border-style: solid;
  border-width: thin;
  border-color: lightgray;
  padding: 8px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
}
</style>
