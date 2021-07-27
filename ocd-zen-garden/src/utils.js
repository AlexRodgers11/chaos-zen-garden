// const baseColors = {
//     salmon: '#ff0048',
//     lime: '#44ff00',
//     blue: '#3e0eff',
//     orange: '#ffa30e',
//     pink:  '#ff00fb',
//     yellow: '#ffff00'
// }

const colors = {
    'baseColors': {
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
    }
}

// baseColors = {
//     base: {
//         name: 'darkGrey',
//         color: '#404857'
//     },
//     1: {
//         name: 'salmon',
//         color:'#ff0048'
//     },
//     2: {
//         name: 'lime',
//         color: '#44ff00'
//     },
//     3: {
//         name: 'blue',
//         color: '#3e0eff'
//     },
//     4: {
//         name: 'orange',
//         color: '#ffa30e'
//     },
//     5: {
//         name: 'pink',
//         color: '#ff00fb'
//     },
//     6: {
//         name: 'yellow',
//         color: '#ffff00'

//     }
// }

const testNewColors = {
    base: '#011627',
    babyPowder: '#FDFFFC',
    tiffanyBlue: '#2EC4B6',
    roseMadder: '#E71D36',
    orangePeel: '#FF9F1C',
    lavenderFloral: '#9D8DF1',
    tyrianPurple: '#561643'
    
}

// const getColor = idx => {
//     if(idx % 6 === 1 || idx === 1) {
//         return colors.salmon;
//     } else if(idx % 6 === 2 || idx === 2) {
//         return colors.lime
//     } else if(idx % 6 === 3 || idx === 3) {
//         return colors.blue
//     } else if (idx % 6 === 4 || idx === 4) {
//         return colors.orange
//     } else if (idx % 6 === 5 || idx === 5) {
//         return colors.pink
//     } else if (idx % 6 === 0 || idx === 6) {
//         return colors.yellow
//     }
// }

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



// const colors = {
//     '1': '#ff0048',
//     '2': '#44ff00',
//     '3': '#3e0eff',
//     '4': '#ffa30e',
//     '5':  '#ff00fb',
//     '6': '#ffff00'
// }

// let colorTable = {}
// let count1 = 0;
// let count2 = 1;
// let count3 = 1
// while(count1 < 5) {
//     colorTable[count3] = colors[count2];
//     count2++;
//     count3++
//     if (count2 > 6) {
//         count1++
//         count2 = 1
//     }
// }

// const getColor = idx => {
//     return colorTable[idx]
// }

export {getColor}