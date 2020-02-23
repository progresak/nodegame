import { connect } from 'react-redux';
import { getAllMessages } from '../../ducks/App/selectors';
import { addMessage, sendMessageToServer, sendPrivateMessage } from '../../ducks/App/actions';
import { RootState } from '../../reducer';
import { Message } from '../../ducks/App/reducer';

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
    addMessage,
};

const mapStateToProps = (state: RootState) => ({
    messages: getAllMessages(state)
});

export default connect<MapStateToProps, MapDispatchToProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps
);
