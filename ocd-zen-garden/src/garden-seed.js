import Snake from './Snake';
import Dots from './Dots';
import BullsEye from './BullsEye';
// import Bullseye2 from './Bullseye2';
import Message from './Message';
import Dominoes from './Dominoes';
import Barcode from './Barcode';
import Squares from './Squares';
import Triangles from './Triangles';
import Antlers from './Antlers';
import Pogs from './Pogs';
import Message2 from './Message2';
import Smudges from './Smudges';
import Holes from './Holes';
import Edges from './Edges';
import Crosshair from './Crosshair';
import Tallies from './Tallies';
import Cards from './Cards';
import Desk from './Desk';
import Meters from './Meters'
import Eyes from './Eyes';
import Opaque from './Opaque';
import Diamonds from './Diamonds';
import Rainbow from './Rainbow';
import Asterisk from './Asterisk';

const startingGarden = {
    1 : {
        type: 'snake',
        palette: 'carnival',
        speed: 1000,
        sound: 'Slam',
        proportionalVolume: 'proportional',
        number: 7,
        shape: 'square' ,
        text: null
    },
    2 : {
        type: 'dots',
        palette: 'carnival', 
        speed: 1000,
        sound: 'Whoosh',
        proportionalVolume: 'proportional',
        number: 7,
        shape: 'circle' ,
        text: null
    },
    // 3 : {
    //     type: 'bullseye',
    //     palette: 'carnival',
    //     speed: 1000,
    //     sound: 'Whoop',
    //     proportionalVolume: 'proportional',
    //     number: 7,
    //     shape: 'circle' ,
    //     text: null
    // },
    4 : {
        type: 'message1',
        palette: 'carnival',
        speed: 1000,
        sound: 'Robot',
        proportionalVolume: 'proportional',
        number: null,
        shape: null ,
        text: 'Plus Utlra. Go Beyond.'
    },
    5 : {
        type: 'dominoes',
        palette: 'carnival',
        speed: 1000,
        sound: 'Click',
        proportionalVolume: 'proportional',
        number: 10,
        shape: null ,
        text: null
    },
    6 : {
        type: 'barcode',
        palette: 'carnival',
        speed: 1000,
        sound: 'Blip',
        proportionalVolume: 'proportional',
        number: 15,
        shape: null ,
        text: null
    },
    7 : {
        type: 'squares',
        palette: 'carnival',
        speed: 1000,
        sound: 'Ding',
        proportionalVolume: 'proportional',
        number: 5,
        shape: null ,
        text: null
    },
    8 : {
        type: 'triangles',
        palette: 'carnival',
        speed: 1000,
        sound: 'Chirp',
        proportionalVolume: 'proportional',
        number: 7,
        shape: null ,
        text: null
    },
    9 : {
        type: 'antlers',
        palette: 'carnival',
        speed: 1000,
        sound: 'Click',
        proportionalVolume: 'even',
        number: 5,
        shape: null,
        text: null
    },
    10 : {
        type: 'pogs',
        palette: 'carnival',
        speed: 1000,
        sound: 'Robot',
        proportionalVolume: 'proportional',
        number: 5,
        shape: null ,
        text: null
    },
    11 : {
        type: 'message2',
        palette: 'carnival',
        speed: 1000,
        sound: 'Sparkle',
        proportionalVolume: 'even',
        number: null,
        shape: null ,
        text: 'Plus Ultra. Go Beyond.'
    },
    12 : {
        type: 'smudges',
        palette: 'carnival',
        speed: 1000,
        sound: 'Sparkle',
        proportionalVolume: 'proportional',
        number: 5,
        shape: null,
        text: null
    },
    13 : {
        type: 'holes',
        palette: 'carnival',
        speed: 1000,
        sound: 'Ding',
        proportionalVolume: 'proportional',
        number: 8,
        shape: null ,
        text: null
    },
    14 : {
        type: 'edges',
        palette: 'carnival',
        speed: 1000,
        sound: 'Ding',
        proportionalVolume: 'even',
        number: 17,
        shape: null ,
        text: null
    },
    15 : {
        type: 'crosshair',
        palette: 'carnival',
        speed: 1000,
        sound: 'Robot',
        proportionalVolume: 'proportional',
        number: 6,
        shape: null,
        text: null
    },
    16 : {
        type: 'tallies',
        palette: 'carnival',
        speed: 1000,
        sound: 'Click',
        proportionalVolume: 'even',
        number: 3,
        shape: null,
        text: null
    },
    17 : {
        type: 'cards',
        palette: 'carnival',
        speed: 1000,
        sound: 'Whoosh',
        proportionalVolume: 'proportional',
        number: 5,
        shape: null ,
        text: null
    },
    18 : {
        type: 'desk',
        palette: 'carnival',
        speed: 1000,
        sound: 'Ding',
        proportionalVolume: 'proportional',
        number: null,
        shape: null ,
        text: null
    },
    19 : {
        type: 'meters',
        palette: 'carnival',
        speed: 1000,
        sound: 'Whoop',
        proportionalVolume: 'proportional',
        number: 10,
        shape: null,
        text: null
    },
    20 : {
        type: 'eyes',
        palette: 'carnival',
        speed: 1000,
        sound: 'Sparkle',
        proportionalVolume: 'proportional',
        number: 5,
        shape: null ,
        text: null
    },
    21 : {
        type: 'opaque',
        palette: 'carnival',
        speed: 1000,
        sound: 'Ding',
        proportionalVolume: 'proportional',
        number: 9,
        shape: null ,
        text: null
    },
    22 : {
        type: 'diamonds',
        palette: 'carnival',
        speed: 1000,
        sound: 'Laser',
        proportionalVolume: 'proportional',
        number: 9,
        shape: null ,
        text: null
    },
    23 : {
        type: 'rainbow',
        palette: 'carnival',
        speed: 1000,
        sound: 'Sparkle',
        proportionalVolume: 'proportional',
        number: 12,
        shape: null ,
        text: null
    },
    24 : {
        type: 'asterisk',
        palette: 'carnival',
        speed: 1000,
        sound: 'Click',
        proportionalVolume: 'proportional',
        number: 15,
        shape: null ,
        text: null
    },
}

