// merchant/primitives.jsx — iPad device shell + tiny UI primitives

const MChevL = ({size=16})=>(<svg width={size} height={size} viewBox="0 0 16 16"><path d="M10 2L4 8l6 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const MChevR = ({size=14})=>(<svg width={size} height={size} viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const MChevD = ({size=12})=>(<svg width={size} height={size} viewBox="0 0 14 14"><path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const MSearch = ({size=12})=>(<svg width={size} height={size} viewBox="0 0 14 14"><circle cx="6" cy="6" r="4" fill="none" stroke="currentColor" strokeWidth="1.4"/><path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>);
const MX = ({size=14})=>(<svg width={size} height={size} viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const MPlus = ({size=14})=>(<svg width={size} height={size} viewBox="0 0 14 14"><path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>);

// nav icons (unified stroke style, calm, not cartoony)
const nav = {
  today:  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><rect x="2.5" y="4" width="13" height="11" rx="2"/><path d="M2.5 7.5h13M6 2.5v3M12 2.5v3"/></svg>,
  inbox:  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 9.5l1.8-5.3a1.5 1.5 0 0 1 1.4-1h6.6a1.5 1.5 0 0 1 1.4 1l1.8 5.3"/><path d="M2.5 9.5v4a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5v-4h-3.8L12 11.5H6l-.7-2H2.5z"/></svg>,
  board:  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><rect x="2.5" y="3" width="4" height="12" rx="1.5"/><rect x="7.5" y="3" width="4" height="8" rx="1.5"/><rect x="12.5" y="3" width="3" height="5" rx="1.5"/></svg>,
  arrive: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="5" height="5" rx="1"/><rect x="10" y="3" width="5" height="5" rx="1"/><rect x="3" y="10" width="5" height="5" rx="1"/><path d="M11 12.5h3M12.5 11l1.5 1.5-1.5 1.5"/></svg>,
  people: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="7" cy="6.5" r="2.2"/><path d="M3 14.5c.6-2.2 2.1-3.4 4-3.4s3.4 1.2 4 3.4"/><circle cx="13" cy="6" r="1.7"/><path d="M11.5 11.1c2 0 3.4 1 4 3.4"/></svg>,
  svc:    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M9 2.5c.8 0 1.5.7 1.5 1.5v1.5h1.5a1.5 1.5 0 0 1 0 3h-1.5V10a1.5 1.5 0 0 1-3 0V8.5H6a1.5 1.5 0 0 1 0-3h1.5V4c0-.8.7-1.5 1.5-1.5z"/><path d="M4 13l10-2M5 15.5l8-1.5"/></svg>,
  money:  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="6.5"/><path d="M11 6.5c-.5-.8-1.4-1-2.2-1-1 0-2 .5-2 1.5s1 1.3 2 1.5 2.2.5 2.2 1.5-1 1.5-2 1.5-1.9-.3-2.3-1M9 4.5v9"/></svg>,
  star:   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"><path d="M9 2.5l2 4.2 4.5.6-3.3 3.1.8 4.5L9 12.7 4.9 14.9l.8-4.5L2.5 7.3l4.5-.6z"/></svg>,
  gear:   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="2.2"/><path d="M9 1.5V3M9 15v1.5M3.2 3.2l1.1 1.1M13.7 13.7l1.1 1.1M1.5 9H3M15 9h1.5M3.2 14.8l1.1-1.1M13.7 4.3l1.1-1.1"/></svg>,
};

const PadFrame = ({children, label, idx, total, topRight}) => (
  <div style={{display:'flex',flexDirection:'column',gap:14,alignItems:'flex-start'}}>
    <div style={{display:'flex',alignItems:'baseline',gap:10,fontFamily:'var(--mono)',fontSize:11,color:'var(--ink-3)',letterSpacing:'.14em',textTransform:'uppercase'}}>
      <span style={{color:'var(--primary-ink)',fontWeight:600}}>{String(idx).padStart(2,'0')}</span>
      <span>{label}</span>
      {total && <span style={{opacity:.5}}>· {idx}/{total}</span>}
    </div>
    <div className="pad-frame">
      <div className="pad-screen">
        <div className="pad-status">
          <span>Tue 12 Nov · 13:52</span>
          <div className="right">
            <span>Aroon · iPad counter</span>
            <span className="bars"><b/><b/><b/><b/></span>
            <span className="batt"><span/></span>
            <span>87%</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  </div>
);

// Sidebar — same on every screen (consistency)
const Sidebar = ({active="today"}) => {
  const items = [
    {group:'Run the day'},
    {k:'today',  label:'Today',         ic:nav.today,  count:'14'},
    {k:'inbox',  label:'Requests',      ic:nav.inbox,  count:'3',   countClass:'urgent'},
    {k:'board',  label:'Service board', ic:nav.board,  count:'6'},
    {k:'arrive', label:'Arrivals',      ic:nav.arrive},
    {group:'The shop'},
    {k:'people', label:'Groomers',      ic:nav.people},
    {k:'svc',    label:'Services',      ic:nav.svc},
    {k:'money',  label:'Payouts',       ic:nav.money},
    {k:'reviews',label:'Reviews',       ic:nav.star,   count:'4.9'},
    {group:'Setup'},
    {k:'gear',   label:'Shop settings', ic:nav.gear},
  ];
  return (
    <aside className="pad-side">
      <div className="brand">
        <div className="mark-dot" style={{width:24,height:24}}/>
        <div>
          <div className="brand-name">Aroon <em style={{fontFamily:'var(--serif)',fontStyle:'italic',fontWeight:400,color:'var(--accent)'}}>Grooming</em></div>
          <div className="brand-sub">On Pawpoint · ID 8821</div>
        </div>
      </div>
      <nav>
        {items.map((it,i)=>it.group
          ? <div key={i} className="group">{it.group}</div>
          : <a key={it.k} className={active===it.k?'on':''}>
              <span className="nav-ic">{it.ic}</span>
              <span>{it.label}</span>
              {it.count && <span className={"count "+(it.countClass||'')}>{it.count}</span>}
            </a>
        )}
      </nav>
      <div className="side-foot">
        <div className="avatar">P</div>
        <div className="meta">
          <b>Pim Somsak</b>
          <span>Owner · signed in</span>
        </div>
      </div>
    </aside>
  );
};

// Top bar
const TopBar = ({title, titleTh, stats, actions, showSearch=true}) => (
  <div className="pad-top">
    <h1>{title}{titleTh && <span className="th">{titleTh}</span>}</h1>
    <div className="spacer"/>
    {stats && stats.map((s,i)=>(
      <div key={i} className="top-stat"><b>{s.v}</b><span>{s.k}</span></div>
    ))}
    {showSearch && <div className="search"><MSearch/><span>Find booking or pet…</span><span className="kbd" style={{marginLeft:'auto'}}>⌘K</span></div>}
    {actions}
  </div>
);

const Shell = ({active, title, titleTh, stats, topActions, children, search=true}) => (
  <div className="pad-app">
    <Sidebar active={active}/>
    <div className="pad-main">
      <TopBar title={title} titleTh={titleTh} stats={stats} actions={topActions} showSearch={search}/>
      <div className="pad-body">{children}</div>
    </div>
  </div>
);

Object.assign(window, {
  MChevL, MChevR, MChevD, MSearch, MX, MPlus, nav,
  PadFrame, Sidebar, TopBar, Shell,
});
