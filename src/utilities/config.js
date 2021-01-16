export default function config(state) {
    const {
        alwaysExpand,
        initiallyExpanded,
        numberOfAccordions,
        uniqueId,
    } = state;

    const expandedAccordions =
        alwaysExpand && initiallyExpanded.length === 0
            ? [0]
            : [...initiallyExpanded];

    const datas = [];

    for (let n = 0; n < numberOfAccordions; n++) {
        const id = `${uniqueId}-${n}`;

        datas.push({
            expanded: expandedAccordions.includes(n),
            idButton: `button-${id}`,
            idPanel: `panel-${id}`,
        });
    }

    return {
        ...state,
        datas,
        expandedAccordions,
    };
}
