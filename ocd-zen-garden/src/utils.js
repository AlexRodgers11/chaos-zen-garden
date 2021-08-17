import Ding from './assets/ding.wav';
import Whoop from './assets/whoop.wav';
import Whoosh from './assets/whoosh.wav';
import Click from './assets/click.wav';
import Blip from './assets/blip.wav';

const colors = {
    baseColors: {
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
    testColors1: {
        base: {
            name: 'black', 
            color: '#011627'
        }, 
        border: {
            name: 'mediumGray',
            color: '#9c9a9a'
        },
        1: {
            name: 'babyPowder',
            color: '#FDFFFC'
        },
        2: {
            name: 'tiffanyBlue',
            color: '#2EC4B6'
        },
        3: {
            name: 'roseMadder',
            color: '#E71D36'
        },
        4: {
            name: 'orangePeel',
            color: '#FF9F1C'
        },
        5: {
            name: 'lavenderFloral',
            color: '#9D8DF1'
        },
        6: {
            name: 'tyrianPurple',
            color: '#561643'
        }       
    },
    electric: {
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
    }
}

const palettes = ['baseColors', 'testColors1', 'electric'];

const getColor = (idx, palette) => {
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
}

const getSound = sound => {
    switch(sound) {
        case 'ding':
            return {src: Ding, sprite: {ding: [0, 350]}, spriteName: 'ding'};
        case 'whoosh':
            return {src: Whoosh, sprite: {whoosh: [3500, 450]}, spriteName: 'whoosh'}
        case 'whoop':
            return {src: Whoop, sprite: {whoop: [0, 400]}, spriteName: 'whoop'};
        case 'click':
            return {src: Click, sprite: {click: [1050, 1000]}, spriteName: 'click'};
        case 'blip':
            return {src: Blip, sprite: {click: [0, 1000]}, spriteName: 'click'};
        default:
            return {src: Click, sprite: {click: [1050, 1000]}, spriteName: 'click'};
    }
}


export { getColor, palettes, getSound }