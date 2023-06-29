export default class win extends Phaser.Scene {
    constructor() {
      super("win");
    }
    create(){
        this.add.image(610, 380, "wine");
      let nextButton = this.add
        .image(580, 430, "tutoButton")
        .setInteractive(this.input.makePixelPerfect());

    nextButton.on("pointerover", () => {
        nextButton.setTexture("tutoButtonOn");
      });
      nextbutton.on("pointerup", () => {
        this.scene.start("MapaNivel2");
      });
  
      nextButton.on("pointerout", () => {
        nextButton.setTexture("tutoButtonPressed");
      });
    }
}