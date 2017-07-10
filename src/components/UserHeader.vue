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
      <el-col :span="4" class="userheader">
        <div>
          {{ status[user.status] }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { EventBus } from './../main.js';

export default {
  name: 'userHeader',
  created: function() {
    EventBus.$on('renderUser', this.show);
  },
  data () {
    return {
      showUser: false,
      user : {
        id: 1,
        name: "Graham",
        email: null,
        created: "2017-07-01T00:37:47.1260695",
        status: 4,
        hasSignature: false,
        signature: null
      },
      status : [
        "Administrator",
        "Moderator",
        "Active",
        "Deactivated",
        "Banned"
      ]
    }
  },
  methods: {
    show : function(userParameters) {
      this.user = userParameters;
      this.showUser = true;
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
