
//Just testing if git configured to github.
//test Second for ssh key.

let ctx = document.getElementById('monthlyWeight').getContext('2d');
let weightData = [];
let weeklyLabels = ['Pon', 'Wto'] ; 

import {dbg} from './chartdata.js';
import {log} from './utils.js';

function chooseUser(user){
    
}

function trackWeight(){
    
}

let data = dbg(weightChart, weightData, weeklyLabels);
log(1, 108); 

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