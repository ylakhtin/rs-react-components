import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../../App';

const PAGE_SEGMENT_NUMBER = 2;

describe('Paginator component', () => {
  it('Component updates URL query parameter when click next page', async () => {
    await render(<App />);

    const buttonElement = await screen.findByRole('button', { name: /Next/i });
    fireEvent.click(buttonElement);

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    const pageNum = pathSegments[PAGE_SEGMENT_NUMBER];

    expect(pageNum).toEqual(String(PAGE_SEGMENT_NUMBER));
  });

  it('Component updates URL query parameter when click next page', async () => {
    await render(<App />);

    const buttonNextElement = await screen.findByRole('button', {
      name: /Next/i,
    });
    fireEvent.click(buttonNextElement);
    fireEvent.click(buttonNextElement);

    const buttonPrevElement = await screen.findByRole('button', {
      name: /Prev/i,
    });
    fireEvent.click(buttonPrevElement);

    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    const pageNum = pathSegments[PAGE_SEGMENT_NUMBER];

    expect(pageNum).toEqual(String(PAGE_SEGMENT_NUMBER));
  });
});
