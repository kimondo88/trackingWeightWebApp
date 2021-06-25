const { default: axios} = require("axios");

let data; 

( () => {


async function getChartData(id){
    let {data} = await axios.get(`http://localhost:3000/users/${id}`);
    return data; 
}

data = getChartData(1);

})

async function updateChart(data){
    for( item of data.trackDay){
        weightData.push(item.weight);
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