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
      <el-form-item label="游戏名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="游戏名称"></el-input>
      </el-form-item>
      <el-form-item label="游戏code" prop="code">
        <el-input v-model="dataForm.code" placeholder="游戏code"></el-input>
      </el-form-item>
      <el-form-item label="icon" prop="iconUrl">
        <el-input
          v-model="dataForm.iconUrl"
          type="textarea"
          :rows="5"
        ></el-input>
        <el-image :src="dataForm.iconUrl" width="300px"></el-image>
      </el-form-item>
      <el-form-item label="颜色" prop="color">
        <el-input v-model="dataForm.color" placeholder="颜色"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          v-model="dataForm.sort"
          placeholder="排序"
        ></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        code: "",
        iconUrl: "",
        color: "",
        sort: 1,
      },
      dataRule: {
        name: [
          { required: true, message: "游戏名称不能为空", trigger: "blur" },
        ],
        code: [
          { required: true, message: "游戏code不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/calendar/game/info/${this.dataForm.id}`),
            method: "get",
            params: this.$http.adornParams(),
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm = { ...data.calendarGame };
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
              `/calendar/game/${!this.dataForm.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              code: this.dataForm.code,
              color: this.dataForm.color,
              sort: this.dataForm.sort,
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
  },
};
</script>
