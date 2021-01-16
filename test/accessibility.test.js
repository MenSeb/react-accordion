import {
    getAllHeaders,
    getAllButtons,
    getAllPanels,
    getButton,
    getPanel,
    numberOfAccordions,
    renderAccordion,
} from './';

describe('Accessibility', () => {
    describe('Roles', () => {
        it('renders each accordion header with role heading', () => {
            renderAccordion();

            expect(getAllHeaders()).toHaveLength(numberOfAccordions);
        });

        it('renders each accordion button with role button', () => {
            renderAccordion();

            expect(getAllButtons()).toHaveLength(numberOfAccordions);
        });

        it('renders each accordion panel with role region', () => {
            renderAccordion();

            expect(getAllPanels()).toHaveLength(numberOfAccordions);
        });

        it('renders each accordion button as unique child of accordion header', () => {
            renderAccordion();

            getAllHeaders().forEach((element, index) => {
                expect(element.childNodes).toHaveLength(1);
                expect(element).toContainElement(getButton(index));
            });
        });

        describe('When there are more than 6 accordion panels with multiple set to true', () => {
            it('renders each accordion panel without role region', () => {
                renderAccordion({
                    props: { numberOfAccordions: 7, multipleExpand: true },
                });

                expect(jest.fn(() => getAllPanels())).toThrow();
            });
        });
    });

    describe('Default properties', () => {
        beforeEach(() => renderAccordion());

        it('renders each header with aria-level', () => {
            getAllHeaders().forEach((element) => {
                expect(element).toHaveAttribute('aria-level', '3');
            });
        });

        it('renders each button with aria-disabled', () => {
            getAllButtons().forEach((element) => {
                expect(element).toHaveAttribute('aria-disabled', 'false');
            });
        });

        it('renders and connects each button with aria-controls', () => {
            getAllButtons().forEach((element, index) => {
                expect(element).toHaveAttribute(
                    'aria-controls',
                    getPanel(index).id,
                );
            });
        });

        it('renders and connects each panel with aria-labelledby', () => {
            getAllPanels().forEach((element, index) => {
                expect(element).toHaveAttribute(
                    'aria-labelledby',
                    getButton(index).id,
                );
            });
        });
    });

    describe('Custom properties', () => {
        it('disables the only expanded button if at least one must stay expanded', () => {
            renderAccordion({
                props: { alwaysExpand: true, initiallyExpanded: [0] },
            });

            getAllButtons().forEach((element, index) => {
                expect(element)[index === 0 ? 'toBeDisabled' : 'toBeEnabled']();
                expect(element).toHaveAttribute(
                    'aria-disabled',
                    index === 0 ? 'true' : 'false',
                );
            });
        });
    });

    describe('States', () => {
        beforeEach(() =>
            renderAccordion({ props: { initiallyExpanded: [0] } }),
        );

        it('renders each button with aria-expanded', () => {
            getAllButtons().forEach((element, index) => {
                expect(element).toHaveAttribute(
                    'aria-expanded',
                    index === 0 ? 'true' : 'false',
                );
            });
        });

        it('renders each panel with aria-hidden', () => {
            getAllPanels().forEach((element, index) => {
                expect(element).toHaveAttribute(
                    'aria-hidden',
                    index === 0 ? 'false' : 'true',
                );
            });
        });

        it('hides each panel not expanded', () => {
            expect(getAllPanels()).toHaveLength(numberOfAccordions);
            expect(getAllPanels(false)).toHaveLength(1);
        });
    });
});