// const gardenSwitch = (type, palette, speed, sound, proportionalVolume, number, shape, text) => {
const gardenSwitch = (piece) => {
    const id = piece[0]
    const {type, palette, speed, sound, proportionalVolume, number, shape, text} = {...piece[1]}
    switch(type) {
        case 'antlers':
            console.log('antlers found')
            return <Antlers {...piece[1]}/>
        case 'asterisk':
            return <Asterisk {...piece[1]}/>
        case 'barcode': 
            return <Barcode {...piece[1]}/>
        // case 'bullseye':
        //     return <BullsEye id={1} setNumRings={() => console.log('test')} numRings={15} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" orgIndex={numRings + 1} />    
        case 'cards':
            return <Cards {...piece[1]}/>
        case 'crosshair':
            return <Crosshair {...piece[1]}/>
        case 'desk':
            return <Desk {...piece[1]}/>
        case 'diamonds':
            return <Diamonds {...piece[1]}/>
        case 'dominoes':
            return <Dominoes {...piece[1]}/>
        case 'dots':
            return <Dots {...piece[1]}/>
        case 'edges':
            return <Edges {...piece[1]}/>
        case 'eyes':
            return <Eyes {...piece[1]}/>
        case 'holes':
            return <Holes {...piece[1]}/>
        case 'message':
            return <Message {...piece[1]}/>
        case 'message2':
            return <Message2 {...piece[1]}/>
        case 'meters':
            return <Meters {...piece[1]}/>
        case 'opaque':
            return <Opaque {...piece[1]}/>
        case 'pogs':
            return <Pogs {...piece[1]}/>
        case 'rainbow':
            return <Rainbow {...piece[1]}/>
        case 'smudges':
            return <Smudges {...piece[1]}/>
        case 'snake':
            return <Snake {...piece[1]}/>
        case 'squares':
            return <Squares {...piece[1]}/>
        case 'tallies':
            return <Tallies {...piece[1]}/>
        case 'triangles':
            return <Triangles {...piece[1]}/>
    }
}

export { gardenSwitch };

export default startingGarden;