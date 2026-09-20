const express=require("express");
const app=express();
const pollRoutes=require("./routes/pollRoutes");
app.use(express.json());
app.use("/api",pollRoutes);
app.listen(3000,()=>{
    console.log("app is runnning successfully on port 3000");
})