<template>
  <el-card shadow="hover" style="width:200px; height:200px">
    {{ video.name }}
  </el-card>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
      default: function() {
        return { name: "name" };
      }
    }
  }
};
</script>

<style></style>
