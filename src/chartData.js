//const { default: axios} = require("axios");

import axios from "axios"; 
import { checkForDaysInMonth } from "./utils";

export async function insertChartData(id){
    const weightData = []; 
    await axios.get(`http://localhost:3000/users/${id}`)
    .then( response =>{
        return response })
    .then( data => {
        const track = data.data; 
        console.log(track.trackDay);
        let double = -300;
        let showOnlyThisDays = 30;  
        // function that check for current month in time
        const lastItem = track.trackDay.length;
        if (lastItem < 30){
            showOnlyThisDays = lastItem;
        }else{ showOnlyThisDays = 30 }
        for(let item = lastItem; item > lastItem-showOnlyThisDays; item--){
            const timeStamp = Object.keys(track.trackDay[item-1])[0];
            const readDate = new Date(Number(timeStamp));
            let repeatDoubleLoop;
            let bool = false; 
            if(readDate.getDate() > double){
                repeatDoubleLoop = double + (-(checkForDaysInMonth(readDate)-readDate.getDate()));
                bool = true;  
            }else{
                repeatDoubleLoop = double - readDate.getDate();
                bool = false;
            }
            //temp check if check func works
            if((double - readDate.getDate() ) > 1 || bool === true){
                let fill = weightData.pop()
                for(let x = 0; x < repeatDoubleLoop; x++){
                    weightData.push(fill); 
                    console.log(`double: ${double}, readDate: ${readDate.getDate()}, ${repeatDoubleLoop}`)
                }
                double = readDate.getDate();        
                let i = track.trackDay[item-1]; 
                weightData.push(parseFloat(i[timeStamp].weight));
            }else{
            let i = track.trackDay[item-1]; 
            weightData.push(parseFloat(i[timeStamp].weight));
            double = readDate.getDate();
            console.log(`double is for a day ${double}`); 
            }
            
            console.log(item);
        }
    })

    console.log(weightData + 'weight data');
    
    return weightData.reverse(); 
};

function isToday(timeStamp){
    const today = new Date();
    return (
        timeStamp.getDate() === today.getDate() && 
        timeStamp.getMonth() === today.getMonth() &&
        timeStamp.getYear() === today.getYear()
    )
};

function compareCurrentMonthOfYear(timeStamp, double ){
    return (
        timeStamp.getMonth() === double.getMonth() && 
        timeStamp.getYear() === double.getYear()
    )
}

function* genWeight(array){
    var i = 0; 
    while(true){
        return yield array[i++];
    }
}


