var level = 1;
var levelDisplay = document.getElementById("level");
levelDisplay.innerHTML = "Level " + level;

livesAmount = 5
lifeText = "&#9825&#9825&#9825&#9825&#9825";
var lifeDisplay = document.getElementById("lives");
lifeDisplay.innerHTML = "<p>" + lifeText + "</p>";


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += dt * this.speed;

  //If the empty gets to the end of the playable area, loop back to the begining.
  if (this.x > 725) {
    this.x = -100;
  }

  colisionDetectionEnemy(this);



};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
  this.sprite = 'images/char-boy.png'
  this.x = x;
  this.y = y;
  this.speed = speed;

}



Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Heart = function(x, y) {
  this.x = x;
  this.y = y;
  this.heartAvailable = false;
  this.sprite = 'images/Heart.png';
}

Heart.prototype.render = function() {

  if (Math.floor(showHeart) === 3 && this.heartAvailable === true) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

};


Heart.prototype.update = function(dt) {
  colisionDetectionHeart(this);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//Number of enemies to display-Will eventually depend on the level number
var enemyAmount = 6 + level;
//X-axis Starting Position of Enemey
var enemyStartX = -200;

var player = new Player(202.5, 650, 75);


//Creates new enemys
for (var i = 0; i < enemyAmount; i++) {
  //Y-axis Starting position for enemey
  var enemyStartY = Math.random() * (435 - 45) + 45;
  //Enemy Speed
  var enemySpeed = Math.random() * (300 - 100) + 100;
  //Create the new player
  allEnemies[i] = new Enemy(enemyStartX, enemyStartY, enemySpeed);
}

//Creates random positioning for the heart
var heartY = Math.random() * (300 - 50) + 50;
var heartX = Math.random() * (500 - 20) + 20;
//Creates a random number between 1 and 3 that determines if the heart if the heart will be shown
var showHeart = Math.random() * (4 - 1) + 1;
//Creates a new heart however the render function in engine.js will only if showHeart === 1, equating to a 1 in 3 chance. 
var heart = new Heart(heartX, heartY)

//Handles keypresses for the player
Player.prototype.handleInput = function(key) {
  if (key == 'left') {
    player.x -= player.speed;
  }
  if (key == 'up') {
    player.y -= player.speed - 20;
  }
  if (key == 'right') {
    player.x += player.speed;
  }
  if (key == 'down') {
    player.y += player.speed - 20;
  }
  playerReset();
  console.log("Is The Heart Avaiable: ", heart.heartAvailable);
  console.log("Show Heart: ", Math.floor(showHeart))

}



Player.prototype.update = function() {
  //Needed for engine.js
}


//Decides when a heart is available
function giveHeart() {
  showHeart = Math.random() * (4 - 1) + 1;
  heart.heartAvailable = true;
}



function levelUp() {
  level = level + 1;
  levelDisplay.innerHTML = "Level " + level;

  enemyAmount = 6 + level;
  //X-axis Starting Position of Enemey
  enemyStartX = -200;
  giveHeart();

  //Creates a new enemy


  for (var i = 0; i < enemyAmount; i++) {
    //Y-axis Starting position for enemey
    var enemyStartY = Math.random() * (435 - 45) + 45;
    //Enemy Speed
    var enemySpeed = Math.random() * (300 - 100) + 100;
    //Creates New Enemys based on the enemy amount 
    allEnemies[i] = new Enemy(enemyStartX, enemyStartY, enemySpeed);
  }

  if (level === 2) {
    document.body.innerHTML = "<div id='winner'><p>you win</p></div>"
  }
}

function lifetracker() {
  if (livesAmount === 5) {
    lifeText = "&#9825&#9825&#9825&#9825&#9825";
  } else if (livesAmount === 4) {
    lifeText = "&#9825&#9825&#9825&#9825";
  } else if (livesAmount === 3) {
    lifeText = "&#9825&#9825&#9825";
  } else if (livesAmount === 2) {
    lifeText = "&#9825&#9825";
  } else if (livesAmount === 1) {
    lifeText = "&#9825";
  } else if (livesAmount < 1) {
    document.body.innerHTML = "<div id='loser'><p>You Lose</p></div>"

  }

  lifeDisplay.innerHTML = "<p>" + lifeText + "</p>";
}

function colisionDetectionEnemy(theEnemy) {
  if (player.y + 73 <= theEnemy.y + 135 && player.x + 25 <= theEnemy.x + 88 && player.y + 131 >= theEnemy.y + 90 && player.x + 76 >= theEnemy.x + 11) {
    //Reset player position if collis  
    player.y = 650;
    livesAmount = livesAmount - 1;
    lifetracker();
    giveHeart();
  }
}

function colisionDetectionHeart(theHeart) {
  if (player.y + 73 <= theHeart.y + 135 && player.x + 25 <= theHeart.x + 88 && player.y + 131 >= theHeart.y + 90 && player.x + 76 >= theHeart.x + 11) {
    //Reset player position if collis  
    livesAmount = livesAmount + 1;
    heart.x = 800;
    heart.y = 800;
    lifetracker();
  }
}

//Checks if player has reached the top of the screen and resets to the bottom
//Checks if player is touching the side of the screen and stops movement.
//Resets the player if they reach the top of the screen back to the bottom
//Stops player movement if the reach the bottom,left or right side of the screen
function playerReset() {
  //   console.log("Y Postistion", player.y);
  //   console.log("X Posistion", player.x);
  if (player.y < -1) {
    player.y = 650;
    levelUp();
    giveHeart();
  }
  if (player.y > 650) {
    player.y = 650;
  }
  if (player.x < -22.5) {
    player.x = -22.5
  }
  if (player.x > 725) {
    player.x = 725
  }
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});