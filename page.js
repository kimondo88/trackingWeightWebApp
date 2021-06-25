'use strict'

const { default: axios } = require("axios");

//Just testing if git configured to github.
//test Second for ssh key.

let ctx = document.getElementById('monthlyWeight').getContext('2d');
let weightData;
let weeeklyLabels = ['Pon', 'Wto'] ; 
function chooseUser(user){
    
}

function trackWeight(){
    
}

async function getChartData(id){
    let {data} = await axios.get(`http://localhost:3000/user/${id}`);
        for( item of data.user.trackDay){
            weightData.push(item.weight);
        }
        console.log(data); 
        weightData.forEach((value1, value2, weightData) => {
            weightChart.data.datasets.forEach((dataset) => {
                dataset.data.push(value1);
            });
        });

        weightChart.data.labels = Array.from(weeklyLabels);
        weightChart.update();

}

getChartData(1);

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