

const express = require('express')  
const app = express()  
const port = 3001
var MongoClient = require('mongodb').MongoClient;

var cors = require('cors');

app.use(cors());

app.get('/', (request, response) => {  
	//		response.send("pokemon");

	//response.send("pokemon");
	var a = parseInt(request.param('a'));
	var b = parseInt(request.param('b'));
	var c = parseInt(request.param('c'));
	var d = parseInt(request.param('d'));

	//console.log("inputs:" + a + b + c + d);
	var shape = new Shape(a,b,c,d);
	shape.getShapeName();
	console.log("shape output: " + shape.shape);

	//response.send("gotta catch em all")

	getPokemon(shape.shape, function(pokemon){
		//response.send("gotta catch em all");
		//console.log("response body: " + response.body);
		console.log(pokemon)
		response.send(pokemon);
		//response.send("pokemon");
		
	});
})

app.listen(process.env.PORT || port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})









var getPokemon = function(shape, cb){
	var toReturn = 0;
// Connect to the db
	MongoClient.connect("mongodb://chad.cyoung:Songshan6@ds139705.mlab.com:39705/pokemon", function(err, db) {
		if(!err) {
	    	console.log("We are connected");
	  	}
	  	else{ 
	  		console.log(err);
	 	}	

	    var collection = db.collection("pokelist");
        collection.find({'shape':shape}).toArray(function(err, docs) {
          //console.log("Printing docs from Array")
          	var rand = Math.floor((Math.random() * (docs.length)));
          //	console.log("random number: " + rand);
			//console.log(docs[rand].number);
			var pokemonNumber = parseInt(docs[rand].number);
			console.log(pokemonNumber);


		var collection = db.collection('description');
        collection.find({'shape':shape}).toArray(function(err, docs) {
          //console.log("Printing docs from Array")
          //	var rand = Math.floor((Math.random() * (docs.length)));
       //   	console.log("random number: " + rand);
			//console.log(docs[rand].number);
			var description = docs[0].description;

			console.log(description);
			
			var toReturn = {pokemonNumber: pokemonNumber, description: description}

			//var toReturn = {pokemonNumber: pokemonNumber}
			cb(toReturn);
       });
	});	
});
}



/*

function Attacks(a,b,c,d){
	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;
}



Attacks.prototype.getAttack = function(position){
	MongoClient.connect("mongodb://localhost/pokemon", function(err, db) {
		if(!err) {
	    	console.log("We are connected");
	  	}
	  	else{ 
	  		console.log(err);
	 	}	

	    var collection = db.collection('attacks');
        collection.find({'position':position}).toArray(function(err, docs) {
          //console.log("Printing docs from Array")
          	var rand = Math.floor((Math.random() * (docs.length)));
          	console.log("random number: " + rand);
			//console.log(docs[rand].number);
			var toReturn = parseInt(docs[rand].number);
			console.log(toReturn);
			cb(toReturn);
        });
	});

}

*/



// PI logic
function Shape(a, b, c, d) {
	
console.log("inside shape: " + a + b + c + d);

	this.dominance = a;
	this.extroversion = b;
	this.patience = c;
	this.formality = d;
	this.shape = 1; // Bad Data
};

/*
   Venturer, Scientific Professional, Creative Analytical, Control, Specialist, Authoritative Management Sales, Persuasive Management Sales, Altruistic Service, 
   Social Interest, Promotional, Diligence, Operational, Craftsman, Scholar, Individualist
 */

Shape.prototype.getShapeName = function() {
	var aOnTop = attributeOnTop(this.dominance);
	var bOnTop = attributeOnTop(this.extroversion);
	var cOnTop = attributeOnTop(this.patience);
	var dOnTop = attributeOnTop(this.formality);
	
	if (aOnTop) {
		console.log("AAA");
		if (!bOnTop && !cOnTop && !dOnTop) {
			this.shape = 1; // Venturer
			return;
		}
		console.log("BBB");
		if (dOnTop && !bOnTop && !cOnTop) {
			console.log("CCC");
			if (this.dominance == this.formality) {
				this.shape = 3; // Creative Analytical
				return;
			} else if (this.dominance > this.formality) {
				this.shape = 2; // Scientific Professional
				return;
			} else { // this.formality > this.dominance
				this.shape = 4; // Control
				return;
			}
		}
		if (bOnTop && !cOnTop && !dOnTop) {
			if (this.dominance > this.extroversion) {
				this.shape = 6; // Authoritative Management Sales
				return;
			} else { // this.extroversion > this.dominance
				this.shape = 7; // Persuasive Management Sales
				return;
			}
		}
		if (!bOnTop && cOnTop && dOnTop) {
			this.shape = 14; // Scholar
			return;
		}
		if (cOnTop && !bOnTop && !dOnTop) {
			this.shape = 15; // Individualist
			return;
		}
	} else { // a is on bottom
		if (dOnTop && !cOnTop && !bOnTop) {
			this.shape = 5; // Specialist
			return;
		}
		if (bOnTop && !cOnTop && !dOnTop) {
			this.shape = 10; // Promotional
			return;
		}
		if (cOnTop && dOnTop && !bOnTop) {
			if (this.patience == this.formality) {
				this.shape = 13; // Craftsman
				return;
			} else if (this.patience < this.formality) {
				this.shape = 11; // Diligence
				return;
			} else { // this.patience > this.formality
				this.shape = 12; // Operational
				return;
			}
		}
		if (dOnTop && bOnTop && !cOnTop) {
			this.shape = 8; // Altruistic Service
			return;
		}
		if (bOnTop && cOnTop) { // this.extroversion == this.patience && D is off in left field...
			this.shape = 9; // Social Interest
			return;
		}
	}
};

var attributeOnTop = function(attrb) {
	if(attrb >= 0)
		return true;
	return false;
};


