import Ding from './assets/ding.mp3';
import Whoop from './assets/whoop.mp3';
import Whoosh from './assets/whoosh.wav';
import Click from './assets/click.mp3';
import Blip from './assets/blip.mp3';
// import Zip from './assets/zip.mp3';
import Robot from './assets/robot.mp3';
import Slam from './assets/slam.mp3';
import Laser from './assets/laser.mp3';//need to clean up ending (clacking)
// import Smack from './assets/smack.mp3';
import Chirp from './assets/chirp.mp3';
import Sparkle from './assets/sparkle.mp3';
import Swish from './assets/swish.mp3';

const colors = {
    'Carnival': {
        colorCount: 6,
        base: {
            color: '#404857'
        },
        border: {
            color: '#000000'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            // color: '#ff0048'
            color: '#44ff00'
        },
        aux2: {
            // color: '#44ff00'
            color: '#ff0048'
        },
        1: {
            color:'#ff0048'
        },
        2: {
            color: '#44ff00'
        },
        3: {
            color: '#3e0eff'
        },
        4: {
            color: '#ffa30e'
        },
        5: {
            color: '#ff00fb'
        },
        6: {
            color: '#ffff00'
    
        }
    },
    // testColors1: {
    //     colorCount: 6,
    //     base: {
    //         name: 'black', 
    //         color: '#011627'
    //     }, 
    //     border: {
    //         name: 'mediumGray',
    //         color: '#9c9a9a'
    //     },
    //     1: {
    //         name: 'babyPowder',
    //         color: '#FDFFFC'
    //     },
    //     2: {
    //         name: 'tiffanyBlue',
    //         color: '#2EC4B6'
    //     },
    //     3: {
    //         name: 'roseMadder',
    //         color: '#E71D36'
    //     },
    //     4: {
    //         name: 'orangePeel',
    //         color: '#FF9F1C'
    //     },
    //     5: {
    //         name: 'lavenderFloral',
    //         color: '#9D8DF1'
    //     },
    //     6: {
    //         name: 'tyrianPurple',
    //         color: '#561643'
    //     }       
    // },
    'Electric': {
        colorCount: 6,
        base: {
            color: '#000000'
        }, 
        border: {
            color: '#FFFFFF'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            color: '#fffc00'
        },
        aux2: {
            color: '#ff009f'
        },
        1: {
            color: '#fffc00'
        },
        2: {
            color: '#3f00ff'
        },
        3: {
            color: '#00FF00'
        },
        4: {
            color: '#55ffff'
        },
        5: {
            color: '#ff009f'
        },
        6: {
            color: '#ff073a'
        }       
    }, 
    'Zebra': {
        colorCount: 2,
        base: {
            color: '#FFFFFF'
        },
        border: {
            color: '#000000'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            color: '#FFFFFF'
        },
        aux2: {
            color: '#000000'
        },
        1: {
            color: '#000000'
        },
        2: {
            color: '#FFFFFF'
        }
    },
    'Christmas': {
        colorCount: 2,
        base: {
            color: '#FFFFFF'// possibly try to do candy-cane gradient
        },
        border: {
            color: '#CC9901'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            color: '#B70D00'
        },
        aux2: {
            color: '#005C01'
        },
        1: {
            color: '#B70D00'
        },
        2: {
            color: '#005C01'
        }
    },
    'Rose': {
        colorCount: 3,
        base: {
            // color: '#4E4E50'
            color: '#100b0b'
        },
        border: {
            color: '#1A1A1D'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            color: '#C3073F'
        },
        aux2: {
            color: '#950740'
        },
        1: {
            color: '#C3073F'
        },
        2: {
            color: '#950740'
        },
        3: {
            color: '#6F2232'
        }
    },
    'Sea': {
        colorCount: 3,
        base: {
            color: '#0B0C10'
        },
        border: {
            color: '#C5C6C7'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            color: '#66FCF1'
        },
        aux2: {
            color: '#45A29E'
        },
        1: {
            color: '#45A29E'
        },
        2: {
            color: '#66FCF1'
        },
        3: {
            color: '#1F2833'
        }
    },
    'Harvest': {
        colorCount: 3,
        base: {
            // color: '#272727'
            // color: '#100f0b'
            color: '#302c21'
            // color: '#26231a'
        },
        border: {
            color: '#747474'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            color: '#FFE400'
        },
        aux2: {
            color: '#FF652F'
        },
        1: {
            color: '#FF652F'
        },
        2: {
            color: '#FFE400'
        },
        3: {
            color: '#14A76C'
        }
    },
    'Forest': {
        colorCount: 3,
        base: {
            // color: '#4E4E50'
            // color: '#0b100b'
            color: '#00100b'
        },
        border: {
            color: '#1A1A1D'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            color: '#1fff1f'
        },
        aux2: {
            color: '#157145'
        },
        1: {
            color: '#004b23'
        },
        2: {
            color: '#1fff1f'
        },
        3: {
            color: '#157145'
        }
    },
    'Flag': {
        colorCount: 3,
        base: {
            // color: '#bababa'
            // color: '#6b6b6b'
            color: '#b2b2d9'
        },
        border: {
            color: '#000000'
        },
        auxBackground: {
            color: '#303030'
        },
        aux1: {
            color: '#FFFFFF'
        },
        aux2: {
            color: '#B31942'
        },
        1: {
            color: '#B31942'
        },
        2: {
            color: '#FFFFFF'
        },
        3: {
            color: '#0A3161'
        }
    }
    

}

