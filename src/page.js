
//Just testing if git configured to github.
//test Second for ssh key.

let ctx = document.getElementById('monthlyWeight').getContext('2d');
let weeklyLabels = ['Pon', 'Wto'] ; 

import {insertChartData} from './chartdata';
import {log} from './utils';

function chooseUser(user){
    
}

function trackWeight(){
    
}

async function updateChart(){

    weightChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    console.log('pushing value x ' + weightData.length); 

    for(let i = 0; i <= weightData.length ; i++){
        for(let x = 0; x <= weightChart.data.datasets.length; x++){
            let temp = weightChart.data.datasets[x]
            temp.data.push(weightData[i]);
            console.log('pushing value' + weightData[i]); 
        }
           
    }

    weightChart.data.labels = Array.from(weeklyLabels);
    weightChart.update();

}

//log(1, 107); 

var weightChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '# of Kilo',
            data: [],
            backgroundColor: [
                'rgba(238, 184, 104, 1)',
                'rgba(75, 166, 223, 1)',
                'rgba(239, 118, 122, 1)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

const weightData = Array.from(insertChartData(1));
updateChart(); 