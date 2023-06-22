import React from 'react';
import { Bar, Pie, HorizontalBar } from 'react-chartjs-2';
// import {CanvasJSReact} from ''

const ChartPie: React.FC<{
  name: any;
  chartDataPie?: any;
  chartDataBar?: any;
}> = ({ name, chartDataPie, chartDataBar }) => {
  if (name === 'pie') {
    return (
      <div className="chart" style={{ height: 'auto', paddingBottom: '50px' }}>
        <Pie
          data={chartDataPie.data}
          options={{
            tooltips: {
              callbacks: {
                title: function (tooltipItem, data) {
                  return data['labels'][tooltipItem[0]['index']];
                },
                label: function (tooltipItem, data) {
                  return (
                    ' ' +
                    data['datasets'][0]['data'][tooltipItem['index']] +
                    ' tasks'
                  );
                },
                afterLabel: function (tooltipItem, data) {
                  var dataset =
                    data['datasets'][0]['data'][tooltipItem['index']];
                  var dataset1 = data.datasets[tooltipItem.datasetIndex];
                  var meta = dataset1._meta[Object.keys(dataset1._meta)[0]];
                  var total = meta.total;
                  var percent = Math.round((dataset / total) * 100);
                  return '(' + percent + '%)';
                },
              },
            },
          }}
          redraw
        />
      </div>
    );
  } else if (name === 'bar') {
    return (
      <div className="chart" style={{ height: 'auto', paddingBottom: '50px' }}>
        <Bar
          data={chartDataBar}
          width={chartDataBar.width}
          height={chartDataBar.height}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: { display: false },
            title: {
              display: true,
              text: chartDataBar.title,
            },
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="chart" style={{ height: 'auto', paddingBottom: '50px' }}>
        <HorizontalBar
          data={chartDataBar}
          width={chartDataBar.width}
          height={chartDataBar.height}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: { display: false },
            title: {
              display: true,
              text: '',
            },
          }}
        />
      </div>
    );
  }
};
export default ChartPie;
