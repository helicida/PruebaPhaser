/// <reference path="phaser/phaser.d.ts"/>

class mainState extends Phaser.State {
    game: Phaser.Game;
    private ufo:Phaser.Sprite;
    private cursor:Phaser.CursorKeys;

    private UFO_SPEED = 200;

    preload():void {
        super.preload();

        this.load.image('ufo', 'assets/UFOLow.png');
        this.load.image('pickup', 'assets/PickupLow.png');
        this.load.image('background', 'assets/BackgroundLow.png');
    }

    create():void {
        super.create();
        var background;

        background = this.add.sprite(0, 0, 'background');
        var scale = this.world.height / background.height;
        background.scale.setTo(scale, scale);

        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.scale.setTo(scale - 0.05, scale - 0.05);
        this.ufo.anchor.setTo(0.5, 0.5);

        // Para el movimiento del platillo con las teclas
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update():void {
        super.update();

        // Movimientos en el eje X

        if(this.ufo.x > 505){
            this.ufo.x = 505;
        }

        if(this.ufo.x < 95){
            this.ufo.x = 95;
        }

        if (this.cursor.left.isDown) {
            this.ufo.x = this.ufo.x - 10;
        }
        if (this.cursor.right.isDown) {
            this.ufo.x = this.ufo.x + 10;
        }

        // Movimientos en el eje Y

        if(this.ufo.y > 505){
            this.ufo.y = 505;
        }

        if(this.ufo.y < 95){
            this.ufo.y = 95;
        }

        if (this.cursor.up.isDown) {
            this.ufo.y = this.ufo.y - 10;
        }
        if (this.cursor.down.isDown) {
            this.ufo.y = this.ufo.y + 10;
        }

    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');

        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new SimpleGame();
};
