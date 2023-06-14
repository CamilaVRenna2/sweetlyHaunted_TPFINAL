export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    this.add.image(600, 415, "menuBackGround");
    let startButton = this.add
      .image(700, 450, "startButton")
      .setInteractive(this.input.makePixelPerfect());

    startButton.on("pointerdown", () => {
      startButton.setTexture("startButtonPressed");
    });
    startButton.on("pointerover", () => {
      startButton.setTexture("startButtonOn");
    });
    startButton.on("pointerup", () => {
      this.scene.start("juego");
    });

    startButton.on("pointerout", () => {
      startButton.setTexture("startButton");
    });
  }
}
