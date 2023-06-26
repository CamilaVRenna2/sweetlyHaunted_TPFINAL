export default class MapaNivel extends Phaser.Scene {
    constructor() {
      super("MapaNivel");
    }
  
    create() {
      this.add.image(960, 600, "backgroundMapa");
      let level1Button = this.add
        .image(300, 650, "level1Button")
        .setInteractive(this.input.makePixelPerfect());

      level1Button.on("pointerover", () => {
        level1Button.setTexture("level1ButtonOn");
      });
      level1Button.on("pointerup", () => {
        this.scene.start("juego");
      });
  
      level1Button.on("pointerout", () => {
        level1Button.setTexture("level1Button");
      });
      ////////
      let level2Button = this.add
        .image(900, 650, "level2ButtonBloq")
        .setInteractive(this.input.makePixelPerfect());
  
     
      level2Button.on("pointerover", () => {
        level2Button.setTexture("level2ButtonBloq");
      });
      
      level2Button.on("pointerout", () => {
        level2Button.setTexture("level2ButtonBloq");
      });
      ////////
      let level3Button = this.add
      .image(1400, 650, "level3ButtonBloq")
      .setInteractive(this.input.makePixelPerfect());

    level3Button.on("pointerover", () => {
      level3Button.setTexture("level3ButtonBloq");
    });
   
    level3Button.on("pointerout", () => {
      level3Button.setTexture("level3ButtonBloq");
    });
    }
  }
  