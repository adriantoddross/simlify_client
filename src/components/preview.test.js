import React from 'react';
import {shallow, mount} from 'enzyme';
import Preview from './preview';


describe('<Preview />', () => {
	it('Renders without crashing', () => {
		shallow(<Preview />);
	});
});