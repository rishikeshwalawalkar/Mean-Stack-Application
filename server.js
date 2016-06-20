var express = require('express');
var bodyparser = require('body-parser');
var mongojs = require('mongojs');

var app = express();
var db = mongojs('mydb',['contactlist']); /* square brackets madhe contactlist*/

/*app.get('/', function(req,res){
	res.send("Hello World");
});  testing*/ 

app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());

app.get('/contactlist' , function(req, res){
	db.contactlist.find(function(error,data){
		res.json(data);
	});
});

app.post('/contactlist' , function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body, function(error , data){
		if(error){
			console.log("Error");
		}else{
			res.json(data);
		}

	});
});

app.delete('/contactlist/:index' , function(req, res){
	var id = req.params.index;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(error,data){
		res.json(data);
	});
});


app.get('/contactlist/:index' , function(req , res){
	var id = req.params.index;
	db.contactlist.findOne({_id:mongojs.ObjectID(id)}, function(error,data){
		if(error){
			console.log("error");
		}else{
			res.json(data);
		}
	})
});

app.put('/contactlist/:id' , function(req , res){
	var id = req.params.id;
	db.contactlist.findAndModify({
		query: {_id : mongojs.ObjectId(id)},
		update: {$set:{name:req.body.name,
					email:req.body.email,
					phone:req.body.phone}},
		new : true} , function(error, data){
				res.json(data);	
		});
});


app.listen(3200);
console.log("Port is ready");