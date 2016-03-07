var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="phaser/phaser.d.ts"/>
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        // Constantes
        this.VELOCIDAD_MAXIMA = 350; // pixels/second
        this.ACCELERATION = 250; // aceleración
        this.FUERZA_ROZAMIENTO = 100; // Aceleración negativa
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        // Precargamos las imagenes del platillo
        this.load.image('ufo', 'assets/UFOLow.png');
        this.load.image('pickup', 'assets/PickupLow.png');
        // Precargamos el fondo a traves del tieleset
        this.game.load.tilemap('tilemap', 'assets/Background.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/BackgroundLow.png');
        // Declaramos el motor de físicas que vamos a usar
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        // Cargamos las paredes
        this.generarParedes();
        // Sprite del platillo volante
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);
        // Para el movimiento del platillo con las teclas
        this.cursor = this.input.keyboard.createCursorKeys();
        // Activamos la fisica
        this.physics.enable(this.ufo);
        // Le damos una aceleración
        this.ufo.body.maxVelocity.setTo(this.VELOCIDAD_MAXIMA, this.VELOCIDAD_MAXIMA); // x, y
        // Fuerza de rozamiento
        this.ufo.body.drag.setTo(this.FUERZA_ROZAMIENTO, this.FUERZA_ROZAMIENTO); // x, y
        //velocidad maxima, colisiones y rebote
        this.ufo.body.maxVelocity.setTo(this.VELOCIDAD_MAXIMA, this.VELOCIDAD_MAXIMA); // x, y
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(0.7);
    };
    mainState.prototype.generarParedes = function () {
        // Referencia al tilemap y al fondo
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('BackgroundLow', 'tiles');
        // Esto hace referencia a las capas
        var background = this.map.createLayer('Centro');
        this.paredes = this.map.createLayer('Limites');
        // Auxiliar para la colision
        this.map.setCollisionBetween(1, 100, true, 'Limites');
    };
    ;
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        // Velocidad en el instante 0 del objeto
        // Movimientos en el eje X
        if (this.cursor.left.isDown) {
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        }
        else if (this.cursor.right.isDown) {
            this.ufo.body.acceleration.x = this.ACCELERATION;
        }
        else if (this.cursor.up.isDown) {
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        }
        else if (this.cursor.down.isDown) {
            this.ufo.body.acceleration.y = this.ACCELERATION;
        }
        else {
            this.ufo.body.acceleration.x = 0;
            this.ufo.body.acceleration.y = 0;
        }
    };
    return mainState;
})(Phaser.State);
var SimpleGame = (function () {
    function SimpleGame() {
        // Tamaño del juego, etc
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
    return SimpleGame;
})();
window.onload = function () {
    var game = new SimpleGame();
};
//# sourceMappingURL=main.js.map