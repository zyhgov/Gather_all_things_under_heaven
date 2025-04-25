        // 初始化ECharts图表
        const chartDom = document.getElementById('chart');
        const myChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['2020', '2021', '2022', '2023'],
                axisLine: {
                    lineStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#000'
                    }
                }
            },
            series: [{
                data: [120, 200, 150, 80],
                type: 'bar',
                itemStyle: {
                    color: '#333',
                    borderRadius: [4, 4, 0, 0]
                }
            }],
            grid: {
                containLabel: true,
                left: '3%',
                right: '3%',
                bottom: '3%'
            }
        };

        myChart.setOption(option);

        // 响应窗口变化
        window.addEventListener('resize', () => {
            myChart.resize();
        });