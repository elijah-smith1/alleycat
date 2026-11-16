// Add the owner's real profile URLs here. Empty destinations display "coming soon".
export const shopLinks = { redbubble: '', vinted: '' };

export function usableShopUrl(value) {
  if (!value || /REPLACE_WITH|example\.(com|org|net)/i.test(value)) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
