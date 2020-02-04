import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reducer';
import { addMessage, sendMessageToServer, sendPrivateMessage } from '../ducks/App/actions';
import { getAllMessages } from '../ducks/App/selectors';
import styled from 'styled-components';
import { Message } from '../ducks/App/reducer';

interface ChatProps {
    sendMessageToServer: (message: string) => void;
    sendPrivateMessage: (message: string, username: string) => void;
    addMessage: (args: { player: string; message: string }) => void;
    messages: Array<Message>;
}

const FOR_ALL = 'For all';
const Chat: React.FC<ChatProps> = ({
    sendMessageToServer,
    sendPrivateMessage,
    addMessage,
    messages
}) => {
    const [chat, updateChat] = useState({
        target: FOR_ALL,
        active: false
    });
    const [message, updateMessage] = useState('');
    const { active, target } = chat;
    const inputElement = useRef<HTMLInputElement>(null);

    // @ts-ignore
    const enterCallback = event => {
        if (event.keyCode === 13) {
            updateChat({ ...chat, active: !active });
        }
    };

    useEffect(() => {
        // @ts-ignore
        window.socket.on('addToChat', (data: { player: string; message: string }) => {
            addMessage(data);
        });
        document.addEventListener('keydown', enterCallback, false);

        return () => {
            document.removeEventListener('keydown', enterCallback, false);
        };
    }, []);

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const parts = message.split(' ');
        updateMessage(e.currentTarget.value);
        if (parts[0] === '/w' && parts.length === 2) {
            updateChat({ ...chat, target: parts[1] });
            updateMessage('');
        }

        updateChat({ ...chat, target: FOR_ALL });
    };

    const onFormSubmit = (e: React.FormEvent) => {
        if (target !== FOR_ALL) {
            sendPrivateMessage(message, target);
        } else {
            sendMessageToServer(message);
        }
        if (active) {
            updateChat({ ...chat, active: false });
            updateMessage('');

            if (inputElement && inputElement.current) {
                inputElement.current.value = message;
            }
        }
        e.preventDefault();
    };

    const renderMessages = (mess: Array<Message>) =>
        mess.map(({ message, player, time }: Message) => (
            <MessageLine key={time} className="colored">
                <strong>[{player}]</strong>:&nbsp;{message} {/*className="mgsplayer"*/}
            </MessageLine>
        ));

    return (
        <ChatWrapperElement id="chat">
            <MessagesWrapper className="chat-window">
                <MessagesContent>
                    <div id="messages">
                        <p>Welcome on the server</p>
                        {renderMessages(messages)}
                    </div>
                </MessagesContent>
            </MessagesWrapper>
            <ChatForm hidden={!active} id="chat-form" autoComplete="off" onSubmit={onFormSubmit}>
                <ChatLabel htmlFor="chat-input">{target}</ChatLabel>
                <ChatInput
                    type="text"
                    value={message}
                    ref={inputElement}
                    onChange={handleMessageChange}
                />
            </ChatForm>
        </ChatWrapperElement>
    );
};

const MessageLine = styled.div``;

const MessagesContent = styled.div`
    flex: 1;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
    max-height: 200px;
    min-height: 150px;
`;

const ChatWrapperElement = styled.div`
    position: absolute;
    left: 10px;
    bottom: 10px;
    width: 400px;
    > p > b {
        color: yellow;
        cursor: pointer;
    }
`;

const MessagesWrapper = styled.div`
    border-radius: 5px;
    color: white;
    width: 100%;
    max-height: 200px;
    background: rgba(0, 0, 0, 0.4);
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const ChatForm = styled.form`
    background: black;
    float: left;
    bottom: 0;
    border-radius: 5px;
    width: 400px;
`;

const ChatLabel = styled.label`
    color: white;
    float: left;
    margin: 5px;
`;

const ChatInput = styled.input`
    background: black;
    width: 80%;
    border: none;
    color: white;
    padding: 5px;
    border-radius: 5px;
    float: left;
`;

interface MapDispatchToProps {
    sendMessageToServer: (message: string) => void;
    sendPrivateMessage: (message: string, username: string) => void;
    addMessage: (args: { player: string; message: string }) => void;
}
interface MapStateToProps {
    messages: Array<Message>;
}

const mapDispatchToProps = {
    sendMessageToServer,
    sendPrivateMessage,
    addMessage
};
const mapStateToProps = (state: RootState) => ({
    messages: getAllMessages(state)
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(Chat);
