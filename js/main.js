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

    // define the size of the world
    this.game.world.setBounds(0, 0, 360, 700)
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
    // pre-load jason text file
    this.load.text('level', 'assets/data/level.json')

  },
  //executed after everything is loaded
  create: function() {
    // ground
    this.ground = this.add.sprite(0, 638, 'ground')
    this.game.physics.arcade.enable(this.ground)
    this.ground.body.allowGravity = false // the body gives us access to prototypes e.g velocity and math
    this.ground.body.immovable = true // this means you can't move it even if you step on it

    // One Single platform
    // this.platform = this.add.sprite(0, 300, 'platform')
    // this.game.physics.arcade.enable(this.platform)
    // this.platform.body.allowGravity = false
    // this.platform.body.immovable = true

    // player
    this.player = this.add.sprite(0, 545, 'player', 3)
    this.player.anchor.setTo(0.5)
    this.player.animations.add('walking', [0, 1 , 2 , 1], 6, true) // this is the animation for the walking player.
    // the array shows the order of the images
    this.game.physics.arcade.enable(this.player) // we call play the order loop options.
    // this.player.play('walking') // we call play the order loop options.
    this.player.customParams = {}
    this.game.camera.follow(this.player)

    // create on screen controls
    this.createOnScreenControls()

    // create barrels
    this.barrels = this.add.group()
    this.barrels.enableBody = true
    this.createBarrel()
    this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this)

//parse the file
this.levelData = JSON.parse(this.game.cache.getText('level'))

      this.platforms = this.add.group()
      this.platforms.enableBody = true
      this.levelData.platformData.forEach(function(element){
        this.platforms.create(element.x, element.y, 'platform')
      }, this)
      this.platforms.setAll('body.immovable', true) // this means the platforms will not move
      this.platforms.setAll('body.allowGravity', false) // true or false sets or removes gravity to the set of images.
// fire_spritesheet

this.fires = this.add.group()
this.fires.enableBody = true

let fire
this.levelData.fireData.forEach(function(element){
  fire = this.fires.create(element.x, element.y, 'fire')
  fire.animations.add('fire', [0, 1], 4, true)
  fire.play('fire')
}, this)
  this.fires.setAll('body.allowGravity', false)

  // goal
  let goal
  this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal')
  this.game.physics.arcade.enable(this.goal)
  this.goal.body.allowGravity = false
  },

// update method gets called multiple times a second
  update: function() {
    // this.ground.angle += 1 // this spins the ground
    this.game.physics.arcade.collide(this.ground, this.player) // specify which two groups are going to collide
    this.game.physics.arcade.collide(this.platforms, this.player) // These two things do not interfere with each other
    this.game.physics.arcade.collide(this.barrels, this.ground)
    this.game.physics.arcade.collide(this.barrels, this.platforms)
    this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer)
    this.game.physics.arcade.overlap(this.player, this.goal, this.win)
    this.game.physics.arcade.overlap(this.player, this.barrels, this.killPlayer)
    this.player.body.velocity.x = 0

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED
      this.player.scale.setTo(1, 1)
      this.player.play('walking')
    } else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED
      this.player.scale.setTo(-1, 1)
      this.player.play('walking')
    } else {
      this.player.animations.stop()
      this.player.frame = 3
    }
// create cursors that will allow user to jump ONLY is it is touching something below him
    if((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down){
      this.player.body.velocity.y = -this.JUMPING_SPEED
      this.player.customParams.mustJump = false
    }

    this.barrels.forEach(function(element){
      if(element.x < 10 && element.y > 600) {
        element.kill()
      }
    }, this)
  },

  createOnScreenControls: function (){
    this.levelData = JSON.parse(this.game.cache.getText('level'))
    this.leftArrow = this.add.button(20, 535, 'arrowButtonLeft')
    this.rightArrow = this.add.button(80, 535, 'arrowButtonRight')
    this.actionButton = this.add.button(250, 550, 'spacebar')

    // makes the button transparent
    this.leftArrow.alpha = 0.7
    this.rightArrow.alpha = 0.7

    // actions events for Space bar
    this.actionButton.events.onInputDown.add(function(){
      this.player.customParams.mustJump = true
    }, this)

    this.actionButton.events.onInputUp.add(function(){
      this.player.customParams.mustJump = false
    }, this)

    // action events for left button
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingLeft = true
    }, this)

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingLeft = false
    }, this)

    // for more mobile accuracy
    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingLeft = true
    }, this)

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingLeft = false
    }, this)

    // action events for right button
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingRight = true
    }, this)

    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingRight = false
    }, this)

    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingRight = true
    }, this)

    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingRight = false
    }, this)

    this.leftArrow.fixedToCamera = true
    this.rightArrow.fixedToCamera = true
    this.actionButton.fixedToCamera = true
  },
  killPlayer: function (player, fire){
  alert('Ouch! You Lose.')
      game.state.start('GameState');
    },
  win: function (player, goal){
      alert('You Won!')
        game.state.start('GameState');
      },
  createBarrel: function(){
    // create first dead sprite if there is any
    let barrel = this.barrels.getFirstExists(false)
      if(!barrel) {
        barrel = this.barrels.create(20, 90, 'barrel')
      }
        barrel.body.collideWorldBounds = true // makes barrels stop at the 'side ends'
        barrel.body.bounce.set(1, 0) // bounces off the end
        barrel.reset(this.levelData.goal.x, this.levelData.goal.y)
        barrel.body.velocity.x = this.levelData.barrelSpeed
      }

};

//initiate the Phaser framework
var game = new Phaser.Game(360, 600, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
