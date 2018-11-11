import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import ContactPage from './contact';
import Home from './home';

it('Renders Home without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Renders ContactPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContactPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
