import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './index';

// TODO: test of link only is not enough, we need to test App with different types of data, maybe with snapshots
test('renders learn react link', () => {
  render(<App />);
  // TODO: change to All rights reserved
  // We need to mock Provider or/and test components without redux containers
  // This test is faled because Provider is absent for test mode
  const linkElement = screen.getByText(/All right reserved/i);
  expect(linkElement).toBeInTheDocument();
});