// const palettes = ['baseColors', 'testColors1', 'electric', 'zebra', 'christmas', 'rose', 'sea', 'harvest'];
const palettes = Object.keys(colors);

const getColor = (idx, palette) => {    
    if(colors[palette].colorCount === 6) {
        if(idx === 'base') {
            return colors[palette].base.color;
        } else if(idx === 'border') {
            return colors[palette].border.color;
        } else if(idx === 'auxBackground') {
            return colors[palette].auxBackground.color;
        } else if(idx === 'aux1') {
            return colors[palette].aux1.color;
        } else if(idx === 'aux2') {
            return colors[palette].aux2.color;
        } else if(idx % 6 === 1 || idx === 1) {
            return colors[palette][1].color
        } else if(idx % 6 === 2 || idx === 2) {
            return colors[palette][2].color
        } else if(idx % 6 === 3 || idx === 3) {
            return colors[palette][3].color
        } else if (idx % 6 === 4 || idx === 4) {
            return colors[palette][4].color
        } else if (idx % 6 === 5 || idx === 5) {
            return colors[palette][5].color
        } else if (idx % 6 === 0 || idx === 6) {
            return colors[palette][6].color
        }
    } else if(colors[palette].colorCount === 2) {
        if(idx === 'base') {
            return colors[palette].base.color;
        } else if(idx === 'border') {
            return colors[palette].border.color;
        } else if(idx === 'auxBackground') {
            return colors[palette].auxBackground.color;
        } else if(idx === 'aux1') {
            return colors[palette].aux1.color;
        } else if(idx === 'aux2') {
            return colors[palette].aux2.color;
        } else if(idx % 2 === 1 || idx === 1) {
            return colors[palette][1].color
        } else if(idx % 2 === 0 || idx === 2) {
            return colors[palette][2].color
        }
    } else if(colors[palette].colorCount === 3) {
        if(idx === 'base') {
            return colors[palette].base.color;
        } else if(idx === 'border') {
            return colors[palette].border.color;
        } else if(idx === 'auxBackground') {
            return colors[palette].auxBackground.color;
        } else if(idx === 'aux1') {
            return colors[palette].aux1.color;
        } else if(idx === 'aux2') {
            return colors[palette].aux2.color;
        } else if(idx % 3 === 1 || idx === 1) {
            return colors[palette][1].color
        } else if(idx % 3 === 2 || idx === 2) {
            return colors[palette][2].color
        } else if(idx % 3 === 0 || idx === 3) {
            return colors[palette][3].color
        }
    }
}

const getSound = sound => {
    switch(sound) {
        case 'Ding':
            return {src: Ding, sprite: {ding: [0, 350]}, spriteName: 'ding'};
        case 'Whoosh':
            return {src: Whoosh, sprite: {whoosh: [3500, 450]}, spriteName: 'whoosh'}
        case 'Whoop':
            return {src: Whoop, sprite: {whoop: [0, 400]}, spriteName: 'whoop'};
        case 'Click':
            return {src: Click, sprite: {click: [0, 1000]}, spriteName: 'click'};
        case 'Blip':
            return {src: Blip, sprite: {blip: [0, 1000]}, spriteName: 'blip'};
        // case 'Zip':
        //     return {src: Zip, sprite: {zip: [0, 1000]}, spriteName: 'zip'};
        case 'Robot':
            return {src: Robot, sprite: {robot: [0, 1000]}, spriteName: 'robot'};
        case 'Slam':
            return {src: Slam, sprite: {slam: [0, 1000]}, spriteName: 'slam'};
        case 'Laser':
            return {src: Laser, sprite: {laser: [0, 1000]}, spriteName: 'laser'};
        case 'Chirp':
            return {src: Chirp, sprite: {chirp: [0, 1000]}, spriteName: 'chirp'};
        // case 'Smack':
        //     return {src: Smack, sprite: {smack: [0, 1000]}, spriteName: 'smack'};
        case 'Sparkle':
            return {src: Sparkle, sprite: {sparkle: [0, 1000]}, spriteName: 'sparkle'};
        case 'Swish':
            return {src: Swish, sprite: {swish: [0, 1000]}, spriteName: 'swish'};
        default:
            return {src: Click, sprite: {click: [1050, 1000]}, spriteName: 'click'};
    }
}

// const sounds = ['Ding', 'Whoosh', 'Whoop', 'Click', 'Blip', 'Zip', 'Robot', 'Slam', 'Laser', 'Smack', 'Sparkle', 'Swish']
const sounds = ['Ding', 'Whoosh', 'Whoop', 'Click', 'Blip', 'Robot', 'Slam', 'Laser', 'Chirp', 'Sparkle', 'Swish']

const scaler = (min1, max1, min2, max2, val) => {
    return (((val - min1) * (max2 - min2)) / (max1 - min1)) + min2
}


export { getColor, palettes, getSound, sounds, scaler }