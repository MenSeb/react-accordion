export function getAccordionIndex({ id }) {
    return +id.slice(id.lastIndexOf('-') + 1);
}

export function isAccordionDisabled({
    alwaysExpand,
    expanded,
    expandedAccordions,
}) {
    return alwaysExpand && expanded && expandedAccordions.length === 1;
}

export function removeFromArray(array, element) {
    const index = array.indexOf(element);

    if (index === 0) return array.slice(1);

    if (index === array.length - 1) return array.slice(0, -1);

    return array.slice(0, index).concat(array.slice(index + 1));
}
