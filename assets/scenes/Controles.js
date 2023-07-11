export default class Controles extends Phaser.Scene {
    constructor() {
      super("Controles");
    }
    create(){
        this.add.image(610, 380, "tuto");
        let tutorialButton = this.add
        .image(500, 430, "tutoButton")
        .setInteractive(this.input.makePixelPerfect());

      tutorialButton.on("pointerover", () => {
        level1Button.setTexture("tutoButtonOn");
      });
      tutorialButton.on("pointerup", () => {
        this.scene.start("juego");
      });
      tutorialButton.on("pointerout", () => {
        level1Button.setTexture("tutoButtonPressed");
      });
    }
}