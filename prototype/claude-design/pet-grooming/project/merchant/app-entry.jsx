(() => {
const PawpointMerchant = window.PawpointMerchant || {};
const {
  PadFrame,
  Screen01_Today,
  Screen02_Inbox,
  Screen03_RequestDetail,
  Screen04_Arrivals,
  Screen05_Board,
  Screen06_Groomers,
  Screen07_Services,
  Screen08_Payouts,
} = PawpointMerchant;

if (
  !PadFrame ||
  !Screen01_Today ||
  !Screen02_Inbox ||
  !Screen03_RequestDetail ||
  !Screen04_Arrivals ||
  !Screen05_Board ||
  !Screen06_Groomers ||
  !Screen07_Services ||
  !Screen08_Payouts
) {
  throw new Error('Pawpoint merchant app-entry loaded before its runtime dependencies.');
}

const merchantFlows = [
  {
    num:'Flow A',
    title:<>Running <em>today</em></>,
    lede:'The three surfaces Pim (the owner) uses most: the day timeline, the request inbox, and the one sheet that accepts or declines a booking.',
    band:'stripe',
    note:'The request detail drawer is the crown jewel. Pet history, allergy, customer note, groomer match, deposit mechanics — one scroll, three buttons, no hunting.',
    screens:[
      {C:Screen01_Today,         label:'Today'},
      {C:Screen02_Inbox,         label:'Requests inbox'},
      {C:Screen03_RequestDetail, label:'Request detail (drawer)'},
    ],
  },
  {
    num:'Flow B',
    title:<>At the <em>counter</em></>,
    lede:'The in‑person moments. A customer walks in; a groomer finishes a dog; someone is running late. Two screens handle the whole dance.',
    band:'',
    note:'Arrivals are dominated by a QR that customers scan from their Pawpoint app — deposits release automatically. The service board uses drag‑friendly kanban because staff are using wet hands and an iPad on a counter.',
    screens:[
      {C:Screen04_Arrivals, label:'Arrivals · check‑in'},
      {C:Screen05_Board,    label:'Service board (kanban)'},
    ],
  },
  {
    num:'Flow C',
    title:<>Running the <em>shop</em></>,
    lede:'The quieter surfaces. Staff, catalogue, money. Auto‑accept rules are here — the lever that decides how often Pawpoint shows “Instant confirm” to customers.',
    band:'stripe-accent',
    note:'Auto‑accept rules get their own column of explanation, because the whole customer experience downstream depends on them. 68% of bookings auto‑confirm; the other 32% get Pim’s judgment where it matters.',
    screens:[
      {C:Screen06_Groomers, label:'Groomers & shifts'},
      {C:Screen07_Services, label:'Services & auto‑accept'},
      {C:Screen08_Payouts,  label:'Payouts & reviews'},
    ],
  },
];

function MerchantFlowBand({ f, startIdx }) {
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
          <PadFrame key={index} idx={startIdx + index} label={screen.label} total={8}>
            <screen.C />
          </PadFrame>
        ))}
      </div>
    </div>
  );
}

function MerchantApp() {
  let screenIndex = 1;
  return <>
    {merchantFlows.map((flow, index) => {
      const band = <MerchantFlowBand key={index} f={flow} startIdx={screenIndex} />;
      screenIndex += flow.screens.length;
      return band;
    })}
  </>;
}

const merchantRoot = document.getElementById('root');
if (merchantRoot) {
  ReactDOM.createRoot(merchantRoot).render(<MerchantApp />);
}
})();
