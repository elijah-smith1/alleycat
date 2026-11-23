import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';
import { calendarDays, dailyQuotes, dailyQuoteIndex } from './siteContent';

test('calendar starts on Monday and includes leap day', () => {
  const days = calendarDays(new Date(2024, 1, 29));
  expect(days.slice(0, 4)).toEqual([null, null, null, 1]);
  expect(days.filter(Boolean)).toHaveLength(29);
  expect(days.at(-1)).toBe(29);
  expect(calendarDays(new Date(2026, 1, 1)).filter(Boolean)).toHaveLength(28);
});

test('daily quote stays the same throughout a local day and changes the next day', () => {
  expect(dailyQuoteIndex(new Date(2026, 10, 23, 0))).toBe(dailyQuoteIndex(new Date(2026, 10, 23, 23, 59)));
  expect(dailyQuoteIndex(new Date(2026, 10, 24))).not.toBe(dailyQuoteIndex(new Date(2026, 10, 23)));
});

test('open page updates the calendar and quote across local midnight and month end', () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2026, 0, 31, 23, 59, 59, 900));
  const view = render(<App />);
  try {
    expect(within(screen.getByRole('table', { name: 'January 2026' })).getByText('31')).toHaveAttribute('aria-current', 'date');
    const previousQuote = dailyQuotes[dailyQuoteIndex(new Date())];
    expect(screen.getByText(previousQuote)).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(300); });
    expect(within(screen.getByRole('table', { name: 'February 2026' })).getByText('1')).toHaveAttribute('aria-current', 'date');
    expect(screen.queryByText(previousQuote)).not.toBeInTheDocument();
    expect(screen.getByText(dailyQuotes[dailyQuoteIndex(new Date())])).toBeInTheDocument();
  } finally {
    view.unmount();
    expect(jest.getTimerCount()).toBe(0);
    jest.useRealTimers();
  }
});

test('announcement motion can be paused and resumed', () => {
  render(<App />);
  const toggle = screen.getByRole('button', { name: 'Pause announcement ticker' });
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(toggle.closest('.ticker')).toHaveClass('ticker-paused');
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-pressed', 'false');
});
