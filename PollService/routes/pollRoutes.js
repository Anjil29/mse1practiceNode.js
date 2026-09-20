const express= require("express");
const router=express.Router();
const polls=[
    {
        id:1,
        question:"Which programming language your prefer?",
        options:[
            {
                id:1,
                text:"CPP",
                count:0
            },
            {
                id:2,
                text:"Python",
                count:0,
            },
            {
                id:3,
                text:"Java",
                count:0
            }
        ]
    },
    {
        id:2,
        question:"Which backened technology you prefer?",
        options:[
            {
                id:1,
                text:"Node.js",
                count:0,
            },
            {
                id:2,
                text:"Django",
                count:0,
            },
            {
                id:3,
                text:"SpringBoot",
                count:0
            }
        ]
    }
    
];
router.get("/polls",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Polls retrieved successfully",
        polls:polls
    });
});
router.get("/polls/:id",(req,res)=>{
    const pollId=Number(req.params.id);
    const poll=polls.find((poll)=>poll.id==pollId);
    if(!poll){
        return res.status(404).json({
            success:false,
            message:"Poll not found",

        });
    }
    res.status(200).json({
        success:true,
        poll:poll
    });
});
router.post("/vote",(req,res)=>{
    const pollId=req.body.pollId;
    const optionId=req.body.optionId;
   if(pollId==undefined || optionId==undefined){
    return res.status(400).json({
        success:false,
        message:"pollId and optionId are required"
    });
   }
   const poll= polls.find((poll)=>poll.id==Number(pollId));
   if(!poll){
    return res.status(404).json({
        success:false,
        message:"poll not found",
    });
   }
   const option=poll.options.find((option)=>option.id==Number(optionId));
   if(!option){
    return res.status(400).json({
        success:false,
        message:"Invalid option",
    });
   }
   option.count+=1;
   res.status(200).json({
    succes:true,
    message:"Poll recorded successfuly",
    poll:poll
   })
});

router.get("/polls/:id/results",(req,res)=>{
    const pollId=Number(req.params.id);
    const poll=polls.find((poll)=>poll.id===pollId);
    if(!poll){
        return res.status(404).json({
            success:false,
            message:"No such poll exists"
        });
    }
    const totalResponses=poll.options.reduce((total,option)=>total+option.count,0);
    res.status(200).json({
        success:true,
        pollId:pollId,
        results:poll.options,
        totalResponses:totalResponses
    })
})

module.exports=router;