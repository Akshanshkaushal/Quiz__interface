import React, { useEffect } from 'react'
import '../styles/Result.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAllAction } from '../Redux/question_reducer';
import { resetResultAction } from '../Redux/Result_reducer';
import { attempts_Number, positivePoints_Number } from '../helper/helper';
import { usePublishResult } from '../hooks/setResult';

 
 

/** import actions  */
 


export default function Result() {
 
 const dispatch = useDispatch()
 //destructuring the values
 const {questions : {queue, answers}, result : {result, userId}} = useSelector(state => state)

 
 useEffect(() => {
//   console.log(positivePoints)
})

const totalPoints = queue.length * 4;
const attempts = attempts_Number(result);
const positivePoints = positivePoints_Number(result, answers, 4);

//store user result
usePublishResult({result,
    //  username: userId, 
     attempts, 
     points: positivePoints});

 
 function onRestart(){
  dispatch(resetAllAction())
  dispatch(resetResultAction())
 }



  

     

  return (
    <div className='container'>
        <h1 className='title text-light'>Quiz Application</h1>

        <div className='result flex-center'>
            {/* <div className='flex'>
                <span>Username</span>
                <span className='bold'> </span>
            </div> */}
            <div className='flex'>
                <span>Total Quiz Points : </span>
                <span className='bold'>{totalPoints || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Questions : </span>
                <span className='bold'>{queue.length || 0}</span>
            </div>
            <div className='flex'>
                <span>Total Attempts : </span>
                <span className='bold'>{attempts || 0} </span>
            </div>
            <div className='flex'>
                <span>positive Points : </span>
                <span className='bold'>{positivePoints || 0} </span>
            </div>
            {/* <div className='flex'>
                <span>Negative Points : </span>
                <span className='bold'>  </span>
            </div>
            <div className='flex'>
                <span>Total Points : </span>
                <span className='bold'></span>
            </div>
            <div className='flex'>
                <span>Quiz Result</span>
                 
            </div> */}
        </div>

        <div className="start">
            <Link className='btn' to={'/'} onClick={onRestart}>Restart</Link>
        </div>

        <div className="container">
            {/* result table */}
         
        </div>
    </div>
  )
}
