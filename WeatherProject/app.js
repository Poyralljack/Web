const express=require("express");

const app=express();

const https=require("https");

app.get("/",function(req,res){
  const url="https://api.openweathermap.org/data/2.5/weather?q=ankara&appid=3f3caad473759e23a80e32f63463b8c0&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      console.log(temp);
    });
  });
  res.send("Server is up and running");
});

app.listen(3000,function(){
  console.log("Server is running on 3000");
});
