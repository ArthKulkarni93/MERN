const express = require("express");
const { z } = require("zod");
const app = express();

const user = [{
    fname: "arth",
    lname: "kulkarni",
    kidney: [{
        healthy: true
    }, {
        healthy: false
    }]
}];

const kidneySchema = z.object({                 //zod schema for input validation
    healthy: z.boolean()
});

function validate(newkidney) {                  //Middleware for error handling
    if(user[0].kidney.length < 2) return  true // If the number of kidneys is less than 2, kidneys can be added
    else return false;
}

app.use(express.json());                        //Middleware to check if express is sending json operations or not

app.get("/", function(req, res) {
    const numofkidney = user[0].kidney.length;
    let healthykidney = 0, unhealthykidney = 0;
    for (let i = 0; i < numofkidney; i++) {
        if (user[0].kidney[i].healthy) healthykidney++;
        else unhealthykidney++;
    }
    res.json({
        numofkidney,
        healthykidney,
        unhealthykidney
    });
});

app.post("/", function(req, res, next) {
   const newkidney = kidneySchema.parse(req.body.newkidney); 
    if (validate(newkidney)) {                     // Validate with Middleware
        user[0].kidney.push(newkidney);
        res.json({
            msg: "done"
        });
    }
    res.status(400).json({ error: "Cannot add more than 2 kidneys" });     
});

                                
app.use((err, req, res, next) => {                  // Global error-handling middleware
    res.status(500).json({
        error: "Internal Server Error"
    });
});

app.listen(3000);
