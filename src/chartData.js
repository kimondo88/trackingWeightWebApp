//const { default: axios} = require("axios");

import axios from "axios"; 


export async function insertChartData(id){
    let weightData = []; 
    await axios.get(`http://localhost:3000/users/${id}`)
    .then( response =>{
        return response })
    .then( data => {
        //let insert = Array.from(data.data); 
        //console.log(insert[0])
        //console.log(genWeight(insert).next().value); 
        //let t = insert[0];
        const track = data.data; 
        console.log(track.trackDay); 
        // function that check for current month in time
        for(let item = 0; item < track.trackDay.length; item++){
            const timeStamp = Object.keys(track.trackDay[item])[0];
            if(getCurrentMonthOfYear(new Date(Number(timeStamp)))){
                let i = track.trackDay[item]; 
                weightData.push(parseFloat(i[timeStamp].weight));
            }
            console.log(item);
        }
    })

    console.log(weightData);
    return weightData; 
};

function isToday(timeStamp){
    const today = new Date();
    return (
        timeStamp.getDate() === today.getDate() && 
        timeStamp.getMonth() === today.getMonth() &&
        timeStamp.getYear() === today.getYear()
    )
};

function getCurrentMonthOfYear(timeStamp){
    const today = new Date();
    return (
        timeStamp.getMonth() === today.getMonth() && 
        timeStamp.getYear() === today.getYear()
    )
}



//console.log(data)

function* genWeight(array){
    var i = 0; 
    while(true){
        return yield array[i++];
    }
}

