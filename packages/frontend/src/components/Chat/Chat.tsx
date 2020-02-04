import React, { useEffect, useRef, useState } from 'react';
import {
    ChatForm,
    ChatInput,
    ChatLabel,
    ChatWrapperElement,
    MessageLine,
    MessagesContent,
    MessagesWrapper
} from './styles';
import { Message } from '../../ducks/App/reducer';

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

    const enterCallback = (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
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
                    autoFocus
                    type="text"
                    value={message}
                    ref={inputElement}
                    onChange={handleMessageChange}
                />
            </ChatForm>
        </ChatWrapperElement>
    );
};

export default Chat;
