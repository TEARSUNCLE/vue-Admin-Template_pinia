<template>
  <div class="big-box">
    <div class="top">
      <div>学员管理</div>
      <el-button @click="dialogStuVisible = true">添加学员</el-button>
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
        <el-table-column prop="id" label="id" align="center"> </el-table-column>
        <el-table-column prop="name" label="姓名" align="center">
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
        </el-table-column>
        <el-table-column prop="group" label="编号" align="center">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="salary"
          label="期望薪资"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="truesalary"
          label="实际薪资"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="province"
          label="籍贯"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="background-color: #0d6efd; color: #fff"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="handleDelStu(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="新增学员" :visible.sync="dialogStuVisible" width="30%">
      <el-form
        :model="addStuInfo"
        :rules="addStuInfoRules"
        ref="addStuInfo"
        label-width="50px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addStuInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addStuInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="组号" prop="group">
          <el-input v-model="addStuInfo.group"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addStuInfo.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addStuInfo.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="薪资" prop="money">
          <el-input
            v-model="addStuInfo.salary"
            placeholder="期望薪资"
            style="width: 135px; margin-right: 20px"
          ></el-input>
          <el-input
            v-model="addStuInfo.truesalary"
            placeholder="实际薪资"
            style="width: 135px"
          ></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="province">
          <el-select
            v-model="addStuInfo.province"
            placeholder="--省"
            style="width: 100px"
          >
            <el-option
              v-for="(item, index) in getProvince"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select
            v-model="addStuInfo.pname"
            placeholder="--市"
            style="width: 100px"
          >
            <el-option
              v-for="(item, index) in getCity"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select
            v-model="addStuInfo.cname"
            placeholder="--县"
            style="width: 100px"
          >
            <el-option
              v-for="(item, index) in getCounty"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddStu">确定添加</el-button>
          <el-button type="info" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getListApi,
  initApi,
  addStudentApi,
  getProvinceApi,
  getCityApi,
  getCountyApi,
  delStudentApi
} from "@/api/table";
export default {
  data() {
    return {
      tableData: [],

      // 新增学员
      addStuInfo: {
        name: "",
        age: "",
        group: "",
        sex: "男",
        phone: "",
        salary: "",
        truesalary: "",
        province: "",
        pname: "",
        cname: "",
      },
      dialogStuVisible: false,

      getProvince: [],
      getCity: [],
      getCounty: [],

      // 新增校验
      addStuInfoRules: {
        name: [{ required: true, trigger: "blur", message: "姓名不能为空" }],
        age: [{ required: true, trigger: "blur", message: "年龄不能为空" }],
        group: [{ required: true, trigger: "blur", message: "小组不能为空" }],
        sex: [{ required: true, trigger: "blur", message: "性别不能为空" }],
        phone: [{ required: true, trigger: "blur", message: "手机号不能为空" }],
        // money: [
        //   {
        //     required: true,
        //     trigger: "blur",
        //     message: "期望薪资和实际薪资不能为空",
        //   },
        // ],
        // province: [
        //   { required: true, trigger: "change", message: "籍贯不能为空" },
        // ],
      },
    };
  },
  created() {},
  mounted() {
    this.getAllStudent();
    this.getProvinceList();
    if (this.addStuInfo.province) {
      this.getCityList();
      this.getCountyList();
    }
  },
  methods: {
    rowStyle({ row }) {},

    headerRowStyle(row, rowIndex) {
      if (row.rowIndex === 0) {
        return "";
      }
    },

    async getAllStudent() {
      const res = await getListApi();
      this.tableData = res.data;
    },

    async getProvinceList() {
      const res = await getProvinceApi();
      this.getProvince = res;
    },
    async getCityList() {
      const res = await getCityApi(this.addStuInfo.province);
      this.getCity = res;
    },
    async getCountyList() {
      const res = await getCountyApi(this.addStuInfo.province);
      this.getCounty = res;
    },

    handleChange() {},

    async handleAddStu() {
      await this.$refs.addStuInfo.validate();
      const res = await addStudentApi(this.addStuInfo);
      console.log(206, res);
    },

   async handleDelStu(id) {
     console.log(251,id);
     try {
       await this.$confirm('您确定要删除吗？')
       await delStudentApi(id)
       this.$message.success('删除成功')
       this.getAllStudent()
     } catch(error) {
       console.log(254,error);
     }
    },

    handleReset() {
      this.addStuInfo = {}
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
