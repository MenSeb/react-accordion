import userEvent from '@testing-library/user-event';
import { getAllPanels, getButton, getPanel, renderAccordion } from '../';

describe('<AccordionProvider />', () => {
    describe('When alwaysExpand is set to true', () => {
        it('expands the first accordion panel if none are expanded initially', () => {
            renderAccordion({ props: { alwaysExpand: true } });

            expect(getAllPanels(false)).toHaveLength(1);
            expect(getPanel()).toBeVisible();
        });

        it('disables the only button expanded if every other one collapses', () => {
            renderAccordion({
                props: { alwaysExpand: true, initiallyExpanded: [0, 1] },
            });

            expect(getButton(1)).toBeEnabled();

            userEvent.click(getButton());

            expect(getButton(1)).toBeDisabled();
        });

        it('enables the only button expanded if any other one expands', () => {
            renderAccordion({ props: { alwaysExpand: true } });

            expect(getButton()).toBeDisabled();

            userEvent.click(getButton(1));

            expect(getButton()).toBeEnabled();
        });
    });

    describe('When initiallyExpanded is provided', () => {
        it('expands each accordion panel included in it', () => {
            const initiallyExpanded = [0, 2, 4];

            renderAccordion({ props: { initiallyExpanded } });

            expect(getAllPanels(false)).toHaveLength(initiallyExpanded.length);

            initiallyExpanded.forEach((index) => {
                expect(getPanel(index)).toBeVisible();
            });
        });
    });
});
