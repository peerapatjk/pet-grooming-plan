// customer/screens-b.jsx — Flow B cont. (Review/Pay) + Flow C (States) + Flow D (Account)

// ─── 08 Review & Deposit ───────────────────────────────────
function Screen08_Review(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="sc-head" style={{paddingTop:0}}>
        <div className="sc-ic"><ChevL/></div>
        <div><div className="eyebrow" style={{fontSize:9}}>Step 2 of 3</div><div style={{fontWeight:500,fontSize:14}}>Review</div></div>
        <div className="right"><div className="sc-ic">?</div></div>
      </div>
      <div className="progress"><div className="fill" style={{width:'66%'}}/></div>

      <div className="card">
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div className="pet-ring sm">D</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:500}}>Dash · Welsh Corgi</div>
            <div className="sub" style={{fontSize:11}}>12.4 kg · Double coat · Sensitive skin</div>
          </div>
          <span className="chip"><span className="dot"/>Edit</span>
        </div>
      </div>

      <div className="card">
        <div className="kv">
          <div className="k"><span>Shop</span><b>Aroon Grooming</b></div>
          <div className="k"><span>Service</span><b>Full groom · 75 min</b></div>
          <div className="k"><span>Time</span><b>Tue, 12 Nov · 10:30</b></div>
          <div className="k"><span>Groomer</span><b>Pim K. <span className="pill">+฿50 request</span></b></div>
          <div className="k"><span>Notes for shop</span><b style={{color:'var(--ink-3)',fontWeight:400,fontSize:12}}>Clippers make her nervous — intro slowly.</b></div>
        </div>
      </div>

      <div className="card soft" style={{gap:14}}>
        <div className="row between">
          <div className="eyebrow" style={{fontSize:10}}>Deposit flow</div>
          <div className="sub" style={{fontSize:11}}>฿200 held · ฿500 at shop</div>
        </div>
        <div className="dep-flow">
          <div className="node on">
            <div className="ic">1</div>
            <div className="v">฿200</div>
            <div className="lbl">Confirm Shield hold</div>
          </div>
          <div className="node">
            <div className="ic">2</div>
            <div className="v">฿500</div>
            <div className="lbl">At shop</div>
          </div>
          <div className="node">
            <div className="ic">↺</div>
            <div className="v">−฿200</div>
            <div className="lbl">Refund on arrival</div>
          </div>
        </div>
        <div className="row between" style={{fontSize:13,paddingTop:6,borderTop:'1px dashed var(--border)'}}>
          <span className="sub">Total you pay</span>
          <b style={{fontFamily:'var(--serif)',fontSize:18,fontWeight:500}}>฿700 <span style={{color:'var(--ink-3)',fontSize:11,fontFamily:'var(--mono)',fontWeight:400}}>= ฿650 + ฿50 request</span></b>
        </div>
      </div>

      <div className="m-banner">
        <div className="ic">i</div>
        <div>
          <h5>How the deposit works</h5>
          <p>The ฿200 hold is released the moment you check in. Free cancel until Mon 20 Apr · 10:30. No‑show forfeits the hold.</p>
        </div>
      </div>
    </div>
    <div className="action-bar">
      <div className="cost"><div className="k">Confirm Shield hold</div><div className="v">฿200</div></div>
      <button className="btn primary btn-lg">Continue to pay</button>
    </div>
  </div>
);}

