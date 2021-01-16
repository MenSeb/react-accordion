import userEvent, { specialChars } from '@testing-library/user-event';
import { getButton, getPanel, numberOfAccordions, renderAccordion } from './';

describe('Mouse interaction', () => {
    describe('When user click an accordion button', () => {
        it('moves focus to the accordion button', () => {
            renderAccordion();

            expect(getButton()).not.toHaveFocus();

            userEvent.click(getButton());

            expect(getButton()).toHaveFocus();
        });

        describe('When its associated panel is collapsed', () => {
            it('expands the accordion panel', () => {
                renderAccordion();

                expect(getPanel()).not.toBeVisible();

                userEvent.click(getButton());

                expect(getPanel()).toBeVisible();
            });

            it('collapses any other panel if only one is allowed to be expand', () => {
                renderAccordion({ props: { initiallyExpanded: [2] } });

                expect(getPanel(2)).toBeVisible();

                userEvent.click(getButton());

                expect(getPanel(2)).not.toBeVisible();
            });
        });

        describe('When its associated panel is expanded', () => {
            it('collapses the accordion panel', () => {
                renderAccordion({ props: { initiallyExpanded: [0] } });

                expect(getPanel()).toBeVisible();

                userEvent.click(getButton());

                expect(getPanel()).not.toBeVisible();
            });

            it('keeps the accordion panel expanded if at least one must be expand', () => {
                renderAccordion({ props: { alwaysExpand: true } });

                expect(getPanel()).toBeVisible();

                userEvent.click(getButton());

                expect(getPanel()).toBeVisible();
            });
        });
    });
});

