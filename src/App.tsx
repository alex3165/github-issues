import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import * as Immutable from 'immutable';
import thunk from 'redux-thunk';

import Main from './containers/main';
import Logger from './common/Logger';
import reposReducer from './reducers/repos';

var store = (Redux.applyMiddleware(Logger, thunk)(Redux.createStore))(reposReducer, Immutable.Map());

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Main/>
    </ReactRedux.Provider>,
    document.getElementById('content')
);