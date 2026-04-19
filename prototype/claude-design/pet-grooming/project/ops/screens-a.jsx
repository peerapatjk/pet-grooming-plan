// ops/screens-a.jsx — screens 1, 2, 3

(() => {
const PawpointOps = window.PawpointOps || {};
const { OpsScreen, OI, SHOPS } = PawpointOps;

if (!OpsScreen || !OI || !SHOPS) {
  throw new Error('Pawpoint ops shell must load before ops screens.');
}

// ─── Screen 1 · Network today ────────────────────────────
function Scr_Network() {
  // mini spark bars helper
  const Spark = ({data, hot}) => (
    <span className="spark" style={{height:22}}>
      {data.map((h,i)=>(
        <b key={i} style={{height: `${h}%`, background: hot && i===data.length-1 ? 'var(--danger)' : undefined}}/>
      ))}
    </span>
  );

  return (
    <OpsScreen active="network" crumbs={['Live ops','Network today']} title={null}>
      <div style={{display:'flex',alignItems:'baseline',gap:14,marginBottom:18}}>
        <h1 style={{font:'500 28px/1 var(--serif)',letterSpacing:'-0.02em'}}>Tuesday, 14 April</h1>
        <span className="eyebrow">Bangkok · 41 live shops · 9 neighbourhoods</span>
      </div>

      {/* KPI row */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:18}}>
        <div className="kpi dark">
          <div className="lbl">GMV today</div>
          <div className="val">฿268,420</div>
          <div className="sub"><span className="d">▲ 11.4%</span> vs. last Tue</div>
        </div>
        <div className="kpi">
          <div className="lbl">Bookings confirmed</div>
          <div className="val">312</div>
          <div className="sub"><span className="d">▲ 8%</span> · 47 still pending</div>
        </div>
        <div className="kpi">
          <div className="lbl">Accept rate</div>
          <div className="val">89%</div>
          <div className="sub"><span className="d down">▼ 2.1pt</span> · 3 shops dragging</div>
        </div>
        <div className="kpi">
          <div className="lbl">Avg response</div>
          <div className="val">11m</div>
          <div className="sub">target 15m · <span className="d">on track</span></div>
        </div>
        <div className="kpi accent">
          <div className="lbl">Stuck &gt; 30min</div>
          <div className="val">3</div>
          <div className="sub">2 on Kiki · 1 on M&amp;M · see Requests monitor</div>
        </div>
      </div>

      {/* two-column: left = pulse, right = hotspots */}
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:16}}>
        {/* live booking feed */}
        <div className="ops-card">
          <div className="ch">
            <span className="eyebrow">Booking pulse · last 2 hours</span>
            <h3 style={{marginLeft:8}}>What's happening right now</h3>
            <div className="spacer"/>
            <span className="eyebrow">auto-refresh · 10s</span>
          </div>

          {/* hour chart */}
          <div style={{padding:'18px 18px 10px'}}>
            <div style={{display:'flex',alignItems:'flex-end',gap:3,height:90,padding:'0 2px'}}>
              {[22,18,25,31,28,34,45,52,38,42,29,33,28,41,44,37,52,48,55,51,64,58,42,31].map((h,i)=>{
                const isNow = i===20;
                return <div key={i} style={{flex:1,height:`${h}%`,background:isNow?'var(--accent)':'var(--primary)',opacity:isNow?1:0.6,borderRadius:'2px 2px 0 0',position:'relative'}}>
                  {isNow && <div style={{position:'absolute',top:-16,left:'50%',transform:'translateX(-50%)',fontFamily:'var(--mono)',fontSize:9,color:'var(--accent-ink)',whiteSpace:'nowrap'}}>NOW · 13:52</div>}
                </div>;
              })}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:8,fontFamily:'var(--mono)',fontSize:10,color:'var(--ink-3)',letterSpacing:'.08em'}}>
              <span>11:00</span><span>12:00</span><span>13:00</span><span>14:00 →</span>
            </div>
          </div>

          {/* live list */}
          <div style={{borderTop:'1px solid var(--border)'}}>
            {[
              { t:'13:51', kind:'CONFIRMED', shop:'Maew & Mhaa',     who:'Nok S.',       price:'฿520',  pet:'Cha-Cha · Persian',     col:'ok' },
              { t:'13:50', kind:'AUTO',      shop:'Bingo Groom',     who:'Jin W.',       price:'฿680',  pet:'Mochi · Pomeranian',    col:'info' },
              { t:'13:49', kind:'STUCK 34m', shop:'Kiki Neko Salon', who:'Ploy K.',      price:'฿450',  pet:'Milo · Scottish fold',  col:'hot' },
              { t:'13:48', kind:'CONFIRMED', shop:'Pomme & Coco',    who:'Apinya R.',    price:'฿720',  pet:'Toby · Yorkie',         col:'ok' },
              { t:'13:47', kind:'DECLINED',  shop:'Soi 11 Dog Club', who:'Vasit C.',     price:'฿890',  pet:'Bear · Golden',         col:'warn' },
              { t:'13:46', kind:'CONFIRMED', shop:'Aroon Grooming',  who:'Praew S.',     price:'฿650',  pet:'Dash · Welsh Corgi',    col:'ok' },
            ].map((r,i)=>(
              <div key={i} style={{display:'grid',gridTemplateColumns:'60px 110px 1fr 140px 90px',gap:14,padding:'10px 18px',borderTop:i?'1px solid var(--border)':'none',alignItems:'center',fontSize:12}}>
                <span style={{fontFamily:'var(--mono)',color:'var(--ink-3)'}}>{r.t}</span>
                <span className={"pill "+r.col} style={{padding:'2px 8px',borderRadius:12,fontFamily:'var(--mono)',fontSize:10,background:r.col==='ok'?'var(--ok-wash)':r.col==='hot'?'var(--danger-wash)':r.col==='info'?'var(--info-wash)':'var(--warn-wash)',color:r.col==='ok'?'var(--ok)':r.col==='hot'?'var(--danger)':r.col==='info'?'var(--info)':'oklch(0.4 0.11 75)',display:'inline-flex',alignItems:'center',gap:4,width:'fit-content'}}>{r.kind}</span>
                <span><b style={{fontWeight:500}}>{r.shop}</b> <span style={{color:'var(--ink-3)'}}>· {r.who} · {r.pet}</span></span>
                <span style={{fontFamily:'var(--mono)',color:'var(--ink-2)'}}>{r.price}</span>
                <button type="button" className="link-btn" style={{fontSize:11,color:'var(--primary)',fontFamily:'var(--mono)',letterSpacing:'.04em',justifySelf:'end'}}>OPEN →</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: anomalies + supply gaps */}
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="ops-card">
            <div className="ch">
              <span className="eyebrow">Wants attention</span>
              <h3 style={{marginLeft:8}}>3 shops to call today</h3>
            </div>
            <div>
              {[
                { shop:'Kiki Neko Salon', reason:'Response time drifted to 24m (target 15m). 2 stuck requests.', cta:'Call Khun Tik', hot:true },
                { shop:'M&M Mobile Groom', reason:'Acceptance 68%, declined 5 of 8 requests this week.', cta:'BD visit', hot:true },
                { shop:'Soi 11 Dog Club', reason:'NPS dipped to 51. 2 one-star reviews mentioning wait time.', cta:'Review-ready script', hot:false },
              ].map((a,i)=>(
                <div key={i} style={{padding:'12px 18px',borderTop:i?'1px solid var(--border)':'none',display:'flex',gap:10}}>
                  <div style={{width:6,borderRadius:3,background:a.hot?'var(--danger)':'var(--warn)',flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <b style={{fontWeight:500,fontSize:13}}>{a.shop}</b>
                    <div style={{fontSize:12,color:'var(--ink-2)',marginTop:3,lineHeight:1.4}}>{a.reason}</div>
                    <button type="button" className="link-btn" style={{fontSize:11,color:'var(--primary)',fontFamily:'var(--mono)',letterSpacing:'.04em',marginTop:6,display:'inline-block'}}>{a.cta} →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ops-card">
            <div className="ch">
              <span className="eyebrow">Supply gap</span>
              <h3 style={{marginLeft:8}}>Where Bangkok needs a shop</h3>
            </div>
            <div style={{padding:'14px 18px'}}>
              {[
                { area:'Ladprao',     dem:'high',  sup:'none',   n:'14 searches/day, 0 live shops', col:'hot' },
                { area:'Sukhumvit 71',dem:'med',   sup:'1 shop', n:'Wait time 2.3 days at Kiki',     col:'warn' },
                { area:'Bang Rak',    dem:'med',   sup:'1 shop', n:'WagWag near capacity Sat',       col:'warn' },
              ].map((g,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderTop:i?'1px dashed var(--border)':'none'}}>
                  <span className={"sd "+g.col}/>
                  <div style={{flex:1}}>
                    <b style={{fontWeight:500,fontSize:13}}>{g.area}</b>
                    <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)',marginTop:2}}>{g.n}</div>
                  </div>
                  <span className="eyebrow">{g.dem} demand</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </OpsScreen>
  );
}

// ─── Screen 2 · Request monitor ────────────────────────
function Scr_Requests() {
  const rows = [
    { age:42, shop:'Kiki Neko Salon', area:'Siam',       who:'Ploy K.',   pet:'Milo · Scottish fold', svc:'Cat groom', when:'Today 15:00', price:'฿450', status:'STUCK',     col:'hot' },
    { age:34, shop:'Kiki Neko Salon', area:'Siam',       who:'Ben T.',    pet:'Suki · Persian',       svc:'Cat bath',  when:'Today 16:30', price:'฿380', status:'STUCK',     col:'hot' },
    { age:31, shop:'M&M Mobile',      area:'Mobile',     who:'Nick S.',   pet:'Rocky · Shiba',        svc:'Mobile full', when:'Wed 10:00', price:'฿1,200',status:'STUCK',   col:'hot' },
    { age:22, shop:'Panda Pet',       area:'Ekkamai',    who:'Ming L.',   pet:'Luna · Poodle',        svc:'Full groom',when:'Wed 14:00', price:'฿680', status:'AWAITING',  col:'warn' },
    { age:18, shop:'Soi 11 Dog Club', area:'Asoke',      who:'Vasit C.',  pet:'Bear · Golden',        svc:'Full groom',when:'Wed 09:00', price:'฿890', status:'AWAITING',  col:'warn' },
    { age:14, shop:'WagWag',          area:'Silom',      who:'Ana R.',    pet:'Coco · Maltipoo',      svc:'Tidy',      when:'Thu 11:00', price:'฿420', status:'AWAITING',  col:'warn' },
    { age:9,  shop:'Pomme & Coco',    area:'Phrom Phong',who:'Benny K.',  pet:'Peach · French',       svc:'De-shed',   when:'Thu 13:00', price:'฿560', status:'AWAITING',  col:'info' },
    { age:6,  shop:'Maew & Mhaa',     area:'Thonglor',   who:'Pim V.',    pet:'Tiger · Persian',      svc:'Cat full',  when:'Thu 15:00', price:'฿520', status:'AWAITING',  col:'info' },
    { age:4,  shop:'Aroon Grooming',  area:'Sathorn',    who:'Khim J.',   pet:'Pepper · Shih Tzu',    svc:'Full groom',when:'Thu 10:30', price:'฿720', status:'AWAITING',  col:'info' },
    { age:2,  shop:'Bingo Groom',     area:'Ari',        who:'Oat P.',    pet:'Hachi · Shiba',        svc:'Full groom',when:'Fri 09:00', price:'฿680', status:'AWAITING',  col:'info' },
    { age:1,  shop:'Panda Pet',       area:'Ekkamai',    who:'June W.',   pet:'Olive · Cavapoo',      svc:'Tidy',      when:'Fri 11:00', price:'฿380', status:'AWAITING',  col:'info' },
    { age:0,  shop:'Maew & Mhaa',     area:'Thonglor',   who:'Sky F.',    pet:'Biscuit · Ragdoll',    svc:'Cat full',  when:'Fri 14:00', price:'฿520', status:'JUST IN',   col:'info' },
  ];

  return (
    <OpsScreen active="requests" crumbs={['Live ops','Request monitor']}>
      <div style={{display:'flex',alignItems:'baseline',gap:14,marginBottom:14}}>
        <h1 style={{font:'500 24px/1 var(--serif)',letterSpacing:'-0.02em'}}>Request monitor</h1>
        <span className="eyebrow">12 pending · 3 stuck &gt; 30 min</span>
      </div>

      <div className="ops-card" style={{padding:0}}>
        {/* filter bar */}
        <div className="filter-bar">
          <div className="filter-chip on">All open <span className="x">·12</span></div>
          <div className="filter-chip"><span className="sd hot"/>Stuck &gt;30m · 3</div>
          <div className="filter-chip"><span className="sd warn"/>Slow &gt;15m · 3</div>
          <div className="filter-chip"><span className="sd info"/>Fresh &lt;15m · 6</div>
          <div style={{flex:1}}/>
          <div className="filter-chip">Area: All ▾</div>
          <div className="filter-chip">Shop: All ▾</div>
          <button className="btn ghost" style={{marginLeft:4}}>Export CSV</button>
        </div>

        <table className="dtable">
          <thead>
            <tr>
              <th style={{width:80}}>Age</th>
              <th>Shop · area</th>
              <th>Customer · pet</th>
              <th>Service</th>
              <th>Requested for</th>
              <th style={{textAlign:'right'}}>Value</th>
              <th>Status</th>
              <th style={{width:140,textAlign:'right'}}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i} style={{background: r.col==='hot' ? 'var(--danger-wash)' : undefined}}>
                <td className="num" style={{color: r.col==='hot'?'var(--danger)':r.col==='warn'?'oklch(0.55 0.14 70)':'var(--ink-3)',fontWeight:r.col==='hot'?600:400}}>
                  {r.age===0 ? 'just now' : `${r.age} min`}
                </td>
                <td>
                  <b style={{fontWeight:500,display:'block'}}>{r.shop}</b>
                  <span style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>{r.area}</span>
                </td>
                <td>
                  <b style={{fontWeight:500,display:'block'}}>{r.who}</b>
                  <span style={{fontSize:11,color:'var(--ink-3)'}}>{r.pet}</span>
                </td>
                <td>{r.svc}</td>
                <td style={{fontFamily:'var(--mono)'}}>{r.when}</td>
                <td className="num">{r.price}</td>
                <td><span className={"pill "+r.col}>{r.status}</span></td>
                <td style={{textAlign:'right'}}>
                  <div className="row-action">
                    {r.col==='hot' && <button className="btn danger" style={{padding:'4px 8px',fontSize:11}}>Intervene</button>}
                    {r.col!=='hot' && <button className="btn secondary" style={{padding:'4px 8px',fontSize:11}}>Open</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{padding:'10px 18px',display:'flex',alignItems:'center',gap:12,borderTop:'1px solid var(--border)',background:'var(--paper-2)'}}>
          <span className="eyebrow">Showing 12 of 12</span>
          <div style={{flex:1}}/>
          <span className="eyebrow">Total value at risk · <b style={{color:'var(--ink)',fontFamily:'var(--mono)'}}>฿7,930</b></span>
        </div>
      </div>
    </OpsScreen>
  );
}

// ─── Screen 3 · Intervention detail ──────────────────────
function Scr_Intervene() {
  return (
    <OpsScreen active="requests" crumbs={['Live ops','Request monitor','Ploy K. · 13:10 request']}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 360px',gap:16,height:'100%'}}>

        {/* LEFT: the intervention hero */}
        <div className="iv-sheet">
          <div className="iv-head">
            <div style={{width:40,height:40,borderRadius:'50%',background:'var(--accent)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--mono)',fontWeight:600}}>P</div>
            <div style={{flex:1}}>
              <div className="eyebrow">Stuck request · booking BKG-28041</div>
              <h3>Ploy K. wants Milo at Kiki Neko Salon</h3>
              <div style={{fontSize:12,color:'rgba(255,255,255,.6)',marginTop:2}}>Requested at 13:10 · no response for 42 minutes · target is 15</div>
            </div>
            <button className="btn accent" title="Escalate to Wit S. (founder) · freezes booking for manual review">Escalate</button>
          </div>

          <div className="iv-body">
            {/* the clock */}
            <div className="iv-section" style={{display:'grid',gridTemplateColumns:'120px 1fr',gap:20,alignItems:'center',background:'var(--danger-wash)'}}>
              <div style={{position:'relative',width:100,height:100}}>
                <svg viewBox="0 0 100 100" width="100" height="100" style={{transform:'rotate(-90deg)'}}>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--paper)" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--danger)" strokeWidth="8" strokeDasharray="264" strokeDashoffset="20" strokeLinecap="round"/>
                </svg>
                <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <div style={{font:'500 24px/1 var(--serif)',color:'var(--danger)'}}>42m</div>
                  <div style={{fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.1em',color:'var(--danger)',textTransform:'uppercase'}}>Past target</div>
                </div>
              </div>
              <div>
                <div style={{font:'500 20px/1.25 var(--serif)',letterSpacing:'-0.015em',color:'oklch(0.3 0.16 30)',marginBottom:6}}>Kiki hasn't opened the request in 42 minutes.</div>
                <div style={{fontSize:13,color:'var(--ink-2)',lineHeight:1.5}}>
                  Two other requests at Kiki are also stuck. Owner Khun Tik normally responds in 20 min — she may be with a difficult groom. Ploy is a 2-booking repeat customer.
                </div>
              </div>
            </div>

            {/* context stack */}
            <div className="iv-section">
              <h4>Customer</h4>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16}}>
                <div>
                  <b style={{fontWeight:500}}>Ploy K.</b>
                  <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)',marginTop:2}}>+66 89 123 2041</div>
                  <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>2 bookings · joined Sep</div>
                </div>
                <div>
                  <b style={{fontWeight:500}}>Milo</b>
                  <div style={{fontSize:11,color:'var(--ink-3)'}}>Scottish fold, 3y, 4.2kg</div>
                  <div style={{fontSize:11,color:'var(--ink-3)'}}>Note · bites during nail clip</div>
                </div>
                <div>
                  <b style={{fontWeight:500}}>Pawpoint Shield</b>
                  <div style={{fontSize:11,color:'var(--ink-3)'}}>Customer has ฿450 on hold</div>
                  <div style={{fontSize:11,color:'var(--ok)'}}>Refundable if we reroute</div>
                </div>
              </div>
            </div>

            <div className="iv-section" style={{background:'var(--paper-2)'}}>
              <h4>Suggested next moves</h4>
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                {[
                  { a:'Reroute to Maew & Mhaa', sub:'Same area · 15:00 slot free · accepts cats · ฿520 (+฿70). Pawpoint covers the delta.', primary:true },
                  { a:'Reroute to Kiki · Thursday', sub:'Same shop, pushed 2 days. Customer confirmed Thu flexibility at signup.', primary:false },
                  { a:'Call Khun Tik now',      sub:'+66 89 123 9912 · Usually answers. Scripted apology + manual decline.', primary:false },
                  { a:'Auto-decline, full refund',sub:'฿450 hold released — no funds moved. Kiki gets a response-time strike.', primary:false },
                ].map((m,i)=>(
                  <div key={i} title={m.primary?'Recommended action':undefined} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',background:m.primary?'var(--accent-wash)':'var(--paper)',border:'1px solid '+(m.primary?'color-mix(in oklab,var(--accent) 30%,transparent)':'var(--border)'),borderRadius:8}}>
                    <div style={{width:24,height:24,borderRadius:'50%',background:m.primary?'var(--accent)':'var(--paper-3)',color:m.primary?'#fff':'var(--ink-2)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--mono)',fontSize:11,fontWeight:600,flex:'none'}}>{i+1}</div>
                    <div style={{flex:1}}>
                      <b style={{fontWeight:500,fontSize:13}}>{m.a}</b>
                      <div style={{fontSize:11,color:'var(--ink-3)',marginTop:2}}>{m.sub}</div>
                    </div>
                    <button className={m.primary?'btn accent':'btn secondary'}>{m.primary?'Do it':'Use this'}</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="iv-section">
              <h4>Timeline</h4>
              <div style={{display:'flex',flexDirection:'column',gap:6,fontSize:12,fontFamily:'var(--mono)',color:'var(--ink-2)'}}>
                <div><span style={{color:'var(--ink-3)'}}>13:10</span> · Ploy submitted request via Customer app (iOS)</div>
                <div><span style={{color:'var(--ink-3)'}}>13:10</span> · Shield held ฿450 from Ploy's saved card</div>
                <div><span style={{color:'var(--ink-3)'}}>13:10</span> · Notification sent to Kiki iPad · delivered</div>
                <div><span style={{color:'var(--ink-3)'}}>13:25</span> · Reminder 1 sent · delivered · no open</div>
                <div><span style={{color:'var(--ink-3)'}}>13:40</span> · Reminder 2 sent · delivered · no open</div>
                <div><span style={{color:'var(--danger)'}}>13:40</span> · Marked stuck · appears on Ops monitor</div>
                <div><span style={{color:'var(--ink-3)'}}>13:52</span> · <b style={{color:'var(--ink)'}}>You opened this intervention</b></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: alternative shops list */}
        <div className="ops-card" style={{display:'flex',flexDirection:'column'}}>
          <div className="ch">
            <span className="eyebrow">Reroute candidates</span>
            <h3>Where else Milo can go</h3>
          </div>
          <div style={{padding:14,display:'flex',flexDirection:'column',gap:10,overflow:'auto',flex:1}}>
            {[
              { shop:'Maew & Mhaa',    area:'Thonglor · 4km',  time:'Today 15:00', price:'฿520', match:96, best:true },
              { shop:'Pomme & Coco',   area:'Phrom Phong · 5km',time:'Today 16:30',price:'฿580', match:88 },
              { shop:'Aroon Grooming', area:'Sathorn · 8km',   time:'Wed 11:00',   price:'฿620', match:71 },
              { shop:'Bingo Groom',    area:'Ari · 11km',      time:'Thu 14:00',   price:'฿480', match:64 },
            ].map((c,i)=>(
              <div key={i} style={{border:'1px solid '+(c.best?'var(--accent)':'var(--border)'),borderRadius:8,padding:12,background:c.best?'var(--accent-wash)':'var(--paper)'}}>
                <div style={{display:'flex',alignItems:'start',gap:10}}>
                  <div style={{width:32,height:32,borderRadius:6,background:'var(--primary-wash)',color:'var(--primary-ink)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--mono)',fontWeight:600,fontSize:12,flex:'none'}}>{c.shop[0]}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <b style={{fontWeight:500,fontSize:13,display:'block'}}>{c.shop}</b>
                    <div style={{fontSize:11,color:'var(--ink-3)',fontFamily:'var(--mono)'}}>{c.area}</div>
                    <div style={{fontSize:12,marginTop:6}}>
                      <span style={{fontFamily:'var(--mono)'}}>{c.time}</span>
                      <span style={{color:'var(--ink-3)',margin:'0 6px'}}>·</span>
                      <span style={{fontFamily:'var(--mono)'}}>{c.price}</span>
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{font:'500 18px/1 var(--serif)',color:c.best?'var(--accent-ink)':'var(--ink)'}}>{c.match}%</div>
                    <div className="eyebrow" style={{fontSize:9}}>match</div>
                  </div>
                </div>
                {c.best && <div style={{marginTop:10,paddingTop:10,borderTop:'1px solid color-mix(in oklab,var(--accent) 20%,transparent)',fontSize:11,color:'var(--accent-ink)',display:'flex',alignItems:'center',gap:6}}>
                  <span className="sd" style={{background:'var(--accent)'}}/>RECOMMENDED · one-tap reroute
                </div>}
              </div>
            ))}
          </div>
          <div style={{borderTop:'1px solid var(--border)',padding:14,display:'flex',gap:8}}>
            <button className="btn secondary" style={{flex:1,justifyContent:'center'}}>{OI.phone}<span style={{marginLeft:4}}>Call customer</span></button>
            <button className="btn secondary" style={{flex:1,justifyContent:'center'}}>{OI.line}<span style={{marginLeft:4}}>LINE customer</span></button>
          </div>
        </div>
      </div>
    </OpsScreen>
  );
}

Object.assign(PawpointOps, { Scr_Network, Scr_Requests, Scr_Intervene });
})();
