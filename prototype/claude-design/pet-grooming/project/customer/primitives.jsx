// customer/primitives.jsx — shared tiny UI primitives
const ChevL = ({size=16, color="currentColor"})=>(
  <svg width={size} height={size} viewBox="0 0 16 16"><path d="M10 2L4 8l6 6" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const ChevR = ({size=14, color="currentColor"})=>(
  <svg width={size} height={size} viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const Dot = ({color="currentColor",size=4})=>(
  <span style={{display:'inline-block',width:size,height:size,borderRadius:'50%',background:color,margin:'0 6px',verticalAlign:'middle'}}/>
);
const PhoneShell = ({children, label, idx, total})=>(
  <div style={{display:'flex',flexDirection:'column',gap:14,alignItems:'flex-start'}}>
    <div style={{display:'flex',alignItems:'baseline',gap:10,fontFamily:'var(--mono)',fontSize:11,color:'var(--ink-3)',letterSpacing:'.14em',textTransform:'uppercase'}}>
      <span style={{color:'var(--primary-ink)',fontWeight:600}}>{String(idx).padStart(2,'0')}</span>
      <span>{label}</span>
      {total && <span style={{opacity:.5}}>· {idx}/{total}</span>}
    </div>
    <div className="phone-frame">
      <div className="phone-screen">
        <div className="phone-notch"/>
        <div className="phone-status">
          <span>9:41</span>
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <span className="bars"><b/><b/><b/><b/></span>
            <span style={{fontSize:11}}>5G</span>
            <span className="batt"><span/></span>
          </div>
        </div>
        {children}
        <div className="phone-home"/>
      </div>
    </div>
  </div>
);
const TabBar = ({on="home"})=>(
  <div className="tab-bar">
    {[
      {k:'home',label:'Home'},
      {k:'book',label:'Book'},
      {k:'visits',label:'Visits'},
      {k:'you',label:'You'},
    ].map(t=>(
      <div key={t.k} className={"tab"+(on===t.k?' on':'')}><div className="ic"/>{t.label}</div>
    ))}
  </div>
);
Object.assign(window,{ChevL,ChevR,Dot,PhoneShell,TabBar});
