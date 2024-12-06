<template>
  <el-popover
    placement="bottom-start"
    :title="game.Name"
    :open-delay="500"
    width="200"
    trigger="hover"
    @show="show"
  >
    <div :v-loading="loading">{{ game.Alias }}</div>
    <span slot="reference">{{ text }}</span>
  </el-popover>
</template>

<script>
import { gameList } from "../../data/data";
import { timeout } from "q";
export default {
  data() {
    return {
      game: {},
      loading: false
    };
  },
  props: {
    text: {
      type: String,
      default: "loading..."
    },
    id: {
      type: String,
      default: "1AE13C033DF241F4A24011368720012E"
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.game = gameList.find(x => x.GameId == this.id);
      console.log(this.game);
      this.loading = false;
    },
    show() {
      this.getData();
    }
  }
};
</script>

<style scoped>
span {
  color: #409eff;
  cursor: pointer;
}
</style>
