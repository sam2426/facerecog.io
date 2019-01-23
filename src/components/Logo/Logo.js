import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = () => {
    return(
        <div className='pa3'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 120, width: 120 }} >
                <div className="Tilt-inner pa2"> <img alt ="brain" src={brain} height={'100px'} width={'100px'} /> </div>
            </Tilt>
        </div>
    );
}

export default Logo;

// { try out few changes for tilt feature
//     reverse:        false,  // reverse the tilt direction
//     max:            35,     // max tilt rotation (degrees)
//     perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
//     scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
//     speed:          300,    // Speed of the enter/exit transition
//     transition:     true,   // Set a transition on enter/exit.
//     axis:           null,   // What axis should be disabled. Can be X or Y.
//     reset:          true    // If the tilt effect has to be reset on exit.
//     easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
// }