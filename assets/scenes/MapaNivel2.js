export default class MapaNivel2 extends Phaser.Scene {
    constructor() {
      super("MapaNivel2");
    }
  
    create() {
      this.add.image(610, 380, "mapaNivelBackGround");
      let level1Button = this.add
        .image(180, 430, "level1Button")
        .setInteractive(this.input.makePixelPerfect());
  
      level1Button.on("pointerdown", () => {
        level1Button.setTexture("level1ButtonPressed");
      });
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
        .image(585, 430, "level2Button")
        .setInteractive(this.input.makePixelPerfect());
  
      Level2Button.on("pointerdown", () => {
        Level2Button.setTexture("level2ButtonPressed");
      });
      level2Button.on("pointerover", () => {
        level2Button.setTexture("level2ButtonOn");
      });
      level2Button.on("pointerup", () => {
        this.scene.start("nivel2");
      });
  
      level2Button.on("pointerout", () => {
        level2Button.setTexture("level2Button");
      });

      let level3Button = this.add
      .image(960, 430, "level3Button")
      .setInteractive(this.input.makePixelPerfect());

    Level3Button.on("pointerdown", () => {
      Level3Button.setTexture("level3ButtonPressed");
    });
    level3Button.on("pointerover", () => {
      level3Button.setTexture("level3ButtonOn");
    });
    level3Button.on("pointerup", () => {
      this.scene.start("nivel3");
    });

    level3Button.on("pointerout", () => {
      level3Button.setTexture("level3Button");
    });
    }
  }
  