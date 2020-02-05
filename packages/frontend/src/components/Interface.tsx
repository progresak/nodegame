import React from 'react';
import Chat from './Chat';
import styled from 'styled-components';

const Interface = () => (
    <InterfaceWrapper id="ui">
        <Chat />
        <PositionElement id="position">
            <span>[100,100]</span>
        </PositionElement>
    </InterfaceWrapper>
);

export default Interface;

const InterfaceWrapper = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
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
