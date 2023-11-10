import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Matches from '../Matches';

const correctPayload = {
  listLength: 4,
  requestOK: true,
};

const wrongPayload = {
  listLength: 0,
  requestOK: true,
};

describe('Matches component', () => {
  it('Tests the "Number of matches" block. Positive case.', async () => {
    await render(
      <Matches
        listLength={correctPayload.listLength}
        requestOK={correctPayload.requestOK}
      />
    );
    const matches = screen.getByText(/Matches on this page: /i);
    expect(matches).toBeInTheDocument();
  });

  it('Tests the "No matches found" block. Negative case.', async () => {
    await render(
      <Matches
        listLength={wrongPayload.listLength}
        requestOK={wrongPayload.requestOK}
      />
    );
    const matches = screen.getByText(/No matches found/i);
    expect(matches).toBeInTheDocument();
  });
});
