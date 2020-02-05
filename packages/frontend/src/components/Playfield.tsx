import React from 'react';
import styled from 'styled-components';

const Playfield = () => {
    return (
        <>
            <CanvasElement id="ctx" />
            <CanvasElement id="ctx-ui" />
        </>
    );
};

const CanvasElement = styled.canvas`
    position: absolute;
    top: 8px;
    left: 8px;
    border: 1px solid black;
`;

export default Playfield;
