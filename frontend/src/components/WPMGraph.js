import ApexCharts from 'apexcharts'
import Chart from 'react-apexcharts';
import React from 'react';


function WPMGraph( {wpmArr, timeArr} ) {
    const splash = getComputedStyle(document.documentElement).getPropertyValue('--splash');
    const lightest = getComputedStyle(document.documentElement).getPropertyValue('--lightest');

    // var options = {
    //     chart: {
    //         type: 'area'
    //     },
    //     stroke: {
    //             curve: 'smooth'
    //     },
    //     dataLabels: {
    //             enabled: false
    //     },
    //     series: [{
    //         name: 'sales',
    //         data: [0,4,0,0,0,0,0,0,14]
    //     }],
    //     xaxis: {
    //         categories: ["12/22",undefined,1993,undefined,1995,undefined,1997, undefined, 1999],
    //         labels: {
    //             styles: {
    //                 colors: lightest
    //             }
    //         }
    //     },
    //     colors: [splash]
    // }

    var options = {
        chart: {
          type: 'area'
        },
        stroke: {
                curve: 'smooth'
        },
        dataLabels: {
                enabled: false
        },
        series: [{
          name: 'wpm',
          data: wpmArr
        }],
        xaxis: {
          categories: timeArr,
          labels: {
            style: {
              colors: lightest
            }
          }
        },
        yaxis: {
            labels: {
                style: {
                  colors: lightest
                }
              },
            min: 0,
            forceNiceScale: true,
        },
        colors: [splash],
      }
            
    return (
        <div className="wpm-graph-section">
            <div className="wpm-graph-content">
                <Chart 
                className="wpm-graph-content"
                options={options} 
                series={options.series} 
                type="area" 
                    />
            </div>
        </div>
    )
}

export default WPMGraph