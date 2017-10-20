//this game will have only 1 state
var GameState = {

  //initiate game settings
  init: function() {
    //adapt to screen size, fit all the game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //game alignment
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //start physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000
  },

  //load the game assets before the game starts
  preload: function() {
this.load.image('ground', 'assets/images/ground.png')
this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1)

  },
  //executed after everything is loaded
  create: function() {
    this.ground = this.add.sprite(100, 200, 'ground') //
    this.ground.anchor.setTo(0.5)
    this.ground.x = 300
    // this.ground.scale.setTo(1,2) // Changes to ratio
    // this.ground.angle = 60 // this changes the angle of sprite
    this.game.physics.arcade.enable(this.ground)
    // this.ground.body.allowGravity = false

    this.ground2 = this.add.sprite(100, 400, 'ground') //
    this.ground2.anchor.setTo(0.5)
    this.ground2.x = 300
    this.game.physics.arcade.enable(this.ground2)
    this.ground2.body.allowGravity = false // this makes it NOT fall. Uncommit to fall.
    this.ground2.body.immovable = true // this makes the ground NOT move.

    this.ground3 = this.add.sprite(100, 530, 'ground')

    // player
    this.player = this.add.sprite(100, 0, 'player', 3)
    this.player.animations.add('walking', [0,1,2,1], 6, true) // this is the animation for the walking player
  },

  update: function() {
    // this.ground.angle += 1 // anything that you want to be doing at all times
    this.game.physics.arcade.collide(this.ground, this.ground2) // specify which two groups are going to collide
  },

};

//initiate the Phaser framework
var game = new Phaser.Game(360, 600, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
