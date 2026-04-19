// merchant/screens-b.jsx — Flows B + C
// 04 Arrivals · 05 Service board (kanban) · 06 Groomers & shifts · 07 Services + auto‑accept · 08 Payouts & reviews

(() => {
const PawpointMerchant = window.PawpointMerchant || {};
const { Shell, MPlus, MSearch } = PawpointMerchant;

if (!Shell || !MPlus || !MSearch) {
  throw new Error('Pawpoint merchant primitives must load before merchant follow-on screens.');
}

// ─── 04 · Arrivals / check-in ────────────────────────────────
function Screen04_Arrivals(){
  const due = [
    {time:'14:30', owner:'Praew', pet:'Dash · Welsh Corgi', groomer:'Nan',  status:'due'},
    {time:'14:45', owner:'Aom',   pet:'Biscuit · Cocker',  groomer:'Pim',  status:'arrived'},
    {time:'15:00', owner:'Boon',  pet:'Tofu · Shiba',      groomer:'Tee',  status:'due'},
    {time:'15:15', owner:'Mai',   pet:'Oreo · Boston',     groomer:'Jib',  status:'due'},
    {time:'15:45', owner:'Tha',   pet:'Pepper · Frenchie', groomer:'Nan',  status:'due'},
  ];
  return (
    <Shell
      active="arrive"
      title="Arrivals"
      titleTh="ลูกค้ามาถึง"
      stats={[
        {k:'Next 2h', v:'5'},
        {k:'Arrived', v:'1'},
        {k:'Deposits', v:'฿1,000'},
      ]}
      topActions={<button className="btn primary btn-sm">Walk‑in</button>}
      search={false}
    >
      <div style={{padding:14,display:'grid',gridTemplateColumns:'1fr 360px',gap:14,height:'100%'}}>
        {/* left: arrivals list */}
        <div style={{display:'flex',flexDirection:'column',gap:12,overflow:'auto'}}>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div className="segmented"><button className="on">Next up</button><button>Morning</button><button>All day</button></div>
            <div style={{flex:1}}/>
            <div className="chip"><MSearch/>Find by name…</div>
          </div>
          <div style={{background:'var(--paper)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden'}}>
            {due.map((r,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'80px 1fr 1fr 140px 160px',gap:14,padding:'16px 18px',borderBottom:i<due.length-1?'1px solid var(--border)':'none',alignItems:'center',background:r.status==='arrived'?'var(--ok-wash)':'transparent'}}>
                <div style={{fontFamily:'var(--mono)',fontWeight:500,fontSize:16,color:'var(--ink)'}}>{r.time}</div>
                <div>
                  <div style={{fontWeight:500,fontSize:14}}>{r.owner}</div>
                  <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>{r.pet}</div>
                </div>
                <div style={{fontSize:12,color:'var(--ink-2)'}}>with <b style={{fontWeight:500,color:'var(--ink)'}}>{r.groomer}</b></div>
                <div>
                  {r.status==='arrived'
                    ? <span className="status s-arrived">Arrived 14:41</span>
                    : <span className="status s-confirm">Confirmed</span>}
                </div>
                <div style={{display:'flex',gap:6,justifyContent:'flex-end'}}>
                  {r.status==='arrived'
                    ? <button className="btn secondary btn-sm">Start service</button>
                    : <><button className="btn secondary btn-sm">Call</button><button className="btn primary btn-sm">Check in</button></>}
                </div>
              </div>
            ))}
          </div>

          <div className="alert info" style={{marginTop:4}}>
            <div className="alert-ic">i</div>
            <div className="alert-body">
              <b>Deposits release on check‑in.</b>
              <p>Tapping “Check in” refunds Praew’s ฿200 to her card and adds ฿650 to tonight’s payout.</p>
            </div>
          </div>
        </div>

        {/* right: QR panel + most recent */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="card" style={{textAlign:'center',padding:18}}>
            <div className="eyebrow" style={{fontSize:9,justifyContent:'center'}}>Contactless check‑in</div>
            <div style={{
              width:180,height:180,margin:'14px auto',borderRadius:14,background:'var(--paper)',border:'1px solid var(--border)',
              padding:10,position:'relative'
            }}>
              <QRPlaceholder/>
            </div>
            <div style={{fontFamily:'var(--serif)',fontSize:18,fontWeight:500,letterSpacing:'-0.01em'}}>Scan to check in</div>
            <div style={{fontSize:11,color:'var(--ink-3)',marginTop:4,lineHeight:1.5}}>Customers scan from their Pawpoint app.<br/>No app? Tap their name on the left.</div>
          </div>

          <div className="card" style={{padding:14}}>
            <div className="eyebrow" style={{fontSize:9,marginBottom:8}}>Just arrived</div>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:'var(--ok-wash)',color:'var(--ok)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600}}>B</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:500,fontSize:13}}>Aom &amp; Biscuit</div>
                <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>14:41 · 11m early</div>
              </div>
              <span className="status s-arrived" style={{fontSize:11}}>Ready to start</span>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

const QRPlaceholder = ()=>{
  // quick decorative "qr" — not a real code
  const cells = [];
  const pat = [
    "1111111011001111111","1000001010101000001","1011101011011011101",
    "1011101000111011101","1011101011001011101","1000001010101000001",
    "1111111010101111111","0000000011100000000","1011100110110110110",
    "0110011001001001001","1101101110111110110","0010010101000101010",
    "1111111011011000110","1000001000100101110","1011101011111100001",
    "1011101011000111010","1011101010111001001","1000001010011010110",
    "1111111011001010101",
  ];
  pat.forEach((row,y)=>row.split('').forEach((c,x)=>{
    if(c==='1') cells.push(<rect key={`${x}-${y}`} x={x*7.9} y={y*7.9} width="7.6" height="7.6" fill="var(--ink)"/>);
  }));
  return (
    <svg viewBox="0 0 150 150" width="100%" height="100%" style={{display:'block'}}>
      {cells}
      <g>
        <rect x="62" y="62" width="26" height="26" fill="var(--paper)"/>
        <circle cx="75" cy="75" r="9" fill="var(--accent)"/>
        <circle cx="75" cy="75" r="4" fill="var(--paper)"/>
      </g>
    </svg>
  );
};

// ─── 05 · Service board (kanban) ─────────────────────────────
function Screen05_Board(){
  const cols = [
    {k:'wait',  n:2, label:'Waiting for time',
      items:[
        {t:'15:00',name:'Boon · Tofu',svc:'Full groom',groomer:'Tee'},
        {t:'15:15',name:'Mai · Oreo', svc:'Bath & blow',groomer:'Jib'},
      ]},
    {k:'arr',   n:2, label:'Arrived',
      items:[
        {t:'14:41',name:'Aom · Biscuit',svc:'Full groom',groomer:'Pim',hot:true,wait:11},
        {t:'14:48',name:'Praew · Dash',svc:'Full groom',groomer:'Nan',wait:4},
      ]},
    {k:'srv',   n:3, label:'In service',
      items:[
        {t:'13:00',name:'Praew · Dash*', svc:'Full groom · 52m in',groomer:'Pim',tag:'Paws tricky'},
        {t:'13:30',name:'Kan · Basil',svc:'Ears+nails · 22m',groomer:'Jib'},
        {t:'12:30',name:'Lek · Sky',svc:'Full groom · 82m',groomer:'Tee',overrun:true},
      ]},
    {k:'done',  n:1, label:'Ready for pickup',
      items:[
        {t:'14:05',name:'Aim · Snow',svc:'Full groom · done 14:58',groomer:'Nan'},
      ]},
    {k:'paid',  n:4, label:'Picked up',
      items:[
        {t:'11:30',name:'Tom · Mochi',svc:'Puppy first cut',groomer:'Nan'},
        {t:'11:00',name:'Lek · Milo',svc:'Bath & blow',groomer:'Jib'},
        {t:'10:30',name:'Boon · Rio',svc:'Full groom',groomer:'Tee'},
        {t:'09:15',name:'Aim · Boba',svc:'Bath & blow',groomer:'Tee'},
      ]},
  ];
  return (
    <Shell
      active="board"
      title="Service board"
      titleTh="บอร์ดงาน"
      stats={[
        {k:'In shop', v:'5'},
        {k:'Avg wait', v:'6m'},
        {k:'Longest run', v:'+22m'},
      ]}
      topActions={<><button className="btn secondary btn-sm">Filter: today</button><button className="btn primary btn-sm"><MPlus/>Walk‑in</button></>}
      search={false}
    >
      <div className="kanban" style={{padding:14,height:'100%'}}>
        {cols.map(c=>(
          <div key={c.k} className={"kan-col"+(c.k==='wait'?' wait':'')}>
            <div className="kc-head">
              <span><b>{c.label}</b> <span className="n" style={{marginLeft:6}}>{c.items.length}</span></span>
            </div>
            <div className="kc-body">
              {c.items.map((it,i)=>(
                <div key={i} className={"kan-card"+(it.hot?' hot':'')}>
                  <div className="top">
                    <b>{it.name}</b>
                    <span className="t">{it.t}</span>
                  </div>
                  <div className="svc">{it.svc}{it.overrun && <span style={{color:'var(--warn)',fontWeight:500}}> · overrun</span>}</div>
                  <div className="tags" style={{marginTop:2}}>
                    <span className="chip" style={{padding:'2px 8px',fontSize:11}}>With {it.groomer}</span>
                    {it.wait && <span className="chip accent" style={{padding:'2px 8px',fontSize:11}}>wait {it.wait}m</span>}
                    {it.tag && <span className="chip" style={{padding:'2px 8px',fontSize:11,background:'var(--info-wash)',color:'var(--info)',border:'none'}}>{it.tag}</span>}
                  </div>
                </div>
              ))}
              {c.k==='arr' && (
                <div style={{border:'1px dashed var(--border-strong)',borderRadius:10,padding:'10px 12px',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--ink-3)',fontSize:12,gap:6}}>
                  <MPlus/> Drag from Waiting
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
}

// ─── 06 · Groomers & shifts ─────────────────────────────────
function Screen06_Groomers(){
  const rows = [
    {g:'P',name:'Pim Somsak',    role:'Owner · senior',    shift:'09:00–19:00',  util:84, svc:9,  rev:3160},
    {g:'N',name:'Nan Phenphan',  role:'Senior · anxious',  shift:'10:00–18:00',  util:76, svc:7,  rev:2640},
    {g:'T',name:'Tee Wiriya',    role:'Senior',            shift:'09:00–17:00',  util:91, svc:8,  rev:2840, warn:'Running 22m long'},
    {g:'J',name:'Jib Chaiyaporn', role:'Junior',           shift:'09:00–17:00',  util:58, svc:5,  rev:1120},
    {g:'K',name:'Kritt (PT)',    role:'Puppy · part‑time', shift:'off',          util:0,  svc:0,  rev:0, off:true},
  ];
  return (
    <Shell
      active="people"
      title="Groomers"
      titleTh="กรูมเมอร์"
      stats={[{k:'On today',v:'4'},{k:'Utilisation',v:'77%'},{k:'Revenue',v:'฿9,760'}]}
      topActions={<><button className="btn secondary btn-sm">Set next week</button><button className="btn primary btn-sm"><MPlus/>Add groomer</button></>}
    >
      <div style={{padding:14,display:'flex',flexDirection:'column',gap:12,height:'100%',overflow:'auto'}}>
        <div style={{background:'var(--paper)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr 1.4fr 1fr 1fr',gap:14,padding:'12px 18px',borderBottom:'1px solid var(--border)',background:'var(--paper-2)',fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--ink-3)'}}>
            <div>Name</div><div>Role</div><div>Shift today</div><div>Utilisation</div><div>Services</div><div>Revenue</div>
          </div>
          {rows.map((r,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr 1.4fr 1fr 1fr',gap:14,padding:'14px 18px',borderBottom:i<rows.length-1?'1px solid var(--border)':'none',alignItems:'center',opacity:r.off?0.55:1}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:34,height:34,borderRadius:'50%',background:'var(--primary-wash)',color:'var(--primary-ink)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,fontFamily:'var(--mono)',fontSize:13}}>{r.g}</div>
                <div>
                  <div style={{fontWeight:500,fontSize:13}}>{r.name}</div>
                  {r.warn && <div style={{fontSize:10,color:'var(--warn)',fontFamily:'var(--mono)',letterSpacing:'.02em',marginTop:2}}>⚠ {r.warn}</div>}
                </div>
              </div>
              <div style={{fontSize:12,color:'var(--ink-2)'}}>{r.role}</div>
              <div style={{fontFamily:'var(--mono)',fontSize:12,color:r.off?'var(--ink-3)':'var(--ink)'}}>{r.shift}</div>
              <div>
                {r.off
                  ? <span style={{fontSize:11,color:'var(--ink-3)'}}>—</span>
                  : <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{flex:1,height:6,background:'var(--paper-3)',borderRadius:3,overflow:'hidden'}}>
                        <div style={{width:`${r.util}%`,height:'100%',background:r.util>85?'var(--warn)':'var(--primary)'}}/>
                      </div>
                      <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--ink-2)',minWidth:28}}>{r.util}%</span>
                    </div>}
              </div>
              <div style={{fontFamily:'var(--mono)',fontSize:13,fontWeight:500}}>{r.svc || '—'}</div>
              <div style={{fontFamily:'var(--serif)',fontSize:15,fontWeight:500,letterSpacing:'-0.01em'}}>{r.rev?`฿${r.rev.toLocaleString()}`:'—'}</div>
            </div>
          ))}
        </div>

        {/* Week-at-a-glance */}
        <div className="card">
          <div style={{display:'flex',alignItems:'baseline',gap:10,marginBottom:12}}>
            <div className="eyebrow">Week schedule · Nov 11–17</div>
            <div style={{flex:1}}/>
            <div className="hot-cluster"><span className="kbd">←</span><span className="kbd">→</span><span>weeks</span></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'120px repeat(7,1fr)',gap:6,fontSize:11}}>
            <div/>
            {['Mon 11','Tue 12','Wed 13','Thu 14','Fri 15','Sat 16','Sun 17'].map(d=>(
              <div key={d} style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ink-3)',padding:'4px 6px'}}>{d}</div>
            ))}
            {[
              ['Pim','off','09–19','09–19','09–17','09–19','09–19','off'],
              ['Nan','off','10–18','10–18','10–18','off',   '09–19','10–16'],
              ['Tee','10–16','09–17','09–17','off','09–17', '09–19','09–17'],
              ['Jib','off','09–17','09–17','09–17','09–17', '09–19','09–17'],
              ['Kritt','off','off','14–18','off','14–18', '10–18','10–16'],
            ].map((row,ri)=>(
              <React.Fragment key={ri}>
                <div style={{fontWeight:500,fontSize:12,padding:'8px 6px'}}>{row[0]}</div>
                {row.slice(1).map((c,ci)=>{
                  const off = c==='off';
                  const today = ci===1;
                  return <div key={ci} style={{
                    padding:'8px 6px',borderRadius:6,textAlign:'center',
                    background:off?'repeating-linear-gradient(135deg,var(--paper-2) 0 4px,var(--paper-3) 4px 8px)':today?'var(--primary-wash)':'var(--paper-2)',
                    color:off?'var(--ink-3)':today?'var(--primary-ink)':'var(--ink-2)',
                    fontFamily:'var(--mono)',fontSize:11,fontWeight:today?500:400,
                    border:today?'1px solid color-mix(in oklab,var(--primary) 25%,transparent)':'1px solid var(--border)',
                  }}>{off?'—':c}</div>;
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── 07 · Services & auto‑accept rules ──────────────────────
function Screen07_Services(){
  const svcs = [
    {n:'Full groom',   th:'อาบน้ำตัดขน',     min:'65–90m', from:'฿550', bookings:84, auto:true,  rule:'Returning customer · medium coat · 09:00–17:00'},
    {n:'Bath & blow',  th:'อาบน้ำเป่าขน',    min:'40–55m', from:'฿380', bookings:122, auto:true,  rule:'All customers'},
    {n:'Puppy first cut',th:'ตัดแต่งลูกหมา', min:'45–60m', from:'฿450', bookings:18,  auto:false, rule:'Review manually · Kritt or Nan only'},
    {n:'De‑matting',   th:'แก้ขนสังกะตัง',    min:'60–120m',from:'฿750', bookings:12,  auto:false, rule:'Review · needs photo upload'},
    {n:'Anxious dog · full',th:'หมากังวล',    min:'90–120m',from:'฿850', bookings:9,   auto:false, rule:'Nan only · 1 per afternoon'},
    {n:'Nails & ears only',th:'ตัดเล็บ·ทำความสะอาดหู',min:'15–25m',from:'฿180',bookings:64,auto:true,rule:'All customers · Jib assigned'},
  ];
  return (
    <Shell
      active="svc"
      title="Services"
      titleTh="บริการ & กฎรับอัตโนมัติ"
      stats={[{k:'Catalogue',v:'14'},{k:'Auto‑accept',v:'9'},{k:'Review first',v:'5'}]}
      topActions={<><button className="btn secondary btn-sm">Preview in customer app ↗</button><button className="btn primary btn-sm"><MPlus/>New service</button></>}
    >
      <div style={{padding:14,display:'grid',gridTemplateColumns:'1fr 320px',gap:14,height:'100%',overflow:'auto'}}>
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr .8fr .8fr 1fr 2.2fr 0.6fr',gap:14,padding:'12px 18px',borderBottom:'1px solid var(--border)',background:'var(--paper-2)',fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--ink-3)'}}>
            <div>Service</div><div>Duration</div><div>From</div><div>Bookings · 30d</div><div>Auto‑accept rule</div><div style={{textAlign:'right'}}>On</div>
          </div>
          {svcs.map((s,i)=>(
            <div key={i} style={{display:'grid',gridTemplateColumns:'2fr .8fr .8fr 1fr 2.2fr 0.6fr',gap:14,padding:'14px 18px',borderBottom:i<svcs.length-1?'1px solid var(--border)':'none',alignItems:'center'}}>
              <div>
                <div style={{fontWeight:500,fontSize:13}}>{s.n}</div>
                <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--thai)',fontStyle:'italic'}}>{s.th}</div>
              </div>
              <div style={{fontFamily:'var(--mono)',fontSize:12,color:'var(--ink-2)'}}>{s.min}</div>
              <div style={{fontFamily:'var(--serif)',fontSize:15,fontWeight:500,letterSpacing:'-0.01em'}}>{s.from}</div>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontFamily:'var(--mono)',fontSize:12}}>{s.bookings}</span>
                <div className="spark">
                  {Array.from({length:7}).map((_,k)=>(<b key={k} className={k===4||k===5?'hi':''} style={{height:`${20+((k*13+i*7)%70)}%`}}/>))}
                </div>
              </div>
              <div style={{fontSize:11,color:s.auto?'var(--ok)':'var(--ink-3)',fontFamily:'var(--mono)',letterSpacing:'.02em',lineHeight:1.4}}>
                <span style={{fontWeight:500}}>{s.auto?'● Auto':'○ Review'}</span> · <span style={{color:'var(--ink-2)'}}>{s.rule}</span>
              </div>
              <div style={{display:'flex',justifyContent:'flex-end'}}><div className={"toggle"+(s.auto?' on':'')}/></div>
            </div>
          ))}
        </div>

        {/* Right sidebar: rule explanation */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="card" style={{background:'var(--primary-wash)',borderColor:'color-mix(in oklab,var(--primary) 20%,transparent)'}}>
            <div className="eyebrow" style={{color:'var(--primary-ink)'}}>Why auto‑accept matters</div>
            <h4 style={{fontFamily:'var(--serif)',fontWeight:500,fontSize:18,letterSpacing:'-0.015em',margin:'6px 0 8px',color:'var(--primary-ink)'}}>68% of bookings confirm instantly</h4>
            <p style={{fontSize:12,color:'var(--primary-ink)',lineHeight:1.5,opacity:.85}}>Customers see an <b>Instant</b> badge. You see fewer notifications. Pawpoint reserves manual review for services where judgment actually helps — matting, anxious dogs, first visits.</p>
          </div>

          <div className="card">
            <div className="eyebrow">Global rules</div>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
              {[
                {on:true, t:'Returning customers auto‑accept', s:'Anyone with a completed visit'},
                {on:true, t:'Vaccines verified', s:'Required for all new pets'},
                {on:false,t:'Review any booking made <4h ahead', s:'You decide if staff are ready'},
                {on:true, t:'Close catalogue at 80% capacity', s:'Prevents same‑day overload'},
              ].map((r,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,padding:'8px 0',borderTop:i?'1px solid var(--border)':'none'}}>
                  <div className={"toggle"+(r.on?' on':'')} style={{marginTop:3}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:500}}>{r.t}</div>
                    <div style={{fontSize:11,color:'var(--ink-3)'}}>{r.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

// ─── 08 · Payouts & reviews ─────────────────────────────────
function Screen08_Payouts(){
  return (
    <Shell
      active="money"
      title="Payouts"
      titleTh="การเงิน & รีวิว"
      stats={[{k:'This month', v:'฿186,420'},{k:'Next payout', v:'Fri 15'},{k:'Rating', v:'4.9 ★'}]}
      topActions={<><button className="btn secondary btn-sm">Download statement</button><button className="btn primary btn-sm">Payout settings</button></>}
    >
      <div style={{padding:14,display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:14,height:'100%',overflow:'auto'}}>
        {/* Money column */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="card" style={{padding:18}}>
            <div style={{display:'flex',gap:24,alignItems:'flex-end',marginBottom:14}}>
              <div>
                <div className="eyebrow">Next payout · Fri 15 Nov</div>
                <div style={{fontFamily:'var(--serif)',fontSize:46,fontWeight:500,letterSpacing:'-0.025em',lineHeight:1,marginTop:6}}>฿42,180</div>
                <div style={{fontSize:12,color:'var(--ink-3)',marginTop:6}}>To SCB x4421 · covers Nov 5 – Nov 11</div>
              </div>
              <div style={{flex:1}}/>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:8,minWidth:340}}>
                <div className="tile"><div className="lbl">Services</div><div className="val">฿43,820</div></div>
                <div className="tile"><div className="lbl">Pawpoint fee</div><div className="val" style={{color:'var(--ink-3)'}}>−฿1,315</div></div>
                <div className="tile"><div className="lbl">Refunds</div><div className="val" style={{color:'var(--ink-3)'}}>−฿325</div></div>
              </div>
            </div>

            {/* Weekly bar chart */}
            <div style={{marginTop:10}}>
              <div className="eyebrow" style={{marginBottom:8}}>12 weeks · revenue</div>
              <div style={{display:'flex',alignItems:'flex-end',gap:6,height:100}}>
                {[28,34,31,38,42,36,41,39,45,42,44,46].map((h,i)=>(
                  <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                    <div style={{width:'100%',height:`${h*2}px`,background:i===11?'var(--primary)':'var(--primary-wash)',borderRadius:'4px 4px 0 0',border:i===11?'none':'1px solid color-mix(in oklab,var(--primary) 20%,transparent)'}}/>
                    <div style={{fontFamily:'var(--mono)',fontSize:9,color:'var(--ink-3)',letterSpacing:'.04em'}}>W{i+34}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card" style={{padding:0,overflow:'hidden'}}>
            <div style={{padding:'12px 18px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center'}}>
              <div className="eyebrow">Recent bookings · auto‑reconciled</div>
              <div style={{flex:1}}/>
              <button type="button" className="link-btn" style={{fontSize:11,color:'var(--primary-ink)'}}>See all →</button>
            </div>
            {[
              {t:'14:48',who:'Praew · Dash',svc:'Full groom',gross:650,fee:19,net:631,deposit:true},
              {t:'14:41',who:'Aom · Biscuit',svc:'Full groom',gross:650,fee:19,net:631,deposit:true},
              {t:'13:30',who:'Kan · Basil',svc:'Ears + nails',gross:180,fee:5,net:175,deposit:false},
              {t:'11:30',who:'Tom · Mochi',svc:'Puppy first cut',gross:550,fee:16,net:534,deposit:true},
              {t:'10:30',who:'Boon · Rio',svc:'Full groom',gross:650,fee:19,net:631,deposit:true},
            ].map((r,i,a)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'70px 1.4fr 1fr 80px 80px 100px',gap:12,padding:'10px 18px',borderBottom:i<a.length-1?'1px solid var(--border)':'none',alignItems:'center',fontSize:12}}>
                <div style={{fontFamily:'var(--mono)',color:'var(--ink-3)'}}>{r.t}</div>
                <div style={{fontWeight:500}}>{r.who}</div>
                <div style={{color:'var(--ink-3)'}}>{r.svc}</div>
                <div style={{fontFamily:'var(--mono)',textAlign:'right'}}>฿{r.gross}</div>
                <div style={{fontFamily:'var(--mono)',color:'var(--ink-3)',textAlign:'right'}}>−฿{r.fee}</div>
                <div style={{fontFamily:'var(--mono)',textAlign:'right',fontWeight:500}}>฿{r.net} {r.deposit && <span style={{color:'var(--accent-ink)',fontSize:10,marginLeft:4}}>•dep</span>}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews column */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="card">
            <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:10}}>
              <div style={{fontFamily:'var(--serif)',fontSize:54,fontWeight:500,lineHeight:1,letterSpacing:'-0.03em'}}>4.9</div>
              <div>
                <div style={{color:'var(--accent)',letterSpacing:2,fontSize:14}}>★★★★★</div>
                <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)',letterSpacing:'.06em'}}>312 REVIEWS · +8 THIS WEEK</div>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:5}}>
              {[
                {n:5,pct:86},{n:4,pct:10},{n:3,pct:3},{n:2,pct:1},{n:1,pct:0},
              ].map(x=>(
                <div key={x.n} style={{display:'flex',alignItems:'center',gap:8,fontSize:11,fontFamily:'var(--mono)',color:'var(--ink-3)'}}>
                  <span style={{width:14,textAlign:'right'}}>{x.n}★</span>
                  <div style={{flex:1,height:6,background:'var(--paper-3)',borderRadius:3,overflow:'hidden'}}>
                    <div style={{width:`${x.pct}%`,height:'100%',background:'var(--accent)'}}/>
                  </div>
                  <span style={{width:32,textAlign:'right'}}>{x.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {[
            {stars:5, who:'Praew', when:'2d ago', svc:'Full groom · Nan',
              text:'Dash is usually nervous at the dryer. Nan took it slow — he walked out proud. Booking was easy; deposit refunded before we finished checking in.'},
            {stars:5, who:'Jun', when:'5d ago', svc:'Puppy first cut',
              text:'First time. Kritt let Mochi sniff everything before starting. Pictures sent over LINE after. Worth the ฿450.'},
            {stars:4, who:'Aom', when:'1w ago', svc:'Full groom',
              text:'Good result. Had to wait 10m past my slot — Tee explained and offered water. Would rebook.'},
          ].map((r,i)=>(
            <div key={i} className="card" style={{padding:14}}>
              <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:'var(--accent-wash)',color:'var(--accent-ink)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:600,fontSize:11}}>{r.who[0]}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:500}}>{r.who} · <span style={{color:'var(--accent)'}}>{'★'.repeat(r.stars)}</span></div>
                  <div style={{fontSize:10,color:'var(--ink-3)',fontFamily:'var(--mono)',letterSpacing:'.04em'}}>{r.svc} · {r.when}</div>
                </div>
                {i===0 && <span className="status s-confirm" style={{fontSize:9}}>Replied</span>}
              </div>
              <p style={{fontSize:12,color:'var(--ink-2)',lineHeight:1.55}}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

Object.assign(PawpointMerchant, {
  Screen04_Arrivals, Screen05_Board, Screen06_Groomers, Screen07_Services, Screen08_Payouts
});
})();
