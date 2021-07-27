const colors = {
    baseColors: {
        base: {
            name: 'darkGrey',
            color: '#404857'
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
    }
}

const palettes = ['baseColors', 'testColors1'];

const getColor = (idx, palette) => {
    if(idx === 'base') {
        return colors[palette].base.color;
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


export { getColor, colors }