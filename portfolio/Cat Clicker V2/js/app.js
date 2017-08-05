// ========= Model ============	

var model = {
	currentCat: null,
	cats: [{
			"name": "Garfield",
			"picture": "images/cat2-800_small_1x.jpg",
			"score": 0
		}, {
			"name": "Tiger",
			"picture": "images/cat3-800_small_1x.jpg",
			"score": 0
		}, {
			"name": "Smokey",
			"picture": "images/cat4-800_small_1x.jpg",
			"score": 0
		}, {
			"name": "Oscar",
			"picture": "images/cat5-800_small_1x.png",
			"score": 0
		}, {
			"name": "Misty",
			"picture": "images/cat6-800_small_1x.jpg",
			"score": 0
		}

	]
}

// ============= Octopus ===================

var octopus = {

	init: function() {
		//Set the current cat to the first cat in the list
		model.currentCat = model.cats[0];

		catListView.init();
		catView.init();
	},

	getCurrentCat: function() {
		return model.currentCat
	},

	getCats: function() {
		return model.cats;
	},

	//set the currently-selected cat to the object passed in
	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	// increments the counter for the currently selected
	incrementCounter: function() {
		model.currentCat.score++
			catView.render();
	}

};

// ========== VIEW ============

var catView = {

	init: function() {
		//store pointers to our DOM elements for easy access later
		this.catElem = document.getElementById("play-area");
		this.catNameElem = document.getElementById("cat-name");
		this.catImageElem = document.getElementById("cat-pic");
		this.countElem = document.getElementById("score");

		//on click, increment the current cat's counter
		this.catImageElem.addEventListener('click', function() {
			octopus.incrementCounter();
		});
		

	
		//Update Dom
		this.render();
},
		
	render: function(){
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = currentCat.score;
		this.catNameElem.textContent = currentCat.name;
		this.catImageElem.src = currentCat.picture;
	}
		
};

var catListView = {
	
	init: function(){
		this.catListElem = document.getElementById("cat-list");
		
		this.render();
	},
	
	render: function(){
		var cat, elem, i;
		var cats = octopus.getCats();
		
		this.catListElem.innerHTML = '';
		
		for(i = 0; i < cats.length; i++){
			cat=cats[i];
			elem = document.createElement("li");
			elem.textContent = cat.name;
			
			// on click, setCurrentCat and render the catView
      // (this uses our closure-in-a-loop trick to connect the value
      //  of the cat variable to the click event function)
			elem.addEventListener("click", (function(catCopy){
				return function(){
					octopus.setCurrentCat(catCopy);
					catView.render();
				};
			})(cat));
			
			this.catListElem.appendChild(elem);
		}
	}
	
};










octopus.init();
		
	