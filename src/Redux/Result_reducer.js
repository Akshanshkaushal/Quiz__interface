import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({   //createslice--> to initialise the values
    name:"result",
    initialState : {
        userId : null,
        result : []
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload
        },
        pushResultAction : (state, action) => {
            state.result.push(action.payload)
        },
        updateResultAction : (state, action) => {
          const {trace, checked } = action.payload;
          state.result.fill(checked, trace , trace+1)  // checked--> updated value entered by user

        },
        resetResultAction : () => {
            return {
                userId : null,
                result : []
            }
        }

    }
})

export const {setUserId, pushResultAction, resetResultAction, updateResultAction} = resultReducer.actions;

export default resultReducer.reducer;
