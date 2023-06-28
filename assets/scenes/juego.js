export default class Juego extends Phaser.Scene {
  constructor() {
    super("juego");
  }

  init() {
    this.healt = 3;
    this.candy = 1;
    this.nivel = 1;
    this.amountcandys = 0;
    console.log("Prueba !");
    this.gameOver = false;
  }

  create() {
    const map = this.make.tilemap({ key: "map1" });

    const capaBackground = map.addTilesetImage("fondo", "background");
    const capaPlatform = map.addTilesetImage("plataforma2", "platform");
    const capaWall = map.addTilesetImage("wall", "wall");
    const capaTable = map.addTilesetImage("mesa", "table");
    const capaLibrary = map.addTilesetImage("library", "library");
    
    const backgroundLayer = map.createLayer("background", capaBackground, 0, 0);
    const platformLayer = map.createLayer("platform", capaPlatform, 0, 0);
    const wallLayer = map.createLayer("wall", capaWall, 0, 0);
    const libraryLayer = map.createLayer("library", capaLibrary, 0, 0);
    const tableLayer = map.createLayer("table", capaTable, 0, 0);
    //colision de tiled
    libraryLayer.setCollisionByProperty({ colision: true });
    platformLayer.setCollisionByProperty({ colision: true });
    wallLayer.setCollisionByProperty({ colision: true });
    tableLayer.setCollisionByProperty({ colision: true });
    this.candies = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    this.doorsClosed = this.physics.add.group({
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
        case "ghost2": {
          this.ghost = this.physics.add.sprite(x, y, "spritesheet");
          break;
        }
      }
    });

    this.player.setBounce(0.0);
    this.player.setCollideWorldBounds(true);
    this.player.setVelocity(10);

    this.ghost.setCollideWorldBounds(true);
    this.ghost.setVelocity(8);
    this.physics.add.collider(this.player, this.ghost, this.hurt);
    this.physics.add.collider(this.player, platformLayer);
    this.physics.add.collider(this.ghost, platformLayer);
    this.physics.add.collider(this.ghost, wallLayer, this.changeGhostVelocity, null, this);
    this.physics.add.collider(this.ghost2, platformLayer);
    this.physics.add.collider(this.ghost2, wallLayer, this.changeGhostVelocity, null, this);
    this.physics.add.collider(this.player, wallLayer);
    this.physics.add.collider(this.player, tableLayer);
    this.physics.add.collider(this.player, libraryLayer);
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
      40,
      40,
      ` x ${this.amountcandys}`
    );

    this.amountcandysTexto.setScrollFactor(0);

    this.ghost.setVelocityX(-150);
    this.cursors = this.input.keyboard.createCursorKeys();
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
    if (this.ghost.body.velocity.x < 0) {
      this.ghost.anims.play("Gleft", true); // Usar la animación "Gleft" cuando la velocidad sea negativa
    } else if (this.ghost.body.velocity.x > 0) {
      this.ghost.anims.play("Gright", true); // Usar la animación "Gright" cuando la velocidad sea positiva
    }
  }
  changeGhostVelocity() {
    this.ghost.setVelocityX(-this.ghost.body.velocity.x); // Cambiar la velocidad del sprite "ghost" a la dirección opuesta
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