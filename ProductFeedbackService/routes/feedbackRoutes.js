const express= require("express");
const router=express.Router();
const products=[
    {
        id:1,
        name:"Laptop",
        ratingCount:0,
        averageRating:0
    },
    {
        id:2,
        name:"Headphones",
        ratingCount:0,
        averageRating:0,
    },
    {
        id:3,
        name:"Speakers",
        ratingCount:0,
        averageRating:0
    }
];
router.get("/products",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Products retrieved successfully",
        products:products
    });
});

router.post("/rate",(req,res)=>{

    const {productId,rating}=req.body;
    if(productId===undefined || rating===undefined){
        return res.status(400).json({
            success:false,
            message:"productId and rating are required"
        });
    }

    const product=products.find((product)=>product.id==Number(productId));

    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found",
        });
    }

    if(typeof rating !=="number" || rating<1 || rating >5){
        return res.status(400).json({
            success:false,
            message:"Rating must be between 1 and 5"
        });
    }

    const totalRating=product.averageRating*product.ratingCount;
    product.ratingCount++;
    product.averageRating=(totalRating+rating)/product.ratingCount;

    return res.status(200).json({
        success:true,
        product:product
    });

});

router.get("/ratings",(req,res)=>{

    const ratings=products.map((product)=>({
        name:product.name,
        ratingCount:product.ratingCount,
        averageRating:product.averageRating
    }));

    return res.status(200).json({
        success:true,
        message:"Product ratings retrieved successfully",
        ratings:ratings,
    });

})
module.exports=router;