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
          prop="province,city,county"
          label="籍贯"
          width="200"
          align="center"
        >
        <template slot-scope="{ row }">
          {{ row.province }}{{ row.city }}{{ row.county }}
        </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right" align="center">
          <template slot-scope="{ row }">
            <el-button
              size="mini"
              style="background-color: #0d6efd; color: #fff"
              @click="handleShow(row.id)"
              >编辑</el-button
            >
            <el-button size="mini" type="danger" @click="handleDelStu(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="id ? '编辑学员' : '新增学员'"
      :visible.sync="dialogStuVisible"
      width="30%"
      @close="handleClose"
    >
      <el-form
        :model="addStuInfo"
        :rules="addStuInfoRules"
        ref="addStuInfo"
        label-width="50px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model.trim="addStuInfo.name"
            minlength="2"
            maxlength="10"
            placeholder="姓名2~10位"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="addStuInfo.age"></el-input>
        </el-form-item>
        <el-form-item label="组号" prop="group">
          <el-input v-model.number="addStuInfo.group"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="addStuInfo.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input
            v-model.number="addStuInfo.phone"
            placeholder="手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="薪资" prop="money">
          <el-input
            v-model.number="addStuInfo.money.salary"
            placeholder="期望薪资"
            style="width: 135px; margin-right: 20px"
            min="100"
            max="99999"
          ></el-input>
          <el-input
            v-model.number="addStuInfo.money.truesalary"
            placeholder="实际薪资"
            style="width: 135px"
            min="100"
            max="99999"
            validate-event
          ></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="province">
          <el-select
            v-model="addStuInfo.pname"
            placeholder="--省"
            style="width: 90px; margin-right: 10px"
            @change="chooseProvince"
          >
            <el-option
              v-for="(item, index) in provinceList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select
            v-model="addStuInfo.cname"
            placeholder="--市"
            style="width: 90px; margin-right: 10px"
            @change="chooseCity"
          >
            <el-option
              v-for="(item, index) in cityList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
          <el-select
            v-model="addStuInfo.Xian"
            placeholder="--县"
            style="width: 90px"
            @change="chooseCounty"
          >
            <el-option
              v-for="(item, index) in countyList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddStu">{{ id ? '修改' : '确定添加' }}</el-button>
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
  delStudentApi,
  getOneStudentApi,
  updateStudentApi,
} from "@/api/table";
export default {
  data() {
    // 自定义函数校验薪资
    const valTowValue = (rule, val, cb) => {
      if (val.salary === "" || val.truesalary === "") {
        cb(new Error("期望薪资和实际薪资不能为空"));
      } else if (
        val.salary < 100 ||
        val.salary > 99999 ||
        val.truesalary < 100 ||
        val.truesalary > 99999
      ) {
        cb(new Error("期望薪资和实际薪资100~99999"));
      } else {
        cb();
      }
    };
    return {
      tableData: [],

      // 新增学员
      addStuInfo: {
        name: "",
        age: "",
        group: "",
        sex: "男",
        phone: "",
        money: {
          salary: "",
          truesalary: "",
        },

        pname: "", // 省
        cname: "", // 市
        Xian: "", // 县
      },
      provinceList: [],
      cityList: [],
      countyList: [],
      dialogStuVisible: false,

      id: "",

      // 新增校验
      addStuInfoRules: {
        name: [
          { required: true, trigger: "blur", message: "姓名不能为空" },
          { min: 2, max: 10, trigger: "blur", message: "姓名,2~10位" },
        ],
        age: [
          { required: true, trigger: "blur", message: "年龄不能为空" },
          { pattern: /^\d{2}$/, trigger: "blur", message: "年龄，两位数字" },
        ],
        group: [
          { required: true, trigger: "blur", message: "小组不能为空" },
          { pattern: /^\d{1,2}$/, trigger: "blur", message: "组号，1~2位数字" },
        ],
        sex: [{ required: true, trigger: "blur", message: "性别不能为空" }],
        phone: [
          { required: true, trigger: "blur", message: "手机号不能为空" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            trigger: "blur",
            message: "请输入正确的手机号",
          },
        ],
        money: [
          {
            required: true,
            validator: valTowValue,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.getAllStudent();
    this.getProvinceList();
  },
  watch: {},

  methods: {
    rowStyle({ row }) {},

    headerRowStyle(row, rowIndex) {
      if (row.rowIndex === 0) {
        return "";
      }
    },

    chooseProvince(value) {
      if (value) {
        this.addStuInfo.pname = value;
        this.getCityList();
      }
    },

    chooseCity(value) {
      if (value) {
        this.addStuInfo.cname = value;
        this.getCountyList();
      }
    },

    chooseCounty(val) {},

    async getAllStudent() {
      const res = await getListApi();
      this.tableData = res.data;
    },

    async getProvinceList() {
      const res = await getProvinceApi();
      this.provinceList = res;
    },
    async getCityList() {
      const res = await getCityApi(this.addStuInfo.pname);
      this.cityList = res;
    },
    async getCountyList() {
      const res = await getCountyApi(
        this.addStuInfo.pname,
        this.addStuInfo.cname
      );
      this.countyList = res;
    },

    handleClose() {
      this.addStuInfo = {};
      this.addStuInfo.money = {};
      this.id = "";
    },

    async handleAddStu() {
      if (
        !this.addStuInfo.pname ||
        !this.addStuInfo.cname ||
        !this.addStuInfo.Xian
      ) {
        return this.$message.error("籍贯不能为空");
      }
      await this.$refs.addStuInfo.validate();
      // 收集数据 传到后台
      const numAge = Number(this.addStuInfo.age);
      const formData = {
        id: this.id,
        name: this.addStuInfo.name,
        sex: this.addStuInfo.sex,
        age: numAge,
        group: this.addStuInfo.group,
        phone: this.addStuInfo.phone,
        salary: this.addStuInfo.money.salary,
        truesalary: this.addStuInfo.money.truesalary,
        province: this.addStuInfo.pname,
        city: this.addStuInfo.cname,
        county: this.addStuInfo.Xian,
      };
      if (this.id) {
        // 编辑
        const res = await updateStudentApi(formData);
        this.$message.success("修改成功");
      } else {
        // 新增
        const res = await addStudentApi(formData);
        this.$message.success("添加成功");
      }
      this.getAllStudent();
      this.dialogStuVisible = false;
    },

    async handleDelStu(id) {
      const strId = id + "";
      try {
        await this.$confirm("您确定要删除吗？");
        await delStudentApi(strId);
        this.$message.success("删除成功");
        this.getAllStudent();
      } catch (error) {
        console.log(254, error);
      }
    },

    // 编辑 数据回显
    async handleShow(id) {
      this.id = id;
      const res = await getOneStudentApi(id);
      const handleRes = res.data;
      // const handleRes = res.data.forEach(item => ({
      //   name:item.name,
      //   sex:item.sex,
      //   age:item.age,
      //   group:item.group,
      //   phone:item.phone,
      //   salary:item.salary,
      //   truesalary:item.truesalary,
      //   pname:item.province,
      //   cname:item.city,
      //   Xian:item.county
      // }))

      // this.addStuInfo = handleRes
      this.addStuInfo.name = handleRes.name;
      this.addStuInfo.sex = handleRes.sex;
      this.addStuInfo.age = handleRes.age;
      this.addStuInfo.group = handleRes.group;
      this.addStuInfo.phone = handleRes.phone;
      this.addStuInfo.money.salary = handleRes.salary;
      this.addStuInfo.money.truesalary = handleRes.truesalary;
      this.addStuInfo.pname = handleRes.province;
      this.addStuInfo.cname = handleRes.city;
      this.addStuInfo.Xian = handleRes.county;
      this.dialogStuVisible = true;
    },

    handleReset() {
      this.addStuInfo = {};
      this.cityList = [];
      this.countyList = [];
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
      color: #fff;
      background-color: #0d6efd;
    }
  }
}
</style>
