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

    console.log(JSON.stringify(putBody));

    await axios.put(`http://localhost:3000/users/${id}`, putBody, {
        header: {
            'Content-Type' : 'application/json'
        }
    }).then(console.log("Succesful Write to JSON"))

    
}

function weightObjectToPost(data, time){
    if(data === 'number'){  
    return { "time" : time,
    "weight" : data
    }}
    else{ return null }
}