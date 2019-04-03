'use strict';

import {App} from './App';
import {AppContainer} from 'react-hot-loader';
import React from 'react';
import ReactDom from 'react-dom';

// Enable React devtools
window['React'] = React;

const render = Component => {
	ReactDom.render(
		<AppContainer>
			<Component/>
		</AppContainer>,
		document.getElementById('smbtest-root'),
	)
};

document.addEventListener("DOMContentLoaded", () => {
	render(App);
});

if (module.hot) {
	module.hot.accept('./App', () => {
		const {App: NewApp} = require('./App');
		render(NewApp);
	});
}
