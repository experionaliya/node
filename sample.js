var express=require("express");
var app=express();
var fs=require("fs");
var __=require("lodash");
var user = {
   "user2" : {
      "name" : "xyz",
      "age" : 10
     
   }
}




app.get('/', function(request, response) {
 
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }
    else{
     
      var person=JSON.parse( data );
	response.send(person);
     
    }
    });
});

app.get('/:username', function(request, response) {
 
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }
    else{
      
      var person=JSON.parse(data);
	console.log(request.params.username);
	response.send(__.find(person,{"name":request.params.username}));
	 }
    });
});
app.get('/delete', function(request, response) {
 
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
    if (err) {
      return console.log("error");
    }
    else{
      // var peopleJSON = JSON.stringify(data);
      var person=JSON.parse( data );
	delete person[0];
	person = JSON.stringify(person);
	fs.writeFile("people.json", person, function(err) {
	    if(err) {
		return console.log(err);
	    }

    	console.log("The file is updated");
	}); 
    	}
    });
});

app.post('/add', function(request, response) {
 
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
	    if (err) {
	      return console.log("error");
	    }
	    else{
	      
	      var person=JSON.parse(data);
		person[2]=user["user2"];
		person=JSON.stringify(person);
	     	fs.writeFile("people.json", person, function(err) {
		    if(err) {
			return console.log(err);
		    }
		    else{
	    		console.log("New entry made");
		    }
		}); 
	
	    }
  });
});

app.listen(8081, function(){
  console.log("server started");
});


