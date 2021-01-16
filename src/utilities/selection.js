export function selectFirst({ target: currentButton }) {
    const { parentNode: currentHeader } = currentButton;

    const { parentNode: accordion } = currentHeader;

    const { firstChild: firstHeader } = accordion;

    const { firstChild: firstButton } = firstHeader;

    return firstButton;
}

export function selectLast({ target: currentButton }) {
    const { parentNode: currentHeader } = currentButton;

    const { parentNode: accordion } = currentHeader;

    const { lastChild: lastPanel } = accordion;

    const { previousSibling: lastHeader } = lastPanel;

    const { firstChild: lastButton } = lastHeader;

    return lastButton;
}

export function selectNext({ target: currentButton }) {
    const { parentNode: currentHeader } = currentButton;

    const { nextSibling: currentPanel, parentNode: accordion } = currentHeader;

    const { nextSibling: nextHeader } = currentPanel;

    const { firstChild: firstHeader } = accordion;

    const { firstChild: firstButton } = firstHeader;

    if (nextHeader === null) return firstButton;

    const { firstChild: nextButton } = nextHeader;

    return nextButton;
}

export function selectPrev({ target: currentButton }) {
    const { parentNode: currentHeader } = currentButton;

    const {
        previousSibling: previousPanel,
        parentNode: accordion,
    } = currentHeader;

    const { lastChild: lastPanel } = accordion;

    const { previousSibling: lastHeader } = lastPanel;

    const { firstChild: lastButton } = lastHeader;

    if (previousPanel === null) return lastButton;

    const { previousSibling: previousHeader } = previousPanel;

    const { firstChild: previousButton } = previousHeader;

    return previousButton;
}
