var score = 0;


document.getElementById("catPic").addEventListener('click', function(){
	score++;
	document.getElementById("score").innerHTML = "<h1>Your Current Score Is: " + score + "</h1>";
},false)

