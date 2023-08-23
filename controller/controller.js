import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, {answers} from "../database/data.js";



//get all question
export async function getQuestions(req, res){
     try {
        const q = await Questions.find()  // find finds all the questions and return us the value
         
        res.json(q)
     } catch (error) {
        res.json({error})
     }
}

//insert all questions
export async function insertQuestions(req, res){
     try {
       await Questions.insertMany({questions, answers})
            res.json({msg : "Data Saved Successfully.....!"});
        }  //inserting multiple documents
     catch (error) {
         res.json({error})
     }}


//delete all questions
export async function dropQuestions(req,res){
    try {
        await Questions.deleteMany();
        res.json({msg : "Questions deleted successfully"});
    } catch (error) {
        res.json({error})
    }
}

 









  
// get all result
export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({error})
    }
}

//post all result
export async function storeResult(req, res){
     
    const{ result, attempts, points} = req.body;
    if(!result) throw new Error("Data not provided.....!");  //failed

    Results.create({result, attempts, points}).then(() => {
        res.json({ msg : "Result Saved successfully....!"})
  }).catch ((error) => {
    res.json({error})
 })
 
 
}

 
//delete all result
export async function dropResult(req, res){
     try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully.......!"})
     } catch (error) {
        res.json({error})
     }
}


// {"username" : "daily" ,
// "result" :[1,2,3] ,
// "attempts": 2,
// "points" : 3,
// "achived": "passed"}