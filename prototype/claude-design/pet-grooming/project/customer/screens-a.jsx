// customer/screens-a.jsx — Flow A (Welcome) + Flow B (Discover/Book)

(() => {
const PawpointCustomer = window.PawpointCustomer || (window.PawpointCustomer = {});
const { ChevL, ChevR, Dot, TabBar } = PawpointCustomer;

if (!ChevL || !ChevR || !Dot || !TabBar) {
  throw new Error('Pawpoint customer primitives must load before customer screens.');
}

const CUSTOMER_MEDIA = {
  petDash: '../shared/images/customer/pet-dash.png',
  shopAroon: '../shared/images/customer/shop-aroon.png',
  shopFluffRoom: '../shared/images/customer/shop-fluff-room.png',
  shopSoiDog: '../shared/images/customer/shop-soi-dog.png',
  shopBarksBubbles: '../shared/images/customer/shop-barks-bubbles.png',
};

// ─── 01 Welcome ─────────────────────────────────────────
function Screen01_Welcome(){return(
  <div className="screen fill">
    <div className="welcome">
      <div/>
      <div style={{display:'flex',flexDirection:'column',gap:22,alignItems:'center'}}>
        <div className="logo-big"/>
        <h1>Grooming that <em>earns</em><br/>the next visit.</h1>
        <p>Real‑time slots from 41 trusted shops · 180+ groomers across Bangkok. Hold your spot with a Shield hold, no phone calls.</p>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10,width:'100%'}}>
        <button className="btn primary btn-lg" style={{justifyContent:'center'}}>Continue with phone</button>
        <button className="btn ghost" style={{justifyContent:'center',color:'var(--ink-2)'}}>I already have an account</button>
        <p style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>By continuing you accept Pawpoint’s booking terms.</p>
      </div>
    </div>
  </div>
);}

// ─── 02 Language ──────────────────────────────────────────
function Screen02_Language(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="eyebrow">Step 1 of 3</div>
      <h1 style={{fontFamily:'var(--serif)',fontWeight:500,fontSize:30,letterSpacing:'-0.02em',lineHeight:1.05,marginTop:-6}}>Choose your <em style={{color:'var(--primary)',fontStyle:'italic',fontWeight:400}}>language</em></h1>
      <p className="sc-sub">Switchable anytime in Settings.</p>
      <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
        <div className="lang-card on">
          <div><h3 className="thai">ภาษาไทย</h3><div className="sub">Thai · ค่าเริ่มต้น</div></div>
          <div className="check">✓</div>
        </div>
        <div className="lang-card">
          <div><h3>English</h3><div className="sub">Pricing shown in THB</div></div>
          <div className="check"/>
        </div>
        <div className="lang-card">
          <div><h3>中文</h3><div className="sub">Selected screens · Beta</div></div>
          <div className="check"/>
        </div>
      </div>
      <div style={{marginTop:'auto',paddingBottom:16}}>
        <button className="btn primary btn-lg" style={{width:'100%',justifyContent:'center'}}>Continue</button>
      </div>
    </div>
  </div>
);}

// ─── 03 OTP ───────────────────────────────────────────────
function Screen03_OTP(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="eyebrow">Step 2 of 3</div>
      <h1 style={{fontFamily:'var(--serif)',fontWeight:500,fontSize:28,letterSpacing:'-0.02em',lineHeight:1.1,marginTop:-4}}>Verify <em style={{color:'var(--primary)',fontStyle:'italic',fontWeight:400}}>+66 81 234 5678</em></h1>
      <p className="sc-sub">We sent a 6‑digit code via SMS. No code? Tap resend in 0:14.</p>

      <div className="otp-row" style={{marginTop:10}}>
        <div className="otp-box filled">4</div>
        <div className="otp-box filled">7</div>
        <div className="otp-box filled">2</div>
        <div className="otp-box active">|</div>
        <div className="otp-box"/>
        <div className="otp-box"/>
      </div>

      <div className="m-banner info" style={{marginTop:14}}>
        <div className="ic">LINE</div>
        <div><h5>Prefer LINE notifications?</h5><p>We’ll send booking confirmations and updates to your connected LINE account.</p></div>
      </div>

      <div style={{marginTop:'auto',paddingBottom:16,display:'flex',flexDirection:'column',gap:8}}>
        <button className="btn ghost" style={{justifyContent:'center'}}>Resend in 0:14</button>
        <button className="btn primary btn-lg" style={{width:'100%',justifyContent:'center'}}>Verify &amp; continue</button>
      </div>
    </div>
  </div>
);}

