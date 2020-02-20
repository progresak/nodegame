import styled from 'styled-components';

export const MessageLine = styled.div``;

export const MessagesContent = styled.div`
    flex: 1;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    max-height: 200px;
    min-height: 150px;
`;

export const ChatWrapperElement = styled.div`
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 400px;
    > p > b {
        color: yellow;
        cursor: pointer;
    }
`;

export const MessagesWrapper = styled.div`
    border-radius: 5px;
    color: white;
    width: 100%;
    max-height: 200px;
    background: rgba(0, 0, 0, 0.4);
    padding: 10px;
    display: flex;
    flex:1;
    flex-direction: column;
    height: 100%;
`;

export const ChatForm = styled.form`
    background: black;
    float: left;
    bottom: 0;
    border-radius: 5px;
    width: 400px;
`;

export const ChatLabel = styled.label`
    color: white;
    float: left;
    margin: 5px;
`;

export const ChatInput = styled.input`
    background: black;
    width: 80%;
    border: none;
    color: white;
    padding: 5px;
    border-radius: 5px;
    float: left;
`;
export const MessagePlayerName = styled.span`
    font-weight: bold;
    color: yellow;
    cursor: pointer;
`;
