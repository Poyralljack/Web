const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname+"/signup.html");

})

app.post("/",function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData=JSON.stringify(data);

  const url="https://us14.api.mailchimp.com/3.0/lists/a75191a352";

  const options ={
    method:"POST",
    auth:"yasin:da6c760b3be8ab932ec2806a39590f4a-us14"
  }
  const request = https.request(url, options, function(response) {
      response.on("data", function(data) {
  	var returnData = JSON.parse(data)
  	// var errorEmail = returnData.errors[0].email_address;
  	// var errorMsg = returnData.errors[0].error;
  	var duplicatMail = returnData.error_count;
    console.log(response.statusCode);
  	if (response.statusCode == 200 &&duplicatMail != 1){
  	    res.sendFile(__dirname + "/success.html");
  	} else {
  	    res.sendFile(__dirname + "/failure.html");
  	}
  	console.log(returnData);
  	});
  })

  request.write(jsonData);
  request.end();

});
app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT|| 3000,function(){
  console.log("server is running on port 3000.");
})
//const apiKey="da6c760b3be8ab932ec2806a39590f4a-us14";
//const AudienceId="3c049006bb.";
//trial