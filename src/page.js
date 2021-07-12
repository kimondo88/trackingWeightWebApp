
//Just testing if git configured to github.
//test Second for ssh key.

const ctx = document.getElementById('monthlyWeight').getContext('2d');
let weeklyLabels = ['Pon', 'Wto', 'Sro', 'Czw', 'Pia', 'Sob', 'Nie'] ; 
const weight = document.getElementById("weightId"); 

const button = document.getElementById("addWeightButton"); 
button.addEventListener("click", function(){
    addWeight()
}); 

import {insertChartData} from './chartdata';
import {log, populateLabel} from './utils';

async function updateChart(id, weightData){

    weightChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });

    console.log('pushing value x ' + weightData.length + ' ' + weightData); 

    for(let i = 0; i <= weightData.length ; i++){
            weightChart.data.datasets.forEach( (dataset) =>{
                dataset.data.push(weightData[i]); 
            })
            console.log('pushing value' + weightData[i]); 
        
    }

    weightChart.data.labels = Array.from(await populateLabel(id));
    weightChart.update();

} 

var weightChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: '# of Kilo',
            data: [],
            borderColor: [
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


async function just(){

    let weightData = await insertChartData(1); 
    
    console.log(weightData + 'weight dataArr');
    updateChart(1, weightData); 
    
}

async function addWeight(){
    let newWeight = parseFloat(weight.value);
    if(newWeight === 'undefinied'){
        console.log('Not provided weight: undefinied'); 
    }else{
        log(1, newWeight); 
    }
}

just();