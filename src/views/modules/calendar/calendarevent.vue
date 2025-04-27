<template>
  <div class="mod-config">
    <el-form
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-form-item label="游戏">
        <el-select v-model="dataForm.gameId" @change="gameChange" clearable>
          <el-option
            v-for="g in gameList"
            :key="g.id"
            :label="g.name"
            :value="g.id"
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
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button
          type="danger"
          @click="deleteHandle()"
          :disabled="dataListSelections.length <= 0"
          >批量删除</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="活动id"
      >
      </el-table-column> -->
      <!-- <el-table-column
        prop="gameId"
        header-align="center"
        align="center"
        label="游戏id"
      >
      </el-table-column> -->
      <el-table-column
        prop="gameName"
        header-align="center"
        align="center"
        label="游戏名"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="活动名称"
      >
      </el-table-column>
      <el-table-column
        prop="startTime"
        header-align="center"
        align="center"
        label="开始时间"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="endTime"
        header-align="center"
        align="center"
        label="结束时间"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="platformName"
        header-align="center"
        align="center"
        label="平台"
      >
      </el-table-column>
      <el-table-column
        prop="categoryName"
        header-align="center"
        align="center"
        label="类目"
      >
      </el-table-column>
      <el-table-column
        prop="imgUrl"
        header-align="center"
        align="center"
        label="图片"
      >
        <template slot-scope="{ row }">
          <el-image
            v-if="row.imgUrl"
            :src="(row.imgUrl || '').split(';')[0]"
            height="50px"
          ></el-image>
          ({{ (row.imgUrl || "").split(";").length }})
        </template>
      </el-table-column>
      <el-table-column
        prop="rewardList"
        header-align="center"
        align="center"
        label="奖励"
      >
        <template slot-scope="{ row }">
          {{
            (row.rewardList || [])
              .map((x) => `${x.rewardName}(${x.rewardNum})`)
              .join(", ")
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="detailUrl"
        header-align="center"
        align="center"
        label="详情地址"
      >
      </el-table-column>
      <el-table-column
        prop="eventUrl"
        header-align="center"
        align="center"
        label="活动地址"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="description"
        header-align="center"
        align="center"
        label="活动描述"
      >
      </el-table-column> -->
      <el-table-column
        prop="tip"
        header-align="center"
        align="center"
        label="提示"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="addOrUpdateHandle(scope.row.id)"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="copyHandle(scope.row.id)"
            >复制</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
    ></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from "./calendarevent-add-or-update";
import api from "./api";
export default {
  data() {
    return {
      gameList: [],
      categoryList: [],

      dataForm: {
        gameId: "",
        categoryId: "",
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
    };
  },
  components: {
    AddOrUpdate,
  },
  activated() {
    this.getDataList();
  },
  mounted() {
    this.getGameList();
  },
  methods: {
    getGameList() {
      api.getGameList().then((res) => {
        this.gameList = res.data || [];
      });
    },
    gameChange(val, clear = true) {
      if (clear) {
        this.dataForm.categoryId = null;
      }
      if (val) {
        api.getCategoryList(val).then((res) => {
          this.categoryList = res.data || [];
        });
      }
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/calendar/event/eventPageList"),
        method: "post",
        data: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          ...this.dataForm,
        }),
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },
    // 复制
    copyHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, true);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map((item) => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/calendar/delete"),
          method: "post",
          data: this.$http.adornData(ids, false),
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 100,
              onClose: () => {
                this.getDataList();
              },
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
  },
};
</script>
