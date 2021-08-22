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
            name: 'darkGrey',
            color: '#404857'
        },
        border: {
            name: 'black',
            color: '#000000'
        },
        1: {
            name: 'salmon',
            color:'#ff0048'
        },
        2: {
            name: 'lime',
            color: '#44ff00'
        },
        3: {
            name: 'blue',
            color: '#3e0eff'
        },
        4: {
            name: 'orange',
            color: '#ffa30e'
        },
        5: {
            name: 'pink',
            color: '#ff00fb'
        },
        6: {
            name: 'yellow',
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
            name: 'black', 
            color: '#000000'
        }, 
        // border: {
        //     name: 'mediumGray',
        //     color: '#4a4a4a'
        // },
        border: {
            name: 'white',
            color: '#FFFFFF'
        },
        1: {
            name: '',
            color: '#fffc00'
        },
        2: {
            name: '',
            color: '#3f00ff'
        },
        3: {
            name: '',
            color: '#00FF00'
        },
        4: {
            name: '',
            color: '#55ffff'
        },
        5: {
            name: '',
            color: '#ff009f'
        },
        6: {
            name: '',
            color: '#ff073a'
        }       
    }, 
    'Zebra': {
        colorCount: 2,
        base: {
            name: 'white',
            color: '#FFFFFF'
        },
        border: {
            name: 'black',
            color: '#000000'
        },
        1: {
            name: 'black',
            color: '#000000'
        },
        2: {
            name: 'white',
            color: '#FFFFFF'
        }
    },
    'Christmas': {
        colorCount: 2,
        base: {
            name: 'white',
            color: '#FFFFFF'// possibly try to do candy-cane gradient
        },
        border: {
            name: 'gold',
            color: '#CC9901'
        },
        1: {
            name: 'red',
            color: '#B70D00'
        },
        2: {
            name: 'green',
            color: '#005C01'
        }
    },
    'Rose': {
        colorCount: 3,
        base: {
            name: '',
            color: '#4E4E50'
        },
        border: {
            name: '',
            color: '#1A1A1D'
        },
        1: {
            name: '',
            color: '#C3073F'
        },
        2: {
            name: '',
            color: '#950740'
        },
        3: {
            name: '',
            color: '#6F2232'
        }
    },
    'Sea': {
        colorCount: 3,
        base: {
            name: '',
            color: '#0B0C10'
        },
        border: {
            name: '',
            color: '#C5C6C7'
        },
        1: {
            name: '',
            color: '#45A29E'
        },
        2: {
            name: '',
            color: '#66FCF1'
        },
        3: {
            name: '',
            color: '#1F2833'
        }
    },
    'Harvest': {
        colorCount: 3,
        base: {
            name: '',
            color: '#272727'
        },
        border: {
            name: '',
            color: '#747474'
        },
        1: {
            name: '',
            color: '#FF652F'
        },
        2: {
            name: '',
            color: '#FFE400'
        },
        3: {
            name: '',
            color: '#14A76C'
        }
    },
    'Forest': {
        colorCount: 3,
        base: {
            name: '',
            color: '#4E4E50'
        },
        border: {
            name: '',
            color: '#1A1A1D'
        },
        1: {
            name: '',
            color: '#004b23'
        },
        2: {
            name: '',
            color: '#1fff1f'
        },
        3: {
            name: '',
            color: '#157145'
        }
    },
    'Flag': {
        colorCount: 3,
        base: {
            name: '',
            // color: '#bababa'
            // color: '#6b6b6b'
            color: '#b2b2d9'
        },
        border: {
            name: '',
            color: '#000000'
        },
        1: {
            name: '',
            color: '#B31942'
        },
        2: {
            name: '',
            color: '#FFFFFF'
        },
        3: {
            name: '',
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


export { getColor, palettes, getSound, sounds }