// ─── 04 Pet onboarding ─────────────────────────────────────
function Screen04_Pet(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="eyebrow">Step 3 of 3</div>
      <h1 style={{fontFamily:'var(--serif)',fontWeight:500,fontSize:28,letterSpacing:'-0.02em',lineHeight:1.1}}>Tell us about <em style={{color:'var(--primary)',fontStyle:'italic',fontWeight:400}}>your companion</em></h1>
      <p className="sc-sub">Shops use this to quote accurate time and price.</p>

      <div style={{display:'flex',alignItems:'center',gap:14,marginTop:6}}>
        <div className="pet-photo" style={{'--media-image':`url('${CUSTOMER_MEDIA.petDash}')`}}><span>D</span></div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--serif)',fontSize:22,fontWeight:500}}>Dash</div>
          <div className="sub" style={{fontSize:12}}>Tap to add a photo</div>
        </div>
      </div>

      <div className="card" style={{gap:12}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
          <div><div className="eyebrow" style={{fontSize:9}}>Breed</div><div style={{fontWeight:500,marginTop:4}}>Welsh Corgi</div></div>
          <div><div className="eyebrow" style={{fontSize:9}}>Weight</div><div style={{fontWeight:500,marginTop:4}}>12.4 kg</div></div>
          <div><div className="eyebrow" style={{fontSize:9}}>Coat</div><div style={{fontWeight:500,marginTop:4}}>Double · Medium</div></div>
          <div><div className="eyebrow" style={{fontSize:9}}>Age</div><div style={{fontWeight:500,marginTop:4}}>3 yr 2 mo</div></div>
        </div>
      </div>

      <div>
        <div className="eyebrow" style={{fontSize:10,marginBottom:8}}>Care flags</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
          <span className="chip on"><span className="dot"/>Sensitive skin</span>
          <span className="chip"><span className="dot"/>Fear of clippers</span>
          <span className="chip accent"><span className="dot"/>Puppy first visit</span>
          <span className="chip"><span className="dot"/>Senior</span>
          <span className="chip"><span className="dot"/>+ Add flag</span>
        </div>
      </div>

      <div className="m-banner">
        <div className="ic">i</div>
        <div><h5>Why we ask</h5><p>Weight and coat drive pricing. Flags help your groomer plan time and pre‑check supplies before you arrive.</p></div>
      </div>

      <div style={{marginTop:'auto',paddingBottom:16}}>
        <button className="btn primary btn-lg" style={{width:'100%',justifyContent:'center'}}>Find grooming near me</button>
      </div>
    </div>
  </div>
);}

// ─── 05 Home ───────────────────────────────────────────────
function Screen05_Home(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="sc-head">
        <div>
          <div className="sub" style={{fontSize:11,fontFamily:'var(--mono)',letterSpacing:'.1em',textTransform:'uppercase'}}>Sathorn · Tue 14 Apr</div>
          <h1 style={{fontSize:22,marginTop:4}}>Morning, <em>Praew</em></h1>
        </div>
        <div className="right"><div className="sc-ic">🔔</div></div>
      </div>

      <div className="rebook-hero">
        <div className="lbl">Rebook · usually every 4 weeks</div>
        <h3>Dash at Aroon,<br/>same time next month</h3>
        <div className="meta"><span>Fri 15 May · 10:30</span><span>฿650 · Full groom</span></div>
        <div className="cta"><span>One‑tap rebook · Shield hold · ฿200</span><ChevR color="#fff"/></div>
      </div>

      <div className="m-sec"><h4>Today near Sathorn</h4><button type="button" className="link-btn">24 shops →</button></div>

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        <div className="shop-row">
          <div className="thumb photo" style={{'--media-image':`url('${CUSTOMER_MEDIA.shopAroon}')`}}><div className="dot"/></div>
          <div>
            <h4>Aroon Grooming <span className="th" style={{fontWeight:400,color:'var(--ink-3)',fontSize:12,fontFamily:'var(--thai)'}}>อรุณ</span></h4>
            <div className="meta"><b>★ 4.9</b><Dot color="var(--ink-3)"/><span>0.4 km · Saladaeng</span><Dot color="var(--ink-3)"/><span className="status s-instant" style={{padding:'2px 6px',fontSize:9}}>Instant confirm</span></div>
            <div className="avail">
              <span className="s on">10:30</span><span className="s on">11:15</span><span className="s">13:00</span><span className="s">+6 today</span>
            </div>
          </div>
        </div>
        <div className="shop-row">
          <div className="thumb photo" style={{'--media-image':`url('${CUSTOMER_MEDIA.shopFluffRoom}')`}}><div className="dot" style={{background:'var(--warn)'}}/></div>
          <div>
            <h4>The Fluff Room</h4>
            <div className="meta"><b>★ 4.7</b><Dot color="var(--ink-3)"/><span>0.8 km</span><Dot color="var(--ink-3)"/><span className="status s-pend-m" style={{padding:'2px 6px',fontSize:9}}>Confirms within 1h</span></div>
            <div className="avail">
              <span className="s">14:00</span><span className="s">15:30</span><span className="s">17:00</span>
            </div>
          </div>
        </div>
        <div className="shop-row">
          <div className="thumb photo" style={{'--media-image':`url('${CUSTOMER_MEDIA.shopSoiDog}')`}}/>
          <div>
            <h4>Soi Dog Studio <span className="th" style={{fontWeight:400,color:'var(--ink-3)',fontSize:12,fontFamily:'var(--thai)'}}>ซอยหมา</span></h4>
            <div className="meta"><b>★ 4.8</b><Dot color="var(--ink-3)"/><span>1.2 km · Silom</span></div>
            <div className="avail">
              <span className="s on">09:45</span><span className="s on">11:00</span><span className="s on">12:30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TabBar on="home"/>
  </div>
);}

// ─── 06 Shop detail ─────────────────────────────────────────
function Screen06_Shop(){return(
  <div className="screen">
    <div className="screen-content" style={{gap:14}}>
      <div className="sc-head" style={{paddingTop:0}}>
        <div className="sc-ic"><ChevL/></div>
        <div className="right"><div className="sc-ic">♡</div><div className="sc-ic">↗</div></div>
      </div>

      <div className="cover" style={{'--cover-image':`url('${CUSTOMER_MEDIA.shopAroon}')`}}>
        <div className="row between" style={{alignItems:'flex-start'}}>
          <div className="mono">Saladaeng · est. 2019</div>
          <span className="status s-instant" style={{background:'rgba(255,255,255,.14)',color:'#fff',backdropFilter:'blur(6px)'}}>Instant confirm</span>
        </div>
        <div className="mark">Aroon<br/><em>Grooming</em></div>
        <div className="row between" style={{alignItems:'flex-end'}}>
          <div style={{display:'flex',flexDirection:'column',gap:4}}>
            <div className="strip"><span>★ 4.9 · 312 reviews</span></div>
            <div className="strip"><span>EN · <span className="th">ไทย</span> · 中文 beta</span></div>
          </div>
          <div style={{display:'flex'}}>
            {[['P','var(--accent)'],['N','var(--info)'],['T','var(--ok)'],['+2','rgba(255,255,255,.22)']].map(([n,c],i)=>(
              <div key={i} style={{
                width:28,height:28,borderRadius:'50%',background:c,color:'#fff',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:11,fontWeight:600,marginLeft:i?-8:0,
                border:'2px solid color-mix(in oklab,var(--primary) 85%,#000)',fontFamily:'var(--mono)',
              }}>{n}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Returning-pet chip */}
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',background:'var(--primary-wash)',borderRadius:10,border:'1px solid color-mix(in oklab,var(--primary) 20%,transparent)'}}>
        <div className="pet-ring xs alt" style={{width:28,height:28,fontSize:11}}>D</div>
        <div style={{fontSize:12,color:'var(--primary-ink)',flex:1}}>Dash’s <b>3rd visit</b> — Pim remembers she prefers slow clippers.</div>
      </div>

      <div>
        <h1 style={{fontFamily:'var(--serif)',fontWeight:500,fontSize:22,letterSpacing:'-0.015em'}}>
          <span className="th" style={{fontSize:16,color:'var(--ink-3)',fontWeight:400,display:'block',letterSpacing:0,marginBottom:2}}>อรุณ กรูมมิ่ง</span>
          A small shop that calms nervous dogs
        </h1>
        <p className="sub" style={{fontSize:13,marginTop:6,lineHeight:1.5}}>Five groomers, one waiting dog at a time. Open 09:00 – 19:00 · closed Mondays.</p>
      </div>

      {/* Trust block — deposit + cancellation + payout mechanics */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        <div style={{padding:'12px 14px',border:'1px solid var(--border)',borderRadius:12,background:'var(--paper)'}}>
          <div className="eyebrow" style={{fontSize:9,color:'var(--accent-ink)'}}>Deposit</div>
          <div style={{fontFamily:'var(--serif)',fontSize:20,fontWeight:500,letterSpacing:'-0.01em',marginTop:4,color:'var(--accent-ink)'}}>฿200</div>
          <div className="sub" style={{fontSize:11,marginTop:2}}>Refunded on arrival</div>
        </div>
        <div style={{padding:'12px 14px',border:'1px solid var(--border)',borderRadius:12,background:'var(--paper)'}}>
          <div className="eyebrow" style={{fontSize:9}}>Free cancel</div>
          <div style={{fontFamily:'var(--serif)',fontSize:20,fontWeight:500,letterSpacing:'-0.01em',marginTop:4}}>24 h</div>
          <div className="sub" style={{fontSize:11,marginTop:2}}>Hold released automatically</div>
        </div>
      </div>

      <div className="m-sec"><h4>Services for Dash · medium coat</h4><button type="button" className="link-btn">All 9 →</button></div>

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <div className="svc-card on" style={{padding:16}}>
          <div style={{flex:1}}>
            <div className="row" style={{gap:6,marginBottom:6}}>
              <span className="status s-instant" style={{padding:'2px 6px',fontSize:9}}>Picked for Dash</span>
            </div>
            <h5 style={{fontSize:17}}>Full groom</h5>
            <div className="sub" style={{fontSize:12,marginTop:2}}>Bath · hand‑scissor · nails · ears</div>
            <div className="tag" style={{marginTop:10,gap:6}}>
              <span className="chip"><span className="dot"/>75 min</span>
              <span className="chip"><span className="dot" style={{background:'var(--ok)'}}/>Sensitive‑skin shampoo</span>
            </div>
          </div>
          <div className="price">฿650<small>includes ฿200 Shield hold</small></div>
        </div>
        <div className="svc-card">
          <div>
            <h5>Bath &amp; blow</h5>
            <div className="sub">Shampoo · dry · brush</div>
            <div className="tag"><span className="chip"><span className="dot"/>45 min</span></div>
          </div>
          <div className="price">฿420<small>medium coat</small></div>
        </div>
        <div className="svc-card">
          <div>
            <h5>Puppy first cut <span className="chip accent" style={{marginLeft:6,padding:'2px 6px',fontSize:9}}>Mochi</span></h5>
            <div className="sub">Gentle intro · under 7 mo</div>
          </div>
          <div className="price">฿550<small>60 min</small></div>
        </div>
      </div>
    </div>
    <div className="action-bar">
      <div className="cost"><div className="k">Full groom</div><div className="v">฿650</div></div>
      <button className="btn primary btn-lg">Pick a time</button>
    </div>
  </div>
);}

// ─── 07 Time picker ────────────────────────────────────────
function Screen07_Time(){
  const days = [
    {d:'Mon',n:11,on:false},{d:'Tue',n:12,on:true},{d:'Wed',n:13},{d:'Thu',n:14},{d:'Fri',n:15},{d:'Sat',n:16,dis:true},{d:'Sun',n:17},
  ];
  return (
    <div className="screen">
      <div className="screen-content">
        <div className="sc-head" style={{paddingTop:0}}>
          <div className="sc-ic"><ChevL/></div>
          <div><div className="eyebrow" style={{fontSize:9}}>Step 1 of 3</div><div style={{fontWeight:500,fontSize:14}}>Pick a time</div></div>
          <div className="right"><div className="sc-ic">i</div></div>
        </div>
        <div className="progress"><div className="fill" style={{width:'33%'}}/></div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:6,marginTop:4}}>
          {days.map(x=>(
            <div key={x.n} className={"slot-cell"+(x.on?' on':'')+(x.dis?' disabled':'')} style={{padding:'10px 4px'}}>
              <span style={{fontSize:10}}>{x.d}</span>
              <b style={{fontSize:15}}>{x.n}</b>
            </div>
          ))}
        </div>

        <div className="m-sec"><h4>Morning · Tue 14 Apr</h4><span className="sub" style={{fontSize:11}}>Confirms instantly</span></div>
        <div className="slot-grid">
          <div className="slot-cell"><b>09:00</b>75 min</div>
          <div className="slot-cell on"><b>10:30</b>75 min</div>
          <div className="slot-cell"><b>11:15</b>75 min</div>
        </div>

        <div className="m-sec"><h4>Afternoon</h4><span className="sub" style={{fontSize:11}}>Two slots need staff confirm</span></div>
        <div className="slot-grid">
          <div className="slot-cell"><b>13:00</b>75 min</div>
          <div className="slot-cell pend"><b>14:30</b>confirm</div>
          <div className="slot-cell disabled"><b>15:45</b>full</div>
          <div className="slot-cell pend"><b>16:30</b>confirm</div>
          <div className="slot-cell disabled"><b>17:15</b>full</div>
          <div className="slot-cell"><b>18:00</b>75 min</div>
        </div>

        <div className="m-banner" style={{marginTop:4}}>
          <div className="ic">?</div>
          <div><h5>“Confirm” slots</h5><p>Shop confirms within 1 hour. You’re only charged after they accept.</p></div>
        </div>
      </div>
      <div className="action-bar">
        <div className="cost"><div className="k">Tue · 10:30</div><div className="v">฿650</div></div>
        <button className="btn primary btn-lg">Review</button>
      </div>
    </div>
  );
}
Object.assign(PawpointCustomer,{
  CUSTOMER_MEDIA,
  Screen01_Welcome,
  Screen02_Language,
  Screen03_OTP,
  Screen04_Pet,
  Screen05_Home,
  Screen06_Shop,
  Screen07_Time,
});
})();
