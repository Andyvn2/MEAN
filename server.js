var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true}));


app.use(bodyParser.json());


app.use(express.static( __dirname + '/restfulTask2/dist' ));
app.use(express.static(path.join(__dirname, './views')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/basic_mongoose');






var ChoreSchema = new mongoose.Schema({
	title: {type: String, required: [true, "title is required"]},
	description: {type: String, required: [true, "description is required"]},
	completed: {type: Boolean, default: false},
	created_at: {type: Date, default: Date()},
	updated_at: {type: Date, default: Date()}
	},
	{timestamps: true});
mongoose.model('Chore', ChoreSchema);
var Chore = mongoose.model('Chore')

// Use native promises
mongoose.Promise = global.Promise;


app.delete('/chores/:id', function(req,res){
	// ...delete 1 record by a certain key/value.
Chore.remove({_id: req.params.id}, function(err){
	console.log("removed Successful")
	res.json({message: "success"})
 // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
})

})

app.put('/chores/:id', function(req,res){
	console.log("THis is the ID", req.params.id)
	
	// console.log(req)
	// console.log("THIS IS WAHT YOURE LOOKING FOR ", res.body)
		Chore.update(
		{_id: req.params.id}, 
		{ 
			title: req.body.title,
			description: req.body.description,
			updated_at: Date() 
		},
		function(err, results){
		if(err){
			console.log("edit UnSuccessful!")
		}
		else{
			res.json({message: "success"})
		}
		}
	)
	
})


app.post('/chores', function(req,res){
	// console.log("*****THIS IS RES",res)
	console.log(")()())()()()(THIS IS REQ", req.body)

	var chore = new Chore({
		title: req.body.title,
		description: req.body.description,
		created_at: Date(),
		updated_at: Date()
	})
	chore.save(function(err, results){
		if(err){
			console.log(err)
		}
		else{
			console.log(results)
			res.json({message: "success", data: results})
		}
	})
})

app.get('/chores', function(req, res){
	
	Chore.find({}, function(err, chores){
		if(err){
			console.log("Returned Err", err);
			res.json({message:"error", error:err})
		}
		else {
			res.json({message: "Success", data: chores})
		}
	})
})


app.get('/chores/:id', function(req,res){
	Chore.find({_id: req.params.id}, function(err, chores){
		if(err){
			console.log(err)
		}
		else{
			res.json({message: "Success", data: chores})
		}
	})
})




app.all("*", (req, res, next) => {
	res.sendFile(path.resolve("./public/dist/index.html"))
})




app.listen(8000, function(){
	console.log("listening on port 8000")
})