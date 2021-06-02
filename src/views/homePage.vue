<template>
  <div>
    <span>总订单:{{todayOrder}}</span>
    <span>总销售额:{{totalAmount}}</span>
    <span>今日订单数:{{totalOrder}}</span>
    <span>今日销售额:{{totayAmount}}</span>
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { API_ADD_totaldata } from "@/api/api";
export default {
  data() {
    return {
        data1:'',
        data2:'',
        todayOrder:'',
        totalAmount:'',
        totalOrder:'',
        totayAmount:'',
    };
  },
  // 所有节点加载完毕完毕
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    API_ADD_totaldata().then((res)=>{
        console.log(res.data);
        this.data1=res.data.amountData
        this.data2=res.data.orderData
        this.todayOrder=res.data.todayOrder
        this.totalAmount=res.data.totalAmount
        this.totalOrder=res.data.totalOrder
        this.totayAmount=res.data.totayAmount
            var option = {
      title: {
        text: "折线图堆叠"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["订单数据", "金额数据"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单数据",
          type: "line",
          stack: "总量",
          data: this.data1
        },
        {
          name: "金额数据",
          type: "line",
          stack: "总量",
          data: this.data2
        },
      ]
    };
     // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
        
    })
  }
};
</script>

<style lang="less" scoped>
</style>