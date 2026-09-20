const express= require("express");
const app=express();
const feedbackRoutes=require("./routes/feedbackRoutes");
app.use(express.json());
app.use("/api",feedbackRoutes);
app.listen(8000,()=>{
    console.log("App is running on post 8000");
})