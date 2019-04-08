import React from 'react';
import Chat from "./Chat";
import HandleCanvas from "./HandleCanvas";

class GameScreen extends React.Component {

    componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.updateCanvas(window.innerWidth, window.innerHeight);
    }

    resize = () => {
        this.updateCanvas(window.innerWidth, window.innerHeight);
    };

    updateCanvas = (w, h) => {
        const ctx = this.refs.ctx.getContext('2d');
        const ctxUi = this.refs.ctxUi.getContext('2d');
        w -= 20;
        h -= 20;
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        ctxUi.canvas.width = w;
        ctxUi.canvas.height = h;
    };


    render() {
        return (
            <div id="gameDiv">
                <canvas ref={'ctx'} id="ctx"/>
                <canvas ref={'ctxUi'} id="ctx-ui"/>
                {this.refs.ctx && this.refs.ctxUi ?
                    <HandleCanvas ctx={this.refs.ctx.getContext('2d')} ctxUi={this.refs.ctxUi.getContext('2d')}/> :
                    <span></span>}

                <div id="ui">
                    <Chat/>
                    <div id="position">
                        <span>[100,100]</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameScreen;