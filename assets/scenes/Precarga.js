export default class Precarga extends Phaser.Scene {
  // escena para optimiozar tiempos
  // carga el preload solo una vez y sirve para todo el juego
  constructor() {
    // key of the scene
    super("precarga");
  }

  preload() {
    // load assets
    this.load.tilemapTiledJSON("map1", "../public/tilemap/level1.json");

    this.load.image("background", "./public/images/background.png");
    this.load.image("platform2", "./public/images/plataforma.png");
    this.load.image("platform", "./public/images/plataforma2.png");
    this.load.image("wall", "./public/images/wall.png");
    this.load.image("button", "./public/images/button.png");
    this.load.image("doorOpen", "../public/images/doorOpen.png");
    this.load.image("doorClosed", "../public/images/doorClosed.png");
    this.load.image("engranaje", "../public/images/engranaje1.png");
    this.load.image("menuBackGround", "../public/images/backgroundMenu.png");
    this.load.image("startButton", "../public/images/startButton.png");
    this.load.image("cauldron", "../public/images/caldero.png");
    this.load.image("startButtonOn", "../public/images/startButton_on.png");
    this.load.image("backgroundMapa", "../public/images/backgroundmapa.png");
    this.load.image("level1Button", "../public/images/level1Button.png");
    this.load.image("level1ButtonOn", "../public/images/level1ButtonOn.png");
    this.load.image("level2Button", "../public/images/level2Button.png");
    this.load.image("level2ButtonOn", "../public/images/level2ButtonOn.png");
    this.load.image("level3Button", "../public/images/level3Button.png");
    this.load.image("level3ButtonOn", "../public/images/level3ButtonOn.png");
    this.load.image("level2ButtonBloq", "../public/images/level2ButtonBloq.png");
    this.load.image("level3ButtonBloq", "../public/images/level3ButtonBloq.png");
    this.load.image(
      "startButtonPressed",
      "../public/images/startButtonPressed.png"
    );
    this.load.image("candy", "../public/images/candy.png");

    this.load.spritesheet("lyla", "./public/images/lyla.png", {
      frameWidth: 110,
      frameHeight: 171,
    });

  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    // se crea una sola vez, para que no de error en el restart de la escena
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("lyla", { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "lyla", frame: 4 }],
      frameRate: 8,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("lyla", { start: 5, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });
    // //////
    this.anims.create({
      key: "Gleft",
      frames: this.anims.generateFrameNumbers("ghost", { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "Gright",
      frames: this.anims.generateFrameNumbers("ghost", { start: 2, end: 3 }),
      frameRate: 8,
      repeat: -1,
    });
    // init scene juego
    this.scene.start("Menu");
  }
}
