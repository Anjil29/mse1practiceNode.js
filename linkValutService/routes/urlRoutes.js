const express=require("express");

const router=express.Router();
const urls=[];
// ye array me objects ayege jisme ids originalUrl and shorten urlHoga

function generateCode(){
    let code;
    do{
        code=Math.random().toString(36).substring(2,8);

    }while(urls.some(url=>url.code===code));
    return code;
}
router.post("/shorten",(req,res)=>{
    const {originalUrl,username}=req.body;
    if(username==undefined || originalUrl==undefined){
        return res.status(400).json({
            success:false,
            message:"username and originalUrl are required",
        })
    }
    try{
        new URL(originalUrl);
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Invalid url"
        });
    }
    const code=generateCode();

    const newUrl={
        id:urls.length+1,
        username:username,
        originalUrl:originalUrl,
        code:code
    };

    urls.push(newUrl);

    return res.status(200).json({
        success:true,
        code:code
    });


});

router.get("/url/:code",(req,res)=>{
    const code=req.params.code;
    const url=urls.find((url)=>url.code===code);
    if(!url){
        return res.status(404).json({
            success:false,
            message:"URL not found",
        });
    }
    
    return res.status(200).json({
        success:true,
        originalUrl:url.originalUrl,
        username:url.username
    });

});

router.get("/users/:username/urls",(req,res)=>{
    const username=req.params.username;
    const userUrls=urls.filter(url=>url.username===username);
    res.status(200).json({
        success:true,
        url:userUrls
    });
});
router.delete("/url/:code",(req,res)=>{
    const code=req.params.code;
    const index=urls.findIndex(url=>url.code===code);
    if(index===-1){
        return res.status(404).json({
            success:false,
            message:"URL not found",
        })
    }
    urls.splice(index,1);

    return res.status(200).json({
        success:true,
        message:"URL deleted successfully"
    });

})
module.exports=router;