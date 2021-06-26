//const { default: axios} = require("axios");

import axios from "axios"; 

export function dbg(weightChart, weightData, weeklyLabels){

let data; 

async function getChartData(id){
    let data = await axios.get(`http://localhost:3000/users/${id}`).then((response) =>{
        console.log(response.data);
        return response.data;
    });
    return data; 
}

data = getChartData(1);

async function updateChart(data, weightChart, weightData, weeklyLabels){
    console.log(data);
    console.log(data.users[0]);
    for( const item in data.trackDay){
        weightData.push(parseFloat(item.weight));
    }
    console.log(data); 
    weightData.forEach((value1, weightData) => {
        weightChart.data.datasets.forEach((dataset) => {
            dataset.data.push(value1);
        });
    });

    weightChart.data.labels = Array.from(weeklyLabels);
    weightChart.update();

}

updateChart(data); 

}

