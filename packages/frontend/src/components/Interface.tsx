import React, { useEffect, useRef } from 'react';
import Chat from './Chat';
import styled from 'styled-components';
import ChangeMapButton from './ChangeMapButton';
import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { getWindowSize } from '../ducks/App/selectors';


interface InterfaceProps {
    size: {
        width: number;
        height: number;
    }
}
const Interface: React.FC<InterfaceProps> = ({ size }) => {
    const wrapper = useRef<HTMLDivElement>(null);
    const { width, height } = size;
    useEffect(() => {
        if (wrapper.current) {
            wrapper.current.style.width = `${width}px`;
            wrapper.current.style.height = `${height}px`;
        }
    }, [size]);

    return (
        <InterfaceWrapper ref={wrapper} id="ui">
            <Chat />
            <PositionElement id="position">
                <span>[100,100]</span>
            </PositionElement>
            <ChangeMapButton />
        </InterfaceWrapper>
    );
};

const InterfaceWrapper = styled.div`
    z-index: -1;
    position: absolute;
`;

const PositionElement = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.4);
    padding: 10px;
    border-radius: 10px;
    > span {
        color: white;
    }
`;

interface StateProps {
    size: { width: number; height: number };
}

const mapStateToProps = (state: RootState) => ({
    size: getWindowSize(state)
});

export default connect<StateProps, {}, {}, RootState>(mapStateToProps)(Interface);
