/**
 * app.js
 * This file consist of implementation of enemies and player class, there movement and
 * there collision
 */


/**
 * Defines the Enemy object constructor
 * @param xPos x coordinate of enemy
 * @param yPos y coordinate of enemy
 * @param speed speed of enemy
 * @constructor
 */
var Enemy = function (xPos, yPos, speed, i) {

    this.sprite = 'images/enemy-bug.png';
    this.x = xPos;
    this.y = yPos;
    this.speed = speed;
    this.index = i;

};

/**
 * Defines Enemy object prototype function
 * @param dt the increment factor for image update
 */
Enemy.prototype.update = function (dt) {

    var RIGHT_BOUNADRY = 410;
    var MAX_SPEED = 300;
    var MIN_SPEED = 70;
    var X_BEGINING_POS = -50;

    // if enemy passes left boundary  of canvas, redraw it
    if (this.x > RIGHT_BOUNADRY) {
        this.x = X_BEGINING_POS;
        this.speed = Math.floor(Math.random() * (300- 70) )+ 70;

    } else {
        this.x += ((this.speed) * dt);

        }
    //  object of DetectCollision    
    detectCollision.collision(this.index);
};

/**
 * Defines enemy object render prototype
 */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Defines the Player object function constructor
 * @constructor
 */
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200; // initial x position
    this.y = 430; // initial y position
};


/**
 * Defines Player object update prototype
 *  !! this function is used in engine.js  line 98
 *  but does nothing here
 */
Player.prototype.update = function (dt) {
   
    if( this.y <= -10) {
        resetPlayer();
        }
};

/**
 * Defines Player object prototype for handling keyboard movement
 * @param direction keyboard input
 */
Player.prototype.handleInput = function (direction) {

    switch (direction) {
        case 'up':
            var tempY = this.y - 50;
            if (tempY < 30) {
                this.y = -10;
            } else {
                this.y -= 50;
            }
            break;
        case 'down':

            var tempY = this.y + 50;
            if (tempY>= 430) {
                this.y = 430;
            } else {
                this.y = tempY;
            }
            break;
        case 'left':
            if (this.x < 20) {
                this.x = 0;
            } else {
                this.x -= 50;
            }
            break;
        case 'right':
            if (this.x > 350) {
                this.x = 400;
            } else {
                this.x += 50;
            }
    }

};

/**
 * Defines Player object render prototype function
 */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



/**
 *
 * Enemy object instantiation
 */
var allEnemies = [new Enemy(20, 230, 100, 0), new Enemy(80 ,150,70, 1),new Enemy(150, 70, 40, 2)];

/**
 * Player object instantiation
 */
var player = new Player();

/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//function for detecting collision
//var splash = new Image();
//splash.src = 'images/Rock.png';


/**
 * Function for repositioning player after collision is detected
 */
function resetPlayer() {

	//Setting player initial position
	player.x = 200;
	player.y = 430;

};

/**
 *Not Yet Implemented
 * @constructor
 */
var Splash = function () {
    this.sprite = "images/Rock.png";
    this.x = 300;
    this.y = 400;

};

/**
 *Not Yet Implemented
 */
Splash.prototype.render = function () {
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

/**
 * Not Yet Implemented
 */
Splash.prototype.reset = function () {
    this.x = -200;
    this.y = -200;
};
/**
 * Not Yet Implemented
 * variable for displaying splash screen , yet to implement
 * @type {null}
 */
var splash = null;





// interface DetectCollision
/*
interface DetectCollision  {
    function detectCollison(playerObj, enemyObj);
};
*/

var DetectCollision = function(players , enemies) {
    this.playerObj = players;
    this.eneimies = enemies;

};

/**
 * Prototype function of detect collision
 *   this functuion takes index as parameter and
 * detect the collison between indexed enemy and
 * player
 */
DetectCollision.prototype.collision = function(i) {
    var playerObj = this.playerObj;
    var enemyObj  = this.eneimies[i];

         if (playerObj.x < enemyObj.x + 80 &&
            playerObj.x + 80 > enemyObj.x &&
            playerObj.y < enemyObj.y + 60 &&
            playerObj.y + 60 > enemyObj.y
        ) {
                resetPlayer();

            }
        
        };

/**
 * Instantiation of DetectCollision object
 */
var detectCollision = new DetectCollision(player, allEnemies);



