/// <reference path="phaser/phaser.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mainState = (function (_super) {
    __extends(mainState, _super);
    function mainState() {
        _super.apply(this, arguments);
        this.MAX_SPEED = 350; // pixels/second
        this.ACCELERATION = 250; // aceleración
        this.FUERZA_ROZAMIENTO = 100; // Aceleración negativa
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        // Caragmos las imagenes del platillo
        this.load.image('ufo', 'assets/UFOLow.png');
        this.load.image('pickup', 'assets/PickupLow.png');
        // Cargamos las imagenes de fondo
        this.load.image('izquerdaArriba', 'assets/Background/BackgroundLow-0-0.png');
        this.load.image('izquerdaCentro', 'assets/Background/BackgroundLow-0-1.png');
        this.load.image('izquerdaAbajo', 'assets/Background/BackgroundLow-0-2.png');
        this.load.image('centroArriba', 'assets/Background/BackgroundLow-1-0.png');
        this.load.image('centroCentro', 'assets/Background/BackgroundLow-1-1.png');
        this.load.image('centroAbajo', 'assets/Background/BackgroundLow-1-2.png');
        this.load.image('derechaArriba', 'assets/Background/BackgroundLow-2-0.png');
        this.load.image('derechaCentro', 'assets/Background/BackgroundLow-2-1.png');
        this.load.image('derechaABajo', 'assets/Background/BackgroundLow-2-2.png');
        // Declaramos el motor de físicas que vamos a usar
        this.physics.startSystem(Phaser.Physics.ARCADE);
    };
    mainState.prototype.createWalls = function () {
        this.paredes = this.add.group();
        this.paredes.enableBody = true;
        // Izquierda
        var wall_izquerdaArriba = this.add.sprite(0, 0, 'izquerdaArriba', null, this.paredes);
        var wall_izquerdaCentro = this.add.sprite(0, wall_izquerdaArriba.height, 'izquerdaCentro', null, this.paredes);
        var wall_izquerdaAbajo = this.add.sprite(0, wall_izquerdaArriba.height + wall_izquerdaCentro.height, 'izquerdaAbajo', null, this.paredes);
        // Centro
        var wall_centroArriba = this.add.sprite(wall_izquerdaArriba.width, 0, 'centroArriba', null, this.paredes);
        var wall_centroCentro = this.add.sprite(wall_izquerdaArriba.width, wall_centroArriba.height, 'centroCentro', null, this.paredes);
        var wall_centroAbajo = this.add.sprite(wall_izquerdaArriba.width, wall_centroArriba.height + wall_centroCentro.height, 'centroAbajo', null, this.paredes);
        // Derecha
        var wall_derechaArriba = this.add.sprite(wall_izquerdaArriba.width + wall_centroCentro.width, 0, 'derechaArriba', null, this.paredes);
        var wall_derechaCentro = this.add.sprite(wall_izquerdaArriba.width + wall_centroCentro.width, wall_derechaArriba.height, 'derechaCentro', null, this.paredes);
        var wall_derechaAbajo = this.add.sprite(wall_izquerdaArriba.width + wall_centroCentro.width, wall_derechaArriba.height + wall_derechaCentro.height, 'derechaABajo', null, this.paredes);
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        var background;
        this.createWalls();
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        // Para el movimiento del platillo con las teclas
        this.cursor = this.input.keyboard.createCursorKeys();
        // Activamos la fisica
        this.physics.enable(this.ufo);
        // Le damos una aceleración
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        // Fuerza de rozamiento
        this.ufo.body.drag.setTo(this.FUERZA_ROZAMIENTO, this.FUERZA_ROZAMIENTO); // x, y
        //velocidad maxima, colisiones y rebote
        this.ufo.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y
        this.physics.arcade.collide(this.ufo, this.paredes);
        this.ufo.body.bounce.setTo(0.7);
    };
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