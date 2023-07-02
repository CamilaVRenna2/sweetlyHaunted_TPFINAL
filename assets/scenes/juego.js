export default class Juego extends Phaser.Scene {
  constructor() {
    super("juego");
  }

  init() {
    this.ghosts;
    this.candy = 1;
    this.nivel = 1;
    this.amountcandys = 0;
    console.log("¡Prueba!");
    this.gameOver = false;
    this.platforms;
    this.buttons;
    this.lives = 3;
    this.spacebar;
    this.overlappingButton = false;
  }

  create() {
    const map = this.make.tilemap({ key: "map1" });
    const capaBackground = map.addTilesetImage("fondo", "background");
    const capaPlatform = map.addTilesetImage("plataforma2", "platform");
    const capaWall = map.addTilesetImage("wall", "wall");

    const backgroundLayer = map.createLayer("background", capaBackground, 0, 0);
    const platformLayer = map.createLayer("platform", capaPlatform, 0, 0);
    const wallLayer = map.createLayer("wall", capaWall, 0, 0);

    platformLayer.setCollisionByProperty({ colision: true });
    wallLayer.setCollisionByProperty({ colision: true });

    this.ghosts = this.physics.add.group();
    this.ghost1 = this.ghosts.create(1069.33229965257, 529.527895023976, 'ghost');
    this.ghost2 = this.ghosts.create(1058.66666666667, 1292, 'ghost');
    this.ghosts.setVelocityX(100);
    this.ghost1.anims.play('Gright');
    this.ghost2.anims.play('Gright');
    this.candies = this.physics.add.group({
      immovable: true,
      allowGravity:false,
    });
    this.door = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    const objectsLayer = map.getObjectLayer("objects");
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "candy": {
          this.candy = this.candies.create(x, y, "candy");
          break;
        }
        case "door": {
          this.door = this.door.create(x, y, "doorOpen");
          break;
        }
        case "player": {
          this.player = this.physics.add.sprite(x, y, "lyla");
          break;
        }
      }
    });
    // this.platforms = this.physics.add.group({
    //   immovable: true,
    //   allowGravity:false,
    // });
  this.platforms = this.physics.add.group();
  const platform1 = this.platforms.create(470.757575757575, 1534.75757575758, 'platform2');
  const platform2 = this.platforms.create(1422.42424242425, 1526.60606060606, 'platform2');
  const platform3 = this.platforms.create(1976.06060606061, 1519.87878787879, 'platform2');
  const platform4 = this.platforms.create(2247.21212121213, 1734, 'platform2');
  const platform5 = this.platforms.create(2484.42424242424, 1188.75757575757, 'platform2');
  const platform6 = this.platforms.create(56.6515151515142, 415.378787878784, 'platform2');
  const platform7 = this.platforms.create(1414.60606060606, 410.666666666663, 'platform2');
  const platform8 = this.platforms.create(3387.15151515151, 392.636363636362, 'platform2');
  const platform9 = this.platforms.create(4142.42424242424, 1172.72727272727, 'platform2');
  const platform10 = this.platforms.create(3148, 1172, 'platform2');

  platform1.body.allowGravity = false;
  platform2.body.allowGravity = false;
  platform3.body.allowGravity = false;
  platform4.body.allowGravity = false;
  platform5.body.allowGravity = false;
  platform6.body.allowGravity = false;
  platform7.body.allowGravity = false;
  platform8.body.allowGravity = false;
  platform9.body.allowGravity = false;
  platform10.body.allowGravity = false;
  
  

  this.player.setBounce(0.0);
  this.player.setCollideWorldBounds(true);
  this.player.setVelocity(10);

  this.buttons = this.physics.add.group();
  const button1 = this.buttons.create(354, 1754, 'button');
  const button2 = this.buttons.create(1344.84848484848,1753.21212121212 , 'button');
  const button3 = this.buttons.create(1676, 1392, 'button');
  const button4 = this.buttons.create(1752, 1392 , 'button');
  const button5 = this.buttons.create(1822, 1392, 'button');
  const button6 = this.buttons.create(303.030303030303,1036.36363636364 , 'button');
  const button7 = this.buttons.create(1351.51515151515, 648.484848484848, 'button');
  const button8 = this.buttons.create(3290.90909090909, 645.454545454545 , 'button');
  const button9 = this.buttons.create(4033.33333333333, 1384.84848484848, 'button');
  const button10 = this.buttons.create(3076,1774 , 'button');
  button1.body.allowGravity = false;
  button2.body.allowGravity = false;
  button3.body.allowGravity = false;
  button4.body.allowGravity = false;
  button5.body.allowGravity = false;
  button6.body.allowGravity = false;
  button7.body.allowGravity = false;
  button8.body.allowGravity = false;
  button9.body.allowGravity = false;
  button10.body.allowGravity = false;

  this.platforms.getChildren().forEach(platform => {
    platform.body.allowGravity = false;
    platform.body.moves = false;
  });
    
    this.physics.add.collider(this.player, this.platform1);
    this.physics.add.overlap(this.player, this.buttons, this.overlapButton, null, this);
    this.physics.add.collider(this.ghosts, wallLayer, this.changeGhostDirection, null, this);
    this.physics.add.collider(this.player, this.ghosts, this.hitGhost, null, this);
    this.physics.add.collider(this.player, platformLayer);
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.overlap(this.player, this.candies, this.collectCandy, null, this);
    this.physics.add.overlap(this.player, this.door, this.nextLevel, null, this);
    this.physics.add.collider(this.ghosts, platformLayer);
    this.physics.add.collider(this.platforms, platformLayer);
    this.physics.add.collider(this.buttons, platformLayer);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.amountcandysTexto = this.add.text(
      40,
      40,
      `x ${this.amountcandys}`
    );
    this.amountcandysTexto.setScrollFactor(0);
    
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
 
  }

  update() {
    if (this.gameOver) {
      this.scene.start("GameOver");
    }
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-260);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(260);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-550);
    }
    if (this.spacebar.isDown && this.player.body.touching.down && this.overlappingButton) {
      this.activatePlatform();
    }

  }

  hitGhost(player, ghost) {
    this.lives--;
    if (this.lives === 0) {
      this.gameOver();
    }
  }

  changeGhostDirection(ghost, wallLayer) {
    ghost.setVelocityX(ghost.body.velocity.x * -1);

    if (ghost.body.velocity.x < 0) {
      ghost.anims.play('Gleft', true);
    } else {
      ghost.anims.play('Gright', true);
    }
  }

  overlapButton(player, button) {
    this.overlappingButton = true;
  }

  activatePlatform() {
    var platform = this.platforms.getChildren()[this.buttons.getChildren().indexOf(this.buttons.getFirst(true))];
    var originalY = platform.y;
    var targetY = originalY + 300;

    this.tweens.add({
      targets: platform,
      y: targetY,
      duration: 1000,
      ease: 'Linear',
      yoyo: true,
      repeat: 0
    });

    this.overlappingButton = false;
  }

  nextLevel(player, door) {
    this.scene.start("win");
  }

  collectCandy(player, candy) {
    console.log("candy hit");
    candy.disableBody(true, true);
    this.amountcandys++;
    console.log(this.amountcandys);
    this.amountcandysTexto.setText(
      `x ${this.amountcandys}`
    );
  }

  hurt(player, ghost) {
    player.setTint(0xff0000);
    this.healthN = this.healthN - 1;

    if (this.healthN <= 0) {
      this.gameOver = true;
      console.log("Game Over");
      this.scene.restart();
    } else {
      console.log("Health: " + this.healthN);
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          player.clearTint();
        },
        loop: false,
      });
    }
  }

  changeGhostVelocity(ghost, wall) {
    ghost.setVelocityX(-ghost.body.velocity.x);
  }
}
