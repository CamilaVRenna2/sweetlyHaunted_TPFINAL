export default class juego extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("juego");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}

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

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const backgroundLayer = map.createLayer("background", capaBackground, 0, 0);
    const platformLayer = map.createLayer("platform", capaPlatform, 0, 0);
    const engranajeLayer = map.createLayer("engranaje", capaEngranaje, 0, 0);

    const objectsLayer = map.getObjectLayer("objects");

    platformLayer.setCollisionByProperty({ colision: true });

    // console.log("spawn point player", objectsLayer);

    // crear el player
    // Find in the Object Layer, the name "lyla" and get position
    let spawnPoint = map.findObject("objects", (obj) => obj.name === "player");
    console.log(spawnPoint);
    // The player and its settings

    // this.player = this.physics.add.sprite(
    //   93.9393939393939,
    //   1145.45454545455,
    //   "lyla"
    // );

    //  Player physics properties. Give the little guy a slight bounce.

    spawnPoint = map.findObject("objects", (obj) => obj.name === "doorClosed");
    console.log(spawnPoint);
    this.doorClosed = this.physics.add.sprite(
      2160.60606060606,
      1139.39393939394,
      "doorClosed"
    );
    spawnPoint = map.findObject("objects", (obj) => obj.name === "1");
    console.log(spawnPoint);
    //

    this.cursors = this.input.keyboard.createCursorKeys();

    // Create empty group of starts
    this.candy = this.physics.add.group();

    // find object layer
    // if type is "stars", add to stars group
    objectsLayer.objects.forEach((objData) => {
      //console.log(objData.name, objData.type, objData.x, objData.y);

      const { x = 0, y = 0, name } = objData;
      switch (name) {
        case "candy": {
          // add star to scene
          // console.log("candy agregada: ", x, y);
          const candy = this.candy.create(x, y, "candy");
          break;
        }
        case "player": {
          this.player = this.physics.add.sprite(x, y, "lyla");
          break;
        }
      }

      switch (type) {
        case "button": {
          this.physics.add.sprite(x, y, "button");
          break;
        }
      }
    });
    this.player.setBounce(0.01);
    this.player.setCollideWorldBounds(true);
    this.player.setVelocity(10);

    this.doorClosed.visible = true;

    // this.physics.add.collider(this.player, platformLayer);
    // this.physics.add.collider(this.candy, platformLayer);
    // this.physics.add.collider(
    //   this.player,
    //   this.candy,
    //   this.collectedCandy(),
    //   null,
    //   this
    // );

    // this.physics.add.collider(this.doorOpen, plataformaLayer);
    // this.physics.add.overlap(
    //   this.player,
    //   this.doorOpen,
    //   this.NextLevel,
    //   () => this.amountcandys >= 1, // condicion de ejecucion
    //   this
    // );

    /// mostrar amountcandy en pantalla
    this.amountcandysTexto = this.add.text(
      20,
      5,
      "Nivel: " +
        this.nivel +
        " / candys collected: " +
        { fontSize: "24px", fontFamily: "impact", fill: "#FFFFFF" }
    );
    this.amountcandys.toString(),
      // world bounds
      this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // camara dont go out of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
  }

  update() {
    if (this.gameOver) {
      this.scene.start("GameOver");
    }
    // update game objects
    // check input
    //move left

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-260);
      this.player.anims.play("left", true);
    }
    //move right
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(260);
      this.player.anims.play("right", true);
    }
    //stop
    else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }

    //jump
    if (this.cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-550);
    }
  }

  // collectedCandy(player, candy) {
  //   candy.disableBody(true, true);

  //   // todo / para hacer: sumar puntaje
  //   //this.amountcandys = this.amountcandys + 1;

  //   if (this.candys.getTotalUsed() === 0) {
  //     this.doorOpen.visible = true;
  //   }

  //   this.amountcandys++;

  //   this.amountcandysTexto.setText(
  //     30,
  //     30,
  //     "Nivel: " +
  //       this.nivel +
  //       " / candys collected: " +
  //       this.amountcandys.toString()
  //   );
  //   this.amountcandysTexto.setScrollFactor(0);
  // }

  NextLevel(player, doorOpen) {}
}
