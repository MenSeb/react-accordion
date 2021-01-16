import { selectPrev } from 'utilities';

export default function prev(state, { target }) {
    return { ...state, target: selectPrev({ target }) };
}
