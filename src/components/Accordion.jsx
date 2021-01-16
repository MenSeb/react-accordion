import React, { Children, cloneElement, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useContextReducer } from '@menseb/react-context-reducer';
import { childrenRestricted } from 'utilities';
import AccordionSection from './AccordionSection';

export default function Accordion({ children, ...props }) {
    const { dispatch, state } = useContextReducer();

    const { datas, target, uniqueId } = state;

    // useEffect(() => {
    //     dispatch.register({ childs: Children.toArray(children) });
    // }, [children, dispatch]);

    // if (Children.count(children) !== accordions) {
    //     throw new Error(
    //         'Invalid number of children provided to Accordion. ' +
    //             `You should provide ${accordions} AccordionSection.`,
    //     );
    // }

    useEffect(() => {
        if (target) target.focus();
    }, [target]);

    return (
        <div {...props} id={uniqueId}>
            {Children.map(children, (child, index) => {
                const { expanded, idButton, idPanel } = datas[index];

                const [header, panel] = Children.toArray(child.props.children);

                return cloneElement(child, {
                    children: [
                        cloneElement(header, {
                            children: cloneElement(header.props.children, {
                                expanded,
                                id: idButton,
                                controls: idPanel,
                            }),
                        }),
                        cloneElement(panel, {
                            hidden: !expanded,
                            id: idPanel,
                            labelledby: idButton,
                        }),
                    ],
                });
            })}
        </div>
    );
}

Accordion.propTypes = {
    children: childrenRestricted({ multiple: true, types: [AccordionSection] }),
};
