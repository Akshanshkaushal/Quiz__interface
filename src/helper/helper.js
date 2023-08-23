import axios from "axios";


export function attempts_Number(result){
    return result.filter(r => r !== undefined).length;
}

export function positivePoints_Number(result, answers, points){
    return result.map((element,i) => answers[i] === element).filter(i => i).map(i => points).reduce((prev, curr) => prev + curr, 0);
    //prev parameter represents the accumulated result up to the current iteration,
    //The 0 argument is the initial value for the prev parameter of the callback function
}

// MAKING GET AND POST REQUEST TO THE BACKEND

///get server data
export async function getServerData(url, callback){
    const data = await (await axios.get(url)).data;
     return callback ? callback(data) : data; 
}

///post server data
export async function postServerData(url, result, callback){
    const data = await (await axios.post(url, result))?.data;
     return callback ? callback(data) : data; 
} 