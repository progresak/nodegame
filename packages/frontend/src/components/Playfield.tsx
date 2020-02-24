import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useWindowSize from '../hooks/useWindowSize';
import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { setWindowSize } from '../ducks/App/actions';
import { Dimension } from '../ducks/App/reducer';

interface PlayfieldProps {
    setWindowSize: (size: Dimension) => void;
}

const Playfield: React.FC<PlayfieldProps> = ({ setWindowSize }) => {
    const size = useWindowSize();
    const ctx = useRef<HTMLCanvasElement>(null);
    const ctxUi = useRef<HTMLCanvasElement>(null);

    const setCanvasSize = ({
        width: fullWidth,
        height: fullHeight
    }: {
        width: number;
        height: number;
    }) => {
        const width = fullWidth - 20;
        const height = fullHeight - 20;
        if (ctx.current) {
            ctx.current.height = height;
            ctx.current.width = width;
        }
        if (ctxUi.current) {
            ctxUi.current.height = height;
            ctxUi.current.width = width;
        }
    };
    useEffect(() => {
        // @ts-ignore
        window.playGame();
        // @ts-ignore
        window.setDimension(size);
        // @ts-ignore
        setWindowSize(size);
        setCanvasSize(size);
    }, [size]);

    return (
        <>
            <CanvasElement ref={ctx} id="ctx" />
            <CanvasElement ref={ctxUi} id="ctx-ui" />
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

interface DispatchProps {
    setWindowSize: (size: Dimension) => void;
}

export default connect<{}, DispatchProps, {}, RootState>(null, { setWindowSize })(Playfield);
