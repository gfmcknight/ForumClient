<template>
  <div v-show="showBoard">
    <el-card class="box-card">
      <div slot="header" class="threadname">
        {{ topic.ref.name }}
      </div>
      <div class="secondary">
        <p>{{ topic.ref.description }}</p>
      </div>
    </el-card>

    <div v-for="subtopic in subtopics.ref">
      <br>
      <div @click="getTopic(subtopic.id)">
        <el-card class="box-card">
          <div slot="header" class="postcontent">
            Topic: {{ subtopic.name }}
          </div>
          <div class="secondary">
            <p>{{ subtopic.description }}</p>
          </div>
        </el-card>
      </div>
    </div>

    <div v-show="topic.allowsThreads">
      <br>
      <el-card class="box-card">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Create a new thread..."
          v-model="newThreadText">
        </el-input>
        <br></br>
        <el-button type="primary" @click="makeThreadRequest()">Post</el-button>
      </el-card>
    </div>

    <div v-for="thread in threads.ref">
      <br>
      <div @click="getThread(thread.id)">
        <el-card class="box-card">
          <div slot="header" class="postcontent">
            Thread: {{ thread.title }}
          </div>
          <div class="secondary">
            <p>by {{ thread.author.name }}, {{ thread.author.status }}, on {{ thread.created }}</p>
          </div>
        </el-card>
      </div>
    </div>

    <br>

  </div>
</template>

<script>
import { EventBus } from './../main.js';
import Data from './../data.js';

export default {
  name: 'board',
  created : function () {
    EventBus.$on('renderThread', this.hide);
    EventBus.$on('renderTopic', this.show);
  },
  data () {
    return {
      showBoard: false,
      newThreadText: "",
      topic : Data.topic,
      subtopics : Data.subtopics,
      threads : Data.threads
    }
  },
  methods: {
    show : function(boardParameters) {
      this.showBoard = true;
      this.newThreadText = '';
    },
    hide : function(threadParameters) {
      this.showBoard = false;
    },
    makeThreadRequest: function() {
      EventBus.$emit('sendNewThread', this.newThreadText);
    },
    getTopic(id) {
      EventBus.$emit('loadTopic', id);
    },
    getThread(id) {
      EventBus.$emit('loadThread', id);
    }
  }
}
</script>

<style lang="scss">
.boardname {
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
</style>
