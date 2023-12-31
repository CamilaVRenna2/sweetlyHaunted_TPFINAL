import juego from "./assets/scenes/juego.js";
import Precarga from "./assets/scenes/Precarga.js";
import Menu from "./assets/scenes/Menu.js";
import MapaNivel3 from "./assets/scenes/MapaNivel3.js";
import MapaNivel2 from "./assets/scenes/MapaNivel2.js";
import MapaNivel from "./assets/scenes/MapaNivel.js";
import Tuto from "./assets/scenes/Tuto.js";
import GameOver from "./assets/scenes/GameOver.js";
import win from "./assets/scenes/win.js";
// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 1220,
  height: 763,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1220,
      height: 763,
    },
    max: {
      width: 1220,
      height: 763,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 720 },
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Precarga, Menu, juego,MapaNivel,MapaNivel2,MapaNivel3,Tuto,GameOver,win],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
