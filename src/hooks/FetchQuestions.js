import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//redux actions
import * as Action from "../Redux/question_reducer.js"  //get all the actions inside question_reducer
import { getServerData } from "../helper/helper";


// fetching question hook to fetch api data and store value in store
//this fn also helps us to provide isLoading and checking error in the component

export const useFetchQuestion = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null});

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading:true}));  //isLoading:true means process is ongoing

        //asyn fn to fetch backend data
        (async() => {
            try {
                 
               const [{questions, answers}] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, (data) => data)
               console.log({questions, answers});

                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading:false}));
                    setGetData(prev => ({...prev, apiData: {questions}}));

                    //dispatcg as an action
                    dispatch(Action.startExamAction( { question: questions,answers}))
                }
                else{
                    throw new Error("No questions available")
                }
            } catch (error) {
                setGetData(prev => ({...prev, isLoading:false}));  // isLoading false means process is completed and data is ready to use
                setGetData(prev => ({...prev, serverError: error}));
                
            }
        })();
    },[dispatch])  //passing dispatch as a dependency to prevent continue overlooping of useEffect

    return [getData, setGetData];
}


//MoveNextAction Dispatch Function
export const moveNextAction = () => (dispatch) => {
    try {
        dispatch(Action.moveNextAction());  // increase trace by 1
    } catch (error) {
        console.log(error)
        
    }
}

//MovePreviousAction Dispatch Function
export const movePreviousAction = () => (dispatch) => {
    try {
        dispatch(Action.movePreviousAction());  //decrease trace by 1
    } catch (error) {
        console.log(error)
        
    }
}
