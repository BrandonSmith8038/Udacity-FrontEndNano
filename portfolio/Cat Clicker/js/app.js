var cat = [{
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
	},

];


function displayCat(player,index) {
	var area = "playArea" + player;
	$("#main").append("<div class='col-md-6' id=" + area + "></div>");
	$("#playArea" + player).append("<div id='catName" + player + "'></div>")
	$("#playArea" + player).append("<div id='score" + player + "'></div>")
	$("#playArea" + player).append("<div id='catPic" + player + "'></div>")
	
	$("#catName" + player).append("<h1>Player " + player + "</h1");
	$("#catName" + player).append("<h2>" + cat[index].name + "</h2");
	$("#catPic" + player).append("<img src='" + cat[index].picture + "' alt='Cat Pic'>");

	
	$("#catPic" + player).click(function() {
		cat[index].score++;
		$("#score" + player).innerHTML = "<h2>Your Current Score Is: " + cat[index].score + "</h2>";
	})
}

displayCat("1",4);
displayCat("2",3);