import React from 'react';

const Playfield = () => {

    return (
        <div>
            <canvas id="ctx" style={{position:"absolute", top:"8px" ,left:"8px",  border:"1px solid black"}} />
            <canvas id="ctx-ui" style={{position:"absolute", top:"8px" ,left:"8px",  border:"1px solid black"}} />
        </div>
    );
};

export default Playfield;
