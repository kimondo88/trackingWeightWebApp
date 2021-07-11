//const { default: axios} = require("axios");

import axios from "axios"; 


export async function insertChartData(id){
    const weightData = []; 
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
        let double = 31; 
        // function that check for current month in time
        for(let item = 0; item < track.trackDay.length; item++){
            const timeStamp = Object.keys(track.trackDay[item])[0];
            const readDate = new Date(Number(timeStamp)); 
            //temp check if check func works
            if(getCurrentMonthOfYear(readDate)){
                if((readDate.getDate() - double) > 1 ){
                    let fill = weightData.pop()
                    for(let x = 0; x < (readDate.getDate() - double); x++){
                        weightData.push(fill); 
                        console.log(`double: ${double}, readDate: ${readDate.getDate()}`)
                    }
                    double = readDate.getDate();        
                    let i = track.trackDay[item]; 
                    weightData.push(parseFloat(i[timeStamp].weight));
                }else{
                let i = track.trackDay[item]; 
                weightData.push(parseFloat(i[timeStamp].weight));
                double = readDate.getDate(); 
                }
            }
            console.log(item);
        }
    })

    console.log(weightData + 'weight data');
    
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

