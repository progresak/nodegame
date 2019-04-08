import React from 'react';

const rect = (props) => {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}

const HandleCanvas = ({ctx, ctxUi}) => {

    rect({ctx, x: 10, y: 10, width: 50, height: 50});
};

export default HandleCanvas;