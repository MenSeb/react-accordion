import React from 'react';
import { screen, render } from '@testing-library/react';
import {
    Accordion,
    AccordionButton,
    AccordionHeader,
    AccordionPanel,
    AccordionProvider,
    AccordionSection,
} from 'components';

export const numberOfAccordions = 5;
export const label = 'label';

export function wrapper({
    props = {},
    propsAccordion = {},
    propsButton = {},
    propsHeader = {},
    propsPanel = {},
} = {}) {
    const length = props.numberOfAccordions || numberOfAccordions;

    return (
        <AccordionProvider numberOfAccordions={numberOfAccordions} {...props}>
            <Accordion className="accordion" {...propsAccordion}>
                {Array.from({ length }, (_, index) => (
                    <AccordionSection key={index}>
                        <AccordionHeader className="header" {...propsHeader}>
                            <AccordionButton
                                className="button"
                                {...propsButton}
                            >
                                button {index}
                            </AccordionButton>
                        </AccordionHeader>
                        <AccordionPanel className="panel" {...propsPanel}>
                            panel {index}
                        </AccordionPanel>
                    </AccordionSection>
                ))}
            </Accordion>
        </AccordionProvider>
    );
}

export function renderAccordion(options) {
    return render(wrapper(options));
}

export function getAccordion() {
    return screen.getByRole('region', { name: label });
}

export function getButton(index = 0) {
    return getAllButtons()[index];
}

export function getHeader(index = 0) {
    return getAllHeaders()[index];
}

export function getPanel(index = 0) {
    return getAllPanels()[index];
}

export function getAllButtons(disabled = null) {
    return screen.getAllByRole('button', { disabled });
}

export function getAllHeaders() {
    return screen.getAllByRole('heading');
}

export function getAllPanels(hidden = true) {
    return screen.getAllByRole('region', { hidden });
}
