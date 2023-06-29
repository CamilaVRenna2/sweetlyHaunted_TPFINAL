export default class Tuto extends Phaser.Scene {
    constructor() {
      super("Tuto");
    }
    create(){
        this.add.image(610, 380, "tutorial");
      let level1Button = this.add
        .image(580, 430, "tutoButton")
        .setInteractive(this.input.makePixelPerfect());

      level1Button.on("pointerover", () => {
        level1Button.setTexture("tutoButtonOn");
      });
      level1Button.on("pointerup", () => {
        this.scene.start("juego");
      });
  
      level1Button.on("pointerout", () => {
        level1Button.setTexture("tutoButtonPressed");
      });
    }
}