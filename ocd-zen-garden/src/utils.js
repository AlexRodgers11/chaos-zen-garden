const colors = {
    salmon: '#ff0048',
    lime: '#44ff00',
    blue: '#3e0eff',
    orange: '#ffa30e',
    pink:  '#ff00fb',
    yellow: '#ffff00'
}

const getColor = idx => {
    if(idx % 6 === 1 || idx === 1) {
        return colors.salmon;
    } else if(idx % 6 === 2 || idx === 2) {
        return colors.lime
    } else if(idx % 6 === 3 || idx === 3) {
        return colors.blue
    } else if (idx % 6 === 4 || idx === 4) {
        return colors.orange
    } else if (idx % 6 === 5 || idx === 5) {
        return colors.pink
    } else if (idx % 6 === 0 || idx === 6) {
        return colors.yellow
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