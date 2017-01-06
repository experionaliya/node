var express=require("express");
var app=express();
var fs=require("fs");
var __=require("lodash");
var bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//fetching all the data using get
var personRouter=express.Router();
personRouter.route('/fetch')
.get( function(request, response) {
 
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


//fetching details of a particular user
personRouter.route('/:username')
.get(function(request, response) {
 
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

//deleting a particular user entry
personRouter.route('/delete/:username')
.delete(function(request, response) {
 
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
          if (err) {
            return console.log("error");
          }
          else{
      
            var person=JSON.parse( data );
            var name=__.find(person,{"name":request.params.username});
            console.log(name);
            __.remove(person,name);
               person = JSON.stringify(person);
                fs.writeFile("people.json", person, function(err) {
                  if(err) {
                    return console.log(err);
                  }
                  else{
                    response.send("Deleted");
                console.log("The file is updated");
              }
             });
          }

      });
});
     

//adding a new entry
personRouter.route('/add')
.post(function(request, response) {
 
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
	    if (err) {
	      return console.log("error");
	    }
	    else{
	      var content=request.body;
	      var person=JSON.parse(data);
    		console.log(person);
    		person.push(content);
    		person=JSON.stringify(person);
    		console.log(person);
	     	fs.writeFile("people.json", person, function(err) {
		    if(err) {
			return console.log(err);
		    }
		    else{
          response.send(person);
	    		console.log("New entry made");
		    }
		}); 
	
	    }
  });
});

//adding a new entry
personRouter.route('/update/:name/:age')
.put(function(request, response) {
 
  response.contentType('application/json');
  fs.readFile('people.json','utf8',function (err,data){
      if (err) {
        return console.log("error");
      }
      else{
         data=JSON.parse(data);
        data=data.filter(function(item){

          if(item.name==request.params.name){
            item.age=request.params.age;

          }
          return item;
        });
        
        data=JSON.stringify(data);
        console.log(data);
        fs.writeFile("people.json", data, function(err) {
        if(err) {
      return console.log(err);
        }
        else{
          response.send(data);
          console.log("value updated");
        }
    }); 
  
      }
  });
});


app.use('/',personRouter);
app.listen(8081, function(){
  console.log("server started");
});


