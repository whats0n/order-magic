import {BODY, NO_TOUCH} from './constants';

!('ontouchstart' in window) && BODY.addClass(NO_TOUCH);
