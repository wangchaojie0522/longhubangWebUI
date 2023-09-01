<template>
    <div class="LineBox"  v-onResize:300="onResize" >
    
        <div id="kinfo"  style="height: 100%" ></div>
    
        
    </div>
</template>
<script lang="ts">

import { defineComponent, onMounted, PropType } from 'vue';
import * as echarts from 'echarts';
import type { EChartsType } from 'echarts'
export default defineComponent({
    components: {

    },
    props: {
       
    },
    setup(props) {
      
        let myChart: EChartsType;
        let canDom: HTMLCanvasElement;
        const upColor = '#ec0000';
        const upBorderColor = '#8A0000';
        const downColor = '#00da3c';
        const downBorderColor = '#008F28';
       
        const onResize = () => {
            setTimeout(()=>{
                myChart.resize()
            }, 100)
           
        }
        const calculateMA = (dayCount:number, KInfoData:(number|string)[][]) => {
            var result = [];
            for (var i = 0, len = KInfoData.length; i < len; i++) {
                if (i < dayCount) {
                result.push('-');
                continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                sum += +KInfoData[i - j][1];
                }
                result.push(sum / dayCount);
            }
            console.log(result)
            return result;
        }
        // 图表显示
        const echartShow = (kType:string,nameStr:string, KInfoData:(number|string)[][]) => {
            console.log(KInfoData)
            let legData = ['MA5', 'MA10', 'MA20']
            legData.unshift(kType)
            let option = {
                dataset: {
                    source: KInfoData
                },
                title: {
                    text: nameStr
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'line'
                    }
                },
                legend: {
                    data: legData
                },
                toolbox: {
                    feature: {
                    dataZoom: {
                        yAxisIndex: false
                    }
                    }
                },
                grid: [
                    {
                    left: '10%',
                    right: '10%',
                    bottom: 200
                    },
                    {
                    left: '10%',
                    right: '10%',
                    height: 80,
                    bottom: 80
                    }
                ],
                xAxis: [
                    {
                    type: 'category',
                    boundaryGap: false,
                    data: KInfoData.map(function (item) {
                        return item[0];
                    }),
                    // inverse: true,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: 'dataMin',
                    max: 'dataMax'
                    },
                    {
                    type: 'category',
                    gridIndex: 1,
                    data: KInfoData.map(function (item) {
                        return item[0];
                    }),
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    axisLabel: { show: false },
                    min: 'dataMin',
                    max: 'dataMax'
                    }
                ],
                yAxis: [
                    {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                    },
                    {
                    scale: true,
                    gridIndex: 1,
                    splitNumber: 2,
                    axisLabel: { show: false },
                    axisLine: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false }
                    }
                ],
                dataZoom: [
                    {
                    type: 'inside',
                    xAxisIndex: [0, 1],
                    start: 10,
                    end: 100
                    },
                    {
                    show: true,
                    xAxisIndex: [0, 1],
                    type: 'slider',
                    bottom: 10,
                    start: 10,
                    end: 100
                    }
                ],
                visualMap: {
                    show: false,
                    seriesIndex: 1,
                    dimension: 6,
                    pieces: [
                    {
                        value: 1,
                        color: upColor
                    },
                    {
                        value: -1,
                        color: downColor
                    }
                    ]
                },
                series: [
                    {
                        name:kType,
                        type: 'candlestick',
                        itemStyle: {
                            color: upColor,
                            color0: downColor,
                            borderColor: upBorderColor,
                            borderColor0: downBorderColor
                        },
                        encode: {
                            x: 0,
                            y: [1, 4, 3, 2]
                        }
                    },
                    {
                    name: 'Volumn',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        color: '#7fbe9e'
                    },
                    large: true,
                    encode: {
                        x: 0,
                        y: 5
                    }
                    },
                    {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5,KInfoData),
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    }
                    },
                    {
                    name: 'MA10',
                    type: 'line',
                    data: calculateMA(10,KInfoData),
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    }
                    },
                    {
                    name: 'MA20',
                    type: 'line',
                    data: calculateMA(20,KInfoData),
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    }
                    },
                ]
                }
            myChart.on('click', function() { //添加点击事件
                // console.log(param.data );
            });
            // 绘制图表
            myChart.setOption(option);
        }
        const onChange = (kType:string,nameStr:string,KInfoData:(number|string)[][]) => {
            myChart.clear()
            echartShow(kType,nameStr,KInfoData)
        }
        onMounted(()=>{
            canDom = document.getElementById('kinfo') as HTMLCanvasElement
            if(canDom) {
                myChart = echarts.init(canDom);
            }
          
        })
        return {
            echartShow,
            onChange,
            onResize,
            calculateMA,
        }
    }
})
</script>

<style lang="scss" scoped>
.LineBox {
    height: 100%
}
</style>