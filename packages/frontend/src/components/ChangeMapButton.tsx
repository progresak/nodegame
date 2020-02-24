import React from 'react';
import { Button } from '@material-ui/core';
import { RootState } from '../reducer';
import { connect } from 'react-redux';
import { changeMap } from '../ducks/App/actions';

interface ChangeMapButtonProps {
    changeMap: () => void;
}

const ChangeMapButton: React.FC<ChangeMapButtonProps> = ({ changeMap }) => {
    return (
        <Button color="primary" onClick={changeMap}>
            MAP
        </Button>
    );
};

interface DispatchProps {
    changeMap: () => void;
}

export default connect<{}, DispatchProps, {}, RootState>(null, { changeMap })(ChangeMapButton);
