import React, { useEffect } from 'react';
import styled from 'styled-components';

const Playfield = () => {
    useEffect(() => {
        // @ts-ignore
        window.playGame();
    }, []);
    return (
        <>
            <CanvasElement id="ctx-ui" />
            <CanvasElement id="ctx" />
        </>
    );
};

const CanvasElement = styled.canvas`
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: -1;

    border: 1px solid black;
`;

export default Playfield;
