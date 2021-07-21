const colors = {
    '1': '#ff0048',
    '2': '#44ff00',
    '3': '#3e0eff',
    '4': '#ffa30e',
    '5':  '#ff00fb',
    '6': '#ffff00'
}

let colorTable = {}
let count1 = 0;
let count2 = 1;
let count3 = 1
while(count1 < 5) {
    console.log(count1)
    colorTable[count3] = colors[count2];
    count2++;
    count3++
    if (count2 > 6) {
        count1++
        count2 = 1
    }
}

// const getColor = idx => {
//     if(idx % 6 === 0) {
//         return colors.salmon;
//     } else if(idx % 5 === 0) {
//         return colors.lime
//     } else if(idx % 4 === 0) {
//         return colors.blue
//     } else if (idx % 3 === 0) {
//         return colors.orange
//     } else if (idx % 2 === 0) {
//         return colors.pink
//     } else if (idx % 1 === 0) {
//         return colors.yellow
//     }
// }

const getColor = idx => {
    return colorTable[idx]
}

export {getColor}