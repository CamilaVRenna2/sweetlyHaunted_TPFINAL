export default class Juego extends Phaser.Scene {
    constructor() {
      super("Tutorial");
    }
    create(){
        this.add.image(610, 380, "tutorial");
    }
}