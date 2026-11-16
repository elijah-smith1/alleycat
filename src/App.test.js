import { render, screen } from '@testing-library/react';
import App from './App';
import { usableShopUrl } from './shopConfig';

test('shopping navigation reaches both categories without visiting updates', () => {
  render(<App />);
  for (const [name, id] of [['shop stickers', 'stickers'], ['shop clothes', 'clothes']]) {
    expect(screen.getByRole('link', { name })).toHaveAttribute('href', `#${id}`);
    expect(document.getElementById(id)).toHaveAttribute('aria-labelledby');
  }
});

test('unconfigured shops show coming soon without fake marketplace or email links', () => {
  render(<App links={{ redbubble: '', vinted: '' }} />);
  expect(screen.getAllByText('coming soon')).toHaveLength(4);
  expect(screen.queryByRole('link', { name: /on Redbubble/i })).not.toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /on Vinted/i })).not.toBeInTheDocument();
  for (const link of screen.getAllByRole('link')) expect(link.getAttribute('href')).toMatch(/^#/);
});

test('configured shop actions use exact destinations and disclose new tabs', () => {
  const links = { redbubble: 'https://www.redbubble.com/people/alleycat-test-fixture/shop', vinted: 'https://www.vinted.com/member/12345-test-fixture' };
  render(<App links={links} />);
  for (const [platform, url] of Object.entries(links)) {
    const actions = screen.getAllByRole('link', { name: new RegExp(`on ${platform} \\(opens in a new tab\\)`, 'i') });
    expect(actions).toHaveLength(2);
    for (const action of actions) {
      expect(action).toHaveAttribute('href', url);
      expect(action).toHaveAttribute('target', '_blank');
      expect(action).toHaveAttribute('rel', 'noopener noreferrer');
    }
  }
  expect(screen.queryByText('coming soon')).not.toBeInTheDocument();
});

test.each(['', 'not a URL', 'javascript:alert(1)', 'http://www.vinted.com/member/123', 'https://www.redbubble.com/people/REPLACE_WITH_PROFILE', 'https://example.com/shop', 'https://user:password@www.vinted.com/member/123'])('rejects an unusable destination: %s', (value) => {
  expect(usableShopUrl(value)).toBeNull();
});
