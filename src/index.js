import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Route, IndexRoute, Router, browserHistory } from 'react-router'

import Layout from './Layout';

import Main from './Main';
import Detail from './Detail';
import Dropdown from './Dropdown';

const routes = (
  <Route path="/" component={Layout}>
    <Route path="main" component={Main} />
    <Route path="detail/:date" component={Detail} />
    <Route path="dropdown" component={Dropdown} />
  </Route>
);
const initial = [
  {
    id: "1",
    date: '22.10.2012',
  },
  {
    id: "2",
    date: '22.12.2012',
  }
];

function playlist(state = initial, action) {
    switch (action.type) {
        case 'ADD_TRACK':
            return [
                ...state,
                action.payload,
            ];
            break;
        case 'DELETE_TRACK': {
            console.log(action);
            state.splice(action.payload, 1);
            return [
                ...state,
            ];
        }
            break;
        case 'UPDATE_TRACK': {
            console.log(action, state);
            state[action.payload.key] = action.payload.id;
            return [
                ...state,
            state.map(item => item.id === action.payload.id ? { id: action.payload.id, date: action.payload.date} : state)
            ];
            // return state.map(item => item.id === action.payload.id ? { id: action.payload.id, date: action.payload.date} : state);

        }
            break;

    }
    return state;
}

const store = createStore(playlist);

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
     />
  </Provider>,
  document.getElementById('root')
);