// ─── 09 Payment ────────────────────────────────────────────
function Screen09_Pay(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="sc-head" style={{paddingTop:0}}>
        <button style={{background:'none',border:'none',padding:0,cursor:'pointer',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center'}} aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div><div className="eyebrow" style={{fontSize:9}}>Step 3 of 3</div><div style={{fontWeight:500,fontSize:14}}>Confirm your Shield hold</div></div>
        <div style={{width:36}}/>
      </div>
      <div className="progress"><div className="fill" style={{width:'100%'}}/></div>

      <h1 style={{fontFamily:'var(--serif)',fontWeight:500,fontSize:26,letterSpacing:'-0.015em'}}>Hold <em style={{color:'var(--primary)',fontStyle:'italic',fontWeight:400}}>฿200</em> to lock 10:30</h1>

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <div className="svc-card on">
          <div>
            <h5>PromptPay</h5>
            <div className="sub">Fastest · scan &amp; confirm in LINE Pay</div>
          </div>
          <div className="check" style={{width:22,height:22,borderRadius:'50%',background:'var(--primary)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700}}>✓</div>
        </div>
        <div className="svc-card">
          <div>
            <h5>Visa •••• 4412</h5>
            <div className="sub">Hold released automatically</div>
          </div>
        </div>
        <div className="svc-card">
          <div>
            <h5>Add new card</h5>
            <div className="sub">Visa · MC · Amex · JCB</div>
          </div>
          <div style={{color:'var(--ink-3)'}}>+</div>
        </div>
      </div>

      <div className="m-banner ok">
        <div className="ic">🔒</div>
        <div><h5>Secure with Omise</h5><p>Card data never touches Pawpoint servers. Deposit release happens the moment you arrive.</p></div>
      </div>

      <div className="m-banner info">
        <div className="ic">i</div>
        <div><h5>Not charged yet</h5><p>“Confirm” slots only charge after the shop accepts — usually within 1 hour.</p></div>
      </div>
    </div>
    <div className="action-bar">
      <div className="cost"><div className="k">Shield hold · ฿200</div></div>
      <button className="btn primary btn-lg">Confirm Shield hold</button>
    </div>
  </div>
);}

// ─── 10 Confirmed ─────────────────────────────────────────
function Screen10_Confirmed(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="sc-head">
        <div className="sc-ic">✕</div>
        <div style={{fontWeight:500,fontSize:13,color:'var(--ink-3)'}}>BKG‑41A7</div>
        <div className="sc-ic">↗</div>
      </div>

      <div className="confirmed-hero">
        <span className="status status s-confirm" style={{background:'rgba(255,255,255,.18)',color:'#fff',alignSelf:'flex-start'}}>Confirmed · deposit held</span>
        <h2>Tue 12 Nov<br/>10:30 AM</h2>
        <div className="sub">Aroon Grooming · Saladaeng</div>
      </div>

      <div className="card">
        <div className="kv">
          <div className="k"><span>Pet</span><b>Dash · Full groom (75 min)</b></div>
          <div className="k"><span>Groomer</span><b>Pim K.</b></div>
          <div className="k"><span>Deposit</span><b>฿200 held until arrival</b></div>
          <div className="k"><span>Due at shop</span><b>฿500</b></div>
          <div className="k"><span>Free cancel until</span><b>Mon 20 Apr · 10:30</b></div>
        </div>
      </div>

      <div className="vtimeline">
        <div className="step done"><b>Booked</b><span>Today · 14:02</span></div>
        <div className="step done"><b>Deposit held (฿200)</b><span>Today · 14:02</span></div>
        <div className="step cur"><b>Reminder 24h before</b><span>Mon 20 Apr · 10:30</span></div>
        <div className="step"><b>Check‑in QR</b><span>Tue 10:20</span></div>
        <div className="step"><b>Service complete · deposit refunded</b><span>Tue ~11:45</span></div>
      </div>

      <div style={{display:'flex',gap:8}}>
        <button className="btn secondary" style={{flex:1,justifyContent:'center'}}>Message shop</button>
        <button className="btn secondary" style={{flex:1,justifyContent:'center'}}>Add to calendar</button>
      </div>
    </div>
    <div className="action-bar">
      <button className="btn ghost danger" style={{flex:1,justifyContent:'center',color:'var(--danger)'}}>Cancel booking</button>
      <button className="btn primary btn-lg">Directions</button>
    </div>
  </div>
);}

// ─── 11 Pending (awaiting merchant confirm) ─────────────────
function Screen11_Pending(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="sc-head">
        <div className="sc-ic">✕</div>
        <div style={{fontWeight:500,fontSize:13,color:'var(--ink-3)'}}>BKG‑41C9</div>
        <div style={{width:36}}/>
      </div>

      <div className="pending-hero">
        <span className="status s-pend-m" style={{alignSelf:'flex-start'}}>Awaiting shop confirm</span>
        <h3>The Fluff Room is reviewing your 14:30 request</h3>
        <p>They usually respond within 25 minutes. We'll ping you the moment they accept. Nothing is charged until they do.</p>
        <div className="countdown-dial">
          <svg width="58" height="58" viewBox="0 0 58 58">
            <circle cx="29" cy="29" r="25" fill="none" stroke="var(--paper-3)" strokeWidth="4"/>
            <circle cx="29" cy="29" r="25" fill="none" stroke="var(--warn)" strokeWidth="4"
              strokeDasharray="157" strokeDashoffset="47" strokeLinecap="round"
              transform="rotate(-90 29 29)"/>
            <text x="29" y="33" textAnchor="middle"
              style={{fontFamily:'var(--mono)',fontSize:12,fontWeight:600,fill:'var(--warn)'}}>70%</text>
          </svg>
          <div className="meta">
            <div className="lbl">Auto‑expires in</div>
            <div className="v">48 minutes</div>
            <div className="sub">Started 13:52 · ends 14:40</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="kv">
          <div className="k"><span>Shop</span><b>The Fluff Room · Silom</b></div>
          <div className="k"><span>Service</span><b>Bath &amp; blow · 45 min</b></div>
          <div className="k"><span>Requested</span><b>Tue 12 Nov · 14:30</b></div>
          <div className="k"><span>Shield hold · ฿150</span><b>Not yet · pending</b></div>
        </div>
      </div>

      <div className="m-banner info">
        <div className="ic">↔</div>
        <div><h5>Don't want to wait?</h5><p>3 instant‑confirm shops nearby can take Dash at 14:30 or 15:00.</p></div>
      </div>

      <div className="vtimeline">
        <div className="step done"><b>Requested</b><span>13:52</span></div>
        <div className="step cur"><b>Shop reviewing</b><span>typically ≤ 25 min</span></div>
        <div className="step"><b>Confirm &amp; hold ฿150</b><span>auto</span></div>
        <div className="step"><b>Service Tue 14:30</b></div>
      </div>
    </div>
    <div className="action-bar">
      <button className="btn secondary" style={{flex:1,justifyContent:'center'}}>Switch to instant shop</button>
      <button className="btn ghost" style={{color:'var(--danger)'}}>Withdraw</button>
    </div>
  </div>
);}

// ─── 12 Declined → alternatives ─────────────────────────────
function Screen12_Declined(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="sc-head">
        <div className="sc-ic">✕</div>
        <div style={{fontWeight:500,fontSize:13,color:'var(--ink-3)'}}>BKG‑41C9</div>
        <div style={{width:36}}/>
      </div>

      <div className="declined-hero">
        <span className="status s-canc-m" style={{alignSelf:'flex-start'}}>Shop can't take 14:30</span>
        <h3>No charge — here are 3 close fits for Dash</h3>
        <p>Your ฿150 hold was never placed. Tap a suggestion below; we'll carry over your notes and service.</p>
        <p style={{fontSize:11,color:'var(--ink-3)',marginTop:6}}>Shield only activates on no-show — your card is safe.</p>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        <div className="shop-row" style={{borderColor:'var(--primary)',background:'var(--primary-wash)'}}>
          <div className="thumb"><div className="dot"/></div>
          <div>
            <h4>Aroon Grooming</h4>
            <div className="meta"><span className="status s-instant" style={{padding:'2px 6px',fontSize:9}}>Instant confirm</span><span>0.4 km · ★4.9</span></div>
            <div className="avail"><span className="s on">14:30</span><span className="s on">15:00</span><span className="s">15:45</span></div>
          </div>
        </div>
        <div className="shop-row">
          <div className="thumb"/>
          <div>
            <h4>Soi Dog Studio</h4>
            <div className="meta"><span className="status s-instant" style={{padding:'2px 6px',fontSize:9}}>Instant confirm</span><span>1.2 km · ★4.8</span></div>
            <div className="avail"><span className="s on">14:30</span><span className="s on">15:15</span></div>
          </div>
        </div>
        <div className="shop-row">
          <div className="thumb"/>
          <div>
            <h4>Barks &amp; Bubbles</h4>
            <div className="meta"><span>1.7 km · ★4.6</span></div>
            <div className="avail"><span className="s">14:45</span><span className="s">16:15</span></div>
          </div>
        </div>
      </div>

      <div className="m-banner">
        <div className="ic">i</div>
        <div><h5>Why did this happen?</h5><p>The Fluff Room's senior groomer had an equipment delay. You keep full control — no charges until you pick a new shop.</p></div>
      </div>
    </div>
    <div style={{padding:'16px 20px',borderTop:'1px solid var(--border)'}}>
      <button style={{width:'100%',padding:'14px',background:'var(--primary)',color:'var(--paper)',border:'none',borderRadius:'var(--radius-lg)',fontFamily:'var(--sans)',fontSize:'15px',fontWeight:500,cursor:'pointer'}}>
        See nearby alternatives
      </button>
    </div>
  </div>
);}

