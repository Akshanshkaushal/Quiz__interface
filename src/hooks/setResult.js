import * as Action from "../Redux/Result_reducer";
import { postServerData } from "../helper/helper";
 

export const PushAnswer = (result) => async(dispatch) => {   //Specified result as argumnet to enable user to enter the value and get output
    try {
         await dispatch(Action.pushResultAction(result))
    } catch (error) {
        console.log(error)  
    }
}

export const updateResult = (index) => async(dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error)
    }
}

//insert user data
export const usePublishResult = (resultData) => {
    const { result } = resultData;
    (async () => {
        try {
            if(result !== []) throw new Error("Couldn't get result");
            await postServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`)
        } catch (error) {
            console.log(error)
        }
    })();
}