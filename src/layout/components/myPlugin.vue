<template>
    <div class="box">
      <div class="search">
        <el-input placeholder="Search..."/>
        <el-button class="btn">Search</el-button>
    </div>
        <el-button class="last-child">点我初始化数据</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="scss">
.box {
  width: 800px;
  margin-right: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .search {
    display: flex;
    align-items: center;
    .btn {
      background-color: #0d6efd;
      color: #fff;
      border-left: 0;
    }
  }
  .last-child {
    background-color: #0d6efd;
    color: #fff;
    border: 0;
    height: 30px;
    line-height: 8px;
  }
}

::v-deep .el-input__inner {
  background-color: #f1f1f1;
  border: 0;
  width: 200px;
}
</style>