// ─── 13 Visits tab ──────────────────────────────────────────
function Screen13_Visits(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="sc-head"><h1>Visits</h1><div className="right"><div className="sc-ic">⌕</div></div></div>
      <div className="segmented" style={{alignSelf:'flex-start',marginTop:-2}}>
        <button className="on">Upcoming</button>
        <button>Past</button>
      </div>

      <div className="m-sec"><h4>Tomorrow</h4></div>
      <div className="card" style={{borderColor:'var(--primary)',gap:12}}>
        <div className="row between">
          <div>
            <div className="sub" style={{fontSize:11,fontFamily:'var(--mono)',letterSpacing:'.1em',textTransform:'uppercase'}}>Tue 12 Nov · 10:30</div>
            <div style={{fontFamily:'var(--serif)',fontSize:20,fontWeight:500,marginTop:2}}>Aroon Grooming</div>
          </div>
          <span className="status s-confirm">Confirmed</span>
        </div>
        <div className="sub" style={{fontSize:12}}>Dash · Full groom · Shield hold · ฿200 · Due ฿500</div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn secondary btn-sm">Directions</button>
          <button className="btn secondary btn-sm">Message shop</button>
        </div>
      </div>

      <div className="m-sec"><h4>Needs you</h4></div>
      <div className="hist-row" style={{borderColor:'color-mix(in oklab, var(--warn) 30%, transparent)',background:'var(--warn-wash)'}}>
        <div className="pet-ring sm alt2">M</div>
        <div className="body">
          <h5>The Fluff Room · 14:30</h5>
          <div className="sub">Awaiting shop confirm · expires 48m</div>
        </div>
        <span className="status s-pend-m">Pending</span>
      </div>

      <div className="m-sec"><h4>Recent</h4><a>All visits</a></div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <div className="hist-row">
          <div className="pet-ring sm">D</div>
          <div className="body">
            <h5>Aroon Grooming · 18 Oct</h5>
            <div className="sub">Full groom · ฿650 · ★★★★★ rated</div>
          </div>
          <span className="status s-done">Done</span>
        </div>
        <div className="hist-row">
          <div className="pet-ring sm alt">D</div>
          <div className="body">
            <h5>Soi Dog · 22 Sep</h5>
            <div className="sub">Bath &amp; blow · ฿420 · rebookable</div>
          </div>
          <span className="status s-done">Done</span>
        </div>
        <div className="hist-row">
          <div className="pet-ring sm alt">D</div>
          <div className="body">
            <h5>Barks &amp; Bubbles · 12 Aug</h5>
            <div className="sub">Cancelled by you · ฿0 charged</div>
          </div>
          <span className="status s-canc-c">Cancelled</span>
        </div>
      </div>
    </div>
    <TabBar on="visits"/>
  </div>
);}

