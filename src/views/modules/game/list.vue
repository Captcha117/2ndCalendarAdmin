<template>
  <div>
    <el-row id="search-row" class="search-row">
      <el-input
        v-model="search"
        placeholder="Search"
        style="width:8rem"
        clearable
        size="small"
      ></el-input>
      <!-- <el-button icon="el-icon-search" circle @click="test()"></el-button> -->
      <el-button type="text" disabled>反馈</el-button>
    </el-row>
    <div v-if="showList.length > 0">
      <el-row style="padding-top:1rem">
        <el-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="8"
          :key="index"
          style="height:6rem"
          v-for="(n, index) in showList"
        >
          <el-row>
            <el-col style="width:80px">
              <!-- <el-image
                class="img"
                :src="n.pic ? '../static/game-icon/' + n.pic : ''"
                fit="fill"
              >
                <div slot="error" class="image-slot"></div>
              </el-image> -->

              <img class="img" src="~@/static/game-icon/Arcaea.jpg" />
            </el-col>
            <el-col style="width:calc(100% - 100px); margin-left:20px">
              <div class="name">
                <span class="name-span" :name="n.Name || n.Alias || n.NameJP">
                  {{ n.Name || n.Alias || n.NameJP }}
                </span>
              </div>
              <div class="alias">{{ n.Alias }}</div>
              <div v-if="n.tag" class="tag-div">
                <el-tag size="mini" v-if="n.tag.indexOf('VR') > -1" title="VR"
                  >VR</el-tag
                >
                <el-tag size="mini" v-if="n.tag.indexOf('PC') > -1" title="PC端"
                  >PC</el-tag
                >
                <el-tag
                  size="mini"
                  v-if="n.tag.indexOf('移动') > -1"
                  title="移动端"
                  >M</el-tag
                >
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row>
        <br />
        <el-divider content-position="center">
          <span class="initial">No Result</span>
        </el-divider>
      </el-row>
    </div>
  </div>
</template>

<script>
import { gameList } from "../../../data/data";
export default {
  data() {
    return {
      showList: [],
      search: ""
    };
  },
  methods: {
    test() {
      console.log(document.getElementById("search-row").clientLeft);
    }
  },

  watch: {
    search(val) {
      this.showList = gameList.filter(x =>
        x.Name.toUpperCase().includes(val.toUpperCase())
      );
    }
  },
  computed: {},
  mounted: function() {
    this.showList = gameList;
    //console.log(gameList);
    // service
    //   .commit("flight.getIcsInfo")
    //   .then(function(data) {
    //     console.log(data)
    //   })
    //   .catch(function() {
    //   });
    // this.$http
    //   .get(
    //     "https://www.easy-mock.com/mock/5ba2efded7546c5ec0a7b90f/mug/GameList"
    //   )
    //   .then(data => {
    //     console.log(data.data);
    //     this.gameList = data.data.gameList;
    //   })
    //   .catch(function(e) {
    //     console.log(e);
    //   });
  }
};
</script>

<style scoped>
.search-row {
  margin-bottom: 1.5rem;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 5px;
}

.initial {
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
}

.name {
  font-size: 1.2rem;
  line-height: 1.2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.name-span:hover {
  color: #409eff;
  cursor: pointer;
}

.alias {
  font-size: 1rem;
  line-height: 1rem;
  /* margin-bottom: 1rem; */
  color: gray;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-info {
  width: 5rem;
  height: 5rem;
  display: inline-box;
}

.img {
  width: 5rem;
  height: 5rem;
  border-radius: 10px;
  float: left;
  margin: 0 1rem 1rem 0;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.game-info {
  display: inline-box;
}

.tag-div {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
