/// <reference path="phaser/phaser.d.ts"/>
import Point = Phaser.Point;
class mainState extends Phaser.State {
    game: Phaser.Game;

    // Constantes
    private VELOCIDAD_MAXIMA = 350;     // pixels/second
    private VELOCIDAD_ROTACION = 150;   // Velocidad de rotacion del satelite
    private ACCELERATION = 250;         // aceleración
    private FUERZA_ROZAMIENTO = 100;    // Aceleración negativa
    // private FUERZA_ROZAMIENTO_ANGULAR = this.FUERZA_ROZAMIENTO * 1.3;   // Fuerza de rozamiento para la rotacion del UFO

    private contador_recogidas = 0; // Contador para los recolectables recogidos

    // Sprite elementos
    private ufo:Phaser.Sprite;             // Jugador platillo
    private recolectables:Phaser.Group;    // Recolectables

    // Otros recursos
    private cursor:Phaser.CursorKeys;       // Para el movimiento del jugador
    private map:Phaser.Tilemap;             // Map que contiene las partes del fondo
    private paredes:Phaser.TilemapLayer;    // Paredes (Capa)

    preload():void {
        super.preload();

        // Precargamos las imagenes del platillo
        this.load.image('ufo', 'assets/UFOLow.png');
        this.load.image('recolectable', 'assets/PickupLow.png');

        // Precargamos el fondo a traves del tieleset
        this.game.load.tilemap('tilemap', 'assets/Background.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/BackgroundLow.png');

        // Declaramos el motor de físicas que vamos a usar
        this.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create():void {
        super.create();

        // Cargamos las paredes
        this.generarParedes();

        // Sprite del platillo volante
        this.ufo = this.add.sprite(this.world.centerX, this.world.centerY, 'ufo');
        this.ufo.anchor.setTo(0.5, 0.5);

        // Para el movimiento del platillo con las teclas
        this.cursor = this.input.keyboard.createCursorKeys();

        // Activamos la fisica
        this.physics.enable(this.ufo);

        // Le damos una aceleración lineal y angular (para que rote sobre si mismo)
        this.ufo.body.maxVelocity.setTo(this.VELOCIDAD_MAXIMA, this.VELOCIDAD_MAXIMA); // x, y
        //this.ufo.body.angularDrag = this.FUERZA_ROZAMIENTO_ANGULAR;

        // Fuerza de rozamiento
        this.ufo.body.drag.setTo(this.FUERZA_ROZAMIENTO, this.FUERZA_ROZAMIENTO); // x, y

        //velocidad maxima, colisiones y rebote
        this.ufo.body.maxVelocity.setTo(this.VELOCIDAD_MAXIMA, this.VELOCIDAD_MAXIMA); // x, y
        this.ufo.body.collideWorldBounds = true;
        this.ufo.body.bounce.setTo(0.7);

        // Pickups
        this.crearRecolectables();

    }

    crearRecolectables():void {

        // Anyadimos el recolectable a un grupo
        this.recolectables = this.add.group();
        this.recolectables.enableBody = true;

        // Posiciones en las que generaremos los recolectables
        var positions:Point[] = [
            new Point(300, 95),
            new Point(190, 135), new Point(410, 135),
            new Point(120, 200), new Point(480, 200),
            new Point(95, 300), new Point(505, 300),
            new Point(120, 405), new Point(480, 405),
            new Point(190, 465), new Point(410, 465),
            new Point(300, 505),
        ];

        // Colocamos los sprites en sus coordenadas a traves de un for
        for (var i = 0; i < positions.length; i++) {

            var position = positions[i];

            // instanciamos el Sprite
            var recolectable = new Recolectable(this.game, position.x, position.y, 'recolectable', 0);

            // mostramos el Sprite por pantalla
            this.add.existing(recolectable);
            this.recolectables.add(recolectable);
        }
    }

    private recogerRecolectable(ufo:Phaser.Sprite, recolectable:Phaser.Sprite) {
        this.contador_recogidas ++;  // Sumamos al contador
        recolectable.kill();    // Nos cargamos el sprite
    }

    private generarParedes() {

        // Referencia al tilemap y al fondo
        this.map = this.game.add.tilemap('tilemap');
        this.map.addTilesetImage('BackgroundLow', 'tiles');

        // Esto hace referencia a las capas
        var background = this.map.createLayer('Centro');
        this.paredes = this.map.createLayer('Limites');

        // Auxiliar para la colision
        this.map.setCollisionBetween(1, 100, true, 'Limites');
    };

    update():void {
        super.update();

        // Colisiones del jugador (UFO) con las paredes
        this.physics.arcade.collide(this.ufo, this.paredes);


        /* Overlap es similar a un trigger de colision. Es decir, gestiona las colisiones pero no de manera "física"
        de los objetos, al superponerse los objetos, ejcuta código*/
        this.physics.arcade.overlap(this.ufo, this.recolectables, this.recogerRecolectable, null, this);

        // Movimientos en el eje X
        if (this.cursor.left.isDown) {
            this.ufo.body.acceleration.x = -this.ACCELERATION;
        } else if (this.cursor.right.isDown) {
            this.ufo.body.acceleration.x = this.ACCELERATION/2;

            // Movimientos en el eje Y
        } else if (this.cursor.up.isDown) {
            this.ufo.body.acceleration.y = -this.ACCELERATION;
        } else if (this.cursor.down.isDown) {
            this.ufo.body.acceleration.y = this.ACCELERATION;
        } else {
            this.ufo.body.acceleration.x = 0;
            this.ufo.body.acceleration.y = 0;
        }
    }
}

class Recolectable extends Phaser.Sprite{

    // Constructor con una velocidad angular fija y las fisicas activadas
    constructor(game:Phaser.Game, x:number, y:number, key:string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture, frame:string|number) {
        super(game, x, y, key, frame);

        this.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.angularVelocity = 150;
    }

    // Metodo update
    update():void {
        super.update();

    }
}

class SimpleGame {
    game:Phaser.Game;

    constructor() {
        // Tamaño del juego, etc
        this.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv');
        this.game.state.add('main', mainState);
        this.game.state.start('main');
    }
}

window.onload = () => {
    var game = new SimpleGame();
};