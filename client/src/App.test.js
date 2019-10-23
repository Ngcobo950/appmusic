import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Favorite from './App';
import render from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("We pass the test!!",() => {
    const component = render.create(<Favorite/>)
    let app = component.toJSON();
    expect(app).toMatchSnapshot();
})
