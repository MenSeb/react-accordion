import React from 'react';
import { childrenRestricted } from 'utilities';
import { useContextState } from '@menseb/react-context-reducer';
import AccordionButton from './AccordionButton';

export default function AccordionHeader({ children }) {
    const { headingLevel } = useContextState();

    return (
        <div aria-level={headingLevel} role="heading">
            {children}
        </div>
    );
}

AccordionHeader.propTypes = {
    children: childrenRestricted({ types: [AccordionButton] }),
};
