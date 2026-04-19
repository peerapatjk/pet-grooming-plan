// ops/screens-b.jsx — screens 4, 5, 6

(() => {
const PawpointOps = window.PawpointOps || {};
const { OpsScreen } = PawpointOps;

if (!OpsScreen) {
  throw new Error('Pawpoint ops shell must load before ops follow-on screens.');
}

// ─── Screen 4 · Shop health ──────────────────────────────
function Scr_ShopHealth() {
  // extended shops list for the table
  const rows = [
    { id:'kiki',    name:'Kiki Neko Salon',     area:'Siam',        tier:'Standard',  bookings:112, accept:76, response:24, completion:90, retention:42, nps:44, payout:'฿36,800', status:'hot',  trend:[3,4,3,2,5,6,4,3,5,2,4,3] },
    { id:'mm',      name:'M&M Mobile Groom',    area:'Mobile',      tier:'Standard',  bookings:68,  accept:68, response:31, completion:87, retention:38, nps:39, payout:'฿21,400', status:'hot',  trend:[5,4,3,4,3,4,2,3,4,3,2,2] },
    { id:'soi11',   name:'Soi 11 Dog Club',     area:'Asoke',       tier:'Premium',   bookings:176, accept:82, response:18, completion:93, retention:48, nps:51, payout:'฿54,220', status:'warn', trend:[5,6,5,7,6,5,6,4,5,4,5,3] },
    { id:'wagwag',  name:'WagWag Bangkok',      area:'Silom',       tier:'Standard',  bookings:168, accept:85, response:14, completion:95, retention:52, nps:55, payout:'฿52,100', status:'warn', trend:[4,5,6,5,5,6,7,6,5,7,6,6] },
    { id:'panda',   name:'Panda Pet Parlour',   area:'Ekkamai',     tier:'Standard',  bookings:198, accept:88, response:12, completion:96, retention:55, nps:58, payout:'฿61,340', status:'warn', trend:[6,7,6,6,7,6,8,7,6,8,7,6] },
    { id:'aroon',   name:'Aroon Grooming',      area:'Sathorn',     tier:'Premium',   bookings:284, accept:98, response:3,  completion:99, retention:71, nps:72, payout:'฿84,210', status:'ok',   trend:[7,8,7,8,8,9,8,9,8,9,9,9] },
    { id:'bingo',   name:'Bingo Groom',         area:'Ari',         tier:'Premium',   bookings:256, accept:96, response:5,  completion:100,retention:74, nps:74, payout:'฿78,900', status:'ok',   trend:[6,7,8,8,9,8,9,8,9,9,9,9] },
    { id:'maew',    name:'Maew & Mhaa',         area:'Thonglor',    tier:'Premium',   bookings:312, accept:94, response:6,  completion:98, retention:68, nps:68, payout:'฿92,100', status:'ok',   trend:[7,7,8,9,8,8,9,9,8,9,9,9] },
    { id:'pomme',   name:'Pomme & Coco',        area:'Phrom Phong', tier:'Standard',  bookings:224, accept:91, response:9,  completion:97, retention:63, nps:64, payout:'฿72,450', status:'ok',   trend:[6,7,6,7,8,7,8,7,9,8,8,9] },
  ];
  const barFor = (v, target) => {
    const col = v >= target ? 'ok' : v >= target*0.85 ? 'warn' : 'hot';
    return <><span className={"bar "+col}><i style={{width: Math.min(100, v) + '%'}}/></span><span style={{fontFamily:'var(--mono)'}}>{v}%</span></>;
  };
  return (
    <OpsScreen active="shops" crumbs={['Supply','Shop health']}>
      <div style={{display:'flex',alignItems:'baseline',gap:14,marginBottom:14}}>
        <h1 style={{font:'500 24px/1 var(--serif)',letterSpacing:'-0.02em'}}>Shop health</h1>
        <span className="eyebrow">41 live · 9 need attention · 32 green</span>
        <div style={{flex:1}}/>
        <button className="btn secondary">Compare week</button>
        <button className="btn primary">Add shop</button>
      </div>

      {/* row of mini KPIs */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:14}}>
        <div className="kpi"><div className="lbl">Network accept</div><div className="val">89%</div><div className="sub">target 90% · <span className="d down">▼ 1pt</span></div></div>
        <div className="kpi"><div className="lbl">Avg response</div><div className="val">11m</div><div className="sub">target 15m · <span className="d">on track</span></div></div>
        <div className="kpi"><div className="lbl">Retention 30d</div><div className="val">58%</div><div className="sub">target 55% · <span className="d">on track</span></div></div>
        <div className="kpi"><div className="lbl">NPS (shop-avg)</div><div className="val">61</div><div className="sub">target 60 · <span className="d">on track</span></div></div>
      </div>

      <div className="ops-card" style={{padding:0}}>
        <div className="filter-bar">
          <div className="filter-chip on">All · 41</div>
          <div className="filter-chip"><span className="sd hot"/>Red · 2</div>
          <div className="filter-chip"><span className="sd warn"/>Amber · 7</div>
          <div className="filter-chip"><span className="sd"/>Green · 32</div>
          <div className="filter-chip">Tier: All ▾</div>
          <div className="filter-chip">Area: All ▾</div>
          <div style={{flex:1}}/>
          <span className="eyebrow">Sort: Needs attention</span>
        </div>

        <div style={{overflow:'auto',maxHeight:500}}>
          <table className="dtable">
            <thead>
              <tr>
                <th style={{width:260}}>Shop</th>
                <th>Area · tier</th>
                <th style={{textAlign:'right'}}>30d bookings</th>
                <th>Accept</th>
                <th>Response</th>
                <th>Completion</th>
                <th>Retention</th>
                <th style={{textAlign:'right'}}>NPS (0–100)</th>
                <th>12-wk trend</th>
                <th style={{textAlign:'right'}}>Due payout</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r,i)=>(
                <tr key={i}>
                  <td>
                    <div className="shop">
                      <div className="av">{r.name[0]}</div>
                      <div>
                        <b>{r.name}</b>
                        <span><span className={"sd "+(r.status==='ok'?'':r.status)}/>{r.status==='ok'?'green':r.status==='warn'?'amber':'red'}</span>
                      </div>
                    </div>
                  </td>
                  <td><div>{r.area}</div><span style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>{r.tier}</span></td>
                  <td className="num">{r.bookings}</td>
                  <td>{barFor(r.accept, 90)}</td>
                  <td><span style={{fontFamily:'var(--mono)',color: r.response>20?'var(--danger)':r.response>15?'oklch(0.55 0.14 70)':'var(--ink)'}}>{r.response}m</span></td>
                  <td>{barFor(r.completion, 95)}</td>
                  <td>{barFor(r.retention, 55)}</td>
                  <td className="num" style={{fontWeight:500,color:r.nps<50?'var(--danger)':r.nps<60?'oklch(0.55 0.14 70)':'var(--ok)'}}>{r.nps}</td>
                  <td>
                    <span className="spark">
                      {r.trend.map((h,j)=><b key={j} style={{height: (h*10)+'%', background: r.status==='hot'?'var(--danger)':r.status==='warn'?'var(--warn)':'var(--primary)'}}/>)}
                    </span>
                  </td>
                  <td className="num" style={{fontWeight:500}}>{r.payout}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OpsScreen>
  );
}

// ─── Screen 5 · Onboarding pipeline ─────────────────────
function Scr_Pipeline() {
  const cols = [
    { title:'Applied', n:8, items:[
      { shop:'Dusit Dog Barber',     area:'Dusit',       via:'Form', age:'2d' },
      { shop:'Catto Collective',     area:'Ratchada',    via:'Referral · Maew & Mhaa', age:'3d' },
      { shop:'Rin Rin Grooming',     area:'Ladprao',     via:'Cold inbound · IG', age:'5d', hot:true },
      { shop:'Poodle Palace',        area:'On Nut',      via:'Form', age:'6d' },
      { shop:'Bkk Pet Parlour',      area:'Chinatown',   via:'Referral · Bingo',   age:'8d' },
      { shop:'Soi Dog Groomers',     area:'Phra Khanong',via:'Form', age:'11d' },
    ]},
    { title:'Visited', n:4, items:[
      { shop:'Bangna Bubbles',       area:'Bangna',      meta:'BD · Nan · Apr 10', cred:'Chain of 2', hot:false, accent:true },
      { shop:'Grooming Bros',        area:'Nonthaburi',  meta:'BD · Nan · Apr 8',  cred:'Owner-op, 6yr' },
      { shop:'Loog-Mha House',       area:'Saphan Kwai', meta:'BD · Ping · Apr 7', cred:'Cat specialist' },
      { shop:'Fluffy Tuk Tuk',       area:'Phra Kanong', meta:'BD · Ping · Apr 5', cred:'Mobile, 1 van' },
    ]},
    { title:'Training', n:3, items:[
      { shop:'Khaonim Kennel',       area:'Sathorn',     meta:'Day 2 of 4', cred:'iPad shipped Apr 9', progress:50 },
      { shop:'Toto & Nana',          area:'Sukhumvit 36',meta:'Day 3 of 4', cred:'Menu locked',        progress:75 },
      { shop:'Paws Atelier',         area:'Thonglor 13', meta:'Day 1 of 4', cred:'Onboarding call done',progress:25 },
    ]},
    { title:'Soft-live', n:2, items:[
      { shop:'Meow Manor',           area:'Ari',         meta:'Week 2 of 3', cred:'First 12 bookings OK', accept:'8/8 accepted' },
      { shop:'Glossy Tails',         area:'Asok',        meta:'Week 1 of 3', cred:'2 bookings so far',    accept:'2/2 accepted' },
    ]},
    { title:'Live', n:1, items:[
      { shop:'Khunmae Grooming',     area:'Chidlom',     meta:'Graduated Apr 11', cred:'Onboarded in 11 days' },
    ]},
  ];
  return (
    <OpsScreen active="pipeline" crumbs={['Supply','Onboarding pipeline']}>
      <div style={{display:'flex',alignItems:'baseline',gap:14,marginBottom:16}}>
        <h1 style={{font:'500 24px/1 var(--serif)',letterSpacing:'-0.02em'}}>Onboarding pipeline</h1>
        <span className="eyebrow">18 in flight · target 6 live by Dec 15</span>
        <div style={{flex:1}}/>
        <button className="btn secondary">Export board</button>
        <button className="btn primary">+ Log new shop</button>
      </div>

      {/* Funnel summary */}
      <div className="ops-card" style={{padding:18,marginBottom:16,display:'grid',gridTemplateColumns:'repeat(5,1fr) auto',gap:16,alignItems:'center'}}>
        {[
          { n:'31', l:'Applied · 30d' },
          { n:'14', l:'Visited' },
          { n:'8',  l:'Training' },
          { n:'6',  l:'Soft-live' },
          { n:'5',  l:'Live' },
        ].map((s,i,a)=>(
          <React.Fragment key={i}>
            <div style={{textAlign:'center'}}>
              <div style={{font:'500 28px/1 var(--serif)'}}>{s.n}</div>
              <div className="eyebrow" style={{marginTop:4}}>{s.l}</div>
            </div>
            {i<a.length-1 && <div style={{justifySelf:'center',color:'var(--ink-3)'}}>▸</div>}
          </React.Fragment>
        ))}
        <div style={{borderLeft:'1px solid var(--border)',paddingLeft:16}}>
          <div className="eyebrow">Conversion</div>
          <div style={{font:'500 22px/1 var(--serif)',color:'var(--accent-ink)',marginTop:4}}>16.1%</div>
          <div style={{fontSize:11,color:'var(--ink-3)'}}>applied → live · 30d</div>
        </div>
      </div>

      {/* Kanban */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12}}>
        {cols.map((c,i)=>(
          <div key={i} className="pipeline-col">
            <div className="ph">
              <b>{c.title}</b>
              <span className="n">{c.n}</span>
            </div>
            <div className="pbody">
              {c.items.map((it,j)=>(
                <div key={j} className="pipeline-card" style={{borderLeft: it.hot?'3px solid var(--accent)':it.accent?'3px solid var(--primary)':undefined}}>
                  <b>{it.shop}</b>
                  <div className="sub">{it.area}{it.age && ' · '+it.age+' old'}</div>
                  {it.via && <div style={{fontSize:11,color:'var(--ink-2)',marginTop:6}}>{it.via}</div>}
                  {it.meta && <div style={{fontSize:11,color:'var(--ink-2)',marginTop:6}}>{it.meta}</div>}
                  {it.cred && <div style={{fontSize:11,color:'var(--ink-3)',marginTop:2,fontStyle:'italic'}}>{it.cred}</div>}
                  {it.progress && <div style={{marginTop:8,height:4,background:'var(--paper-3)',borderRadius:2,overflow:'hidden'}}><div style={{width:it.progress+'%',height:'100%',background:'var(--primary)'}}/></div>}
                  {it.accept && <div style={{fontSize:11,color:'var(--ok)',marginTop:6,fontFamily:'var(--mono)'}}>{it.accept}</div>}
                  {it.hot && <span className="tag" style={{background:'var(--accent-wash)',color:'var(--accent-ink)'}}>Priority</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OpsScreen>
  );
}

// ─── Screen 6 · Coverage map ─────────────────────────────
function Scr_Map() {
  // Bangkok-ish neighbourhoods positioned roughly
  const shops = [
    { x:38, y:56, name:'Aroon · Sathorn',       status:'ok' },
    { x:52, y:46, name:'Maew & Mhaa · Thonglor',status:'ok' },
    { x:56, y:50, name:'Pomme · Phrom Phong',   status:'ok' },
    { x:60, y:44, name:'Panda · Ekkamai',       status:'warn' },
    { x:44, y:40, name:'Bingo · Ari',           status:'ok' },
    { x:48, y:48, name:'Soi 11 · Asoke',        status:'warn' },
    { x:36, y:50, name:'Kiki · Siam',           status:'hot' },
    { x:34, y:58, name:'WagWag · Silom',        status:'warn' },
    // gaps (dashed)
    { x:58, y:32, name:'Ladprao · gap',         status:'applied' },
    { x:66, y:40, name:'Ekamai N. · gap',       status:'applied' },
    { x:30, y:44, name:'Bang Rak · near-cap',   status:'applied' },
  ];
  const heats = [
    { x:36, y:50, r:120, col:'danger' },    // Kiki hotspot
    { x:58, y:32, r:140, col:'accent' },    // Ladprao demand
    { x:66, y:40, r:90,  col:'accent' },
  ];

  return (
    <OpsScreen active="map" crumbs={['Supply','Coverage map']}>
      <div style={{display:'flex',alignItems:'baseline',gap:14,marginBottom:14}}>
        <h1 style={{font:'500 24px/1 var(--serif)',letterSpacing:'-0.02em'}}>Coverage map</h1>
        <span className="eyebrow">Bangkok · demand vs. supply · 30-day rolling</span>
        <div style={{flex:1}}/>
        <div className="filter-chip on">Grooming</div>
        <div className="filter-chip">Cats only</div>
        <div className="filter-chip">Mobile</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:16}}>
        {/* MAP */}
        <div className="bkk-map">
          <div className="bkk-grid"/>
          {/* river abstraction */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.25}}>
            <path d="M20 10 Q 28 40 22 55 Q 18 70 28 100" stroke="#6ab6e6" strokeWidth="3" fill="none"/>
          </svg>

          {/* heat blobs */}
          {heats.map((h,i)=>(
            <div key={i} className="bkk-heat" style={{left:h.x+'%',top:h.y+'%',width:h.r,height:h.r,background:`radial-gradient(circle, color-mix(in oklab,var(--${h.col}) 40%,transparent) 0%, transparent 70%)`}}/>
          ))}

          {/* area labels */}
          {[
            {x:44,y:36,t:'ARI'},{x:34,y:46,t:'SIAM'},{x:48,y:44,t:'ASOKE'},{x:52,y:42,t:'THONGLOR'},
            {x:58,y:48,t:'PHROM PHONG'},{x:60,y:40,t:'EKKAMAI'},{x:38,y:60,t:'SATHORN'},{x:34,y:62,t:'SILOM'},
            {x:58,y:28,t:'LADPRAO'},{x:70,y:36,t:'BANG KAPI'},
          ].map((l,i)=>(
            <div key={i} style={{position:'absolute',left:l.x+'%',top:l.y+'%',transform:'translate(-50%,-28px)',fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.14em',color:'rgba(255,255,255,.35)'}}>{l.t}</div>
          ))}

          {/* shop dots */}
          {shops.map((s,i)=>(
            <React.Fragment key={i}>
              <div className={"bkk-dot "+(s.status==='ok'?'':s.status)} style={{left:s.x+'%',top:s.y+'%'}}/>
              <div className="bkk-label" style={{left:s.x+'%',top:s.y+'%'}}>{s.name}</div>
            </React.Fragment>
          ))}

          {/* legend */}
          <div style={{position:'absolute',left:16,bottom:16,background:'rgba(0,0,0,.4)',border:'1px solid rgba(255,255,255,.1)',borderRadius:8,padding:'10px 14px',fontSize:11,color:'rgba(255,255,255,.85)',display:'flex',gap:16,fontFamily:'var(--mono)'}}>
            <span><span className="sd"/>Healthy · 6</span>
            <span><span className="sd warn"/>Watch · 3</span>
            <span><span className="sd hot"/>At risk · 1</span>
            <span><span className="sd" style={{border:'1.5px dashed rgba(255,255,255,.5)',background:'transparent'}}/>Gap</span>
          </div>
          <div style={{position:'absolute',right:16,top:16,background:'rgba(0,0,0,.4)',border:'1px solid rgba(255,255,255,.1)',borderRadius:6,padding:'6px 10px',fontFamily:'var(--mono)',fontSize:10,color:'rgba(255,255,255,.65)',letterSpacing:'.08em'}}>
            Demand heat · searches/day
          </div>
        </div>

        {/* Right rail */}
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          <div className="ops-card">
            <div className="ch">
              <span className="eyebrow">Biggest gap</span>
              <h3>Ladprao</h3>
            </div>
            <div className="cb">
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,fontSize:12}}>
                <div><div className="eyebrow">Searches/day</div><div style={{font:'500 22px/1 var(--serif)',marginTop:4,color:'var(--accent-ink)'}}>14</div></div>
                <div><div className="eyebrow">Live shops</div><div style={{font:'500 22px/1 var(--serif)',marginTop:4,color:'var(--danger)'}}>0</div></div>
                <div><div className="eyebrow">Nearest</div><div style={{marginTop:4}}>Bingo · Ari (5.2km)</div></div>
                <div><div className="eyebrow">Applied</div><div style={{marginTop:4}}>Rin Rin (hot)</div></div>
              </div>
              <button className="btn primary" style={{width:'100%',justifyContent:'center',marginTop:12}}>Prioritise Rin Rin</button>
            </div>
          </div>

          <div className="ops-card">
            <div className="ch">
              <span className="eyebrow">Near-capacity this week</span>
              <h3>Watch list</h3>
            </div>
            <div>
              {[
                { shop:'WagWag · Silom',  load:'Sat 96%', col:'warn' },
                { shop:'Kiki · Siam',     load:'Daily 88%',col:'hot' },
                { shop:'Maew · Thonglor', load:'Sun 92%', col:'warn' },
              ].map((w,i)=>(
                <div key={i} style={{padding:'10px 18px',borderTop:i?'1px solid var(--border)':'none',display:'flex',alignItems:'center',gap:10}}>
                  <span className={"sd "+w.col}/>
                  <b style={{fontWeight:500,fontSize:13}}>{w.shop}</b>
                  <span style={{flex:1}}/>
                  <span style={{fontFamily:'var(--mono)',fontSize:11,color:'var(--ink-2)'}}>{w.load}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ops-card">
            <div className="ch">
              <span className="eyebrow">Commentary</span>
              <h3>This week's read</h3>
            </div>
            <div className="cb" style={{fontSize:12,lineHeight:1.55,color:'var(--ink-2)'}}>
              Sukhumvit corridor is <b style={{color:'var(--ok)'}}>well-covered</b>. Ladprao is the clearest supply gap — high search volume, zero live shops, one hot applicant. Siam has one distressed shop (Kiki) driving a red heat blob; a second shop there would de-risk the area.
            </div>
          </div>
        </div>
      </div>
    </OpsScreen>
  );
}

// ─── Screen 7 · Alerts queue ────────────────────────────
function Scr_Alerts() {
  return (
    <OpsScreen active="alerts" crumbs={['Live ops','Alerts']}>
      <div style={{padding:32,maxWidth:700}}>
        <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:16}}>Alerts queue</div>
        <h2 style={{fontFamily:'var(--serif)',fontSize:28,fontWeight:500,letterSpacing:'-0.02em',marginBottom:24}}>3 shops to call today.</h2>
        <div style={{display:'flex',flexDirection:'column',gap:12}}>
          {['Kiki Neko Salon · Ari · avg 24m response, 42m on booking BKG-28041', 'The Dog Room Thonglor · slow acceptance rate this week', 'Soi 55 Groomers · no response to 2 bookings this morning'].map((alert,i) => (
            <div key={i} style={{padding:'14px 16px',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--paper)',display:'flex',gap:14,alignItems:'flex-start'}}>
              <div style={{width:8,height:8,borderRadius:'50%',background:'var(--danger)',marginTop:5,flex:'none'}}/>
              <span style={{fontSize:13,color:'var(--ink-2)'}}>{alert}</span>
            </div>
          ))}
        </div>
      </div>
    </OpsScreen>
  );
}

// ─── Screen 8 · Payouts ──────────────────────────────────
function Scr_Payouts() {
  return (
    <OpsScreen active="payouts" crumbs={['Finance','Payouts']}>
      <div style={{padding:32,maxWidth:800}}>
        <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:16}}>Payouts · Apr 2026</div>
        <h2 style={{fontFamily:'var(--serif)',fontSize:28,fontWeight:500,letterSpacing:'-0.02em',marginBottom:24}}>฿312,480 settled this month.</h2>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead><tr style={{borderBottom:'2px solid var(--ink)'}}>{['Shop','Period','GMV','Shop (85%)','Fee (2.7%)','Settled'].map(h=><th key={h} style={{padding:'8px 12px',textAlign:'left',fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--ink-3)'}}>{h}</th>)}</tr></thead>
          <tbody>
            {[
              ['Aroon Grooming','1–14 Apr','฿38,400','฿32,640','฿1,037','฿31,603'],
              ['Ari Pet Salon','1–14 Apr','฿29,760','฿25,296','฿804','฿24,492'],
              ['The Fluff Room','1–14 Apr','฿22,080','฿18,768','฿596','฿18,172'],
            ].map((row,i)=>(
              <tr key={i} style={{borderBottom:'1px solid var(--border)'}}>{row.map((cell,j)=><td key={j} style={{padding:'12px',color:j===0?'var(--ink)':'var(--ink-2)',fontWeight:j===0?500:400}}>{cell}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </OpsScreen>
  );
}

// ─── Screen 9 · Settings ─────────────────────────────────
function Scr_Settings() {
  return (
    <OpsScreen active="settings" crumbs={['Finance','Settings']}>
      <div style={{padding:32,maxWidth:560}}>
        <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--ink-3)',marginBottom:16}}>Settings</div>
        <h2 style={{fontFamily:'var(--serif)',fontSize:28,fontWeight:500,letterSpacing:'-0.02em',marginBottom:24}}>Pawpoint Ops · <em style={{fontStyle:'italic',color:'var(--accent)'}}>Bangkok</em></h2>
        <div style={{display:'flex',flexDirection:'column',gap:0,border:'1px solid var(--border)',borderRadius:'var(--radius)'}}>
          {[['Organisation','Pawpoint · Bangkok · pawpoint.co'],['Ops lead','Ping K. · ping@pawpoint.co'],['BD lead','Nan P. · nan@pawpoint.co'],['Founder','Wit S. · wit@pawpoint.co'],['Version','Ops console v1 · Apr 2026']].map(([k,v],i,arr)=>(
            <div key={k} style={{padding:'14px 16px',borderBottom:i<arr.length-1?'1px solid var(--border)':'none',display:'grid',gridTemplateColumns:'160px 1fr',gap:16}}>
              <span style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--ink-3)'}}>{k}</span>
              <span style={{fontSize:13,color:'var(--ink)'}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </OpsScreen>
  );
}

Object.assign(PawpointOps, { Scr_ShopHealth, Scr_Pipeline, Scr_Map, Scr_Alerts, Scr_Payouts, Scr_Settings });
})();
