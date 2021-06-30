//const { default: axios} = require("axios");

import axios from "axios"; 

export function dbg(weightChart, weightData, weeklyLabels){

let data; 

async function insertChartData(id){
    let data = await axios.get(`http://localhost:3000/users/${id}`)
    .then( response =>{
        return response })
    .then( data => {
        //let insert = Array.from(data.data); 
        //console.log(insert[0])
        //console.log(genWeight(insert).next().value); 
        //let t = insert[0];
        let track = JSON.parse(JSON.stringify(data)); 
        console.log(track.data.trackDay); 
        let w = track.data.trackDay[0]; 
        weightData.push(parseFloat(w.weight));
        return data;
    })
    console.log(weightData);
    return data; 
    
}

data = insertChartData(1);

async function updateChart(data){
    console.log(data);
    let temp = 
    console.log(temp);
    for( const item in temp){
        ;
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
console.log(data)
//updateChart(data); 

return data;

}

function* genWeight(array){
    var i = 0; 
    while(true){
        return yield array[i++];
    }
}