// ─── 14 You / profile ───────────────────────────────────────
function Screen14_You(){return(
  <div className="screen">
    <div className="screen-content">
      <div className="sc-head"><h1>You</h1><div className="right"><div className="sc-ic">⚙</div></div></div>

      <div className="card" style={{flexDirection:'row',alignItems:'center',gap:14}}>
        <div className="avatar" style={{width:48,height:48,fontSize:15}}>PR</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--serif)',fontSize:20,fontWeight:500,letterSpacing:'-0.01em'}}>Praew R.</div>
          <div className="sub" style={{fontSize:12}}>+66 81 234 5678 · LINE linked</div>
        </div>
        <span className="chip accent"><span className="dot"/>12 visits</span>
      </div>

      <div className="m-sec"><h4>Pets</h4><a>+ Add pet</a></div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <div className="hist-row">
          <div className="pet-ring sm">D</div>
          <div className="body">
            <h5>Dash · Welsh Corgi</h5>
            <div className="sub">12.4 kg · Sensitive skin · Next: Tue 10:30</div>
          </div>
          <ChevR color="var(--ink-3)"/>
        </div>
        <div className="hist-row">
          <div className="pet-ring sm alt">M</div>
          <div className="body">
            <h5>Mochi · Poodle mix</h5>
            <div className="sub">8.2 kg · Puppy · First visit booked</div>
          </div>
          <ChevR color="var(--ink-3)"/>
        </div>
      </div>

      <div className="m-sec"><h4>Payment &amp; holds</h4></div>
      <div className="card" style={{gap:4}}>
        <div className="row between" style={{paddingBottom:10,borderBottom:'1px dashed var(--border)'}}>
          <div>
            <div style={{fontWeight:500}}>PromptPay · default</div>
            <div className="sub" style={{fontSize:11}}>LINE Pay linked</div>
          </div>
          <span className="chip"><span className="dot"/>Edit</span>
        </div>
        <div className="row between" style={{paddingTop:10}}>
          <div>
            <div style={{fontWeight:500}}>Visa •••• 4412</div>
            <div className="sub" style={{fontSize:11}}>Backup · exp 05/28</div>
          </div>
          <span className="chip"><span className="dot"/>Remove</span>
        </div>
      </div>

      <div className="m-sec"><h4>Preferences</h4></div>
      <div className="card" style={{gap:0,padding:0}}>
        {[
          ['LINE notifications','On'],
          ['Language','ไทย'],
          ['Preferred groomer','Pim K. at Aroon'],
          ['Help & support',''],
        ].map((r,i)=>(
          <div key={i} className="row between" style={{padding:'14px 16px',borderTop:i?'1px solid var(--border)':'none'}}>
            <div style={{fontSize:14}}>{r[0]}</div>
            <div className="row" style={{gap:8,color:'var(--ink-3)',fontSize:13}}>{r[1]}<ChevR color="var(--ink-3)"/></div>
          </div>
        ))}
      </div>
    </div>
    <TabBar on="you"/>
  </div>
);}

