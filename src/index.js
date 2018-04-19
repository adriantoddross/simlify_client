import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/app';
import store from './store';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<MuiThemeProvider>
				<App />
			</MuiThemeProvider>
		</Router>
	</Provider>,
	document.getElementById('root')
);
