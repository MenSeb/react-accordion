import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useContextReducer } from '@menseb/react-context-reducer';
import * as keys from 'constants/keys';
import { isAccordionDisabled, isArrowKey, isValidKey } from 'utilities';

export default function AccordionButton({ children, controls, expanded, id }) {
    const { dispatch, state } = useContextReducer();

    const { alwaysExpand, expandedAccordions } = state;

    const isDisabled = isAccordionDisabled({
        alwaysExpand,
        expanded,
        expandedAccordions,
    });

    const onClickAccordion = useCallback(
        ({ target }) => dispatch[keys.KEY_CLICK]({ target }),
        [dispatch],
    );

    const onKeyUpAccorion = useCallback(
        (event) => {
            const { key, target } = event;

            if (!isValidKey(key)) return;

            if (isArrowKey(key)) event.preventDefault();

            dispatch[key]({ target });
        },
        [dispatch],
    );

    return (
        <button
            aria-controls={controls}
            aria-disabled={isDisabled.toString()}
            aria-expanded={expanded}
            disabled={isDisabled}
            id={id}
            onClick={onClickAccordion}
            onKeyUp={onKeyUpAccorion}
            tabIndex="0"
            type="button"
        >
            {children}
        </button>
    );
}

AccordionButton.defaultProps = {
    controls: undefined,
    expanded: undefined,
    id: undefined,
};

AccordionButton.propTypes = {
    children: PropTypes.node.isRequired,
    controls: PropTypes.string,
    expanded: PropTypes.bool,
    id: PropTypes.string,
};
