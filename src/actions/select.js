import {
    getAccordionIndex,
    isAccordionDisabled,
    removeFromArray,
} from 'utilities';

export default function select(state, { target }) {
    const { alwaysExpand, expandedAccordions, multipleExpand } = state;

    const datas = [...state.datas];

    const index = getAccordionIndex(target);

    const { expanded, ...rest } = datas[index];

    if (
        isAccordionDisabled({
            alwaysExpand,
            expanded,
            expandedAccordions,
        })
    ) {
        return state;
    }

    datas[index] = { ...rest, expanded: !expanded };

    if (!multipleExpand) {
        const [indexExpanded] = expandedAccordions;

        datas[indexExpanded] = { ...datas[indexExpanded], expanded: false };
    }

    if (expanded)
        return {
            ...state,
            datas,
            expandedAccordions: removeFromArray(expandedAccordions, index),
        };

    return {
        ...state,
        datas,
        expandedAccordions: multipleExpand
            ? [...expandedAccordions, index]
            : [index],
    };
}
