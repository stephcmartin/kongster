//this game will have only 1 state
var GameState = {

  //initiate game settings
  init: function() {
    //adapt to screen size, fit all the game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //game alignment
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //start physics engine on a global level
    //(using phaser global using individual sprite)
    this.game.physics.startSystem(Phaser.Physics.ARCADE); // this starts the Arcade System.
    // Arcade systems stimulates everything in rectangles
    this.game.physics.arcade.gravity.y = 1000 // set the gravity for the whole game
    // the value changes the speed

    this.cursors = this.game.input.keyboard.createCursorKeys() // allows users to use the keyboard to play the game
    this.RUNNING_SPEED = 180
    this.JUMPING_SPEED = 550
  },

  //load the game assets before the game starts
  preload: function() {
    this.load.image('ground', 'assets/images/ground.png')
    this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1)
    this.load.image('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1)
    this.load.image('goal', 'assets/images/gorilla3.png')
    this.load.image('arrowButton', 'assets/images/arrowButton.png')
    this.load.image('arrowButtonLeft', 'assets/images/arrowButtonLeft.png')
    this.load.image('arrowButtonRight', 'assets/images/arrowButtonRight.png')
    this.load.image('actionButton', 'assets/images/actionButton.png')
    this.load.image('barrel', 'assets/images/barrel.png')
    this.load.image('platform', 'assets/images/platform.png')
    this.load.image('spacebar', 'assets/images/spacebar.png')

  },
  //executed after everything is loaded
  create: function() {
    // ground
    this.ground = this.add.sprite(0, 530, 'ground')
    this.game.physics.arcade.enable(this.ground)
    this.ground.body.allowGravity = false // the body gives us access to prototypes e.g velocity and math
    this.ground.body.immovable = true // this means you can't move it even if you step on it

    // platform
    this.platform = this.add.sprite(0, 300, 'platform')
    this.game.physics.arcade.enable(this.platform)
    this.platform.body.allowGravity = false
    this.platform.body.immovable = true

    // player
    this.player = this.add.sprite(100, 200, 'player', 3)
    this.player.anchor.setTo(0.5)
    this.player.animations.add('walking', [0,1,2,1], 6, true) // this is the animation for the walking player.
    // the array shows the order of the images
    this.game.physics.arcade.enable(this.player) // we call play the order loop options.
    // this.player.play('walking') // we call play the order loop options.
    this.player.customParams = {}

    // create on screen controls
    this.createOnScreenControls()

    // // group of playforms
    // this.platforms = this.add.group() //place holder for spirte that can be used as if it is a sprite
    // this.platforms.setAll('body.immovable', true)
    // this.platforms.setAll('body.allowGravity', true) // true or false sets or removes gravity to the set of images.

  },

// update method gets called multiple times a second
  update: function() {
    // this.ground.angle += 1 // this spins the ground
    this.game.physics.arcade.collide(this.ground, this.player) // specify which two groups are going to collide
    this.game.physics.arcade.collide(this.platform, this.player) // These two things do not interfere with each other

    this.player.body.velocity.x = 0

    if(this.cursors.left.isDown) {
      this.player.body.velocity.x = -this.RUNNING_SPEED
    } else if(this.cursors.right.isDown) {
      this.player.body.velocity.x = this.RUNNING_SPEED
    }
// create cursors that will allow user to jump ONLY is it is touching something below him
    if(this.cursors.up.isDown && this.player.body.touching.down){
      this.player.body.velocity.y = -this.JUMPING_SPEED
    }
  },

  createOnScreenControls: function (){
    this.leftArrow = this.add.button(20, 535, 'arrowButtonLeft')
    this.rightArrow = this.add.button(80, 535, 'arrowButtonRight')
    this.action = this.add.button(250, 550, 'spacebar')

    // makes the button transparent
    this.leftArrow.alpha = 0.7
    this.rightArrow.alpha = 0.7
  }

};

//initiate the Phaser framework
var game = new Phaser.Game(360, 600, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
