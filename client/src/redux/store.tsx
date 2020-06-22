
import { createStore } from 'redux';
import reducer from './dispatch/Dispatch'
export const store = createStore(reducer)