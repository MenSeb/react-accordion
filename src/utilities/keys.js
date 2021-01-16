import * as keys from 'constants/keys';

const { KEY_ARROW_DOWN, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ARROW_UP } = keys;

const KEYS = Object.values(keys);

export function isArrowKey(key) {
    return (
        key === KEY_ARROW_DOWN ||
        key === KEY_ARROW_LEFT ||
        key === KEY_ARROW_RIGHT ||
        key === KEY_ARROW_UP
    );
}

export function isValidKey(key) {
    return KEYS.includes(key);
}
