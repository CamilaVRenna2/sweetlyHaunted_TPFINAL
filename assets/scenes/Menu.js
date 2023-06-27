export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    this.add.image(610, 380, "menuBackGround");
    
    let startButton = this.add
      .image(750, 380, "startButton")
      .setInteractive(this.input.makePixelPerfect());

    startButton.on("pointerdown", () => {
      startButton.setTexture("startButtonPressed");
    });
    startButton.on("pointerover", () => {
      startButton.setTexture("startButtonOn");
    });
    startButton.on("pointerup", () => {
      this.scene.start("MapaNivel");
    });

    startButton.on("pointerout", () => {
      startButton.setTexture("startButton");
    });
  }
}
