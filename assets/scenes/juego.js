export default class juego extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("juego");
  }
  init() {
    this.candy = 1;
    this.nivel = 1;
    this.amountcandys = 0;
    console.log("Prueba !");
    this.gameOver = false;
  }

  create() {
    // todo / para hacer: texto de puntaje
    const map = this.make.tilemap({ key: "map1" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const capaBackground = map.addTilesetImage("fondo", "background");
    const capaPlatform = map.addTilesetImage("plataforma2", "platform");
    const capaEngranaje = map.addTilesetImage("engranaje1", "engranaje");
    const capaWall = map.addTilesetImage("wall", "wall");
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const backgroundLayer = map.createLayer("background", capaBackground, 0, 0);
    const platformLayer = map.createLayer("platform", capaPlatform, 0, 0);
    const engranajeLayer = map.createLayer("engranaje", capaEngranaje, 0, 0);
    const wallLayer = map.createLayer("wall", capaWall, 0, 0);

    platformLayer.setCollisionByProperty({ colision: true });
    wallLayer.setCollisionByProperty({ colision: true });

    this.candies = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });
    this.buttons = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });
    this.doorsClosed = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });

    this.platformsMobible = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    const objectsLayer = map.getObjectLayer("objects");
    objectsLayer.objects.forEach((objData) => {
      const { x = 0, y = 0, name, type } = objData;
      switch (name) {
        case "candy": {
          this.candy = this.candies.create(x, y, "candy");
          break;
        }
        case "doorClosed": {
          const doorClosed = this.doorsClosed.create(x, y, "doorClosed");
          break;
        }
        case "player": {
          this.player = this.physics.add.sprite(x, y, "lyla");
          break;
        }
      }

      switch (type) {
        case "platform": {
          this.platformsMobible.create(x, y, "platform2");
          break;
        }
        case "button": {
          this.buttons.create(x, y, "button");
          console.log("button");
          break;
        }
      }
    });
    console.log("spawn point player", objectsLayer);
    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);
    this.player.setVelocity(10);

    this.physics.add.collider(this.player, platformLayer);
    this.physics.add.collider(this.player, wallLayer);

    this.physics.add.overlap(
      this.player,
      this.candies,
      this.collectCandy,
      null,
      this
    );

    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.amountcandysTexto = this.add.text(
      10,
      20,
      `Nivel: ${this.nivel} / Dulces obtenidos: ${this.amountcandys}`
    );

    this.amountcandysTexto.setScrollFactor(0);
    
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
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
    if (Phaser.Input.Keyboard.JustDown(spaceKey)) {
      ;
  }
}

  collectCandy(player, candy) {
    console.log("candy hit");
    candy.disableBody(true, true);
    this.amountcandys++;
    console.log(this.amountcandys);
    this.amountcandysTexto.setText(
      `Nivel: ${this.nivel} / Candys collected: ${this.amountcandys}`
    );
  }
}
