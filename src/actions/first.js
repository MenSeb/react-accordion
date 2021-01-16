import { selectFirst } from 'utilities';

export default function first(state, { target }) {
    return { ...state, target: selectFirst({ target }) };
}
