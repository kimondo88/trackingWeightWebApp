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
    const readDate = new Date(parseInt(timeToCheck))
    const f = readDate.getDate()
    let temp = readDate.toString();
    const monthSize = checkForDaysInMonth(readDate); 
    temp = temp.slice(0, 3);
    console.log(`debug temp: ${temp}`);
    label1.push(temp);
    let day = dayOfWeek.indexOf( temp );
    // first for loop for getting previous days, then second loop for getting ones after current day.
    let dayToday = day;  
    for(let i = 0; i-1 <= f; i++){
        if(day > 0){
            day -= 1; 
        }else{ day = 6}
        label1.push(dayOfWeek[day]); 
    };
    //reversing lablels array, then creating new arr for proper month tracking
    label1.reverse();
    const label = Array.from(label1);  
    day = dayToday;

    for(let i = f; i < monthSize; i++){
        if(day >= 0 && day < 6){  day += 1; }
        else{ day = 0;}
        label.push(dayOfWeek[day]); 
    }; 
    return label;
};

const checkForDaysInMonth = (timeStamp) => {
    const empty = [];
    const thirty = [3, 5, 8, 9, 10]; 
    const thirtyOne = [0, 2, 4, 6, 7, 11 ];
    const twentyEight = [1];
    if(thirty.findIndex(element => element === timeStamp.getMonth()) != -1){
        console.log(timeStamp.toDateString());
        return 30;  
    }
    else if(thirtyOne.findIndex(element => element === timeStamp.getMonth()) != -1){
        console.log(timeStamp.toDateString()); 
        return 31;
    }else{ return 28}

}


async function sameMonth(compare1, compare2){
    return compare1.getMonth() === compare2.getMonth()
};

export {log, populateLabel}

