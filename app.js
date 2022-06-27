const express= require("express");

const https=require("https");
const bodyparser=require("body-parser");

const app= express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res){

   
    const query=req.body.cityname;
 
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=4e435a52cd24772246ac47b5dcc11743";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherdata=JSON.parse(data);
            const temp=weatherdata.main.temp;
            const icon=weatherdata.weather[0].icon;
           const weatherdiscription=weatherdata.weather[0].description;
           
           res.write("<h1>temperature in "+ query+ " is " + temp + " degree</h1>");
           res.write("<h2> weather in "+ query+ " is "+ weatherdiscription + "</h2>");

            res.send();

        })
    });
  //  response.send("server is up ans running");
});

app.listen(3000,function(){
    console.log("server is running at port number 3000");
})