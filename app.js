const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.listen(3000, function(){
    console.log("Server is running on port 3000...");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let emailAddress = req.body.email;

    var data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

    const url = "https://us13.api.mailchimp.com/3.0/lists/ec1ac0d707";



    const options = {
        method: "POST",
        auth: "kushagra:07ad3ca06eab41a8bdbfe3da70c75edc-us13" 
    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            // console.log(JSON.parse(data));
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
                console.log(url.statusCode);
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
        })
    })

    request.write(jsonData);
    request.end();
});