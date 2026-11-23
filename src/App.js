import { useEffect, useState } from 'react';
import './App.css';
import { shopLinks, usableShopUrl } from './shopConfig';
import { artwork, clothing, mission, dailyQuotes, dailyQuoteIndex, calendarDays } from './siteContent';

function Art({ file, className = '', alt = '', ...props }) {
  return <img className={className} src={`${process.env.PUBLIC_URL}/assets/${file}`} alt={alt} {...props} />;
}

function PanelHeading({ children, label }) {
  return <div className="panel-heading"><h2>{children}</h2>{label && <span>{label}</span>}</div>;
}

function ShopDestination({ url, platform, children, className = '' }) {
  const destination = usableShopUrl(url);
  return destination ? (
    <a className={`shop-button ${className}`} href={destination} target="_blank" rel="noopener noreferrer">
      {children}<span aria-hidden="true">↗</span><span className="sr-only"> on {platform} (opens in a new tab)</span>
    </a>
  ) : (
    <p className={`shop-pending ${className}`}><span>{platform}</span><span className="soon-label">coming soon</span></p>
  );
}

function ClothingImage({ item, compact = false }) {
  return (
    <div className={`clothing-image clothing-${item.tone} ${compact ? 'clothing-compact' : ''}`}>
      {item.image ? <img src={item.image} alt={item.alt || item.name} loading="lazy" /> : <>
        <span className="photo-number" aria-hidden="true">THE RAIL / {item.id}</span>
        <svg className={`garment garment-${item.shape}`} viewBox="0 0 180 170" fill="none" aria-hidden="true">
          {item.shape === 'vest' ?
            <path d="M62 24 42 36 50 69 43 145H137L130 69 138 36 118 24C116 60 64 60 62 24Z" /> :
            <path d="M63 28 38 38 12 71 40 93 51 78 45 146H135L129 78 140 93 168 71 142 38 117 28C111 49 69 49 63 28Z" />}
          {item.shape === 'shirt' && <path d="M63 28 79 60 90 48 101 60 117 28M90 48V146M109 72H124V91H109Z" />}
          <path className="garment-seam" d="M58 133H122" />
        </svg>
        <span className="photo-placeholder">photo coming soon</span>
      </>}
    </div>
  );
}

