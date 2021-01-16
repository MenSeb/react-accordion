import React from 'react';
import { render } from 'react-dom';
import {
    Accordion,
    AccordionButton,
    AccordionHeader,
    AccordionPanel,
    AccordionProvider,
    AccordionSection,
} from '../src';
import './styles.scss';

function Demo() {
    return (
        <AccordionProvider
            alwaysExpand={true}
            multipleExpand={true}
            numberOfAccordions={5}
        >
            <Accordion>
                {Array.from({ length: 5 }, (_, index) => (
                    <AccordionSection key={index}>
                        <AccordionHeader>
                            <AccordionButton
                                controls={`panel-${index}`}
                                id={`button-${index}`}
                            >
                                {`button-${index}`}
                            </AccordionButton>
                        </AccordionHeader>
                        <AccordionPanel
                            labelledby={`button-${index}`}
                            id={`panel-${index}`}
                        >
                            {`panel-${index}`}
                        </AccordionPanel>
                    </AccordionSection>
                ))}
            </Accordion>
        </AccordionProvider>
    );
}

render(<Demo />, document.getElementById('root'));
