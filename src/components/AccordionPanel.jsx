import React from 'react';
import PropTypes from 'prop-types';
import { useContextState } from '@menseb/react-context-reducer';

export default function AccordionPanel({ children, hidden, labelledby, id }) {
    const { multipleExpand, numberOfAccordions } = useContextState();

    return (
        <div
            aria-hidden={hidden.toString()}
            aria-labelledby={labelledby}
            hidden={hidden}
            id={id}
            role={multipleExpand && numberOfAccordions > 6 ? null : 'region'}
            tabIndex={hidden ? '-1' : '0'}
        >
            {children}
        </div>
    );
}

AccordionPanel.defaultProps = {
    hidden: undefined,
    id: undefined,
    labelledby: undefined,
};

AccordionPanel.propTypes = {
    children: PropTypes.node.isRequired,
    hidden: PropTypes.bool,
    id: PropTypes.string,
    labelledby: PropTypes.string,
};
