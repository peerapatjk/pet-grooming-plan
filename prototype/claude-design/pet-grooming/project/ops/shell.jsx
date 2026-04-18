// ops/shell.jsx — shared left-nav + top-bar shell for ops console

const { useState } = React;

// tiny icon set — inline SVG
const OI = {
  pulse: <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 8h3l2-5 3 10 2-5h4"/></svg>,
  inbox: <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h12v7h-4l-1 2H7l-1-2H2z"/></svg>,
  alert: <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2l6 11H2z M8 6v3 M8 11v.5"/></svg>,
  shops: <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6l1-3h10l1 3v1a2 2 0 01-4 0 2 2 0 01-4 0 2 2 0 01-4 0zM3 8v5h10V8"/></svg>,
  funnel: <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h12l-4.5 6v5l-3-1V9z"/></svg>,
  map: <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4v10l5-2 5 2 4-2V2l-4 2-5-2z M6 2v10 M11 4v10"/></svg>,
  money: <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="14" height="8" rx="1"/><circle cx="8" cy="8" r="2"/></svg>,
  cog:  <svg className="ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="2.5"/><path d="M8 1v2 M8 13v2 M1 8h2 M13 8h2 M3 3l1.5 1.5 M11.5 11.5L13 13 M3 13l1.5-1.5 M11.5 4.5L13 3"/></svg>,
  chev: <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 2l4 4-4 4"/></svg>,
  search: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>,
  close: <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l8 8 M10 2l-8 8"/></svg>,
  phone: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 2h3l1 3-2 1a8 8 0 005 5l1-2 3 1v3a1 1 0 01-1 1A11 11 0 012 3a1 1 0 011-1z"/></svg>,
  line: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h12v8H9l-3 3v-3H2z"/></svg>,
  mail: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="3" width="14" height="10"/><path d="M1 4l7 5 7-5"/></svg>,
};

function OpsSidebar({ active }) {
  const items = [
    { group: 'live ops' },
    { id: 'network',    label: 'Network',         icon: OI.pulse, count: null },
    { id: 'requests',   label: 'Requests',        icon: OI.inbox, count: '12', hot: true },
    { id: 'alerts',     label: 'Alerts',          icon: OI.alert, count: '3',  hot: true },
    { group: 'supply' },
    { id: 'shops',      label: 'Shops',           icon: OI.shops, count: '41' },
    { id: 'pipeline',   label: 'Pipeline',        icon: OI.funnel, count: '18' },
    { id: 'map',        label: 'Coverage',        icon: OI.map,   count: null },
    { group: 'finance' },
    { id: 'payouts',    label: 'Payouts',         icon: OI.money, count: null },
    { id: 'settings',   label: 'Settings',        icon: OI.cog,   count: null },
  ];
  return (
    <aside className="ops-side">
      <div className="brand">
        <div className="mark"/>
        <div>
          <b>Pawpoint <em>Ops</em></b>
          <small>internal · v0.9.2</small>
        </div>
      </div>
      <nav>
        {items.map((it, i) => it.group
          ? <div className="group" key={i}>{it.group}</div>
          : <a key={it.id} className={active === it.id ? 'on' : ''}>
              {it.icon}
              <span>{it.label}</span>
              {it.count && <span className={"count" + (it.hot ? ' hot' : '')}>{it.count}</span>}
            </a>
        )}
      </nav>
      <div className="foot">
        <div className="av">PK</div>
        <div>
          <b>Ping K.</b>
          <span>Ops lead</span>
        </div>
        <span className="env">LIVE</span>
      </div>
    </aside>
  );
}

function OpsTop({ crumbs = ['Pawpoint', 'Live ops'], title, children }) {
  return (
    <div className="ops-top">
      <div className="crumbs">{crumbs.slice(0, -1).map((c, i) => <span key={i}>{c}  /  </span>)}<b>{crumbs[crumbs.length - 1]}</b></div>
      {title && <h1 style={{marginLeft:8}}>{title}</h1>}
      <div className="spacer"/>
      <div className="pill"><span className="dot"/>Real-time · Tue 12 Nov 13:52 ICT</div>
      <div className="search">{OI.search}<span>⌘K — find shop, booking, owner</span></div>
      {children}
    </div>
  );
}

