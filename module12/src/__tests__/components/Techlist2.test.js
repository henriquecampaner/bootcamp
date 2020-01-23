import React from 'react';
import { render,fireEvent } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';
import { addTech } from '~/store/modules/techs/actions';
import TechList2 from '~/components/TechList2';

jest.mock('react-redux');

describe('TechList components, redux', () => {
  it('should render tech list', () => {
    useSelector.mockImplementation(cb => cb({
      techs: ['Node.js', 'ReactJS']
    }));

    const { getByText, getByTestId } = render(<TechList2 />);

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByTestId('tech-list')).toContainElement(getByText('ReactJS'));
    
  });

  it('should be able to add new tech', () => {
    const { getByTestId, getByLabelText } = render(<TechList2 />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js'} });
    fireEvent.submit(getByTestId('tech-form'));

    expect(dispatch).toHaveBeenCalledWith(addTech('Node.js'));
  });

});