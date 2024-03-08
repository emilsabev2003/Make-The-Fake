class Menu extends Phaser.Scene 
{
    constructor() 
    {
        super('menuScene')
    }

    preload() //load images, audio, sprites here
    {
        
        this.load.image("menu_background", "./assets/menu_background.png")
        this.load.atlas('bike_ramp_anims', './assets/bike_ramp.png', './assets/bike_ramp.json')
        
        /*
        this.load.audio('jumpsound1', './assets/Woosh-D2-www.fesliyanstudios.com.mp3')
        this.load.audio('jumpsound2', './assets/Woosh-D5-www.fesliyanstudios.com.mp3')
        this.load.audio('jumpsound3', './assets/Woosh-D6-www.fesliyanstudios.com.mp3')
        this.load.audio('impact', './assets/medium-explosion-40472.mp3')
        */
    }

    create() //add custom background, animation configuration, display menu text and instructions, define keys
    {
        this.backgroundImage = this.add.tileSprite(0, 0, 800, 600, "menu_background").setOrigin(0, 0)
        this.startGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.trickIndex = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T)


        this.anims.create
        ({
            key: 'rampAnims',
            frames: this.anims.generateFrameNames('bike_ramp_anims', {prefix: "bike_ramp_", start: 1, end: 7, suffix: ".png"}),
            frameRate: 5
        })
    }

    update() //transition from menu to play
    {
        if (this.startGame.isDown)
        {
                this.scene.start("playScene")
        }

        if (this.trickIndex.isDown)
        {
                this.scene.start("trickIndexScene")
        }
        /*
        if (this.startGame.isDown)
        {
            this.music.play({loop: true})
            this.music.setVolume(0.3)
            this.scene.start('playScene')

        }
        */
    }
}