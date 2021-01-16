import React from 'react';
import PropTypes from 'prop-types';
import { childrenRestricted } from 'utilities';
import AccordionHeader from './AccordionHeader';
import AccordionPanel from './AccordionPanel';

export default function AccordionSection({
    children,
    expanded, // eslint-disable-line no-unused-vars
}) {
    return <>{children}</>;
}

AccordionSection.defaultProps = {
    expanded: undefined,
};

AccordionSection.propTypes = {
    children: childrenRestricted({ types: [AccordionHeader, AccordionPanel] }),
    expanded: PropTypes.bool,
};
