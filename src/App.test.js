import { render, screen } from '@testing-library/react';
import TokenInput from './components/tokeninput';
import Commits from './components/commits';

test('Totken input page', () => {
  render(<TokenInput />);
  const linkElement = screen.getByText(/You are not Authorzed/i);
  expect(linkElement).toBeInTheDocument();
});

test('commits page', () => {
  render(<Commits />);
  const linkElement = screen.getByText(/Commits/i);
  expect(linkElement).toBeInTheDocument();
});
