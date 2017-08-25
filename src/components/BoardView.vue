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

    <div v-show="canMakeTopic">
      <br>
      <el-card class="box-card">
        <el-input placeholder="New topic title..." v-model="newTopicTitle"></el-input>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="Subtopic description here..."
          v-model="newTopicDesc">
        </el-input>
        <el-checkbox v-model="newTopicAllowsThreads">Allow Threads</el-checkbox>
        <br></br>
        <el-button type="primary" @click="makeTopicRequest()">Post</el-button>
      </el-card>
    </div>

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

    <div v-show="canMakeThread">
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
      newThreadText: '',

      newTopicTitle: '',
      newTopicDesc: '',
      newTopicAllowsThreads: true,

      topic : Data.topic,
      subtopics : Data.subtopics,
      threads : Data.threads,
      user : Data.user,
      state: Data.state
    }
  },
  computed: {
    canMakeTopic : function() {
      return this.state.loggedIn && this.user.ref.status == 'Administrator';
    },
    canMakeThread : function() {
      return this.topic.ref.allowsThreads && this.state.loggedIn &&
             this.user.ref.status != 'Banned';
    }
  },
  methods: {
    show : function(boardParameters) {
      this.showBoard = true;
      this.newThreadText = '';
      this.newTopicTitle = '';
      this.newTopicDesc = '';
      this.newTopicAllowsThreads = true;
    },
    hide : function(threadParameters) {
      this.showBoard = false;
    },
    makeThreadRequest: function() {
      EventBus.$emit('sendNewThread', this.newThreadText);
    },
    makeTopicRequest: function() {
      EventBus.$emit('sendNewTopic', {
        name: this.newTopicTitle,
        description: this.newTopicDesc,
        allowsThreads: this.newTopicAllowsThreads
      });
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
