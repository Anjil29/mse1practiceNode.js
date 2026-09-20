const express= require("express");
const app=express();
app.use(express.json());
const taskroute=require("./routes/taskroute");
app.use("/api",taskroute);
app.listen(8000,()=>{
    console.log("App is successfully running at port : 8000");
})