import Ding from './assets/ding.wav';
import Whoop from './assets/whoop.wav';
import Whoosh from './assets/whoosh.wav';
import Click from './assets/click.wav';
import Blip from './assets/blip.wav';

const colors = {
    baseColors: {
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
    testColors1: {
        colorCount: 6,
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
    zebra: {
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
    christmas: {
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
    rose: {
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
    sea: {
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
    harvest: {
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
    }
    

}

const palettes = ['baseColors', 'testColors1', 'electric', 'zebra', 'christmas', 'rose', 'sea', 'talisman'];

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