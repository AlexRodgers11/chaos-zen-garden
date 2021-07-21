const colors = {
    salmon: '#ff0048',
    lime: '#44ff00',
    blue: '#3e0eff',
    orange: '#ffa30e',
    pink:  '#ff00fb',
    yellow: '#ffff00'
}

const getColor = idx => {
    if(idx % 6 === 0) {
        return colors.salmon;
    } else if(idx % 5 === 0) {
        return colors.lime
    } else if(idx % 4 === 0) {
        return colors.blue
    } else if (idx % 3 === 0) {
        return colors.orange
    } else if (idx % 2 === 0) {
        return colors.pink
    } else if (idx % 1 === 0) {
        return colors.yellow
    }
}

export {getColor}