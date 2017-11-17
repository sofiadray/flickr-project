import React from 'react';
import ReactDOM from 'react-dom';
import { App, Jumbotron, Thumbnail, ThumbnailRow, displayThumbnail} from '../client/components/App';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

var fetch = jest.fn(() => new Promise(resolve => resolve()));

const flickr = require('../client/flickr.js')
jest.mock('react-dom');
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('should render jumbo correctly', () => {
  const tree = renderer.create(
    <Jumbotron url="mockURL" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('should render thumb correctly', () => {
  const tree = renderer.create(
    <Thumbnail onClick={displayThumbnail} idx={0} url="anotherMockURL"/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('getPhotos() using promises', () => {
  it('should not search without search term', () => {
   	var data = flickr.getPhotos('')
    return  expect(data).not.toBeDefined()
  })
})

it('renders list of thumbnails', () => {
  const element = (<Thumbnail url="mockURL" idx={0}/>);
  const wrapper = shallow(<ThumbnailRow thumbnails={["mockURL"]} />);
  expect(wrapper.contains(element)).toEqual(true);
});


