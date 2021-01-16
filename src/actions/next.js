import { selectNext } from 'utilities';

export default function next(state, { target }) {
    return { ...state, target: selectNext({ target }) };
}
