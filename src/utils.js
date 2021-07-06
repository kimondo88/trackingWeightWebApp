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
    console.log(timeToCheck); 
    if(! await checkForTheSameDay(timeToCheck)){
        if( typeof weight === 'number') {
            await axios.put(`http://localhost:3000/users/${id}`, putBody, {
            header: {
                'Content-Type' : 'application/json'
            }
            
        });
        console.log("Succesful Write to JSON"); 
        }else{ return console.log('WTF no number')}
        
    }else{
        console.log('You already logged something for today');
        //console.log(JSON.stringify(putBody));
    }
    
}

async function checkForTheSameDay(timeToCheck){
    let time = new Date();
    timeToCheck = new Date(parseInt(timeToCheck));
    console.log(time, ' is time ', timeToCheck);

    let bool = time.getDate() === timeToCheck.getDate() 
    && time.getMonth() === timeToCheck.getMonth() 
    && time.getFullYear() === timeToCheck.getFullYear();
    console.log(bool);
    return bool;
}