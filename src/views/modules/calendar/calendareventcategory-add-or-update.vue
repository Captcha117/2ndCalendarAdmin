<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="80px"
    >
      <el-form-item label="游戏" prop="gameId">
        <el-select v-model="dataForm.gameId">
          <el-option
            v-for="g in gameList"
            :key="g.id"
            :label="g.name"
            :value="g.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类目名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="类目名称"></el-input>
      </el-form-item>
      <el-form-item label="类目编码" prop="code">
        <el-input v-model="dataForm.code" placeholder="类目编码"></el-input>
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
      dataForm: {
        id: 0,
        gameId: "",
        name: "",
        code: "",
      },
      dataRule: {
        gameId: [
          { required: true, message: "游戏id不能为空", trigger: "blur" },
        ],
        name: [
          { required: true, message: "类目名称不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getGameList();
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/calendar/category/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.gameId = data.calendarEventCategory.gameId;
              this.dataForm.name = data.calendarEventCategory.name;
              this.dataForm.code = data.calendarEventCategory.code;
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
              `/calendar/category/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              gameId: this.dataForm.gameId,
              name: this.dataForm.name,
              code: this.dataForm.code,
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
  },
};
</script>
