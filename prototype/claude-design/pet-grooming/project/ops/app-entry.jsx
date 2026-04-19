const opsFlows = [
  {
    num:'Flow A',
    title:<>The <em>pulse</em></>,
    lede:"What Wit (founder) and Ping (ops) open first thing. One read of the network, one list of the bookings in flight, and the rescue surface for the handful that go wrong.",
    band:'',
    note:"The \"Rescue\" sheet is the hero. Every other surface is navigation; this one is where Pawpoint's promise — Shield — becomes a real human decision in under a minute.",
    screens:[
      {C:Scr_Network,   label:'Network today'},
      {C:Scr_Requests,  label:'Request monitor'},
      {C:Scr_Intervene, label:'Intervention sheet'},
    ],
  },
  {
    num:'Flow B',
    title:<>The <em>supply</em> side</>,
    lede:"Nan (BD) does this work. Shop health tells her who's drifting. The pipeline tells her who's about to come online. The coverage map tells her where to recruit next.",
    band:'stripe',
    note:'Shop health sorts by "needs attention" by default. The two worst shops are red at the top; everything else is exception-listed. Nan does not start her day by reading a 41-row alphabetical table.',
    screens:[
      {C:Scr_ShopHealth, label:'Shop health'},
      {C:Scr_Pipeline,   label:'Onboarding pipeline'},
      {C:Scr_Map,        label:'Coverage map'},
    ],
  },
];

function BrowserFrame({ idx, label, children, total }) {
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div className="chrome-label">
        <span className="idx">0{idx}</span>
        <b>{label}</b>
        <span style={{color:'var(--ink-3)'}}>· {idx}/{total}</span>
      </div>
      <div data-screen-label={String(idx).padStart(2,'0')+' '+label}>{children}</div>
    </div>
  );
}

function OpsFlowBand({ f, startIdx, total }) {
  return (
    <div className={"flow-band "+f.band}>
      <div className="intro">
        <div style={{flex:1,minWidth:380}}>
          <div className="flow-num">{f.num}</div>
          <h2 style={{marginTop:6}}>{f.title}</h2>
        </div>
        <div style={{flex:1,minWidth:320,display:'flex',flexDirection:'column',gap:12}}>
          <div className="lede">{f.lede}</div>
          <div className="anno-card"><h5>Design note</h5>{f.note}</div>
        </div>
      </div>
      <div className="rail">
        {f.screens.map((screen, index) => (
          <BrowserFrame key={index} idx={startIdx + index} label={screen.label} total={total}>
            <OpsFrame url={"ops.pawpoint.co / "+screen.label.toLowerCase().replace(/ /g,'-')}>
              <screen.C />
            </OpsFrame>
          </BrowserFrame>
        ))}
      </div>
    </div>
  );
}

function OpsApp() {
  let screenIndex = 1;
  const totalScreens = opsFlows.reduce((count, flow) => count + flow.screens.length, 0);

  return <>
    {opsFlows.map((flow, index) => {
      const band = <OpsFlowBand key={index} f={flow} startIdx={screenIndex} total={totalScreens} />;
      screenIndex += flow.screens.length;
      return band;
    })}
  </>;
}

const opsRoot = document.getElementById('root');
if (opsRoot) {
  ReactDOM.createRoot(opsRoot).render(<OpsApp />);
}