describe('Keyboard interaction', () => {
    [specialChars.enter, specialChars.space].forEach((key) => {
        describe(`When user press ${key} on an accordion header`, () => {
            describe('When its associated panel is collapsed', () => {
                it('expands the accordion panel', () => {
                    renderAccordion();

                    expect(getPanel()).not.toBeVisible();

                    userEvent.type(getButton(), key);

                    expect(getPanel()).toBeVisible();
                });

                it('collapses any other panel if only one is allowed to be expand', () => {
                    renderAccordion({ props: { initiallyExpanded: [2] } });

                    expect(getPanel(2)).toBeVisible();

                    userEvent.type(getButton(), key);

                    expect(getPanel(2)).not.toBeVisible();
                });
            });

            describe('When its associated panel is expanded', () => {
                it('collapses the accordion panel', () => {
                    renderAccordion({ props: { initiallyExpanded: [0] } });

                    expect(getPanel()).toBeVisible();

                    userEvent.type(getButton(), key);

                    expect(getPanel()).not.toBeVisible();
                });

                it('keeps the accordion panel expanded if at least one must be expand', () => {
                    renderAccordion({
                        props: { alwaysExpand: true, initiallyExpanded: [0] },
                    });

                    expect(getPanel()).toBeVisible();

                    userEvent.type(getButton(), key);

                    expect(getPanel()).toBeVisible();
                });
            });
        });
    });

    describe('When user press tab', () => {
        describe('When focus is outside the accordion', () => {
            it('moves focus to the first accordion header', () => {
                renderAccordion();

                expect(getButton()).not.toHaveFocus();

                userEvent.tab();

                expect(getButton()).toHaveFocus();
            });
        });

        describe('When focus is inside the accordion', () => {
            it('moves focus to the accordion panel if it is expanded', () => {
                renderAccordion({ props: { initiallyExpanded: [0] } });

                userEvent.tab();

                expect(getPanel()).not.toHaveFocus();

                userEvent.tab();

                expect(getPanel()).toHaveFocus();
            });

            it('moves focus between each accordion button if none are expanded', () => {
                renderAccordion();

                for (let i = 0; i < numberOfAccordions; i++) {
                    userEvent.tab();
                    expect(getButton(i)).toHaveFocus();
                }

                userEvent.tab();

                expect(document.body).toHaveFocus();
            });
        });
    });

    describe('When user press shift + tab', () => {
        describe('When focus is outside the accordion', () => {
            it('moves focus to the last accordion header', () => {
                renderAccordion();

                expect(getButton(numberOfAccordions - 1)).not.toHaveFocus();

                userEvent.tab({ shift: true });

                expect(getButton(numberOfAccordions - 1)).toHaveFocus();
            });
        });

        describe('When focus is inside the accordion', () => {
            it('moves focus to the accordion panel if it is expanded', () => {
                renderAccordion({
                    props: { initiallyExpanded: [numberOfAccordions - 1] },
                });

                expect(getPanel(numberOfAccordions - 1)).not.toHaveFocus();

                userEvent.tab({ shift: true });

                expect(getPanel(numberOfAccordions - 1)).toHaveFocus();
            });

            it('moves focus between each accordion header if none are expanded', () => {
                renderAccordion();

                for (let i = numberOfAccordions - 1; i >= 0; i--) {
                    userEvent.tab({ shift: true });
                    expect(getButton(i)).toHaveFocus();
                }

                userEvent.tab({ shift: true });

                expect(document.body).toHaveFocus();
            });
        });
    });

    describe('When user press arrow down', () => {
        describe('When focus is on an accordion header', () => {
            it('moves focus to the next accordion header', () => {
                renderAccordion();

                userEvent.type(getButton(), specialChars.arrowDown);

                expect(getButton(1)).toHaveFocus();
            });
        });

        describe('When focus is on the last accordion header', () => {
            it('moves focus to the first accordion header', () => {
                renderAccordion();

                userEvent.type(
                    getButton(numberOfAccordions - 1),
                    specialChars.arrowDown,
                );

                expect(getButton()).toHaveFocus();
            });
        });

        describe('When focus is on an accordion panel', () => {
            it('keeps focus on the accordion panel', () => {
                renderAccordion();

                userEvent.type(getPanel(), specialChars.arrowDown);

                expect(getPanel()).toHaveFocus();
            });
        });
    });

    describe('When user press arrow up', () => {
        describe('When focus is on an accordion header', () => {
            it('moves focus to the previous accordion header', () => {
                renderAccordion();

                userEvent.type(getButton(1), specialChars.arrowUp);

                expect(getButton()).toHaveFocus();
            });
        });

        describe('When focus is on the first accordion header', () => {
            it('moves focus to the last accordion header', () => {
                renderAccordion();

                userEvent.type(getButton(), specialChars.arrowUp);

                expect(getButton(numberOfAccordions - 1)).toHaveFocus();
            });
        });

        describe('When focus is on an accordion panel', () => {
            it('keeps focus on the accordion panel', () => {
                renderAccordion();

                userEvent.type(getPanel(), specialChars.arrowUp);

                expect(getPanel()).toHaveFocus();
            });
        });
    });

    // https://github.com/testing-library/user-event/issues/537
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('When user press home', () => {
        describe('When focus is on an accordion header', () => {
            it('moves focus to the first accordion header', () => {
                renderAccordion();

                userEvent.type(
                    getButton(numberOfAccordions - 1),
                    specialChars.home,
                );

                expect(getButton()).toHaveFocus();
            });
        });

        describe('When focus is on an accordion panel', () => {
            it('keeps focus on the accordion panel', () => {
                renderAccordion();

                userEvent.type(getPanel(), specialChars.home);

                expect(getPanel()).toHaveFocus();
            });
        });
    });

    // https://github.com/testing-library/user-event/issues/537
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('When user press end', () => {
        describe('When focus is on an accordion header', () => {
            it('moves focus to the last accordion header', () => {
                renderAccordion();

                userEvent.type(getButton(), specialChars.end);

                expect(getButton(numberOfAccordions - 1)).toHaveFocus();
            });
        });

        describe('When focus is on an accordion panel', () => {
            it('keeps focus on the accordion panel', () => {
                renderAccordion();

                userEvent.type(getPanel(), specialChars.end);

                expect(getPanel()).toHaveFocus();
            });
        });
    });
});
