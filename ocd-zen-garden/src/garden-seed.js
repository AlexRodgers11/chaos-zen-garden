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
            return <Antlers id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'asterisk':
            return <Asterisk id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'barcode': 
            return <Barcode id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        // case 'bullseye':
        //     return <BullsEye id={1} setNumRings={() => console.log('test')} numRings={15} setShape={handleSetShape} shape={bullsEyeShape} sound="Whoop" orgIndex={numRings + 1} />    
        case 'cards':
            return <Cards id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'crosshair':
            return <Crosshair id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'desk':
            return <Desk id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'diamonds':
            return <Diamonds id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'dominoes':
            return <Dominoes id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'dots':
            return <Dots id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'edges':
            return <Edges id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'eyes':
            return <Eyes id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'holes':
            return <Holes id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'message':
            return <Message id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'message2':
            return <Message2 id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'meters':
            return <Meters id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'opaque':
            return <Opaque id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'pogs':
            return <Pogs id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'rainbow':
            return <Rainbow id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'smudges':
            return <Smudges id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'snake':
            return <Snake id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'squares':
            return <Squares id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'tallies':
            return <Tallies id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
        case 'triangles':
            return <Triangles id={id} palette={palette} speed={speed} sound={sound} proportionalVolume={proportionalVolume} number={number} shape={shape} text={text} />
    }
}

export { gardenSwitch };

export default startingGarden;