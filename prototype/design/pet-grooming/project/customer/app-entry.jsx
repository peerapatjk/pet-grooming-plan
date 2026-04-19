(() => {
const PawpointCustomer = window.PawpointCustomer || {};
const {
  PhoneShell,
  Screen01_Welcome,
  Screen02_Language,
  Screen03_OTP,
  Screen04_Pet,
  Screen05_Home,
  Screen06_Shop,
  Screen07_Time,
  Screen08_Review,
  Screen09_Pay,
  Screen10_Confirmed,
  Screen11_Pending,
  Screen12_Declined,
  Screen13_Visits,
  Screen14_You,
  Screen15_Rate,
} = PawpointCustomer;

if (
  !PhoneShell ||
  !Screen01_Welcome ||
  !Screen02_Language ||
  !Screen03_OTP ||
  !Screen04_Pet ||
  !Screen05_Home ||
  !Screen06_Shop ||
  !Screen07_Time ||
  !Screen08_Review ||
  !Screen09_Pay ||
  !Screen10_Confirmed ||
  !Screen11_Pending ||
  !Screen12_Declined ||
  !Screen13_Visits ||
  !Screen14_You ||
  !Screen15_Rate
) {
  throw new Error('Pawpoint customer app-entry loaded before its runtime dependencies.');
}

const customerFlows = [
  {
    num:'Flow A',
    title:<>First <em>impression</em>, earned in 90 seconds</>,
    lede:'A fast, Thai‑first onboarding. We ask only what shops genuinely need — language, phone, and the one pet who triggered the download.',
    band:'stripe',
    note:'Brand serif carries the promise throughout. LINE is offered inline on the OTP screen because most Bangkok users already live there.',
    screens:[
      {C:Screen01_Welcome, label:'Welcome'},
      {C:Screen02_Language,label:'Language'},
      {C:Screen03_OTP,     label:'OTP + LINE'},
      {C:Screen04_Pet,     label:'Pet profile'},
    ],
  },
  {
    num:'Flow B',
    title:<>Discover, pick a time, hold the <em>spot</em></>,
    lede:'The hero loop. Rebook pinned first. Discovery lists show today’s real slots; the time picker distinguishes instant‑confirm from staff‑review; review & pay makes the ฿200 deposit contract unmistakably clear.',
    band:'',
    note:'Accent copper is reserved for money‑in‑motion (deposits, refunds, money diagrams). Primary blue stays navigational. The deposit‑flow diagram on the Review screen is the cornerstone: three beats, money literally moves from left to right.',
    screens:[
      {C:Screen05_Home,    label:'Home + rebook'},
      {C:Screen06_Shop,    label:'Shop detail'},
      {C:Screen07_Time,    label:'Time picker'},
      {C:Screen08_Review,  label:'Review (deposit flow)'},
      {C:Screen09_Pay,     label:'Payment hold'},
    ],
  },
  {
    num:'Flow C',
    title:<>Three <em>endings</em> of a booking request</>,
    lede:'Same request, three outcomes. The app must feel equally confident in all of them.',
    band:'stripe-accent',
    note:'Confirmed celebrates with a timeline showing where the deposit lives. Pending trades anxiety for agency — a real countdown dial, plus instant alternatives one tap away. Declined carries the user’s service and notes straight into the replacement shop list, no re‑entry.',
    screens:[
      {C:Screen10_Confirmed,label:'Confirmed'},
      {C:Screen11_Pending,  label:'Pending'},
      {C:Screen12_Declined, label:'Declined · alternatives'},
    ],
  },
  {
    num:'Flow D',
    title:<>The <em>account</em> is a rebook engine</>,
    lede:'Visits, pets, and rating surfaces are designed to produce the next booking — not decorate history. Post‑visit goes dark to feel like a moment.',
    band:'dark',
    note:'Rating + receipt + rebook live on one screen, dark, because it is a moment — not a form. The rebook card at the bottom is bigger than the submit‑review button on purpose.',
    screens:[
      {C:Screen13_Visits,  label:'Visits'},
      {C:Screen14_You,     label:'You · pets · payment'},
      {C:Screen15_Rate,    label:'Rate + rebook'},
    ],
  },
];

function CustomerFlowBand({ f, startIdx }) {
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
          <PhoneShell key={index} idx={startIdx + index} label={screen.label} total={15}>
            <screen.C />
          </PhoneShell>
        ))}
      </div>
    </div>
  );
}

function CustomerApp() {
  let screenIndex = 1;
  return <>
    {customerFlows.map((flow, index) => {
      const band = <CustomerFlowBand key={index} f={flow} startIdx={screenIndex} />;
      screenIndex += flow.screens.length;
      return band;
    })}
  </>;
}

const customerRoot = document.getElementById('root');
if (customerRoot) {
  ReactDOM.createRoot(customerRoot).render(<CustomerApp />);
}
})();
