<template>
  <div class="big-box">
    <div class="top">
      <div>学员管理</div>
      <el-button>添加学员</el-button>
    </div>

    <!-- 表格 -->
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        stripe
        :row-style="rowStyle"
        :header-row-style="headerRowStyle"
      >
        <el-table-column prop="id" label="id" align="center">
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="group" label="编号" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="150" align="center">
        </el-table-column>
        <el-table-column prop="salary" label="期望薪资" width="150" align="center">
        </el-table-column>
        <el-table-column prop="truesalary" label="实际薪资" width="150" align="center">
        </el-table-column>
        <el-table-column prop="province" label="籍贯" width="200" align="center">
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" style="background-color:#0d6efd;color:#fff">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getListApi, initApi } from '@/api/table';
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
  },
  mounted() {
    this.getAllStudent()
  },
  methods: {
    rowStyle({ row }) {},

    headerRowStyle(row, rowIndex) {
      if (row.rowIndex === 0) {
        return "";
      }
    },

    async getAllStudent() {
      const res = await getListApi()
      this.tableData = res.data
    }
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
      color: #fff;
      background-color: #0d6efd;
    }
  }
}
</style>
