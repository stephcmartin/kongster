//this game will have only 1 state
var GameState = {

  //initiate game settings
  init: function() {
this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
this.scale.pageAlignVertically = true // This ceneters the Game vertically
this.scale.pageAlignHorizontally = true // This ceneters the Game horizontally
this.game.physics.startSystem(Phaser.Physics.ARCADE) // telling phaser that there will be some physics, by default it doesn't apply to all physics
this.game.physics.arcade.gravity.y = 1000
  },

  //load the game assets before the game starts
  preload: function() {
this.load.image('ground', 'assets/images/ground.png')
  },
  //executed after everything is loaded
  create: function() {
    this.ground = this.add.sprite(100, 200, 'ground') //
    this.ground.anchor.setTo(0.5)
    // this.ground.x = 300
    // this.ground.scale.setTo(1,2) // Changes to ratio
    // this.ground.angle = 60 // this changes the angle of sprite
    this.game.physics.arcade.enable(this.ground)
    this.ground.body.allowGravity = false // this makes it NOT fall. Uncommit to fall.
  },

  update: function() {
    // this.ground.angle += 1 // anything that you want to be doing at all times
  },

};

//initiate the Phaser framework
var game = new Phaser.Game(360, 592, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
