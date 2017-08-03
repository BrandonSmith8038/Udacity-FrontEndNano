var score1 = 0;
var score2 = 0;

var catNames = [
	"Garfield",
	"Kemrit",
	"Spot",
	"Cliford",
	"Fred",
	"Gabby",
	"Lisa"
];

var cat1Name = catNames[Math.floor(Math.random() * 7)];
var cat2Name = catNames[Math.floor(Math.random() * 7)];

document.getElementById("cat1Name").innerHTML = "<h3>" + cat1Name + "</h3>";
document.getElementById("cat2Name").innerHTML = "<h3>" + cat2Name + "</h3>";



document.getElementById("catPic1").addEventListener('click', function() {
	score1++;
	document.getElementById("score1").innerHTML = "<h1>Your Current Score Is: " + score1 + "</h1>";
}, false)
document.getElementById("catPic2").addEventListener('click', function() {
	score2++;
	document.getElementById("score2").innerHTML = "<h1>Your Current Score Is: " + score2 + "</h1>";
}, false)