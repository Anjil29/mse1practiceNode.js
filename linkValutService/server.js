const express= require("express");
const app=express();
const urlRoutes=require("./routes/urlRoutes");
//app.use("/api",urlRoutes);
app.use(express.json());
app.listen(8000,()=>{
    console.log("App is running successfully in port 8000");
})
