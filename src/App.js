import './App.css';
import { shopLinks, usableShopUrl } from './shopConfig';

const artwork = [
  { file: 'house-music.jpg', name: 'House music & partying', alt: 'Pink house music and partying all night lettering on acid yellow', note: 'for the afters', style: 'art-house' },
  { file: 'swag-sticker.jpg', name: 'A little extra swag', alt: 'Pink SWAG lettering on a dark polka-dot background', note: 'loud & a little unserious', style: 'art-swag' },
  { file: 'music-sticker.jpg', name: 'Music is my drug', alt: 'Oversized pink MUSIC IS MY DRUG lettering on black', note: 'headphones on. world off.', style: 'art-music' },
];

function Art({ file, className = '', alt = '', ...props }) {
  return <img className={className} src={`${process.env.PUBLIC_URL}/assets/${file}`} alt={alt} {...props} />;
}

function PanelHeading({ children, label = '✧' }) {
  return <div className="panel-heading"><h2>{children}</h2><span aria-hidden="true">{label}</span></div>;
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

function App({ links = shopLinks }) {
  return (
    <>
      <a className="skip-link" href="#main">skip to the good stuff</a>
      <div className="site-shell" id="top">
        <div className="browser-bar"><span><span className="status-dot" /> alleycat's little corner of the internet</span><span aria-hidden="true">_ □ ×</span></div>
        <header className="masthead">
          <div className="header-note">a little art. a little attitude.</div>
          <div className="wordmark-row"><span className="wordmark-star" aria-hidden="true">✳</span><h1>alley<span>cat</span></h1><span className="wordmark-star" aria-hidden="true">✳</span></div>
          <p className="masthead-subtitle">art, stickers + clothes <span aria-hidden="true">♥</span> made for your world</p>
          <span className="header-stamp" aria-hidden="true">small shop<br />big energy</span>
        </header>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#stickers">stickers + art <span aria-hidden="true">↘</span></a>
          <a href="#clothes">the clothes rail <span aria-hidden="true">↘</span></a>
          <a href="#about">behind alleycat <span aria-hidden="true">↘</span></a>
        </nav>
        <div className="ticker"><span>WELCOME TO THE WEB SHOP</span><span aria-hidden="true">✳</span><span>GOOD THINGS COME IN SMALL SHOPS</span><span aria-hidden="true">✳</span><span>STICK AROUND</span></div>

        <main className="page-grid" id="main" tabIndex="-1">
          <div className="main-column">
            <section className="welcome panel" aria-labelledby="welcome-title">
              <div className="welcome-copy">
                <p className="eyebrow">oh hey, you found us!</p>
                <h2 id="welcome-title">Your stuff.<br /><em>More you.</em></h2>
                <p>Art for your walls. Stickers for your everyday. Clothes for whatever mood you're in.</p>
                <p className="welcome-aside">A little corner for things with personality.</p>
                <div className="welcome-actions"><a className="shop-button" href="#stickers">shop stickers <span aria-hidden="true">↘</span></a><a className="plain-link" href="#clothes">shop clothes <span aria-hidden="true">↘</span></a></div>
              </div>
              <div className="hero-collage" aria-hidden="true">
                <span className="collage-note">the current mood ↓</span>
                <Art file="house-music.jpg" className="collage-house paper-art" />
                <Art file="music-sticker.jpg" className="collage-music paper-art" />
                <Art file="swag-sticker.jpg" className="collage-swag paper-art" />
                <span className="collage-caption">a bit of organised chaos.</span>
              </div>
            </section>

            <section className="art-shop panel" id="stickers" aria-labelledby="stickers-title">
              <PanelHeading label="01 / THE ART"><span id="stickers-title">stickers + art</span></PanelHeading>
              <div className="panel-body">
                <div className="section-intro"><p>For laptops, bedroom walls<br />& everything in between.</p><span className="scribble" aria-hidden="true">pick your personality ↙</span></div>
                <div className="art-grid">
                  {artwork.map((art) => <figure className={`art-preview ${art.style}`} key={art.file}>
                    <div className="art-frame"><Art file={art.file} alt={art.alt} loading="lazy" /></div>
                    <figcaption><h3>{art.name}</h3><p>{art.note}</p></figcaption>
                  </figure>)}
                </div>
                <div className="shop-row"><p>Like what you see?<br /><span>Find your next little obsession.</span></p><ShopDestination url={links.redbubble} platform="Redbubble">shop on Redbubble</ShopDestination></div>
              </div>
            </section>

            <section className="clothes-shop panel" id="clothes" aria-labelledby="clothes-title">
              <PanelHeading label="02 / THE RAIL"><span id="clothes-title">the clothes rail</span></PanelHeading>
              <div className="clothes-body">
                <div className="rail-illustration" aria-hidden="true"><span className="rail-label">alleycat wardrobe dept.</span><svg viewBox="0 0 180 125" fill="none"><path d="M82 34c-13-15 9-28 16-15 6 11-8 15-8 25v4M90 48l-66 43c-8 5-4 12 3 12h126c7 0 11-7 3-12L90 48Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="rail-tag">wear your mood.</span></div>
                <div className="clothes-copy"><p className="eyebrow">off the screen. into your wardrobe.</p><h3>Good clothes.<br /><em>Your way.</em></h3><p>A different kind of dress-up. Explore the clothing side of Alleycat on Vinted.</p><ShopDestination url={links.vinted} platform="Vinted" className="yellow-button">shop clothes on Vinted</ShopDestination></div>
              </div>
            </section>
            <div className="bottom-note"><span aria-hidden="true">♡</span><p>Thanks for visiting a little independent corner of the internet.</p><span aria-hidden="true">♡</span></div>
          </div>

          <aside className="sidebar" aria-label="About Alleycat and shop information">
            <section className="profile panel" id="about">
              <PanelHeading label="♡">behind alleycat</PanelHeading>
              <div className="profile-body"><div className="profile-art"><Art file="swag-sticker.jpg" alt="Pink SWAG artwork with a polka-dot background" /><span aria-hidden="true">hi, internet!</span></div><h3>A small shop with<br />a loud personality.</h3><p>Music on. Ideas everywhere. Alleycat is a home for expressive art, stickers and clothes.</p><dl className="profile-facts"><div><dt>current mood</dt><dd>making things ✳</dd></div><div><dt>in the mix</dt><dd>pink + a little chaos</dd></div><div><dt>find us</dt><dd>right here, online</dd></div></dl><a className="plain-link" href="#stickers">take a look around ↙</a></div>
            </section>
            <section className="shop-directory panel">
              <PanelHeading>find the shops</PanelHeading>
              <div className="directory-body"><p>One little home.<br />A couple of places to shop.</p><ShopDestination url={links.redbubble} platform="Redbubble">Redbubble</ShopDestination><ShopDestination url={links.vinted} platform="Vinted" className="yellow-button">Vinted</ShopDestination><p className="directory-note">Shopping happens on each marketplace, where you'll find item details and checkout.</p></div>
            </section>
            <section className="pinboard" aria-labelledby="pinboard-title"><span className="tape" aria-hidden="true" /><p className="eyebrow">a note to self</p><h2 id="pinboard-title">Make things.<br />Wear things.<br /><em>Be a little extra.</em></h2><p>Life's too short for<br />a boring laptop.</p><span className="pinboard-heart" aria-hidden="true">♡</span></section>
            <div className="sidebar-art" aria-hidden="true"><Art file="music-sticker.jpg" className="paper-art" /><span>on repeat. always.</span></div>
            <div className="web-badges" aria-label="Small shop, big feelings"><span>SMALL SHOP<br /><strong>BIG FEELINGS</strong></span><span>BEST VIEWED<br /><strong>AS YOURSELF</strong></span></div>
          </aside>
        </main>
        <footer className="site-footer"><a className="footer-logo" href="#top">alleycat<span aria-hidden="true">♡</span></a><p>your internet detour.<br />thanks for sticking around.</p><a className="plain-link" href="#top">back to top ↑</a></footer>
        <p className="outside-note">a little nostalgic. a lot of personality. <span aria-hidden="true">✧</span></p>
      </div>
    </>
  );
}

export default App;
