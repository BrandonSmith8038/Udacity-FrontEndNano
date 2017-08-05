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
		adminView.init();
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
	},
	
	//Hides options panel on load
	toggleOptions: function(){
		$(adminView.optionsElem).toggle();
	},
	
	adminSave: function(){
		this.changeName();
		this.changeScore();
		this.changeURL();
		this.toggleOptions();
		catView.render();
		catListView.render();
	},
	
	changeName: function(){
		
		var newName = document.getElementById("admin-name").value;
		if(newName.length > 1){
		model.currentCat.name = newName;
		document.getElementById("admin-name").value = " ";
		}
		
	},
	changeScore: function(){
		
		var newScore = document.getElementById("click-counter").value;
		if(newScore.length > 1){
		model.currentCat.score = newScore;
		document.getElementById("click-counter").value = " "
		}
		
	},
	changeURL: function(){
		
		var newURL = document.getElementById("admin-url").value;
		if(newURL.length > 1){
		model.currentCat.picture = newURL;
		document.getElementById("admin-url").value = " "
		}
		
	}

};

// ========== VIEW ============

var catView = {

	init: function() {
		//store pointers to our DOM elements for easy access later
		this.catElem = document.getElementById("play-area");
		this.catURLElem = document.getElementById("cat-name");
		this.catImageElem = document.getElementById("cat-pic");
		this.countElem = document.getElementById("score");
		this.catNameElem = document.getElementById("cat-name");


		//on click, increment the current cat's counter
		this.catImageElem.addEventListener('click', function() {
			octopus.incrementCounter();
		});
		

	
		//Update Dom
		this.render();
},
		
	render: function(){
		var currentCat = octopus.getCurrentCat();
		this.countElem.textContent = "Your Current Click Count Is: " + currentCat.score;
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

var adminView = {
	
	init: function(){
		//store pointers to our DOM elements for easy access later
		this.adminButton = document.getElementById("open-button");
		this.optionsElem = document.getElementById("options-panel");
		this.nameInput = document.getElementById("admin-name");
		this.urlInput = document.getElementById("admin-url");
		this.counterInput = document.getElementById("click-counter");
		this.adminCancel = document.getElementById("cancel-button");
		this.adminSave = document.getElementById("save-button");
		this.adminReset = document.getElementById("reset-button");
		

		this.render();


	},
	
	render: function(){
    this.adminButton.addEventListener("click",function(){
			octopus.toggleOptions();
		})
		 this.adminCancel.addEventListener("click",function(){
			octopus.toggleOptions();
		})
		 this.adminSave.addEventListener("click",function(){
			octopus.adminSave();
		})
		this.adminReset.addEventListener("click",function(){
			catView.render();
		})
		
		
	}
}










octopus.init();
		
	