function useLocalDate() {
  const [date, setDate] = useState(() => new Date());
  useEffect(() => {
    let timer;
    const refresh = () => {
      clearTimeout(timer);
      const now = new Date();
      setDate(now);
      const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      timer = setTimeout(refresh, nextDay.getTime() - now.getTime() + 100);
    };
    const onVisibility = () => { if (document.visibilityState === 'visible') refresh(); };
    refresh();
    document.addEventListener('visibilitychange', onVisibility);
    return () => { clearTimeout(timer); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  return date;
}

function DailyCorner({ date }) {
  const month = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const dateLabel = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  return <>
    <section className="quote-panel panel" aria-labelledby="quote-title">
      <PanelHeading label="a daily little thought"><span id="quote-title">quote of the day</span></PanelHeading>
      <div className="quote-body"><span className="quote-mark" aria-hidden="true">“</span><blockquote>{dailyQuotes[dailyQuoteIndex(date)]}</blockquote><p className="content-note">sample quote collection</p></div>
    </section>
    <section className="calendar panel" aria-labelledby="calendar-title">
      <PanelHeading><span id="calendar-title">{month}</span></PanelHeading>
      <div className="calendar-body">
        <table aria-label={month}><thead><tr>{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => <th scope="col" key={day}><abbr title={day}>{day.slice(0, 1)}</abbr></th>)}</tr></thead>
          <tbody>{Array.from({ length: Math.ceil(calendarDays(date).length / 7) }, (_, week) => <tr key={week}>{Array.from({ length: 7 }, (_, weekday) => {
            const day = calendarDays(date)[week * 7 + weekday];
            return <td key={weekday}>{day ? <span aria-current={day === date.getDate() ? 'date' : undefined}>{day}</span> : null}</td>;
          })}</tr>)}</tbody>
        </table>
        <p className="calendar-today"><span className="status-dot" aria-hidden="true" />today, {dateLabel}</p>
      </div>
    </section>
  </>;
}

function Ticker() {
  const [paused, setPaused] = useState(false);
  const text = <>WELCOME TO THE WEB SHOP <span>✳</span> GOOD THINGS COME IN SMALL SHOPS <span>✳</span> STICK AROUND <span>✳</span> ART, STICKERS + CLOTHES <span>✳</span></>;
  return <div className={`ticker ${paused ? 'ticker-paused' : ''}`}>
    <p className="sr-only">Welcome to the web shop. Good things come in small shops. Stick around. Art, stickers and clothes.</p>
    <div className="ticker-window" aria-hidden="true"><div className="ticker-track"><span className="ticker-copy">{text}</span><span className="ticker-copy">{text}</span></div></div>
    <button className="ticker-toggle" type="button" aria-label="Pause announcement ticker" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? 'play' : 'pause'}</button>
  </div>;
}

function App({ links = shopLinks }) {
  const date = useLocalDate();
  return <>
    <a className="skip-link" href="#main">skip to the good stuff</a>
    <div className="site-shell" id="top">
      <div className="browser-bar"><span>✳ &nbsp; alleycat's little corner of the internet</span><span aria-hidden="true">_ □ ×</span></div>
      <header className="masthead">
        <div className="header-note">a little art. a little attitude.</div>
        <div className="wordmark-row"><span className="wordmark-star" aria-hidden="true">✳</span><h1>alley<span>cat</span></h1><span className="wordmark-star" aria-hidden="true">✳</span></div>
        <p className="masthead-subtitle">art, stickers + clothes <span aria-hidden="true">♥</span> made for your world</p>
        <span className="header-stamp" aria-hidden="true">small shop<br />big energy</span>
      </header>
      <nav className="main-nav" aria-label="Main navigation"><a href="#stickers">stickers + art</a><a href="#clothes">the clothes rail</a><a href="#about">behind alleycat</a></nav>
      <Ticker />

      <main className="page-grid" id="main" tabIndex="-1">
        <div className="main-column">
          <section className="welcome panel" id="about" aria-labelledby="welcome-title">
            <PanelHeading label="behind alleycat">the little mission</PanelHeading>
            <div className="mission-body">
              <div className="welcome-copy"><p className="eyebrow">{mission.eyebrow}</p><h2 id="welcome-title">{mission.title}<br /><em>{mission.emphasis}</em></h2><p className="mission-text">{mission.body}</p><p className="content-note">{mission.note}</p>
                <div className="welcome-actions"><a className="shop-button" href="#stickers">shop stickers</a><a className="plain-link" href="#clothes">shop clothes</a></div>
              </div>
              <div className="hero-collage" aria-hidden="true"><span className="collage-note">a bit of organised chaos.</span><Art file="house-music.jpg" className="collage-house paper-art" /><Art file="music-sticker.jpg" className="collage-music paper-art" /><Art file="swag-sticker.jpg" className="collage-swag paper-art" /><span className="collage-caption">made for your world ♥</span></div>
            </div>
          </section>

          <section className="art-shop panel" id="stickers" aria-labelledby="stickers-title">
            <PanelHeading label="little things, big personality"><span id="stickers-title">stickers + art</span></PanelHeading>
            <div className="panel-body"><div className="section-intro"><p>For laptops, bedroom walls<br />& everything in between.</p><span className="scribble">pick your personality</span></div>
              <div className="art-grid">{artwork.map(art => <figure className={`art-preview ${art.style}`} key={art.file}><div className="art-frame"><Art file={art.file} alt={art.alt} loading="lazy" /></div><figcaption><h3>{art.name}</h3><p>{art.note}</p></figcaption></figure>)}</div>
              <div className="shop-row"><p>Found your kind of thing?<br /><span>Explore the art on Redbubble.</span></p><ShopDestination url={links.redbubble} platform="Redbubble">shop on Redbubble</ShopDestination></div>
            </div>
          </section>

          <section className="clothes-shop panel" id="clothes" aria-labelledby="clothes-title">
            <PanelHeading label="off the screen. into your wardrobe."><span id="clothes-title">the clothes rail</span></PanelHeading>
            <div className="panel-body"><div className="section-intro"><p>Good clothes. <em>Your way.</em></p><span className="scribble">wear your mood.</span></div>
              <p className="listing-note">A little space for the next finds. Item photos and details are coming soon.</p>
              <div className="clothing-grid">{clothing.map(item => <figure className="clothing-preview" key={item.id}><ClothingImage item={item} /><figcaption><h3>{item.name}</h3><p>listing details coming soon</p></figcaption></figure>)}</div>
              <div className="shop-row"><p>The clothing side of Alleycat.<br /><span>Find the full rail on Vinted.</span></p><ShopDestination url={links.vinted} platform="Vinted" className="yellow-button">shop clothes on Vinted</ShopDestination></div>
            </div>
          </section>
          <div className="bottom-note"><span aria-hidden="true">♡</span><p>Thanks for visiting a little independent corner of the internet.</p><span aria-hidden="true">♡</span></div>
        </div>

        <aside className="left-column" aria-label="Clothing previews and daily corner">
          <section className="clothing-rail panel" aria-labelledby="rail-title"><PanelHeading><span id="rail-title">on the rail</span></PanelHeading><div className="rail-photos">{clothing.map(item => <figure key={item.id}><ClothingImage item={item} compact /><figcaption>{item.name}</figcaption></figure>)}</div><a className="rail-link plain-link" href="#clothes">explore the clothes rail</a></section>
          <DailyCorner date={date} />
          <div className="left-note"><span aria-hidden="true">♡</span><p>a little nostalgic.<br />a lot of personality.</p></div>
        </aside>

        <aside className="sidebar" aria-label="Sticker showcase and shop links">
          <section className="sticker-showcase panel" aria-labelledby="showcase-title"><PanelHeading><span id="showcase-title">currently stuck on</span></PanelHeading><div className="sticker-stack">{artwork.map(art => <figure className={art.style} key={art.file}><Art file={art.file} alt={art.alt} loading="lazy" /><figcaption>{art.note}</figcaption></figure>)}</div></section>
          <section className="shop-directory panel" aria-labelledby="directory-title"><PanelHeading><span id="directory-title">find the shops</span></PanelHeading><div className="directory-body"><p>One little home.<br />A couple of places to shop.</p><ShopDestination url={links.redbubble} platform="Redbubble">Redbubble</ShopDestination><ShopDestination url={links.vinted} platform="Vinted" className="yellow-button">Vinted</ShopDestination><p className="directory-note">Item details and checkout live on each marketplace.</p></div></section>
          <section className="mini-gallery panel" aria-labelledby="gallery-title"><PanelHeading><span id="gallery-title">the little gallery</span></PanelHeading><div className="gallery-grid">{artwork.map(art => <Art key={art.file} file={art.file} alt={art.alt} loading="lazy" />)}{clothing.map(item => <ClothingImage item={item} compact key={item.id} />)}</div><a className="plain-link" href="#stickers">a closer look</a></section>
          <section className="pinboard" aria-labelledby="pinboard-title"><span className="tape" aria-hidden="true" /><p className="eyebrow">a note to self</p><h2 id="pinboard-title">Make things.<br />Wear things.<br /><em>Be a little extra.</em></h2><p>Life's too short for<br />a boring laptop.</p><span className="pinboard-heart" aria-hidden="true">♡</span></section>
          <div className="web-badges"><span>SMALL SHOP<br /><strong>BIG FEELINGS</strong></span><span>BEST VIEWED<br /><strong>AS YOURSELF</strong></span></div>
        </aside>
      </main>
      <footer className="site-footer"><a className="footer-logo" href="#top">alleycat<span aria-hidden="true">♡</span></a><p>your internet detour.<br />thanks for sticking around.</p><a className="plain-link" href="#top">back to top ↑</a></footer>
      <p className="outside-note">a little nostalgic. a lot of personality. <span aria-hidden="true">✧</span></p>
    </div>
  </>;
}

export default App;

