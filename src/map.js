import Game from "./game.js"
import { Background, Mushroom, Player, Stone, Tree, Wall, Cave } from "./game_objects.js"

/**
 * Diese Klasse liest eine Kartendatei und erstellt die Spiel-Objekte
 * an den Stellen die in der Karte angegeben sind.
 */
export default class Map {
  static width = 0
  static height = 0

  constructor(mapFile) {
    Map.width = 0
    Map.height = 0
    this._readMapFile(mapFile)
  }

  /**
   * Erstelle neue Spiel-Objekte an den jeweiligen Stellen.
   * @param {number} x Die x-Koordinate, an der die Spiel-Objekte erstellt werden.
   * @param {number} y Die y-Koordinate, an der die Spiel-Objekte erstellt werden.
   * @param {string} tileType Der Buchstabe an der Stelle in der Karte.
   */
  addTilesToMap(x, y, tileType) {
    if ( tileType === "s" ) { new Stone(x, y) }
    if ( tileType === "t" ) { new Tree(x, y) }
    if ( tileType === "p" ) { new Mushroom(x, y) }
    if ( tileType === "w" ) { new Wall(x, y) }
    if ( tileType === "h" ) { new Cave(x, y) }
    if ( tileType === "P" ) { Game.player = new Player(x, y)}
  }

  /**
   * Liest die Karte aus der Datei und ruft die Erstellung der Spiel-Objekte auf.
   */
  _readMapFile(filename) {
    fetch(filename)
      .then((res) => res.text())
      .then((data) => {
        let rows = data.split("\n")
        for (let y = 0; y < rows.length; y++) {
          let row = rows[y].split("")
          for (let x = 0; x < row.length; x++) {
            this.addTilesToMap(x, y, row[x])
            Map.width = Math.max(Map.width, x)
            Map.height = Math.max(Map.height, y)
          }
        }
      })
  }
}

