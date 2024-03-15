/*
used chatGPT to help with setting up airborne trick animation: https://chat.openai.com/share/c1fc02b7-baef-4834-9dc6-f90363d22249
*/

class Play extends Phaser.Scene
{
    constructor()
    {
        super('playScene')
        this.keysPressed = ''
        this.lastKeyPressTime = 0
    }

    preload() //load images/atlases
    {
        this.load.image("play_background", "./assets/play_background.png")
        this.load.atlas("360_side_flip_anims", "./assets/bike_360_side_flip.png", "./assets/bike_360_side_flip.json")
        this.load.image("trick_wind", "./assets/trick_wind.png")
        this.load.atlas("sexy_move_anims", "./assets/sexy_move_anims.png", "./assets/sexy_move_anims.json")
        this.load.atlas("headstand_anims", "./assets/headstand_anims.png", "./assets/headstand_anims.json")
    }

    create() //add background, biker, biker animations, tricks, wind, jumping, and collision
    {
        //make background visible
        this.backgroundImage = this.add.tileSprite(0, 0, 800, 600, "play_background").setOrigin(0, 0)

        //add biker and set to stationary frame
        this.biker = this.physics.add.sprite(150, 470, 'bike_ramp_anims')
        this.biker.setFrame('bike_ramp_1.png')
        

        //modify biker properties
        this.biker.setVelocity(0)
        this.biker.body.setSize(50, 50)

        //add invisibile ground wall with collider
        const wall = this.physics.add.staticSprite(0, 500)
        wall.setSize(800, 1)
        this.physics.add.collider(this.biker, wall)

        //set jumping properties and animations
        setInterval(() => 
        {
            this.biker.setVelocityY(-380)
            this.biker.anims.play('rampAnims')

            setTimeout(() => 
            {
                this.biker.setVelocityY(0)
                //this.biker.setFrame('bike_ramp_1.png')
            }, 1800)
        }, 2500)

        this.elapsedTime = 0;

        //trick index
        this.tricks = 
        {
            "360_side_flip": ["D", "W", "A", "S"],
            "head_stand": ["F, R, E, T"],
            "sexy_move": ["Q", "Q", "Q", "Q"]
        }

        this.points = 
        

        //360-side-flip animations
        this.anims.create
        ({
            key: '360sideflipAnims',
            frames: this.anims.generateFrameNames('360_side_flip_anims', {prefix: "360_side_flip_", start: 1, end: 9, suffix: ".png"}),
            frameRate: 7
        })

        this.anims.create
        ({
            key: 'sexyMoveAnims',
            frames: this.anims.generateFrameNames('sexy_move_anims', {prefix: "Sexy_move_", start: 1, end: 6, suffix: ".png"}),
            frameRate: 7
        })

        this.anims.create
        ({
            key: 'headStandAnims',
            frames: this.anims.generateFrameNames('headstand_anims', {prefix: "headstand_", start: 1, end: 7, suffix: ".png"}),
            frameRate: 7
        })

        //add trick wind sprite
        this.trickWind = this.add.sprite(0, 0, 'trick_wind').setOrigin(0, 0)
        this.trickWind.setVisible(false)

        //check for user keyboard input
        this.input.keyboard.on('keydown', this.handleKeyDown, this)

    }

    update() //track biker jumping state, trick state, wind state, and time elapsed
    {
        
        this.elapsedTime = this.time.now

        //move trick wind by -3.5
        this.trickWind.x -= 6.5

        //wrap screen if necessary
        if (this.trickWind.x > this.game.config.width) 
        {
            this.trickWind.x = 0
        }

        //3 second stationary background to start the game
        if (this.elapsedTime > 3050) 
        {
            this.backgroundImage.tilePositionX += 5
        }

        //check for user keyboard input for tricking
        if (this.biker.y < 470)
        {
            if (this.keySequence === 'DWAS' && this.elapsedTime - this.lastKeyPressTime <= 500)
            {
                this.trickWind.x = 0
                this.trickWind.y = 0
                this.handleTrickWind()

                this.biker.anims.play('360sideflipAnims')
                this.keySequence = ''
                this.lastKeyPressTime = 0
            }

            if (this.keySequence == "QQQQ" && this.elapsedTime - this.lastKeyPressTime <= 500)
            {
                this.trickWind.x = 0
                this.trickWind.y = 0
                this.handleTrickWind()

                this.biker.anims.play("sexyMoveAnims")
                this.keySequence = ""
                this.lastKeyPressTime = 0
            }

            if (this.keySequence == "FRET" && this.elapsedTime - this.lastKeyPressTime <= 500)
            {
                this.trickWind.x = 0
                this.trickWind.y = 0
                this.handleTrickWind()

                this.biker.anims.play("headStandAnims")
                this.keySequence = ""
                this.lastKeyPressTime = 0
            }
        }
        
        //set frame to stationary if biker is on the floor (470y)
        /*
        if (this.biker.y == 470)
        {
            this.biker.setFrame('bike_ramp_1.png')
        }
        */
    }

    handleKeyDown(event) //function that handles the key combinations pressed for biker tricking. inputs are calculated in 0 - 500 ms intervals
    {
        const key = event.key.toUpperCase()
        const currentTime = this.time.now
             
        if (currentTime - this.lastKeyPressTime > 500)
        {
            this.keySequence = key
        }

        else
        {
            this.keySequence += key
        }

        this.lastKeyPressTime = currentTime        
    }
    
    handleTrickWind() //set trick wind to visible if biker is in tricking state
    {
        this.trickWind.setVisible(true);
        this.trickWindTimer = this.time.addEvent
        ({
            delay: 1000,
            callback: this.hideTrickWind, 
            callbackScope: this
        })
    }
    
    hideTrickWind() //set trick wind to not visible after handleTrickWind() is called
    {
        this.trickWind.setVisible(false)
    }
    
}
