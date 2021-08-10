import { createReducer } from "redux"
import { getTheme } from '../assets/data/colors';

const initialState = {
    theme: '#FF9A76',
    themeValue: getTheme('#548CA8')
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return { 
                theme: action.payload,
                themeValue: getTheme(action.payload)
            };
        default:
            return state;
    }
}