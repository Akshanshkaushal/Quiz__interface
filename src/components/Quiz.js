import React, { useEffect, useState } from 'react'
import Questions from './Questions';
import {Navigate} from "react-router-dom";

// redux store import
import {useDispatch, useSelector} from "react-redux";
import { moveNextAction, movePreviousAction } from '../Redux/question_reducer';
import { PushAnswer } from '../hooks/setResult';

export default function Quiz() {

  const [check, setChecked] = useState(undefined)

  const result = useSelector(state => state.result.result);
  const {queue, trace} = useSelector(state => state.questions); //q
  const dispatch = useDispatch();



  

//next button event handler
  function onNext(){
    console.log("next");

    //update the trace value by one using MoveNextAction
    if(trace < queue.length){
    dispatch(moveNextAction())

    //insert a new result in the array
    if(result.length <= trace){
      dispatch(PushAnswer(check));
      }
    }

    //value of uncheked variable
    setChecked(undefined);
  }
 
//prev button event handler
  function onPrevious(){
    console.log("prev");

    //update the trace value using MovepreviousAction
    if(trace>0){
    dispatch(movePreviousAction())
    }
  }

  function onChecked(check){
    
    setChecked(check)
  }

  //finish exam after last q
  if(result.length && result.length >= queue.length){
    return <Navigate to={"/result"} replace={true}></Navigate>
  }



  return (
    <div className='container'>
    <h1 className='title text-light'>Quiz Application</h1>

    {/* display questions */}
  <Questions onChecked = {onChecked}/>

  {/* redux store import  */}

  import {useSelector} from "react-redux";

    <div className='grid'>
   { trace>0 ?  <button className='btn next' onClick={onPrevious}>Previous</button> : <></>}
        <button className='btn next' onClick={onNext}>Next</button>
   
    </div>
</div>
  )
}
