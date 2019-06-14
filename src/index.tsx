import React from 'react';
import ReactDOM from 'react-dom';
import App from 'ts/app';
import { Provider } from 'react-redux';
import store from 'ts/redux/store';
import 'styles/index.scss';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
