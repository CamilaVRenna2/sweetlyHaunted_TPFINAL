export default class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  create() {
    this.add.image(960, 600, "menuBackGround");
    let startButton = this.add
      .image(1300, 550, "startButton")
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
