export default class Juego extends Phaser.Scene {
  constructor() {
    super("juego");
  }

  init() {
    this.candy = 1;
    this.nivel = 1;
    this.amountcandys = 0;
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
    const capaFakeWall = map.addTilesetImage("wall", "wall");
    const backgroundLayer = map.createLayer("background", capaBackground, 0, 0);
    const platformLayer = map.createLayer("platform", capaPlatform, 0, 0);
    const wallLayer = map.createLayer("wall", capaWall, 0, 0);
    const fakeWallLayer = map.createLayer("fakewall", capaFakeWall, 0, 0);
    platformLayer.setCollisionByProperty({ colision: true });
    wallLayer.setCollisionByProperty({ colision: true });

   
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
    this.platforms = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    this.platforms.create(470.757575757575, 1534.75757575758, "platform2");
    this.platforms.create(1422.42424242425, 1526.60606060606, "platform2");
    this.platforms.create(1976.06060606061, 1519.87878787879, "platform2");
    this.platforms.create(2247.21212121213, 1734, "platform2");
    this.platforms.create(2484.42424242424, 1188.75757575757, "platform2");
    this.platforms.create(56.6515151515142, 415.378787878784, "platform2");
    this.platforms.create(1414.60606060606, 410.666666666663, "platform2");
    this.platforms.create(3387.15151515151, 392.636363636362, "platform2");
    this.platforms.create(4142.42424242424, 1172.72727272727, "platform2");
    this.platforms.create(3148, 1172, "platform2");

    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);
    this.player.setVelocity(10);

    this.buttons = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });
    this.buttons.create(354, 1754, "button").setData("platform", 0);
    this.buttons
      .create(1344.84848484848, 1753.21212121212, "button")
      .setData("platform", 1);
    this.buttons.create(1676, 1392, "button").setData("platform", 2);
    this.buttons.create(1752, 1392, "button").setData("platform", 3);
    this.buttons.create(1822, 1392, "button").setData("platform", 4);
    this.buttons
      .create(303.030303030303, 1036.36363636364, "button")
      .setData("platform", 5);
    this.buttons
      .create(1351.51515151515, 648.484848484848, "button")
      .setData("platform", 6);
    this.buttons
      .create(3290.90909090909, 645.454545454545, "button")
      .setData("platform", 7);
    this.buttons
      .create(4033.33333333333, 1384.84848484848, "button")
      .setData("platform", 8);
    this.buttons.create(3076, 1774, "button").setData("platform", 9);

    this.physics.add.collider(
      this.player,
      this.platforms,
    );

    this.physics.add.overlap(
      this.player,
      this.buttons,
      this.overlapButton,
      null,
      this
    );
    this.physics.add.collider(
      this.ghosts,
      wallLayer,
      this.changeGhostDirection,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.ghosts,
      this.hitGhost,
      null,
      this
    );
    this.physics.add.collider(this.player, platformLayer);
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.overlap(
      this.player,
      this.candies,
      this.collectCandy,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.door,
      this.nextLevel,
      null,
      this
    );
    this.physics.add.collider(this.ghosts, platformLayer);
    this.physics.add.collider(this.platforms, platformLayer);
    this.physics.add.collider(this.buttons, platformLayer);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.amountcandysTexto = this.add.text(40, 40, `x ${this.amountcandys}`);
    this.amountcandysTexto.setScrollFactor(0);

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
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
    if (this.cursors.up.isDown && this.cursors.left.isDown) {
      this.player.setVelocityY(-550);
      this.player.anims.play("jumpLeft");
  }else if(this.cursors.up.isDown && this.cursors.right.isDown){
      this.player.setVelocityY(-550);
      this.player.anims.play("jumpRight");
  }else if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-550);
      this.player.anims.play("jumpLeft")
}

    if (
      Phaser.Input.Keyboard.JustDown(this.spacebar) &&
      this.player.body.touching.down &&
      this.overlappingButton
    ) {
      this.activatePlatform();
    }
    console.log(this.candies);
  }


  overlapButton(player, button) {
    this.overlappingButton = true;
    this.overlapedButton = button;
    setTimeout(() => {
      this.overlappingButton = false;
      this.overlapedButton = null;
    }, 1000);
  }

  activatePlatform() {
    const platform =
      this.platforms.getChildren()[this.overlapedButton.getData("platform")];
    this.tweens.add({
      targets: platform,
      y: platform.y + 300,
      duration: 2000,
      ease: "linear",
      yoyo: true,
      repeat: 0,
    });
  }

  nextLevel(player, door) {
    this.scene.start("win");
  }

  collectCandy(player, candy) {
    console.log("candy hit");
    candy.disableBody(true, true);
    this.amountcandys++;
    console.log(this.amountcandys);
    this.amountcandysTexto.setText(`x ${this.amountcandys}`);
  }

}
