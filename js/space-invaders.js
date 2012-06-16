$(document).ready(function() {
    var canvas = $('#canvas');
    var ctx;
    var WIDTH, HEIGHT;
    var running = true;
    var backgroundColour = '#3d3d3d';
    var aliens = [];
    var bullets = [];
    var x = 50;
    var y = 50;
    var player;
    var leftPressed = false;
    var rightPressed = false;
    var spacePressed = false;
    var dx = 2;

    function circle(x,y,r) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }

    function rect(x,y,w,h) {
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.closePath();
        ctx.fill();
    }

    function clear() {
        ctx.fillStyle = backgroundColour;
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        rect(0,0,WIDTH,HEIGHT);
    }

    function Alien(x, y) {
        var x;
        var y;
        var size;
        var health;
        var colour;

        this.x = x;
        this.y = y;
        this.size = 10;
        this.health = 100;
        this.colour = '#efe';

    }

    Alien.prototype = {
        draw: function() {
            ctx.fillStyle = this.colour;
            circle(this.x, this.y, this.size);
        }
    };

    function Player() {
        var x;
        var y;
        var height;
        var width;
        var colour;
        var health;

        this.width = 50;
        this.height = 10;
        this.x = (WIDTH / 2) - (this.width / 2);
        this.y = HEIGHT - this.height;
        this.colour = '#ffe';
    }

    Player.prototype = {
        draw: function() {
            ctx.fillStyle = this.colour;
            rect(this.x, this.y, this.width, this.height);
        }
    };

    function Bullet(player) {
        var x;
        var y;
        var height;
        var width;
        var colour;

        this.width = 4;
        this.height = 10;
        this.x = player.x + (player.width / 2);
        this.y = player.y - this.height;
        this.colour = '#f33';
    }

    Bullet.prototype = {
        draw: function() {
            ctx.fillStyle = this.colour;
            rect(this.x, this.y, this.width, this.height);
        }
    };

    function populateAliens() {
        aliens.push(new Alien(80, 50));
    }

    function updateAliens() {
        for(var i = 0; i < aliens.length; i++) {
            var alien = aliens[i];
            alien.x += dx;
            if(alien.x >= WIDTH || alien.x <= 0) {
                dx = -dx;
            }
        }
    }

    function onKeyDown(evt) {
        switch(evt.keyCode) {
            case 37: // left
                evt.preventDefault();
                leftPressed = true;
                break;
            case 39: // right
                evt.preventDefault();
                rightPressed = true;
                break;
            case 32: //space
                evt.preventDefault();
                spacePressed = true;
                break;
            
            default:
                break;
        }
    }

    function onKeyUp(evt) {
        switch(evt.keyCode) {
            case 37:
                leftPressed = false;
                break;
             case 39:
                rightPressed = false;
                break;
            case 32:
                spacePressed = false;
                break;

            default:
                break;
        }
    }

    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    function draw() {
        clear();
        if(running) {
            // add everything - probably shouldn't be in draw :/
            if(leftPressed && player.x > 0) {
                player.x -= 5;
            }
            if(rightPressed && (player.x + player.width) < WIDTH) {
                player.x += 5;
            }
            if(spacePressed) {
                bullets.push(new Bullet(player));
                spacePressed = false;
            }

            updateAliens();

            // draw everything!
            for(var i = 0; i < aliens.length; i++) {
                aliens[i].draw();
            }
            player.draw();
            for(var i = 0; i < bullets.length; i++) {
                var bullet = bullets[i];
                bullet.draw();
                bullet.y -= 10;
                if(bullet.y + bullet.height < 0) {
                    bullets.shift(); // remove first item from array
                }
            }
        }
    }

    function init() {
        WIDTH = canvas.width();
        HEIGHT =  canvas.height();
        ctx = canvas[0].getContext("2d");
        populateAliens();
        player = new Player();

        intervalId = setInterval(draw, 10);
    }

    init();
});