// Enemies our player must avoid
var Enemy = function(x,y,speed) {
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
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed){
  this.sprite = 'images/char-boy.png'
  this.x = x;
  this.y = y;
  this.speed = speed;
  
}



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202.5,383,75)


Player.prototype.handleInput = function(key){
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
  reset();
}

 //Checks if player has reached the top of the screen and resets to the bottom
 //Checks if player is touching the side of the screen and stops movement.
 function reset(x,y){
  console.log("Y Postistion",player.y);
  console.log("X Posistion",player.x);
  if(player.y < -5){
    player.y = 383;
  }
}

Player.prototype.update = function() {
    // function not needed right now
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
