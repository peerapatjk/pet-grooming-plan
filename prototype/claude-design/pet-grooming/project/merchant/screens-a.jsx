// merchant/screens-a.jsx — Flow A: Running today
// Screens: 01 Today (timeline)  ·  02 Requests inbox  ·  03 Request detail (drawer)

(() => {
const PawpointMerchant = window.PawpointMerchant || {};
const { Shell, MChevR, MSearch, MX, MPlus } = PawpointMerchant;

if (!Shell || !MChevR || !MSearch || !MX || !MPlus) {
  throw new Error('Pawpoint merchant primitives must load before merchant screens.');
}

// Shared data — so our demo feels like one shop, one day
const GROOMERS = [
  {id:'P', name:'Pim',   role:'Owner',  color:'accent'},
  {id:'N', name:'Nan',   role:'Anxious dogs', color:'primary'},
  {id:'T', name:'Tee',   role:'Senior', color:'info'},
  {id:'J', name:'Jib',   role:'Junior', color:'ok'},
  {id:'K', name:'Kritt', role:'Puppies · PT', color:'accent'},
];

// ─── 01 · Today ─────────────────────────────────────────────
// Timeline: groomers × 09:00–19:00. NOW line at 13:52. Mix of statuses.
// px math: lanes col is CSS-grid `1fr`; each block uses left% + width% over 11 hours (09–20).
// 09:00 = 0%, 20:00 = 100%. 1 hour = 100/11.
const H0 = 9;
const hourPct = (h, m=0) => ((h - H0) + m/60) * (100/11);
const durPct  = (mins) => (mins/60) * (100/11);

function Screen01_Today(){
  const lanes = [
    { g:'P', blocks:[
        {t:'Full groom',  pet:'Luna · Shiba',       start:[9,30], dur:75,  state:'done'},
        {t:'Bath & blow', pet:'Mango · Poodle',     start:[11,15],dur:45,  state:'done'},
        {t:'Break',       pet:'',                    start:[12,30],dur:30, state:'break'},
        {t:'Full groom',  pet:'Dash · Welsh Corgi',  start:[13,0], dur:75,  state:'in-service'},
        {t:'Full groom',  pet:'Biscuit · Cocker',   start:[14,45],dur:75,  state:'arrived'},
        {t:'De‑matting',  pet:'Coco · Poodle',      start:[16,30],dur:90,  state:'confirmed'},
    ] },
    { g:'N', blocks:[
        {t:'Puppy first cut', pet:'Mochi · Poodle',  start:[10,0], dur:60, state:'done'},
        {t:'Full groom',      pet:'Snow · Samoyed',  start:[11,30],dur:90, state:'done'},
        {t:'Lunch',           pet:'',                 start:[13,15],dur:30, state:'break'},
        {t:'Full groom',      pet:'Dash · Welsh Corgi', start:[13,52],dur:0.01, state:'hidden'}, // anchor for NOW line; not rendered
        {t:'Bath & blow',     pet:'Peanut · Beagle', start:[14,0], dur:45, state:'confirmed'},
        {t:'Anxious · full',  pet:'Pepper · Frenchie',start:[15,15],dur:90, state:'confirmed'},
        {t:'New · needs slot',pet:'Maple · Pomsky',  start:[17,0], dur:75, state:'pending'},
    ] },
    { g:'T', blocks:[
        {t:'Bath & blow', pet:'Boba · Shih Tzu',    start:[9,15], dur:45, state:'done'},
        {t:'Full groom',  pet:'Rio · Corgi',         start:[10,30],dur:75, state:'done'},
        {t:'Full groom',  pet:'Sky · Husky',         start:[12,30],dur:90, state:'in-service'},
        {t:'Full groom',  pet:'Tofu · Shiba',        start:[14,30],dur:75, state:'confirmed'},
        {t:'Bath & blow', pet:'Momo · Pug',          start:[16,15],dur:45, state:'confirmed'},
        {t:'New · needs slot',pet:'Ginger · Beagle', start:[17,15],dur:60, state:'pending'},
    ] },
    { g:'J', blocks:[
        {t:'Nails',       pet:'Biscuit',             start:[9,45], dur:20, state:'done'},
        {t:'Bath & blow', pet:'Milo · Dachshund',    start:[10,15],dur:45, state:'done'},
        {t:'Bath & blow', pet:'Kimchi · Jindo',      start:[11,45],dur:45, state:'done'},
        {t:'Ears + nails',pet:'Basil · Cavoodle',    start:[13,30],dur:30, state:'in-service'},
        {t:'Bath & blow', pet:'Oreo · Boston',       start:[14,30],dur:45, state:'confirmed'},
        {t:'Puppy intro', pet:'Pumpkin · Shiba',     start:[16,0], dur:45, state:'confirmed'},
    ] },
    { g:'K', off:true, blocks:[] },
  ];
  return (
    <Shell
      active="today"
      title="Today"
      titleTh="วันนี้ · 12 พฤศจิกายน"
      stats={[
        {k:'Confirmed', v:'14'},
        {k:'Pending', v:'3'},
        {k:'PM load', v:'78%'},
        {k:'Revenue', v:'฿9,760'},
      ]}
      topActions={
        <>
          <button className="btn secondary btn-sm"><MPlus/>Add booking</button>
          <button className="btn primary btn-sm">Shift view</button>
        </>
      }
    >
      <div style={{padding:14,height:'100%',display:'flex',flexDirection:'column'}}>
        <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}>
          <div className="segmented" style={{}}>
            <button>Day</button>
            <button className="on">Week</button>
            <button>Month</button>
          </div>
          <div className="chip on" style={{whiteSpace:'nowrap'}}><span className="dot"/>All groomers</div>
          <div className="chip" style={{whiteSpace:'nowrap'}}><span className="dot" style={{background:'var(--warn)'}}/>2 pending</div>
          <div style={{flex:1}}/>
          <div className="hot-cluster">
            <span className="kbd">J</span><span>prev</span>
            <span className="kbd">L</span><span>next</span>
            <span className="kbd">.</span><span>today</span>
          </div>
        </div>

        <div className="sched">
          <div className="groomer-col">
            <div className="g-header">Tue 12 · 5 groomers</div>
            {lanes.map((L,i)=>{
              const g = GROOMERS.find(x=>x.id===L.g);
              return (
                <div key={i} className="groomer">
                  <div className="av" style={{background:`var(--${g.color}-wash)`,color:`var(--${g.color}-ink)`,borderColor:`var(--${g.color})`}}>{g.id}</div>
                  <div className="meta"><b>{g.name}</b><span>{L.off?'Off today':g.role}</span></div>
                </div>
              );
            })}
          </div>

          <div className="times">
            {Array.from({length:11},(_,i)=>(<span key={i}>{String(H0+i).padStart(2,'0')}:00</span>))}
          </div>

          <div className="lanes">
            {/* NOW line at 13:52 → (4.867/11)*100 = 44.24% */}
            <div className="now-line" style={{left:`${hourPct(13,52)}%`}}/>
            {lanes.map((L,i)=>(
              <div key={i} className={"lane"+(L.off?' off':'')}>
                {!L.off && L.blocks.filter(b=>b.state!=='hidden').map((b,j)=>{
                  const left = hourPct(b.start[0], b.start[1]);
                  const width = durPct(b.dur);
                  return (
                    <div key={j} className={"sched-block "+b.state}
                         style={{left:`${left}%`,width:`${width}%`}}>
                      <div>
                        <h6>{b.t}</h6>
                        {b.pet && <div className="sb-pet">{b.pet}</div>}
                      </div>
                      <div className="sb-meta">
                        {b.state==='in-service' && '● In service'}
                        {b.state==='arrived' && '● Arrived'}
                        {b.state==='done' && '✓ Done'}
                        {b.state==='confirmed' && `${String(b.start[0]).padStart(2,'0')}:${String(b.start[1]).padStart(2,'0')} · ${b.dur}m`}
                        {b.state==='pending' && '⏱ Needs accept'}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── 02 · Requests inbox ──────────────────────────────────────
// The most Pawpoint-specific screen: pending requests with countdowns.
// Demonstrates the merchant side of the "confirm within 1h" promise.
function Screen02_Inbox(){
  const reqs = [
    {
      id:'r1', selected:true,
      whenDay:'Today', whenTime:'14:30',
      petAv:'Pe', owner:'Nok C.', phone:'+66 89 xxx 4412',
      pet:'Peanut · Beagle 2y', svc:'Full groom', svcSub:'Medium coat · 45m',
      groomer:'Nan', ok:true,
      elapsed:37, // of 60 min
    },
    {
      id:'r2',
      whenDay:'Today', whenTime:'17:15',
      petAv:'G', owner:'Jun W.',   phone:'+66 89 xxx 7701',
      pet:'Ginger · Beagle 5y', svc:'Full groom', svcSub:'Short coat · 60m',
      groomer:'Tee', ok:true,
      elapsed:12,
    },
    {
      id:'r3', urgent:true,
      whenDay:'Thu 14', whenTime:'11:00',
      petAv:'M', owner:'Alisa P.', phone:'+66 89 xxx 9920',
      pet:'Maple · Pomsky 2y', svc:'De‑matting + full', svcSub:'Long coat · 90m',
      groomer:'Nan · reassign?', ok:false,
      elapsed:54,
    },
  ];
  return (
    <Shell
      active="inbox"
      title="Requests"
      titleTh="คำขอจองใหม่"
      stats={[
        {k:'Awaiting accept', v:'3'},
        {k:'Avg response', v:'18m'},
        {k:'Auto‑accept', v:'9'},
      ]}
      topActions={<button className="btn secondary btn-sm">Auto‑accept rules →</button>}
    >
      <div style={{padding:14,height:'100%',overflow:'auto',display:'flex',flexDirection:'column',gap:14}}>
        <div style={{background:'var(--warn-wash)',border:'1px solid color-mix(in oklab,var(--warn) 30%,transparent)',borderRadius:10,padding:'12px 14px',display:'flex',gap:10,alignItems:'center'}}>
          <div style={{width:28,height:28,borderRadius:8,background:'var(--warn)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontFamily:'var(--mono)',fontSize:12}}>!</div>
          <div style={{flex:1,fontSize:13,color:'oklch(0.4 0.11 75)'}}>
            <b style={{fontWeight:500}}>One request expires in 6 minutes.</b> Customers who time out are auto‑routed to nearby shops — you can still accept any time before, and Pawpoint notifies them.
          </div>
          <div className="hot-cluster">
            <span className="kbd">A</span><span>accept</span>
            <span className="kbd">S</span><span>suggest</span>
            <span className="kbd">D</span><span>decline</span>
          </div>
        </div>

        <div className="req-list">
          <div className="req-row" style={{background:'var(--paper-2)',fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--ink-3)',cursor:'default'}}>
            <div>When</div><div>Customer · pet</div><div>Service</div><div>Groomer suggested</div><div>Response deadline</div><div></div>
          </div>
          {reqs.map(r=>(
            <div key={r.id} className={"req-row"+(r.selected?' selected':'')}>
              <div className="when">{r.whenTime}<span>{r.whenDay}</span></div>
              <div className="who">
                <div className="av">{r.petAv}</div>
                <div className="meta">
                  <b>{r.owner}</b>
                  <span>{r.pet}</span>
                </div>
              </div>
              <div className="svc">
                <b>{r.svc}</b>
                <span>{r.svcSub}</span>
              </div>
              <div>
                <div className={"groomer-pill"+(r.ok?'':' alert')}>
                  <span className="d"/>
                  <span>{r.groomer}</span>
                </div>
              </div>
              <div className={"countdown"+(r.urgent?' urgent':'')}>
                <b>{r.urgent?'6m left':`${60-r.elapsed}m left`}</b>
                <div className="bar"><i style={{width:`${100-(r.elapsed/60*100)}%`}}/></div>
              </div>
              <div style={{display:'flex',gap:6,marginLeft:'auto',alignItems:'center'}}>
                <button style={{padding:'5px 10px',fontSize:11,fontFamily:'var(--mono)',fontWeight:500,letterSpacing:'.06em',textTransform:'uppercase',borderRadius:999,border:'1px solid var(--ok)',color:'var(--ok)',background:'var(--ok-wash)',cursor:'pointer',whiteSpace:'nowrap'}}>Accept</button>
                <button style={{padding:'5px 10px',fontSize:11,fontFamily:'var(--mono)',fontWeight:500,letterSpacing:'.06em',textTransform:'uppercase',borderRadius:999,border:'1px solid var(--danger)',color:'var(--danger)',background:'var(--danger-wash)',cursor:'pointer',whiteSpace:'nowrap'}}>Decline</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12}}>
          <div className="tile">
            <div className="lbl">Accepted today</div>
            <div className="val">22 / 25</div>
            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>88% · up from 81% last week</div>
          </div>
          <div className="tile" title="Shows as 'Instant confirm' to customers">
            <div className="lbl">Auto‑accept coverage</div>
            <div className="val">68%</div>
            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>Auto‑accept 9 of the 14 services</div>
          </div>
          <div className="tile accent">
            <div className="lbl">Pending deposit holds</div>
            <div className="val">฿600</div>
            <div style={{fontSize:11,color:'var(--accent-ink)',opacity:.8,marginTop:4}}>Released to you on arrival</div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── 03 · Request detail (drawer open over Inbox) ────────────
function Screen03_RequestDetail(){
  return (
    <Shell
      active="inbox"
      title="Requests"
      titleTh="คำขอจองใหม่"
      stats={[{k:'Awaiting', v:'3'},{k:'Avg response', v:'18m'}]}
      topActions={<button className="btn secondary btn-sm">Auto‑accept rules →</button>}
    >
      <div style={{padding:14,height:'100%',overflow:'hidden',display:'flex',flexDirection:'column',gap:12,position:'relative',filter:'saturate(.8)'}}>
        <div className="req-list" style={{opacity:.45,pointerEvents:'none'}}>
          <div className="req-row selected">
            <div className="when">14:30<span>Today</span></div>
            <div className="who"><div className="av">D</div><div className="meta"><b>Praew S.</b><span>Dash · Welsh Corgi 3y</span></div></div>
            <div className="svc"><b>Full groom</b><span>75m</span></div>
            <div><div className="groomer-pill"><span className="d"/><span>Nan</span></div></div>
            <div className="countdown"><b>23m left</b><div className="bar"><i style={{width:'38%'}}/></div></div>
            <div className="chev"><MChevR/></div>
          </div>
          <div className="req-row">
            <div className="when">17:15<span>Today</span></div>
            <div className="who"><div className="av">G</div><div className="meta"><b>Jun W.</b><span>Ginger · Beagle 5y</span></div></div>
            <div className="svc"><b>Full groom</b><span>60m</span></div>
            <div><div className="groomer-pill"><span className="d"/><span>Tee</span></div></div>
            <div className="countdown"><b>48m left</b><div className="bar"><i style={{width:'80%'}}/></div></div>
            <div className="chev"><MChevR/></div>
          </div>
        </div>

        {/* drawer */}
        <div className="detail-sheet">
          <div className="ds-head">
            <div className="ds-close"><MX/></div>
            <div style={{flex:1}}>
              <div className="eyebrow" style={{fontSize:9}}>Booking BKG-41A7 · Tue 12 · 14:30</div>
              <h3>Dash at Aroon <span className="th" style={{fontFamily:'var(--thai)',fontStyle:'italic',color:'var(--ink-3)',fontWeight:400,fontSize:14}}>แดช</span></h3>
            </div>
            <span className="status s-pend-m">Pending</span>
          </div>

          <div className="ds-body">
            {/* countdown dial */}
            <div style={{display:'flex',alignItems:'center',gap:14,padding:'12px 14px',background:'var(--warn-wash)',border:'1px solid color-mix(in oklab,var(--warn) 25%,transparent)',borderRadius:10}}>
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" stroke="color-mix(in oklab,var(--warn) 30%,transparent)" strokeWidth="4" fill="none"/>
                <circle cx="22" cy="22" r="18" stroke="var(--warn)" strokeWidth="4" fill="none"
                        strokeDasharray="113" strokeDashoffset="70" strokeLinecap="round"
                        transform="rotate(-90 22 22)"/>
                <text x="22" y="26" textAnchor="middle" fontSize="11" fontWeight="600" fill="oklch(0.4 0.11 75)" fontFamily="var(--mono)">23m</text>
              </svg>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,color:'oklch(0.38 0.1 75)'}}>Respond by 14:15</div>
                <div style={{fontSize:11,color:'var(--ink-3)',marginTop:2}}>Pawpoint will offer alternatives to Praew if you don’t.</div>
              </div>
            </div>

            {/* Customer block */}
            <div style={{marginTop:14,display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:40,height:40,borderRadius:'50%',background:'var(--accent-wash)',color:'var(--accent-ink)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,fontFamily:'var(--mono)'}}>P</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:500,fontSize:14}}>Praew Suwannakij <span style={{color:'var(--ink-3)',fontFamily:'var(--thai)',fontWeight:400,fontStyle:'italic',fontSize:12,marginLeft:4}}>แพรว</span></div>
                <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>3 prior visits · 100% showed · ★ ★ ★ ★ ★</div>
              </div>
              <button className="btn secondary btn-sm" style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.06em'}}>LINE</button>
            </div>

            {/* Pet block */}
            <div className="card" style={{marginTop:12,padding:12}}>
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:10}}>
                <div style={{width:40,height:40,borderRadius:'50%',background:'var(--primary-wash)',color:'var(--primary-ink)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600}}>D</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:500,fontSize:14}}>Dash</div>
                  <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>Welsh Corgi · 3y · 12.4kg · F spayed</div>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:12}}>
                <div><b style={{fontWeight:500}}>Coat</b><div style={{color:'var(--ink-2)'}}>Medium · lightly matted behind ears</div></div>
                <div><b style={{fontWeight:500}}>Allergy</b><div style={{color:'var(--ink-2)'}}>Mild — fragrance‑free only</div></div>
                <div><b style={{fontWeight:500}}>Temperament</b><div style={{color:'var(--ink-2)'}}>Calm · slow clippers preferred</div></div>
                <div><b style={{fontWeight:500}}>Vaccines</b><div style={{color:'var(--ok)'}}>Verified · Aug 2026</div></div>
              </div>
              <div style={{marginTop:10,padding:'8px 10px',background:'var(--paper-2)',borderRadius:6,fontSize:12,color:'var(--ink-2)',borderLeft:'2px solid var(--accent)'}}>
                <b style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--accent-ink)',fontWeight:500,display:'block',marginBottom:3}}>Note from Praew</b>
                “Please trim a little shorter around paws this time. She’s fine with the dryer if you turn it low.”
              </div>
            </div>

            {/* Service + money */}
            <div style={{marginTop:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              <div className="tile">
                <div className="lbl">Service</div>
                <div className="val" style={{fontSize:15}}>Full groom · 75m</div>
                <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4}}>Incl. sensitive‑skin shampoo</div>
              </div>
              <div className="tile accent">
                <div className="lbl">Customer pays</div>
                <div className="val" style={{fontSize:15}}>฿650</div>
                <div style={{fontSize:11,color:'var(--accent-ink)',opacity:.8,marginTop:4}}>฿200 deposit already held by Pawpoint</div>
              </div>
            </div>

            {/* Groomer match */}
            <div className="card" style={{marginTop:12,padding:12}}>
              <div className="eyebrow" style={{fontSize:9,marginBottom:8}}>Suggested groomer</div>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:'var(--primary-wash)',color:'var(--primary-ink)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600}}>N</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:500,fontSize:13}}>Nan · anxious‑dog specialist</div>
                  <div style={{fontSize:11,color:'var(--ink-3)'}}>Free 14:00–15:30 · has groomed Dash twice before</div>
                </div>
                <button className="btn ghost btn-sm" style={{fontSize:11}}>Change →</button>
              </div>
            </div>
          </div>

          <div className="ds-foot">
            <button className="btn danger btn-sm" style={{flex:1}} title="Decline this booking — Praew will be routed to an alternative shop">Decline</button>
            <button className="btn secondary btn-sm" style={{flex:1.2}}>Suggest another time</button>
            <button className="btn primary btn-sm" style={{flex:1.4}}>Accept · 14:30</button>
          </div>
        </div>
      </div>
    </Shell>
  );
}

Object.assign(PawpointMerchant, {
  GROOMERS, Screen01_Today, Screen02_Inbox, Screen03_RequestDetail
});
})();
