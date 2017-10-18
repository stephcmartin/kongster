//this game will have only 1 state
var GameState = {

  //initiate game settings
  init: function() {

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
    // this.ground.angle = 60 // this changes the angle os sprite
  },

  update: function() {
  },

};

//initiate the Phaser framework
var game = new Phaser.Game(360, 592, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');
