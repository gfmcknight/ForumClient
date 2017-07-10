<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        Somebody help with my project!
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'board',
  data () {
    return {
      topic: {},
      subtopics: [],
      threads: []
    }
  }
}
</script>

<style lang="scss">
</style>
