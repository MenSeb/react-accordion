import { first, last, next, prev, register, select } from 'actions';
import {
    KEY_CLICK,
    KEY_ARROW_DOWN,
    KEY_END,
    KEY_ENTER,
    KEY_HOME,
    KEY_ARROW_LEFT,
    KEY_REGISTER,
    KEY_ARROW_RIGHT,
    KEY_SPACE,
    KEY_ARROW_UP,
} from './keys';

export default {
    [KEY_CLICK]: select,
    [KEY_ARROW_DOWN]: next,
    [KEY_END]: last,
    [KEY_ENTER]: select,
    [KEY_HOME]: first,
    [KEY_ARROW_LEFT]: prev,
    [KEY_REGISTER]: register,
    [KEY_ARROW_RIGHT]: next,
    [KEY_SPACE]: select,
    [KEY_ARROW_UP]: prev,
};
