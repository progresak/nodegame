import React, { useEffect, useRef, useState } from 'react';
import {
    ChatForm,
    ChatInput,
    ChatLabel,
    ChatWrapperElement,
    MessageLine,
    MessagesContent,
    MessagesWrapper,
    MessagePlayerName
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
    const [active, updateActive] = useState(false);
    const [target, updateTarget] = useState(FOR_ALL);
    const [message, updateMessage] = useState('');
    const inputElement = useRef<HTMLInputElement>(null);

    const enterCallback = (event: KeyboardEvent) => {
        if (event.code === 'Enter') {
            updateActive(!active);
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
        if (parts[0] === '/w' && parts.length === 3) {
            updateTarget(parts[1]);
            updateMessage('');
        }
    };

    const onFormSubmit = (e: React.FormEvent) => {
        if (target !== FOR_ALL) {
            sendPrivateMessage(message, target);
        } else {
            sendMessageToServer(message);
        }
        if (active) {
            updateActive(false);
            updateMessage('');
            updateTarget(FOR_ALL);

            if (inputElement && inputElement.current) {
                inputElement.current.value = message;
            }
        }
        e.preventDefault();
    };

    const handleChatToPlayer = (target: string) => {
        updateActive(true);
        updateTarget(target);
    };

    const renderMessages = (mess: Array<Message>) =>
        mess.map(({ message, player, time }: Message) => (
            <MessageLine key={time} className="colored">
                <MessagePlayerName onClick={() => handleChatToPlayer(player)}>
                    [{player}]
                </MessagePlayerName>
                :&nbsp;{message}
            </MessageLine>
        ));

    return (
        <ChatWrapperElement>
            <MessagesWrapper>
                <MessagesContent>
                    <p>Welcome on the server</p>
                    {renderMessages(messages)}
                </MessagesContent>
            </MessagesWrapper>
            <ChatForm hidden={!active} id="chat-form" autoComplete="off" onSubmit={onFormSubmit}>
                <ChatLabel>{target}</ChatLabel>
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
