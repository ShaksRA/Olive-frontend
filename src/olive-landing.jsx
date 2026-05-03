import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Icons ─────────────────────────────────────────────── */
const OliveLogo = () => (
  <svg width="90" height="34" viewBox="0 0 90 34" fill="none">
    <ellipse cx="13" cy="18" rx="10" ry="12" fill="#3d6b2f" />
    <ellipse cx="10" cy="15" rx="2" ry="2.4" fill="#fff" />
    <ellipse cx="16" cy="15" rx="2" ry="2.4" fill="#fff" />
    <circle cx="10.5" cy="15.5" r="1.1" fill="#111" />
    <circle cx="16.5" cy="15.5" r="1.1" fill="#111" />
    <path d="M10 20 Q13 23 16 20" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    <path d="M13 6 Q15 2 19 3" stroke="#3d6b2f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <ellipse cx="19.5" cy="2.5" rx="2.5" ry="1.4" fill="#7ec850" transform="rotate(-20 19.5 2.5)" />
    <text x="28" y="24" fontFamily="Georgia,serif" fontWeight="700" fontSize="22" fill="#2d4a1e" letterSpacing="-0.5">live</text>
  </svg>
);
const Chevron = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path d="M2.5 4.5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const AppleIcon = () => (
  <svg width="17" height="17" viewBox="0 0 814 1000" fill="currentColor">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.5 737.9 0 618.7 0 506.7 0 295.4 140 178.7 277.8 178.7c69.5 0 127.5 45.3 171.5 45.3 42.3 0 107.3-48 185.8-48 30.3 0 130.3 3.2 186.6 101.8zm-158.4-212.2c30.5-36.5 52.5-87.3 52.5-138.1 0-7.1-.6-14.3-1.9-20.1-49.9 1.9-109.5 33.1-145.4 75.5-28 32.5-53.1 83.3-53.1 134.7 0 7.7 1.3 15.5 1.9 18 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 132.4-71.3z"/>
  </svg>
);
const HeartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

/* ─── Constants ─────────────────────────────────────────── */
const NAV = [
  { label: "Olive Health" },
  { label: "Solutions", dd: true },
  { label: "Features" },
  { label: "Pricing" },
  { label: "Blog", dd: true },
  { label: "Restaurants" },
  { label: "Food", dd: true },
];
const AVATARS = [
  "https://i.pravatar.cc/40?img=11",
  "https://i.pravatar.cc/40?img=21",
  "https://i.pravatar.cc/40?img=33",
  "https://i.pravatar.cc/40?img=44",
];

