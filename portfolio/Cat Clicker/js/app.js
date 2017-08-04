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
	displayCat("1",selectedCat);
}


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
// displayCat("2",selectCat("2"));

selectCat("1")

// alert(selectCat());
//  selectCat("2");
// displayCat("1", 4);
// displayCat("2", 3);