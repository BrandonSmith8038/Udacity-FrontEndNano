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

//Adds form to the page. Creates the inital half page width div
//Creates the cat name div
//Select options are populated from the Cat array of objects. 
//When the value is changed selectCat is rerun to update the variable

function addForm(player){
	
	var area = "playArea" + player;

	$("#main").append("<div class='col-md-6' id=" + area + "></div>");
	$("#playArea" + player).append("<div id='catName" + player + "'></div>");
	$("#playArea" + player).append("<form><select id='cats" + player + "'></slecet><form>")
	$.map(cat, function(value, index) {
			$("#cats" + player).append("<option value='" + value.name + "'>" + value.name + "</option>");
		}

	)
$("#cats" + player).change(function(){
	selectCat(player);
})
	
}

//Choose the cat index based on the value of the select field
//Passes the index to display cat and runs the function
function selectCat(player) {
				var selectedCat = " ";
				var formID = "#cats" + player;
				switch ($(formID).val()){
					case "Garfield":
						selectedCat = "0"
						break;
					case "Tiger":
						selectedCat = "1"
						break;
					case "Smokey":
						selectedCat = "2"
						break;
					case "Oscar":
						selectedCat = "3"
						break;
					case "Misty":
						selectedCat = "4"
						break;
				}
	displayCat(player,selectedCat);
}



//Displays the player name, and score. Updates the score with each click. 
function displayCat(player, index) {


	$("#playArea" + player).append("<div id='score" + player + "'></div>")
	$("#playArea" + player).append("<div id='catPic" + player + "'></div>")

	$("#catName" + player).html("<h1>Player " + player + "</h1");
	$("#catName" + player).append("<h2>" + cat[index].name + "</h2");
	$("#catPic" + player).html("<img src='" + cat[index].picture + "' alt='Cat Pic'>");


	$("#catPic" + player).click(function() {
		cat[index].score++;
		$("#score" + player).html("<h2>Your Current Score Is: " + cat[index].score + "</h2>");
	})
}

addForm("1")
selectCat("1")

addForm("2")
selectCat("2")



