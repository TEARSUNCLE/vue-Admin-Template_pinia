<template>
  <div class="big-box">
    <div class="top">
      <div>学员成绩</div>
      <div>点击表格修改或录入</div>
    </div>

    <!-- table -->
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column prop="group" label="学员id" align="center">
      </el-table-column>
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column
        prop="score"
        label="第1次成绩"
        :formatter="formatData"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ row.score[0] || "暂无" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="第2次成绩"
        :formatter="formatData"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ row.score[1] || "暂无" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="第3次成绩"
        :formatter="formatData"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ row.score[2] || "暂无" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="第4次成绩"
        :formatter="formatData"
        width="150"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ row.score[3] || "暂无" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="第5次成绩"
        :formatter="formatData"
        width="150"
        align="center"
      >
        <template slot-scope="{ row }">
          {{ row.score[4] || "暂无" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getScoreListApi } from "@/api/score";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {},
  mounted() {
    this.getScoreList();
  },
  methods: {
    async getScoreList() {
      const res = await getScoreListApi();
      let newArr = [];
      for (const key in res.data) {
        newArr.push(res.data[key]);
      }
      this.tableData = newArr;
    },

    // 处理成绩
    formatData(row) {
      let newRow = (row && row.score) || [];
      let arr = [];
      newRow.forEach((e) => {
        arr.push(e);
      });
      return arr.slice(0, 1);
    },
  },
};
</script>

<style scoped lang="scss">
.big-box {
  padding: 30px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    height: 50px;
    padding: 0 10px;
    margin-bottom: 15px;
    :last-child {
      color: #cdbebe;
    }
  }
}
</style>
