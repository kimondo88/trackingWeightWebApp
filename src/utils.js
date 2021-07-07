import axios from "axios";

async function log(id, weight){
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

async function populateLabel(id){
    const label1 = [];
    const dayOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; 
    const {data} = await axios.get(`http://localhost:3000/users/${id}`); 
    const dataTrackDay = data.trackDay || [];
    let checkForDay = dataTrackDay.pop(); 
    let timeToCheck = Object.keys(checkForDay)[0];
    const f = new Date(parseInt(timeToCheck)).getDate()
    timeToCheck = new Date(parseInt(timeToCheck))
    let temp = timeToCheck.toString();
    temp = temp.slice(0, 2);
    label1.push(temp);
    let day = dayOfWeek.indexOf( item => item === temp );
    let dayToday = day;  
    for(let i = 1; i <= f; i++){
        if(day > 0){
            day -= 1; 
        }else if(day === 0){ 
        }else{ day = 6}
        label1.push(dayOfWeek[day]); 
    };

    label1.reverse();
    const label = Array.from(label1);  
    day = dayToday;

    for(let i = f; i <= 30; i++){
        if(day >= 0 && day < 6){  day += 1; }
        else{ day = 0;}
        label.push(dayOfWeek[day]); 
    }; 
    return label;
};

async function sameMonth(compare1, compare2){
    return compare1.getMonth() === compare2.getMonth()
};

export {log, populateLabel}