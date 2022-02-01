import React from 'react';

function Smudge(props) {
    // const specs = {
    //     one: {
    //         size: 50 + Math.random() * 50,
    //         multiplier: Math.random() >= .5 ? 1 : -1,
    //         horizontalOffset: Math.random(),
    //         verticalOffset: Math.random()
    //     },
    //     two: {
    //         size: 50 + Math.random() * 50,
    //         multiplier: Math.random() >= .5 ? 1 : -1,
    //         horizontalOffset: Math.random(),
    //         verticalOffset: Math.random()
    //     },
    //     three: {
    //         size: 50 + Math.random() * 50,
    //         multiplier: Math.random() >= .5 ? 1 : -1,
    //         horizontalOffset: Math.random(),
    //         verticalOffset: Math.random()
    //     },
    //     four: {
    //         size: 50 + Math.random() * 50,
    //         multiplier: Math.random() >= .5 ? 1 : -1,
    //         horizontalOffset: Math.random(),
    //         verticalOffset: Math.random()
    //     },
    //     five: {
    //         size: 50 + Math.random() * 50,
    //         multiplier: Math.random() >= .5 ? 1 : -1,
    //         horizontalOffset: Math.random(),
    //         verticalOffset: Math.random()
    //     },
    //     six: {
    //         size: 50 + Math.random() * 50,
    //         multiplier: Math.random() >= .5 ? 1 : -1,
    //         horizontalOffset: Math.random(),
    //         verticalOffset: Math.random()
    //     }
    // }
    // return (
    //     // <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px'}}>
    //     <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
    //         <div style={{
    //             position: 'relative', 
    //             left: `${specs.one.multiplier > 0 ? specs.one.horizontalOffset * ((100 - specs.one.size) / 2) : 0}%`, 
    //             right: `${specs.one.multiplier < 0 ? specs.one.horizontalOffset * ((100 - specs.one.size) / 2) : 0}%`,
    //             top: `${specs.one.multiplier < 0 ? specs.one.verticalOffset * ((100 - specs.one.size) / 2) : 0}%`,
    //             bottom: `${specs.one.multiplier > 0 ? specs.one.verticalOffset * ((100 - specs.one.size) / 2) : 0}%`,
    //             borderRadius: '50%',
    //             backgroundColor: 'black',
    //             height: `${specs.one.size}%`,
    //             width: `${specs.one.size}%`
    //             }}>
    //                 <div style={{
    //                     position: 'relative', 
    //                     left: `${specs.two.multiplier > 0 ? specs.two.horizontalOffset * ((100 - specs.two.size) / 2) : 0}%`, 
    //                     right: `${specs.two.multiplier < 0 ? specs.two.horizontalOffset * ((100 - specs.two.size) / 2) : 0}%`,
    //                     top: `${specs.two.multiplier < 0 ? specs.two.verticalOffset * ((100 - specs.two.size) / 2) : 0}%`,
    //                     bottom: `${specs.two.multiplier > 0 ? specs.two.verticalOffset * ((100 - specs.two.size) / 2) : 0}%`,
    //                     borderRadius: '50%',
    //                     backgroundColor: 'black',
    //                     height: `${specs.one.size}%`,
    //                     width: `${specs.one.size}%`,
    //                     zIndex: 2
    //                     }}>
    //                         <div style={{
    //                             position: 'relative', 
    //                             left: `${specs.three.multiplier > 0 ? specs.three.horizontalOffset * ((100 - specs.three.size) / 2) : 0}%`, 
    //                             right: `${specs.three.multiplier < 0 ? specs.three.horizontalOffset * ((100 - specs.three.size) / 2) : 0}%`,
    //                             top: `${specs.three.multiplier < 0 ? specs.three.verticalOffset * ((100 - specs.three.size) / 2) : 0}%`,
    //                             bottom: `${specs.three.multiplier > 0 ? specs.three.verticalOffset * ((100 - specs.three.size) / 2) : 0}%`,
    //                             borderRadius: '50%',
    //                             backgroundColor: 'black',
    //                             height: `${specs.one.size}%`,
    //                             width: `${specs.one.size}%`,
    //                             zIndex: 3
    //                             }}>
    //                                 <div style={{
    //                                     position: 'relative', 
    //                                     left: `${specs.four.multiplier > 0 ? specs.four.horizontalOffset * ((100 - specs.four.size) / 2) : 0}%`, 
    //                                     right: `${specs.four.multiplier < 0 ? specs.four.horizontalOffset * ((100 - specs.four.size) / 2) : 0}%`,
    //                                     top: `${specs.four.multiplier < 0 ? specs.four.verticalOffset * ((100 - specs.four.size) / 2) : 0}%`,
    //                                     bottom: `${specs.four.multiplier > 0 ? specs.four.verticalOffset * ((100 - specs.four.size) / 2) : 0}%`,
    //                                     borderRadius: '50%',
    //                                     backgroundColor: 'black',
    //                                     height: `${specs.one.size}%`,
    //                                     width: `${specs.one.size}%`,
    //                                     zIndex: 4
    //                                     }}>
    //                                         <div style={{
    //                                             position: 'relative', 
    //                                             left: `${specs.five.multiplier > 0 ? specs.five.horizontalOffset * ((100 - specs.five.size) / 2) : 0}%`, 
    //                                             right: `${specs.five.multiplier < 0 ? specs.five.horizontalOffset * ((100 - specs.one.size) / 2) : 0}%`,
    //                                             top: `${specs.five.multiplier < 0 ? specs.five.verticalOffset * ((100 - specs.five.size) / 2) : 0}%`,
    //                                             bottom: `${specs.five.multiplier > 0 ? specs.five.verticalOffset * ((100 - specs.five.size) / 2) : 0}%`,
    //                                             borderRadius: '50%',
    //                                             backgroundColor: 'black',
    //                                             height: `${specs.one.size}%`,
    //                                             width: `${specs.one.size}%`,
    //                                             zIndex: 5
    //                                             }}>
    //                                                 <div style={{
    //                                                     position: 'relative', 
    //                                                     left: `${specs.six.multiplier > 0 ? specs.six.horizontalOffset * ((100 - specs.six.size) / 2) : 0}%`, 
    //                                                     right: `${specs.six.multiplier < 0 ? specs.six.horizontalOffset * ((100 - specs.six.size) / 2) : 0}%`,
    //                                                     top: `${specs.six.multiplier < 0 ? specs.six.verticalOffset * ((100 - specs.six.size) / 2) : 0}%`,
    //                                                     bottom: `${specs.six.multiplier > 0 ? specs.six.verticalOffset * ((100 - specs.six.size) / 2) : 0}%`,
    //                                                     borderRadius: '50%',
    //                                                     backgroundColor: 'black',
    //                                                     height: `${specs.one.size}%`,
    //                                                     width: `${specs.one.size}%`,
    //                                                     zIndex: 6
    //                                                     }}>
    //                                                 </div>
    //                                         </div>
    //                                 </div>
    //                         </div>
    //                 </div>
    //         </div>
            
            
            
            
            
    //     </div>
    // )
    return (
        // <div style={{position: 'relative', width: props.size, height: props.size, backgroundColor: 'black', borderRadius: '50%'}}>
        //     <div style={{textAlign: 'center', position: 'relative', width:'50%', height: '50%', right: `${10 + Math.random() * 10}%`, bottom: `${10 + Math.random() * 10}%`,  backgroundColor: 'black', borderRadius: '50%'}}></div>
        //     <div style={{display: 'inline-block', position: 'relative', width:'50%', height: '50%', right: `${10 + Math.random() * 10}%`, top: `${10 + Math.random() * 10}%`,  backgroundColor: 'black', borderRadius: '50%'}}></div>
        //     <div style={{display: 'inline-block', position: 'relative', width:'50%', height: '50%', left: `${10 + Math.random() * 10}%`, top: `${10 + Math.random() * 10}%`,  backgroundColor: 'black', borderRadius: '50%'}}></div>
        // </div>
        <div style={{position: 'relative', width: props.size, height: props.size, backgroundColor: 'black', borderRadius: '50%'}}>
            <div style={{zIndex: 2, textAlign: 'center', position: 'relative', width:'50%', height: '50%', right: `${10 + Math.random() * 15}%`, bottom: `${10 + Math.random() * 15}%`,  backgroundColor: 'black', borderRadius: '50%'}}></div>
            <div style={{zIndex: 3, position: 'relative', width:'50%', height: '50%', right: `${10 + Math.random() * 15}%`, top: `${10 + Math.random() * 15}%`,  backgroundColor: 'black', borderRadius: '50%'}}></div>
            <div style={{zIndex: 4, position: 'relative', width:'50%', height: '50%', left: `${10 + Math.random() * 15}%`, top: `${10 + Math.random() * 15}%`,  backgroundColor: 'black', borderRadius: '50%'}}></div>
            <div style={{zIndex: 5, textAlign: 'center', position: 'relative', width:'50%', height: '50%', left: `${10 + Math.random() * 15}%`, top: `${10 + Math.random() * 15}%`,  backgroundColor: 'black', borderRadius: '50%'}}></div>

        </div>
    )
}

export default Smudge;