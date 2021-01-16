import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Provider } from '@menseb/react-context-reducer';
import { Accordion } from 'components';
import { childrenRestricted, config } from 'utilities';
import actions from 'constants/actions';

export default function AccordionProvider({
    alwaysExpand,
    children,
    headingLevel,
    initiallyExpanded,
    numberOfAccordions,
    multipleExpand,
}) {
    const { current: initial } = useRef({
        alwaysExpand,
        headingLevel,
        initiallyExpanded,
        multipleExpand,
        numberOfAccordions,
        uniqueId: nanoid(),
    });

    return (
        <Provider actions={actions} config={config} initial={initial}>
            {children}
        </Provider>
    );
}

AccordionProvider.defaultProps = {
    alwaysExpand: false,
    children: undefined,
    headingLevel: 3,
    multipleExpand: false,
    initiallyExpanded: [],
};

AccordionProvider.propTypes = {
    alwaysExpand: PropTypes.bool,
    children: childrenRestricted({ types: [Accordion] }),
    headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    multipleExpand: PropTypes.bool,
    numberOfAccordions: PropTypes.number.isRequired,
    initiallyExpanded: PropTypes.arrayOf(PropTypes.number),
};
