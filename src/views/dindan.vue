<template>
  <div>
    <el-date-picker
      v-model="value1"
      type="datetimerange"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :default-time="['12:00:00']"
      format="yyyy-MM-dd HH:mm:ss"
      value-format="yyyy-MM-dd HH:mm:ss"
    ></el-date-picker>
    <el-button type="button" @click="cx">查询</el-button>

    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { API_ADD_ordertotal } from "@/api/api";
import moment from "moment";
export default {
  data() {
    return {
      value1: "",
      orderTime: [],
      orderAmount: []
    };
  },
  methods: {
    cx() {
      console.log(JSON.stringify(this.value1));
    this.tan();
    },
    tan() {
      var myChart = echarts.init(document.getElementById("main"));
      API_ADD_ordertotal(JSON.stringify(this.value1)).then(res => {
        this.orderTime = res.data.data.map(item => {
          return  moment(item.orderTime).format("YYYY-MM-DD");
        });
        this.orderAmount = res.data.data.map(item => {
          return item.orderAmount;
        });
        // orderTime: "2020-06-04T09:30:09.000Z", orderAmount: 19.88
        var option = {
        xAxis: {
          type: "category",
          data: this.orderTime //订单时间
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: this.orderAmount, //订单金额
            type: "bar"
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      });
    }
  },
  mounted() {
    this.tan();
  }
};
</script>

<style lang="less" scoped>
</style>