<template>
  <div v-show="showThread">
    <el-card class="box-card">
      <div slot="header" class="threadname">
        {{ thread.title }}
      </div>
      <div class="secondary">
        <p>by {{ thread.author.name }}, {{ thread.author.status }}, on {{ thread.created }}</p>
        <p v-if="thread.author.hasSignature" class="signature">"{{ thread.author.signature }}"</p>
      </div>
    </el-card>
    <div v-for="post in posts">
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

export default {
  name: 'board',
  created : function () {
    EventBus.$on('renderThread', this.show);
    EventBus.$on('renderTopic', this.hide);
  },
  data () {
    return {
      newPostText: "",
      showThread: true,
      thread: {
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
      posts: [
        {
          "id": 1,
          "text": "Congratulations!",
          "created": "2017-07-11T18:55:54.5764526",
          "hasSignature": true,
          "signature": "I changed my...",
          "ownerID": 1,
          "authorID": 1,
          "author": {
              "id": 1,
              "name": "Graham",
              "email": "graham.mcknight2@gmail.com",
              "created": "2017-07-11T18:29:45.4903222",
              "status": "Administrator",
              "hasSignature": false,
              "signature": null
            }
          },
          {
            "id": 2,
            "text": "You really did it!",
            "created": "2017-07-11T18:56:37.0323116",
            "hasSignature": true,
            "signature": "...signature a lot",
            "ownerID": 1,
            "authorID": 1,
            "author": {
                "id": 1,
                "name": "Graham",
                "email": "graham.mcknight2@gmail.com",
                "created": "2017-07-11T18:29:45.4903222",
                "status": "Administrator",
                "hasSignature": false,
                "signature": null
            }
          },
          {
            "id": 3,
            "text": "I'm proud of me!",
            "created": "2017-07-11T18:56:37.0323116",
            "hasSignature": true,
            "signature": "null",
            "ownerID": 1,
            "authorID": 1,
            "author": {
                "id": 1,
                "name": "Graham",
                "email": "graham.mcknight2@gmail.com",
                "created": "2017-07-11T18:29:45.4903222",
                "status": "Administrator",
                "hasSignature": false,
                "signature": null
            }
          }
        ]
    }
  },
  methods: {
    show : function(threadParameters) {
      this.showThread = true;
      this.thread = threadParameters.thread;
      this.posts = threadParameters.posts;
    },
    hide : function(boardParameters) {
      this.showThread = false;
    },
    makePostRequest: function() {
      EventBus.$emit('createPost', this.newPostText);
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
