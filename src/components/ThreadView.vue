<template>
  <div v-show="showThread">
    <el-card class="box-card">
      <div slot="header" class="threadname">
        {{ thread.ref.title }}
      </div>
      <div class="secondary">
        <p>by {{ thread.ref.author.name }}, {{ thread.ref.author.status }}, on {{ thread.ref.created }}</p>
        <p v-if="thread.ref.author.hasSignature" class="signature">"{{ thread.ref.author.signature }}"</p>
      </div>
    </el-card>
    <div v-for="post in posts.ref">
      <br>
      <el-card class="box-card">
        <div slot="header" class="postcontent">
          {{ post.text }}
        </div>
        <div class="secondary">
          <p>by {{ post.author.name }}, {{ post.author.status }}, on {{ post.created }}</p>
          <p v-if="post.hasSignature" class="signature">"{{ post.signature }}"</p>
        </div>
      </el-card>
    </div>
    <br>
    <el-card class="box-card">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Respond to this discussion..."
        v-model="newPostText">
      </el-input>
      <br></br>
      <el-button type="primary" @click="makePostRequest()">Post</el-button>
    </el-card>
  </div>
</template>

<script>
import { EventBus } from './../main.js';
import Data from './../data.js'

export default {
  name: 'board',
  created : function () {
    EventBus.$on('renderThread', this.show);
    EventBus.$on('renderTopic', this.hide);
  },
  data () {
    return {
      newPostText: "",
      showThread: false,
      thread: Data.thread,
      posts: Data.posts
    }
  },
  methods: {
    show : function(threadParameters) {
      this.showThread = true;
      this.newPostText = '';
    },
    hide : function(boardParameters) {
      this.showThread = false;
    },
    makePostRequest: function() {
      EventBus.$emit('sendNewPost', this.newPostText);
    }
  }
}
</script>

<style lang="scss">
.threadname {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  text-align: center;
  font-size: 24px;
}
.postcontent {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 14px;
}
.secondary {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: gray;
  font-size: 14px;
}
.signature {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 12px;
  font-style: italic;
  color: silver;
}
</style>
