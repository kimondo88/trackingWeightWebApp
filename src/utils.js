import axios from "axios";

export async function log(id, weight){
    let current = new Date();
    current = Date.now();
    const {data} = await axios.get(`http://localhost:3000/users/${id}`); 
    const dataTrackDay = data.trackDay || [];
    const putBody = {
        ...data,
        trackDay: [
            ...dataTrackDay,
            {
                [current]: {
                    weight: weight 
                }
            }
        ]
    }

    let checkForDay = dataTrackDay.pop(); 
    let timeToCheck = Object.keys(checkForDay)[0]; 
    if(checkForTheSameDay(timeToCheck)){
        console.log('You already logged somethnig for today');
    }else{
        if( typeof weight === 'number') {
            await axios.put(`http://localhost:3000/users/${id}`, putBody, {
            header: {
                'Content-Type' : 'application/json'
            }
            
        });
        console.log("Succesful Write to JSON"); 
        }else{ return console.log('WTF no number')}
        //console.log(JSON.stringify(putBody));
    }
    

}

function weightObjectToPost(data, time){
    if(data === 'number'){  
    return { "time" : time,
    "weight" : data
    }}
    else{ return null }
}

async function checkForTheSameDay(timeToCheck){
    let time = new Date();
    time = Date.now();
    let bool = time.getDate() === timeToCheck.getDate() 
    && time.getMonth() === timeToCheck.getMonth() 
    && time.getFullYear() === timeToCheck.getFullYear();
    timeToCheck.getDate(); 
    return bool;
}