// Replace these draft entries as photos and final copy become available.
export const mission = {
  eyebrow: 'a little introduction',
  title: 'For things that',
  emphasis: 'feel like you.',
  body: 'Art for your walls. Stickers for your everyday. Clothes for whatever mood you’re in. A little corner of the internet for things with personality.',
  note: 'Draft mission · final words coming soon',
};

export const artwork = [
  { file: 'house-music.jpg', name: 'House music & partying', alt: 'Pink house music and partying all night lettering on acid yellow', note: 'for the afters', style: 'art-house' },
  { file: 'swag-sticker.jpg', name: 'A little extra swag', alt: 'Pink SWAG lettering on a dark polka-dot background', note: 'loud & a little unserious', style: 'art-swag' },
  { file: 'music-sticker.jpg', name: 'Music is my drug', alt: 'Oversized pink MUSIC IS MY DRUG lettering on black', note: 'headphones on. world off.', style: 'art-music' },
];

// Set image to an asset URL and replace the name/alt text when a real item is ready.
export const clothing = [
  { id: '01', name: 'Clothing preview 01', image: '', alt: '', shape: 'tee', tone: 'pink' },
  { id: '02', name: 'Clothing preview 02', image: '', alt: '', shape: 'vest', tone: 'yellow' },
  { id: '03', name: 'Clothing preview 03', image: '', alt: '', shape: 'shirt', tone: 'paper' },
];

// Original sample lines, awaiting the owner's final quote collection.
export const dailyQuotes = [
  'Make a little room for what makes you, you.',
  'A little colour can change the whole day.',
  'Wear your mood. Change your mind. Repeat.',
  'Small things can have a loud personality.',
  'Make things just because you love them.',
  'Your everyday deserves a little extra.',
  'There is always room for one more sticker.',
];

export function dailyQuoteIndex(date, count = dailyQuotes.length) {
  const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
  return ((day % count) + count) % count;
}

export function calendarDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  return [...Array(offset).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];
}
