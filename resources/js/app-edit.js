

require('./bootstrap');

import ReactDOM from 'react-dom';
import React from 'react';

import App from './index';



if (document.getElementById('app')) {
    ReactDOM.render(<App edit={true}/>, document.getElementById('app'));
}