// ─── 15 Post-visit rate & rebook ───────────────────────────
function Screen15_Rate(){return(
  <div className="screen dark">
    <div className="screen-content" style={{color:'var(--paper)'}}>
      <div className="sc-head"><div/><div className="right"><div className="sc-ic" style={{background:'rgba(255,255,255,.08)',borderColor:'rgba(255,255,255,.2)',color:'#fff'}}>✕</div></div></div>
      <div style={{textAlign:'center',padding:'20px 0 4px'}}>
        <div style={{fontFamily:'var(--mono)',fontSize:11,letterSpacing:'.14em',textTransform:'uppercase',opacity:.7}}>Today · 11:47</div>
        <div style={{fontFamily:'var(--serif)',fontSize:30,fontWeight:500,letterSpacing:'-0.02em',lineHeight:1.05,marginTop:12}}>How was Dash's<br/>time with <em style={{color:'var(--accent)',fontStyle:'italic',fontWeight:400}}>Pim</em>?</div>
      </div>

      <div style={{display:'flex',justifyContent:'center',gap:14,marginTop:10}}>
        {['★','★','★','★','★'].map((s,i)=>(
          <div key={i} style={{fontSize:32,color:i<5?'var(--accent)':'rgba(255,255,255,.25)'}}>{s}</div>
        ))}
      </div>

      <div style={{display:'flex',flexWrap:'wrap',gap:6,justifyContent:'center',marginTop:8}}>
        {['Gentle handling','On time','Clean cut','Listened to notes','Calmed Dash','Worth it'].map((t,i)=>(
          <span key={i} className="chip" style={{background:i<3?'rgba(255,255,255,.14)':'transparent',color:'#fff',border:'1px solid rgba(255,255,255,.18)'}}><span className="dot" style={{background:i<3?'var(--accent)':'rgba(255,255,255,.3)'}}/>{t}</span>
        ))}
      </div>

      <div style={{padding:16,background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.12)',borderRadius:14,marginTop:8}}>
        <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',opacity:.7}}>Receipt</div>
        <div className="row between" style={{marginTop:8,fontSize:13}}><span style={{opacity:.8}}>Full groom</span><b>฿650</b></div>
        <div className="row between" style={{marginTop:4,fontSize:13}}><span style={{opacity:.8}}>Deposit applied</span><b style={{color:'var(--accent)'}}>− ฿200</b></div>
        <div className="row between" style={{marginTop:8,paddingTop:8,borderTop:'1px dashed rgba(255,255,255,.18)',fontSize:14}}><span>Paid at shop (PromptPay)</span><b>฿450</b></div>
      </div>

      <div style={{padding:16,background:'var(--primary)',borderRadius:14,display:'flex',flexDirection:'column',gap:8}}>
        <div style={{fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.14em',textTransform:'uppercase',opacity:.8}}>Dash is due again</div>
        <div style={{fontFamily:'var(--serif)',fontSize:20,fontWeight:500,letterSpacing:'-0.015em'}}>Rebook for Thu 12 Dec · 10:30?</div>
        <div className="row between" style={{opacity:.85,fontSize:12}}><span>Same groomer, same price</span><span>Shield hold · ฿200</span></div>
      </div>

    </div>
    <div className="action-bar" style={{background:'#14161c',borderColor:'rgba(255,255,255,.08)',flexDirection:'column',gap:0}}>
      <div style={{display:'flex',gap:8,width:'100%'}}>
        <button className="btn" style={{flex:1,justifyContent:'center',background:'rgba(255,255,255,.08)',color:'#fff'}}>Submit review</button>
        <button className="btn accent btn-lg">Rebook</button>
      </div>
      <button style={{width:'100%',padding:'10px',background:'none',border:'none',color:'var(--ink-3)',fontSize:'13px',fontFamily:'var(--sans)',cursor:'pointer',marginTop:4}}>
        Rate later
      </button>
    </div>
  </div>
);}

Object.assign(window,{Screen08_Review,Screen09_Pay,Screen10_Confirmed,Screen11_Pending,Screen12_Declined,Screen13_Visits,Screen14_You,Screen15_Rate});
