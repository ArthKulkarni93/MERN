const express=require("express");
const app=express();
const user=[{
    name:"john",
    kidney:[
        {
            healthy:false
        },{
            healthy:true
        }
    ]
    }
]
app.use(express.json());
app.get("/",function(req,res){
    const noofkidney=user[0].kidney.length;
    let noofhealthykidney=0;
    for(let i=0;i<user[0].kidney.length;i++){
        if(user[0].kidney[i].healthy){
            noofhealthykidney++;
        }
    }
    let noofunhealthykidney=noofkidney-noofhealthykidney;
    res.json({
        noofkidney,
        noofhealthykidney,
        noofunhealthykidney
    })
})

app.post("/",function(req,res){
    const arr=req.body.arr;
    user[0].kidney.push({healthy:arr});
    res.send({
        msg:"done"
    })
})

app.put("/",function(req,res){
    //const update=[];
    for(let i=0;i<user[0].kidney.length;i++){
        user[0].kidney[i].healthy=true; 
    }
    res.json({
        msg:"done"
    })
})

app.delete("/",function(req,res){
    const update=[];
    for(let i=0;i<user[0].kidney.length;i++){
        if(!user[0].kidney[i].healthy) update.push(user[0].kidney[i].healthy)
    }
    user[0].kidney=update;
    res.json({
        msg:"done"
    })
})
app.listen(3000);