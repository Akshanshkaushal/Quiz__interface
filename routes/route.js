import { Router } from "express";   // have to import a router to create route 
const router = Router();
import * as controller from "../controller/controller.js";

//questions routes API
router.route("/questions")
.get(controller.getQuestions)       //get rq
.post(controller.insertQuestions)   //post req
.delete(controller.dropQuestions)   //delete req



router.route("/result")
.get(controller.getResult)
.post(controller.storeResult)
.delete(controller.dropResult)
     
 



export default router;