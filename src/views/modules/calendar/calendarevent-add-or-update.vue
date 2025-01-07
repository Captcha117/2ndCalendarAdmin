<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="800px"
  >
    <!-- <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="游戏id" prop="gameId">
        <el-input v-model="dataForm.gameId" placeholder="游戏id"></el-input>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-input
          v-model="dataForm.startTime"
          placeholder="开始时间"
        ></el-input>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-input v-model="dataForm.endTime" placeholder="结束时间"></el-input>
      </el-form-item>
      <el-form-item label="平台code" prop="platformCode">
        <el-input
          v-model="dataForm.platformCode"
          placeholder="平台code"
        ></el-input>
      </el-form-item>
      <el-form-item label="类目id" prop="categoryId">
        <el-input v-model="dataForm.categoryId" placeholder="类目id"></el-input>
      </el-form-item>
      <el-form-item label="图片地址" prop="imgUrl">
        <el-input v-model="dataForm.imgUrl" placeholder="图片地址"></el-input>
      </el-form-item>
      <el-form-item label="详情地址" prop="detailUrl">
        <el-input
          v-model="dataForm.detailUrl"
          placeholder="详情地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动地址" prop="eventUrl">
        <el-input v-model="dataForm.eventUrl" placeholder="活动地址"></el-input>
      </el-form-item>
      <el-form-item label="提示" prop="tip">
        <el-input v-model="dataForm.tip" placeholder="提示"></el-input>
      </el-form-item>
    </el-form> -->
    <el-form ref="dataForm" :model="dataForm" label-width="80px">
      <el-form-item label="游戏" prop="gameId">
        <el-select v-model="dataForm.gameId" @change="gameChange">
          <el-option
            v-for="g in gameList"
            :key="g.id"
            :label="g.name"
            :value="g.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          type="datetimerange"
          v-model="dataForm.date"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['04:00:00', '03:59:59']"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="平台" prop="platformCode">
        <el-select v-model="dataForm.platformCode" clearable>
          <el-option
            v-for="p in platformList"
            :key="p.id"
            :label="p.name"
            :value="p.code"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类目" prop="categoryId">
        <el-select v-model="dataForm.categoryId" clearable>
          <el-option
            v-for="p in categoryList"
            :key="p.id"
            :label="p.name"
            :value="p.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片地址" prop="imgUrl">
        <el-input
          v-model="dataForm.imgUrl"
          type="textarea"
          :rows="5"
        ></el-input>
        <el-image :src="dataForm.imgUrl" width="300px"></el-image>
      </el-form-item>

      <el-form-item label="奖励" prop="rewardList">
        <el-button
          v-if="!dataForm.rewardList.length"
          type="primary"
          @click="addReward()"
          >+</el-button
        >
        <el-form
          inline
          v-for="(item, index) in dataForm.rewardList"
          :key="index"
        >
          <el-form-item>
            <el-select type="text" v-model="item.rewardCode">
              <el-option
                v-for="r in rewardList"
                :key="r.code"
                :value="r.code"
                :label="r.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input-number type="text" v-model="item.rewardNum" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addReward()">+</el-button>
            <el-button type="danger" @click="delReward(index)">-</el-button>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="详情地址" prop="detailUrl">
        <el-input v-model="dataForm.detailUrl"></el-input>
      </el-form-item>
      <el-form-item label="活动地址" prop="eventUrl">
        <el-input v-model="dataForm.eventUrl"></el-input>
      </el-form-item>
      <el-form-item label="活动描述" prop="description">
        <el-input
          v-model="dataForm.description"
          type="textarea"
          :rows="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="提示" prop="tip">
        <el-input v-model="dataForm.tip" type="textarea" :rows="5"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import api from "./api";

export default {
  data() {
    return {
      visible: false,
      gameList: [],
      platformList: [],
      categoryList: [],
      rewardList: [],
      dataForm: {
        id: 0,
        gameId: "",
        name: "",
        date: [],
        startTime: "",
        endTime: "",
        platformCode: "",
        categoryId: "",
        imgUrl: "",
        rewardList: [],
        detailUrl: "",
        eventUrl: "",
        description: "",
        tip: "",
      },
      dataRule: {
        gameId: [
          { required: true, message: "游戏id不能为空", trigger: "blur" },
        ],
        name: [
          { required: true, message: "活动名称不能为空", trigger: "blur" },
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" },
        ],
        platformCode: [
          { required: true, message: "平台code不能为空", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "类目id不能为空", trigger: "blur" },
        ],
        detailUrl: [
          { required: true, message: "详情地址不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getGameList();
    this.getPlatformList();
  },
  methods: {
    init(id, isCopy) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.$set(this.dataForm, "date", []);
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/calendar/event/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = { ...data.calendarEvent };
              if (isCopy) {
                this.dataForm.id = 0;
              }
              this.$set(this.dataForm, "date", [
                this.dataForm.startTime,
                this.dataForm.endTime,
              ]);
              this.gameChange(this.dataForm.gameId, false);
              // this.dataForm.gameId = data.calendarEvent.gameId;
              // this.dataForm.name = data.calendarEvent.name;
              // this.dataForm.startTime = data.calendarEvent.startTime;
              // this.dataForm.endTime = data.calendarEvent.endTime;
              // this.dataForm.platformCode = data.calendarEvent.platformCode;
              // this.dataForm.categoryId = data.calendarEvent.categoryId;
              // this.dataForm.imgUrl = data.calendarEvent.imgUrl;
              // this.dataForm.detailUrl = data.calendarEvent.detailUrl;
              // this.dataForm.eventUrl = data.calendarEvent.eventUrl;
              // this.dataForm.tip = data.calendarEvent.tip;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/calendar/event/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              ...this.dataForm,

              id: this.dataForm.id || undefined,
              startTime: this.dataForm.date[0],
              endTime: this.dataForm.date[1],
            }),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 100,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                },
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    getGameList() {
      api.getGameList().then((res) => {
        this.gameList = res.data || [];
      });
    },
    getPlatformList() {
      api.getPlatformList().then((res) => {
        this.platformList = res.data || [];
      });
    },
    gameChange(val, clear = true) {
      if (clear) {
        this.dataForm.categoryId = null;
        this.dataForm.rewardList = [];
      }
      if (val) {
        api.getCategoryList(val).then((res) => {
          this.categoryList = res.data || [];
        });
        api.getRewardList(val).then((res) => {
          this.rewardList = res.data || [];
        });
      }
    },
    addReward() {
      this.dataForm.rewardList.push({ code: "", num: 0 });
    },
    delReward(i) {
      this.dataForm.rewardList.splice(i, 1);
    },
  },
};
</script>
