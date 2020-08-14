<template>
  <div class="charts-demo">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="num-pad bak-info">
          <div class="item-title">100</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="num-pad bak-info">
          <div class="item-title">100</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="num-pad bak-info">
          <div class="item-title">100</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="num-pad bak-info">
          <div class="item-title">100</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
        <div ref="pieDemo" class="demo-item"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6">
        <div ref="barDemo" class="demo-item"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  Row,
  Col
} from 'element-ui'
import echarts from 'echarts'
export default {
  name: 'ChartsDemo',
  components: {
    'el-row': Row,
    'el-col': Col
  },
  data: function () {
    return {
      soldData: [
        {
          name: '衬衫',
          value: 5
        },
        {
          name: '羊毛衫',
          value: 20
        },
        {
          name: '雪纺衫',
          value: 36
        },
        {
          name: '裤子',
          value: 10
        },
        {
          name: '高跟鞋',
          value: 10
        },
        {
          name: '袜子',
          value: 20
        }
      ],
      costData: [
        {
          name: '衬衫',
          value: 5
        },
        {
          name: '羊毛衫',
          value: 20
        },
        {
          name: '雪纺衫',
          value: 36
        },
        {
          name: '裤子',
          value: 10
        },
        {
          name: '高跟鞋',
          value: 10
        },
        {
          name: '袜子',
          value: 20
        }
      ]
    }
  },
  mounted: function () {
    this.initBar()
    this.initPie()
  },
  methods: {
    initPie: function () {
      const vm = this
      var myChart = echarts.init(vm.$refs.pieDemo)
      myChart.setOption({
        title: {
          text: '饼状图demo'
        },
        tooltip: {},
        series: [{
          name: '销量',
          type: 'pie',
          data: vm.soldData
        }]
      })
    },
    initBar: function () {
      const vm = this
      var myChart = echarts.init(vm.$refs.barDemo)
      myChart.setOption({
        title: {
          text: '柱状图demo'
        },
        tooltip: {},
        xAxis: {
          data: vm.soldData.map(item => item.name)
        },
        yAxis: {},
        legend: {
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 20,
          bottom: 20,
          data: ['销量', '成本']
        },
        series: [{
          name: '销量',
          type: 'bar',
          data: vm.soldData.map(item => item.value)
        }, {
          name: '成本',
          type: 'bar',
          data: vm.costData.map(item => item.value)
        }]
      })
    }
  }
}
</script>

<style scoped>
  .charts-demo {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 1em;
  }

  .demo-item {
    width: 100%;
    height: 300px;
  }
  .num-pad {
    width: 100%;
    height: 100px;
    border-radius: 10px;
    color: white;
    font-weight: bold;
  }
  .num-pad:after {
    content: '';
    height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
  .item-title {
    display: inline-block;
    vertical-align: middle;
    font-size: 1.5em;
  }

  .bak-info {
    background: #909399;
  }
  .bak-success {
    background: #67C23A;
  }
  .bak-warning {
    background: #E6A23C;
  }
  .bak-error {
    background: #F56C6C;
  }
</style>
