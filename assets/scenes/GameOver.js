export default class GameOver extends Phaser.Scene {
    constructor() {
      super("GameOver");
    }
    create(){
        this.add.image(610, 380, "gameOver");
        let retryButton = this.add
        .image(180, 430, "retryButton")
        .setInteractive(this.input.makePixelPerfect());
    retryButton.on("pointerdown", () => {
            retryButton.setTexture("retryButtonPressed");
          });
      retryButton.on("pointerup", () => {
        this.scene.start("MapaNivel");
      });
  
      retryButton.on("pointerout", () => {
        retryButton.setTexture("retryButton");
      });
    }
}