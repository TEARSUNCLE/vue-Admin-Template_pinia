<template>
  <div class="big-box">
    <div class="top">
      <div class="left">
        <div class="card-box">
          <div class="card" style="margin-top: 0px">
            <div>班级人数</div>
            <div>9</div>
          </div>
          <div class="card" style="margin-right: 0px; margin-top: 0px">
            <div>期望薪资</div>
            <div>15195.78</div>
          </div>
          <div class="card">
            <div>平均年龄</div>
            <div>25.11</div>
          </div>
          <div class="card" style="margin-right: 0px">
            <div>男女比例</div>
            <div>0.29</div>
          </div>
        </div>
      </div>
      <div class="right">右边</div>
    </div>

    <div class="main"></div>

    <div class="footer">
      <div class="foot_left"></div>
      <div class="foot_right">2312</div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import china from "echarts/map/json/china.json";
echarts.registerMap("china", china);
require("echarts/map/json/china.json");
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.drawLine();
    this.drawLine2();
    this.mapEcharts();
    this.drawLine3()
  },
  methods: {
    drawLine() {
      var myChart = this.$echarts.init(document.querySelector(".right"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["期望薪资", "实际薪资"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190],
          },
          {
            name: "期望薪资",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390],
          },
          {
            name: "实际薪资",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290],
          },
        ],
      });
    },
    drawLine2() {
      var myChart = this.$echarts.init(document.querySelector(".main"));
      myChart.setOption({
        title: {
          text: "成绩 Score",
        },
        xAxis: {
          type: "category",
          data: ["1组", "2组", "3组", "4组", "5组"],
        },
        yAxis: {
          type: "value",
        },
        legend: {},
        series: [
          {
            name: "平均分",
            data: [40, 44, 54, 70, 73],
            type: "bar",
          },
          {
            name: "低于60分人数",
            data: [70, 49, 84, 95, 64],
            type: "bar",
          },
          {
            name: "60到80分之间",
            data: [88, 90, 92, 66, 64],
            type: "bar",
          },
          {
            name: "高于80分人数",
            data: [88, 80, 68, 78, 77],
            type: "bar",
          },
        ],
      });
    },
    mapEcharts() {
      var myChartContainer = document.querySelector(".foot_left");

      var resizeMyChartContainer = function () {
        myChartContainer.style.width = 55 + "%";
        myChartContainer.style.height = window.innerHeight * 0.7 + "px";
      };
      resizeMyChartContainer();

      var myChartChina = this.$echarts.init(myChartContainer);

      function randomData() {
        return Math.round(Math.random() * 500);
      }

      // 绘制图表
      var optionMap = {
        title: {
          text: "China Map",
        },
        tooltip: {
          trigger: "item",
        },

        //左侧小导航图标
        visualMap: {
          show: false,
          x: "left",
          y: "center",

          //改变地图区域颜色
          splitList: [
            { start: 500, end: 600 },
            { start: 400, end: 500 },
            { start: 300, end: 400 },
            { start: 200, end: 300 },
            { start: 100, end: 200 },
            { start: 0, end: 100 },
          ],

          color: [
            "#ffff00",
            "#0e94eb",
            "#70bcf0",
            "#f0f26c",
            "#00cd00",
            "#eff26f",
          ],
        },

        //配置属性
        series: [
          {
            name: "数据",
            type: "map",
            mapType: "china",
            roam: false,
            label: {
              normal: {
                show: true, //省份名称
              },

              emphasis: {
                show: false,
              },
            },

            data: [
              { name: "北京", value: "100" },
              { name: "天津", value: randomData() },
              { name: "上海", value: randomData() },
              { name: "重庆", value: randomData() },
              { name: "河北", value: randomData() },
              { name: "河南", value: randomData() },
              { name: "云南", value: randomData() },
              { name: "辽宁", value: randomData() },
              { name: "黑龙江", value: randomData() },
              { name: "湖南", value: randomData() },
              { name: "安徽", value: randomData() },
              { name: "山东", value: randomData() },
              { name: "新疆", value: randomData() },
              { name: "江苏", value: randomData() },
              { name: "浙江", value: randomData() },
              { name: "江西", value: randomData() },
              { name: "湖北", value: randomData() },
              { name: "广西", value: randomData() },
              { name: "甘肃", value: randomData() },
              { name: "山西", value: randomData() },
              { name: "内蒙古", value: randomData() },
              { name: "陕西", value: randomData() },
              { name: "吉林", value: randomData() },
              { name: "福建", value: randomData() },
              { name: "贵州", value: randomData() },
              { name: "广东", value: randomData() },
              { name: "青海", value: randomData() },
              { name: "西藏", value: randomData() },
              { name: "四川", value: randomData() },
              { name: "宁夏", value: randomData() },
              { name: "海南", value: randomData() },
              { name: "台湾", value: randomData() },
              { name: "香港", value: randomData() },
              { name: "澳门", value: randomData() },
            ],
          },
        ],
      };

      myChartChina.setOption(optionMap);

      window.onresize = function () {
        resizeMyChartContainer();
        myChartChina.resize();
      };
    },
    drawLine3() {
      var myChart = this.$echarts.init(document.querySelector(".foot_right"));
      myChart.setOption({
        title: {
          text: "各地区学员分布",
        },
        // legend: {
        //   top: "bottom",
        // },
        toolbox: {},
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "甘肃省" },
              { value: 38, name: "云南省" },
              { value: 32, name: "河南省" },
              { value: 30, name: "湖南省" },
              { value: 28, name: "广西壮族自治区" },
              { value: 26, name: "山东省" },
              { value: 22, name: "西藏自治区" },
              { value: 18, name: "黑龙江省" },
              { value: 18, name: "内蒙古自治区" },
              { value: 18, name: "新疆维吾尔自治区" },
              { value: 18, name: "江苏省" },
              { value: 18, name: "广东省" },
              { value: 18, name: "河北省" },
              { value: 18, name: "安徽省" },
            ],
          },
        ],
      });
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
    .left {
      width: 300px;
      .card-box {
        display: flex;
        // justify-content: space-around;
        flex-wrap: wrap;
        width: 300px;
        .card {
          width: 140px;
          height: 150px;
          background-color: #fff;
          border-radius: 5px;
          margin-right: 20px;
          margin-top: 20px;
          padding: 20px;
          :first-child {
            color: grey;
          }
          :last-child {
            font-size: 20px;
            margin-top: 20px;
          }
        }
      }
    }
    .right {
      flex: 1;
      background-color: #fff;
      margin-left: 20px;
      text-align: center;
      padding: 20px 0;
    }
  }
  .main {
    width: 100%;
    background-color: #fff;
    margin-top: 30px;
    height: 500px;
    padding: 30px 10px 0 10px;
  }
  .footer {
    width: 100%;
    height: 650px;
    margin-top: 30px;
    padding: 30px 10px 0 10px;

    display: flex;
    justify-content: space-between;
    background-color: #fff;

    .foot_left {
    }
    .foot_right {
      flex: 1;
    }
  }
}
</style>
