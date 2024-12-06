<template>
  <div>
    <el-row>
      <el-col :span="14">
        <el-col style="width:100px">
          <el-image
            class="img"
            src=".../.../.../assets/img/login_bg.jpg"
            alt="n.pic"
            fit="fill"
          >
            <div slot="error" class="image-slot"></div>
          </el-image>
        </el-col>
        <el-col style="width:calc(100% - 120px); margin-left:20px">
          <div class="name">Arcaea</div>
          <div class="alias">韵律源点</div>
          <div class="coop">lowiro</div></el-col
        >
      </el-col>

      <el-col :span="10">
        <div id="chart" :style="{ width: '100%', height: '100%' }"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <PopoverGame text="Arcaea"></PopoverGame>
        <PopoverGame text="Arcaea"></PopoverGame>
        <PopoverGame text="Arcaea"></PopoverGame>
        <el-row>
          <VideoCard></VideoCard>
        </el-row>
      </el-col>
      <el-col :span="8">
        <div class="block">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              >{{ activity.content }}</el-timeline-item
            >
          </el-timeline>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15"
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13"
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11"
        }
      ],
      chart: null
    };
  },
  methods: {
    initChart() {
      var option = {
        title: {
          text: "动态数据"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56"
            }
          }
        },
        legend: {
          data: ["最新成交价", "预购队列"]
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            data: (function() {
              var now = new Date();
              var res = [];
              var len = 10;
              while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                now = new Date(now - 2000);
              }
              return res;
            })()
          },
          {
            type: "category",
            boundaryGap: true,
            data: (function() {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(10 - len - 1);
              }
              return res;
            })()
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            name: "价格",
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2]
          },
          {
            type: "value",
            scale: true,
            name: "预购量",
            max: 1200,
            min: 0,
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: "预购队列",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: (function() {
              var res = [];
              var len = 10;
              while (len--) {
                res.push(Math.round(Math.random() * 1000));
              }
              return res;
            })()
          },
          {
            name: "最新成交价",
            type: "line",
            data: (function() {
              var res = [];
              var len = 0;
              while (len < 10) {
                res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                len++;
              }
              return res;
            })()
          }
        ]
      };

      this.chart = echarts.init(document.getElementById("chart"));
      this.chart.setOption(option);
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    }
  },
  computed: {},
  mounted: function() {
    if (this.chart) {
      this.chart.resize();
    }
    this.initChart();
  }
};
</script>

<style scoped>
.name {
  font-size: 2.5rem;
  line-height: 2.5rem;
}

.alias {
  font-size: 1.5rem;
  line-height: 1.5rem;
  margin: 0.5rem 0;
  color: gray;
}
.coop {
  font-size: 1rem;
  line-height: 1rem;
  color: gray;
}

.img {
  width: 6rem;
  height: 6rem;
  border-radius: 20px;
  float: left;
  margin: 0 1rem 1rem 0;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}
</style>
