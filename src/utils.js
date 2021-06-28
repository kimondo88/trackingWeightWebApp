import axios from "axios";

export async function log(data, id){
    const current = new Date();
    let weight = await axios.post(`http://localhost:3000/users/${id}/trackDay`, 
    weightObjectToPost(data, current)).then( console.log('Succesful write'));
}

function weightObjectToPost(data, time){
    if(data === 'number'){  
    return { "time" : time,
    "weight" : data
    }}
    else{ return null }
}