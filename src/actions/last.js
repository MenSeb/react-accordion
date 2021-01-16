import { selectLast } from 'utilities';

export default function last(state, { target }) {
    return { ...state, target: selectLast({ target }) };
}
