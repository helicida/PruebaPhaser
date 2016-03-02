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
        this.UFO_SPEED = 200;
    }
    mainState.prototype.preload = function () {
        _super.prototype.preload.call(this);
        this.load.image('ufo', 'assets/UFOLow.png');
        this.load.image('pickup', 'assets/PickupLow.png');
        this.load.image('background', 'assets/BackgroundLow.png');
    };
    mainState.prototype.create = function () {
        _super.prototype.create.call(this);
        var background;
        background = this.add.sprite(0, 0, 'background');
        var scale = this.world.height / background.height;
        background.scale.setTo(scale, scale);
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.scale.setTo(scale - 0.05, scale - 0.05);
        this.ufo.anchor.setTo(0.5, 0.5);
        // Para el movimiento del platillo con las teclas
        this.cursor = this.input.keyboard.createCursorKeys();
    };
    mainState.prototype.update = function () {
        _super.prototype.update.call(this);
        // Movimientos en el eje X
        if (this.ufo.x > 505) {
            this.ufo.x = 505;
        }
        if (this.ufo.x < 95) {
            this.ufo.x = 95;
        }
        if (this.cursor.left.isDown) {
            this.ufo.x = this.ufo.x - 10;
        }
        if (this.cursor.right.isDown) {
            this.ufo.x = this.ufo.x + 10;
        }
        // Movimientos en el eje Y
        if (this.ufo.y > 505) {
            this.ufo.y = 505;
        }
        if (this.ufo.y < 95) {
            this.ufo.y = 95;
        }
        if (this.cursor.up.isDown) {
            this.ufo.y = this.ufo.y - 10;
        }
        if (this.cursor.down.isDown) {
            this.ufo.y = this.ufo.y + 10;
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