// Make the Fake - Broken Bonez
// Name: Emil Sabev
// Date: 3/4/2024
// Approx Hours Spent: 


/* Credits: 
background menu/trick index scene music: https://pixabay.com/music/beats-weeknds-122592/


*/
'use strict'

let config = 
{
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: { autoCenter: Phaser.Scale.CENTER_BOTH},
    physics: 
    { 
        default: 'arcade', 
        arcade: 
        {
            gravity: { y: 500}, 
            debug: true
        }
    },
    scene: [ Menu, Play, GameOver, TrickIndex ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config