const SLIDES = [
  { url: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=500&h=300&fit=crop", label: "Whole Grain Bread" },
  { url: "https://images.unsplash.com/photo-1559181567-c3190900e459?w=500&h=300&fit=crop",   label: "Fresh Cherries" },
  { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop",   label: "Fresh Produce" },
  { url: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&h=300&fit=crop", label: "Almond Milk" },
  { url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop", label: "Healthy Food" },
  { url: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=500&h=300&fit=crop", label: "Granola & Oats" },
  { url: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&h=300&fit=crop", label: "Apples" },
  { url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&h=300&fit=crop", label: "Packaged Goods" },
];

/*
  LAYOUT DESIGN
  =============
  - Phone screen width  : SCREEN_W  (inside the phone frame)
  - Card width          : CARD_W    (slightly smaller than screen so neighbours are partially visible)
  - Gap between cards   : GAP
  - The "track" is a long row of cards
  - We drive a single `offset` (pixels scrolled from the left)
  - When the card that should be "on screen" is centred, we pause for PAUSE_MS
  - The carousel row is vertically centred at the same Y as the phone screen top

  Visual zones (all horizontally):
    [  left side cards ... ] [ phone screen ] [ ... right side cards ]

  The single track renders everywhere; CSS clip-paths / overflow:hidden
  on outer and inner containers handle what's visible where.
*/

const PHONE_W    = 280;   // total phone shell width
const PHONE_PAD  = 14;    // horizontal padding inside shell
const SCREEN_W   = PHONE_W - PHONE_PAD * 2;  // 252 px
const SCREEN_H   = 158;   // phone screen height
const CARD_W     = SCREEN_W;  // card exactly fills screen width
const GAP        = 16;
const STEP       = CARD_W + GAP;
const PAUSE_MS   = 1500;  // pause when card is centred in phone screen
const SLIDE_MS   = 700;   // transition duration for each slide step

/* ─── Main Component ─────────────────────────────────────── */
export default function OliveLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  /*
    We track:
      currentIdx  – which card index is currently "on screen"
      phase       – "enter" | "pause" | "exit"
      visualX     – pixel offset of the track (left edge of card[0] relative to
                    the left edge of the full-width overflow:hidden strip)

    The phone screen is centred on the page. The strip starts at x=0 (left viewport edge).
    So the X position where card[i] should be centred inside the phone screen is:
      centreX = (viewportWidth / 2) - (CARD_W / 2)
    But since our strip uses absolute positioning rooted at the viewport, we need:
      targetOffset = i * STEP - (viewportWidth/2 - CARD_W/2)
    We store this dynamically via a ref that reads viewport width.
  */

  const [idx, setIdx]         = useState(0);
  const [animating, setAnim]  = useState(false); // true during CSS transition
  const [offset, setOffset]   = useState(0);     // track translateX (negative = move left)
  const vwRef                 = useRef(typeof window !== "undefined" ? window.innerWidth : 1200);
  const timerRef              = useRef(null);
  const N = SLIDES.length;

  // Pad slides so we always have cards left & right
  const REPS   = 5;
  const track  = Array.from({ length: REPS * N }, (_, i) => SLIDES[i % N]);
  // We start at the middle repetition so we never run out on either side
  const START_IDX = Math.floor(REPS / 2) * N; // e.g. 2*8=16

  // initialise offset so card[START_IDX] is centred in phone screen
  const centreOffset = (i) => i * STEP - (vwRef.current / 2 - CARD_W / 2);

  useEffect(() => {
    const updateVw = () => { vwRef.current = window.innerWidth; };
    window.addEventListener("resize", updateVw);
    // set initial offset
    setOffset(centreOffset(START_IDX));
    return () => window.removeEventListener("resize", updateVw);
  // eslint-disable-next-line
  }, []);

  // Advance to next card
  const advance = useCallback(() => {
    setAnim(true);
    setIdx(prev => {
      const next = prev + 1;
      setOffset(centreOffset(START_IDX + next));
      return next;
    });
    timerRef.current = setTimeout(() => {
      setAnim(false);
      // after slide-in, pause then advance again
      timerRef.current = setTimeout(advance, PAUSE_MS);
    }, SLIDE_MS);
  // eslint-disable-next-line
  }, []);

  // Kick off after initial pause
  useEffect(() => {
    timerRef.current = setTimeout(advance, PAUSE_MS);
    return () => clearTimeout(timerRef.current);
  // eslint-disable-next-line
  }, []);

  const absIdx = START_IDX + idx; // absolute index in track array

  return (
    <div style={{ fontFamily:"'Nunito','Helvetica Neue',sans-serif", background:"#edf4e8", minHeight:"100vh", color:"#1a2e10", overflowX:"hidden", width:"100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html, body { width:100%; overflow-x:hidden; background:#edf4e8; }

        .nav-a { display:inline-flex;align-items:center;gap:3px;font-size:13.5px;font-weight:600;color:#2d4a1e;cursor:pointer;padding:6px 7px;text-decoration:none;transition:color .18s;white-space:nowrap; }
        .nav-a:hover { color:#4d8a3a; }

        .btn-pill { background:#2d4a1e;color:#fff;border:none;border-radius:50px;padding:11px 24px;font-family:inherit;font-size:14.5px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:background .2s,transform .15s,box-shadow .15s;white-space:nowrap; }
        .btn-pill:hover { background:#3d6329;transform:translateY(-1px);box-shadow:0 6px 20px rgba(45,74,30,.3); }

        .btn-dl { background:#2d4a1e;color:#fff;border:none;border-radius:50px;padding:16px 36px;font-family:inherit;font-size:16px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:11px;transition:background .2s,transform .15s,box-shadow .15s;box-shadow:0 6px 28px rgba(45,74,30,.28); }
        .btn-dl:hover { background:#3d6329;transform:translateY(-2px);box-shadow:0 12px 36px rgba(45,74,30,.38); }

        @keyframes fadeUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        .fu { animation:fadeUp .7s ease both; }
        .d1 { animation-delay:.1s; } .d2 { animation-delay:.25s; } .d3 { animation-delay:.4s; } .d4 { animation-delay:.55s; }

        .av-row { display:flex;align-items:center; }
        .av-row img { width:36px;height:36px;border-radius:50%;border:2.5px solid #edf4e8;margin-left:-9px;object-fit:cover; }
        .av-row img:first-child { margin-left:0; }
        .av-badge { width:36px;height:36px;border-radius:50%;background:#d5e8cc;border:2.5px solid #edf4e8;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#3d6b2f;margin-left:-9px; }

        /* ── The outer strip spans full viewport, clips overflow ── */
        .strip-outer {
          position: absolute;
          top: 0; left: 50%; bottom: 0;
          width: 100vw;
          margin-left: -50vw;
          overflow: hidden;
          pointer-events: none;
        }

        /* ── Moving track ── */
        .card-track {
          display: flex;
          align-items: center;
          gap: ${GAP}px;
          position: absolute;
          top: 0; bottom: 0;
          /* left is set inline via JS offset */
          will-change: transform;
        }
        .card-track.sliding {
          transition: transform ${SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .slide-card {
          flex-shrink: 0;
          width: ${CARD_W}px;
          height: ${SCREEN_H}px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 24px rgba(0,0,0,.18);
        }
        .slide-card img { width:100%;height:100%;object-fit:cover;display:block; }

        /* ── phone ── */
        .phone { background:#f8f8f8;border-radius:48px;padding:14px 14px 22px;box-shadow:0 30px 90px rgba(45,74,30,.22),0 4px 20px rgba(0,0,0,.1);width:${PHONE_W}px; }
        .notch { width:108px;height:26px;background:#111;border-radius:0 0 18px 18px;margin:0 auto 10px; }

        .info-card { background:#fff;border-radius:16px;padding:13px 13px 10px;margin-top:10px;box-shadow:0 2px 10px rgba(0,0,0,.06); }
        .red-dot   { width:10px;height:10px;border-radius:50%;background:#e05050;display:inline-block;flex-shrink:0; }
        .oliver-box { background:#f4f9f0;border:1px solid #dcebd3;border-radius:12px;padding:11px 12px;margin-top:9px; }

        @media(max-width:700px){ .d-nav,.d-act{display:none!important} .ham{display:flex!important} }
        @media(min-width:701px){ .ham{display:none!important} }
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",height:"64px",background:"#edf4e8",borderBottom:"1px solid rgba(0,0,0,.05)",position:"sticky",top:0,zIndex:200 }}>
        <OliveLogo />
        <div className="d-nav" style={{ display:"flex",alignItems:"center" }}>
          {NAV.map(n => <a key={n.label} className="nav-a" href="#">{n.label}{n.dd&&<Chevron/>}</a>)}
        </div>
        <div className="d-act" style={{ display:"flex",alignItems:"center",gap:18 }}>
          <a href="#" className="nav-a">Sign in</a>
          <button className="btn-pill">Get Olive <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M8 3l3 3.5-3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
        </div>
        <button className="ham" onClick={()=>setMenuOpen(o=>!o)} style={{ background:"none",border:"none",cursor:"pointer",padding:8,display:"none" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2d4a1e" strokeWidth="2.2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div style={{ background:"#edf4e8",padding:"14px 28px 20px",borderBottom:"1px solid #d4e4cc" }}>
          {NAV.map(n=><a key={n.label} href="#" className="nav-a" style={{ display:"flex",padding:"10px 0",borderBottom:"1px solid #e3ecdc" }}>{n.label}{n.dd&&<span style={{marginLeft:3}}><Chevron/></span>}</a>)}
          <div style={{ display:"flex",gap:12,marginTop:14 }}>
            <a href="#" className="nav-a">Sign in</a>
            <button className="btn-pill">Get Olive →</button>
          </div>
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <main style={{ width:"100%",textAlign:"center",paddingTop:52 }}>

        {/* Social proof */}
        <div className="fu" style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:28,padding:"0 16px" }}>
          <div className="av-row">
            {AVATARS.map((s,i)=><img key={i} src={s} alt=""/>)}
            <div className="av-badge">8k+</div>
          </div>
          <span style={{ fontSize:13.5,color:"#567550",fontWeight:600 }}>Trusted by thousands of healthy families</span>
        </div>

        {/* Headline */}
        <h1 className="fu d1" style={{ fontSize:"clamp(40px,6.5vw,70px)",fontWeight:900,lineHeight:1.08,color:"#1a2e10",letterSpacing:"-1.5px",marginBottom:18,padding:"0 16px" }}>
          The Safest Way to<br/>Shop for Groceries
        </h1>

        {/* Sub */}
        <p className="fu d2" style={{ fontSize:"clamp(14px,1.8vw,17px)",color:"#4a6640",lineHeight:1.65,maxWidth:470,margin:"0 auto 34px",fontWeight:400,padding:"0 16px" }}>
          Use the Olive Food Scanner App to Instantly Eliminate Harmful Ingredients from Your Family's Diet and Get Expert-Backed Food Insights
        </p>

        {/* CTA */}
        <div className="fu d3" style={{ marginBottom:52, display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
  <button className="btn-dl"><AppleIcon/> Download for iOS</button>
  <a href="#"
    style={{ display:"inline-flex", alignItems:"center", gap:8, fontSize:15, fontWeight:700, color:"#2d4a1e", textDecoration:"none", transition:"gap .2s" }}
    onMouseEnter={e => e.currentTarget.style.gap = "13px"}
    onMouseLeave={e => e.currentTarget.style.gap = "8px"}>
    Join the Olive Community
    <span style={{
      display:"inline-flex", alignItems:"center", justifyContent:"center",
      width:24, height:24, borderRadius:"50%",
      border:"2px solid #2d4a1e", fontSize:14, lineHeight:1
    }}>›</span>
  </a>
</div>

        {/* ═══════════════════════════════════════════════════════════
            COMPOSITE SECTION
            Layout (top to bottom):
              - strip-outer: full-vw, clips the card track
              - card track moves left continuously, pausing when centred in phone
              - phone shell floats above (z-index higher), centred
              - phone SCREEN is a transparent window — the card track is visible
                through it (it's the same track, same layer, just clipped by the phone frame)

            The phone frame (bezel) sits at z-index 10.
            The card track sits at z-index 5 — visible both outside (in the strip-outer)
            and inside the phone screen (phone screen uses overflow:hidden + no background
            to let the track show through).
        ═══════════════════════════════════════════════════════════ */}
        <div className="fu d4" style={{
          position: "relative",
          width: "100%",
          // total height = screen_h + phone top padding + notch + info card + bottom padding
          height: 620,
          marginBottom: 40,
        }}>

          {/* ── Full-width card track strip (BEHIND phone) ── */}
          {/* This layer is z-index 2, visible on left/right sides of phone */}
          <div className="strip-outer" style={{ zIndex: 2 }}>
            <div
              className={`card-track${animating ? " sliding" : ""}`}
              style={{ transform: `translateX(${-offset}px)` }}
            >
              {track.map((slide, i) => {
                const isActive = i === absIdx;
                return (
                  <div
                    key={i}
                    className="slide-card"
                    style={{
                      opacity: isActive ? 0 : 0.55,   // hide the one inside phone (phone shows it at full opacity)
                      filter: isActive ? "none" : "blur(0.5px)",
                      transform: isActive ? "scale(0.92)" : "scale(0.88)",
                      transition: `opacity ${SLIDE_MS}ms ease, transform ${SLIDE_MS}ms ease`,
                    }}
                  >
                    <img src={slide.url} alt={slide.label} draggable="false"/>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Phone shell (z-index 10) centred vertically at top of composite ── */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}>
            <div className="phone">
              <div className="notch"/>

              {/* Phone SCREEN — overflow:hidden clips the card track to screen bounds */}
              <div style={{
                width: SCREEN_W,
                height: SCREEN_H,
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                background: "#000",   // fallback while images load
              }}>
                {/* Card track re-rendered inside phone screen at z-index 1 (above phone bg) */}
                {/* We make it full-opacity since it's clipped to screen */}
                <div
                  className={`card-track${animating ? " sliding" : ""}`}
                  style={{
                    transform: `translateX(${-offset}px)`,
                    // offset this inner track to align with the outer track
                    // outer track origin = left edge of viewport (via strip-outer left:50% margin-left:-50vw)
                    // phone screen left edge = 50vw - PHONE_W/2 + PHONE_PAD = 50vw - 126px
                    // so we need to shift the inner track by -(50vw - PHONE_W/2 + PHONE_PAD)
                    // expressed as calc since we're inside a position:relative div
                    marginLeft: `calc(-50vw + ${PHONE_W / 2 - PHONE_PAD}px)`,
                  }}
                >
                  {track.map((slide, i) => (
                    <div key={i} className="slide-card" style={{ borderRadius: 0 }}>
                      <img src={slide.url} alt={slide.label} draggable="false"/>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Product info card ── */}
              <div className="info-card">
                <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                  {/* Thumbnail — shows current slide image */}
                  <div style={{ width:54,height:64,borderRadius:10,overflow:"hidden",flexShrink:0,background:"#eee" }}>
                    <img
                      src={SLIDES[idx % N].url}
                      alt=""
                      style={{ width:"100%",height:"100%",objectFit:"cover",transition:"opacity 0.4s",opacity: animating ? 0.5 : 1 }}
                    />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800,fontSize:14,color:"#1a2e10" }}>Organic Bagels</div>
                    <div style={{ fontSize:11.5,color:"#aaa",marginBottom:7 }}>Killer Dave's</div>
                    <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                      <span className="red-dot"/>
                      <span style={{ fontWeight:800,fontSize:14.5,color:"#1a2e10" }}>43/100</span>
                      <span style={{ fontSize:11,color:"#aaa" }}>Avoid</span>
                    </div>
                  </div>
                  <div style={{ display:"flex",flexDirection:"column",gap:8 }}><HeartIcon/><ShareIcon/></div>
                </div>

                <div className="oliver-box">
                  <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:5 }}>
                    <div style={{ width:22,height:22,borderRadius:"50%",background:"#3d6b2f",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11 }}>🫒</div>
                    <span style={{ fontWeight:800,fontSize:12,color:"#1a2e10" }}>Oliver Says:</span>
                  </div>
                  <p style={{ fontSize:11,color:"#4a5e40",lineHeight:1.55 }}>
                    "This bread's low score mainly comes from the use of organic expeller pressed canola oil, which is a type of seed oil that can be harmful, along with the presence of organic cane sugar…"
                  </p>
                </div>

                <div style={{ fontWeight:700,fontSize:12.5,color:"#1a2e10",marginTop:10 }}>Breakdown</div>
              </div>
            </div>
          </div>

          {/* ── Fade masks on left & right edges for smooth fade-out ── */}
          <div style={{
            position:"absolute", top:0, left:0, bottom:0, width:80,
            background:"linear-gradient(to right, #edf4e8, transparent)",
            zIndex:15, pointerEvents:"none",
          }}/>
          <div style={{
            position:"absolute", top:0, right:0, bottom:0, width:80,
            background:"linear-gradient(to left, #edf4e8, transparent)",
            zIndex:15, pointerEvents:"none",
          }}/>

        </div>
      </main>
    </div>
  );
}
