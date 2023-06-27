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
    var platforms;
    var tween;
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
  
      // Agrega las plataformas
      this.platform3=this.add.image(1514.42424242425, 1178.60606060606, "platform2");
      this.platform4=this.add.image(2284.54545454546, 799.757575757576, "platform2");
      this.platform6=this.add.image(2614.42424242424,804.757575757574, "platform2");
      this.platform2=this.add.image(2899.27272727272, 425.969696969695, "platform2");
      this.platform5=this.add.image(2460.66666666667, 1355.0303030303, "platform2");
      this.platform1=this.add.image(510.7575757575753, 1198.75757575758, "platform2");
      this.platform7=this.add.image(1869.01515151515, 415.13636363636, "platform2");
      this.platform8=this.add.image(1539.33333333333, 409.575757575754, "platform2");
      this.platform9=this.add.image(445.242424242424, 413.181818181818, "platform2");
    
     
    

    this.candies = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });
    // this.buttons = this.physics.add.group({
    //   inmovable: true,
    //   allowGravity: false,
    // });
    this.doorsClosed = this.physics.add.group({
      inmovable: true,
      allowGravity: false,
    });

    // this.platformsMobible = this.physics.add.group({
    //   inmovable: false,
    //   allowGravity: false,
    // });

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
        case "ghost": {
          this.ghost = this.physics.add.sprite(x, y, "spritesheet");
          break;
        }
      }
      // switch (type) {
      //   case "platform": {
      //     this.platformsMobible.create(x, y, "platform2");
      //     break;
      //   }
      //   switch (type) {
      //     case "wall": {
      //       this.platformsMobible.create(x, y, "wall2");
      //       break;
      //     }
      //   }
      // }
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
    
  MovePlatform
    // const startY = 1178.60606060606;
    const targetY = 1198.75757575758;
    const duration = 6000;

    this.tweens.add({
      targets: platform1,
      y: targetY,
      duration: duration,
      ease: "Linear",
      yoyo: true,
      loop: true,
    });
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