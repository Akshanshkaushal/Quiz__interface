import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// custom Hook 
import { useFetchQuestion } from '../hooks/FetchQuestions';
 import { updateResult } from '../hooks/setResult';
 

export default function Questions({ onChecked }) {

    const [checked, setChecked] = useState(undefined);
    const {trace} = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const[{ isLoading, apiData, serverError}] = useFetchQuestion()

    // useSelector(state => console.log(state));
    

    const questions = useSelector(state => state.questions.queue[state.questions.trace])   //Now getting data from the state
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log({trace, checked})
       dispatch(updateResult({trace, checked}))
    },[checked])  // cheked as dependency to prevent continuse
 
 
    function onSelect(i){
       onChecked(i)
       setChecked(i)
    }


    if(isLoading) return <h3 className='text-light'>isLoading</h3>
    if(serverError) return <h3 className='text-light'>{serverError || "unknown error"}</h3>

  
  return (
    <div className="questions">
    <h2 className='text-light'>{questions?.question.startsWith("https") ? (
        <img src={questions?.question} alt="question" />
    ) : (
        questions?.question
    )
    }</h2> 

    <ul key={questions?.id}> 
        {   //question? means return the next one only if question is available either do not return it
            questions?.options.map((q, i) => ( 
                <li key={i}>
                    <input 
                        type="radio"
                        value={false}
                        name="options"
                        id={`q${i}-option`}
                        onChange={() => onSelect(i)}
                    />

                    <label className='text-primary' htmlFor={`q${i}-option`}>{q.startsWith('https') ? (
                <img src={q} alt="Option" />
              ) : (
                q
              )}</label>
                    <div className={`check ${result[trace] == i ? 'checked' : ''}`}></div>
                </li>
            ))
        }
    </ul>
</div>
  )
}