// generic screen container that shows in a ChromeWindow
function OpsScreen({ active, crumbs, title, children }) {
  return (
    <div className="ops-app">
      <OpsSidebar active={active}/>
      <div className="ops-main">
        <OpsTop crumbs={crumbs} title={title}/>
        <div className="ops-body">{children}</div>
      </div>
    </div>
  );
}

// frame — the browser window around an ops screen
function OpsFrame({ url, children, height = 880, width = 1280 }) {
  return (
    <div style={{width, height, margin:'0 auto'}}>
      <ChromeWindow
        width={width} height={height}
        tabs={[
          { title: 'Pawpoint Ops' },
          { title: 'PostgreSQL · prod-readonly' },
          { title: 'Metabase — Shop KPIs' },
        ]}
        activeIndex={0}
        url={url}
      >
        {children}
      </ChromeWindow>
    </div>
  );
}

// Shared shop data — one consistent network
const SHOPS = [
  { id:'aroon',   name:'Aroon Grooming',         th:'อรุณโกรมมิ่ง',       area:'Sathorn',     since:'Mar 2025', rating:4.9, bookings30:284, accept:98, response:3,  completion:99, retention:71, status:'ok',  nps:72, payout:'฿84,210' },
  { id:'maew',    name:'Maew & Mhaa',            th:'แมวและหมา',         area:'Thonglor',    since:'Feb 2025', rating:4.8, bookings30:312, accept:94, response:6,  completion:98, retention:68, status:'ok',  nps:68, payout:'฿92,100' },
  { id:'panda',   name:'Panda Pet Parlour',      th:'แพนด้าเพ็ท',         area:'Ekkamai',     since:'Apr 2025', rating:4.7, bookings30:198, accept:88, response:12, completion:96, retention:55, status:'warn',nps:58, payout:'฿61,340' },
  { id:'bingo',   name:'Bingo Groom',            th:'บิงโก',              area:'Ari',         since:'May 2025', rating:4.9, bookings30:256, accept:96, response:5,  completion:100,retention:74, status:'ok',  nps:74, payout:'฿78,900' },
  { id:'soi11',   name:'Soi 11 Dog Club',        th:'คลับหมา ซ.11',       area:'Asoke',       since:'Jul 2025', rating:4.6, bookings30:176, accept:82, response:18, completion:93, retention:48, status:'warn',nps:51, payout:'฿54,220' },
  { id:'pomme',   name:'Pomme & Coco',           th:'ปอมและโกโก้',        area:'Phrom Phong', since:'Jun 2025', rating:4.8, bookings30:224, accept:91, response:9,  completion:97, retention:63, status:'ok',  nps:64, payout:'฿72,450' },
  { id:'kiki',    name:'Kiki Neko Salon',        th:'คิคิแมว',            area:'Siam',        since:'Aug 2025', rating:4.5, bookings30:112, accept:76, response:24, completion:90, retention:42, status:'hot', nps:44, payout:'฿36,800' },
  { id:'wagwag',  name:'WagWag Bangkok',         th:'แวกแวก',             area:'Silom',       since:'Sep 2025', rating:4.7, bookings30:168, accept:85, response:14, completion:95, retention:52, status:'warn',nps:55, payout:'฿52,100' },
  { id:'mm',      name:'M&M Mobile Groom',       th:'เอ็มแอนด์เอ็ม',      area:'Mobile',      since:'Oct 2025', rating:4.4, bookings30:68,  accept:68, response:31, completion:87, retention:38, status:'hot', nps:39, payout:'฿21,400' },
];

// export
Object.assign(window, { OpsSidebar, OpsTop, OpsScreen, OpsFrame, OI, SHOPS });
