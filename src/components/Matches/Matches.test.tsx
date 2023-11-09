import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Matches from './Matches';

const correctPayload = {
  listLength: 4,
  requestOK: true,
  pattern: 'Matches on this page: ',
};

const wrongPayload = {
  listLength: 0,
  requestOK: true,
  pattern: 'Matches on this page: ',
};

describe('test suite', () => {
  it('Tests the "number of matches" block. Positive case.', async () => {
    await render(
      <Matches
        listLength={correctPayload.listLength}
        requestOK={correctPayload.requestOK}
      />
    );
    const matches = screen.getByText(/Matches on this page: /i);
    expect(matches).toBeInTheDocument();
  });

  it('Tests the "number of matches" block. Negative case.', async () => {
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
