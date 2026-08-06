/* ==========================================================================
   art.js — SVG artwork engine
   Bike side-profile illustrations + spare-part graphics + UI icons.
   Everything is generated in-browser: no image files, no CDN, never broken.

   To use a real photo instead, put `image: 'img/splendor.jpg'` on a model
   or part and the renderers will use it automatically.
   ========================================================================== */

/* ---------- UI ICONS (stroke, 24x24) ---------- */
const ICO = (() => {
  const s = (d, extra = '') =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
      stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;

  return {
    gear: s('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6h.09A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
    wrench: s('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
    search: s('<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>'),
    cart: s('<circle cx="9" cy="21" r="1.4"/><circle cx="19" cy="21" r="1.4"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>'),
    heart: s('<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1.1-1.1a5.5 5.5 0 0 0 0-7.8z"/>'),
    user: s('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    menu: s('<path d="M3 6h18M3 12h18M3 18h18"/>'),
    x: s('<path d="M18 6L6 18M6 6l12 12"/>'),
    right: s('<path d="M5 12h14M12 5l7 7-7 7"/>'),
    chevR: s('<path d="M9 18l6-6-6-6"/>'),
    chevD: s('<path d="M6 9l6 6 6-6"/>'),
    plus: s('<path d="M12 5v14M5 12h14"/>'),
    minus: s('<path d="M5 12h14"/>'),
    trash: s('<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M10 11v6M14 11v6"/>'),
    check: s('<path d="M20 6L9 17l-5-5"/>'),
    checkCircle: s('<path d="M22 11.1V12a10 10 0 1 1-5.9-9.1"/><path d="M22 4L12 14.1l-3-3"/>'),
    alert: s('<circle cx="12" cy="12" r="10"/><path d="M12 8v5M12 16.5h.01"/>'),
    truck: s('<path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>'),
    shield: s('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>'),
    refresh: s('<path d="M3 2v6h6"/><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M21 22v-6h-6"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/>'),
    phone: s('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    pin: s('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),
    mail: s('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>'),
    clock: s('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    tag: s('<path d="M20.6 13.4L12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><path d="M7.5 7.5h.01"/>'),
    star: s('<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1L12 2z"/>'),
    bike: s('<circle cx="5.5" cy="17" r="3.5"/><circle cx="18.5" cy="17" r="3.5"/><path d="M15 6h4l1.5 4M5.5 17l4-8h5l4 8"/><path d="M9.5 9h6"/>'),
    grid: s('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>'),
    filter: s('<path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/>'),
    lock: s('<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'),
    box: s('<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/>'),
    fb: s('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>'),
    ig: s('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'),
    wa: s('<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2.3-5.3A8.4 8.4 0 1 1 21 11.5z"/>'),
    yt: s('<path d="M22.5 7.4a2.8 2.8 0 0 0-2-2C18.8 5 12 5 12 5s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.6 2.8 2.8 0 0 0 2 2C5.2 19 12 19 12 19s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.6z"/><path d="M10 15l5-3-5-3z"/>')
  };
})();

/* ==========================================================================
   BIKE ILLUSTRATIONS
   Flat-vector side profile, facing right. viewBox 0 0 420 250.
   Ground line sits at y = 222.
   ========================================================================== */
const BikeArt = (() => {
  const F  = '#2A3036';   // frame / dark bodywork
  const F2 = '#1B2025';   // shadowed bodywork
  const M  = '#5A636B';   // metal
  const M2 = '#8A949C';   // bright metal / chrome
  const T  = '#16191C';   // tyre rubber
  const G  = '#0D1012';   // deepest black
  const SEAT = '#101315';

  let uidN = 0;

  /* --- polar helper: 0° = right, 90° = down --- */
  const pol = (cx, cy, r, deg) => {
    const a = deg * Math.PI / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };

  /** Arc path sweeping clockwise from a1° to a2° */
  function arc(cx, cy, r, a1, a2) {
    const [x1, y1] = pol(cx, cy, r, a1);
    const [x2, y2] = pol(cx, cy, r, a2);
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }

  /* --- wheel: tyre, rim, spokes, disc, hub --- */
  function wheel(cx, cy, r, accent, o = {}) {
    const { spokes = 12, knobby = false, disc = true, rimW = 3 } = o;
    const rim = r * 0.72;
    let s = '';

    s += `<circle cx="${cx}" cy="${cy}" r="${r - r * 0.11}" fill="none" stroke="${T}" stroke-width="${r * 0.22}"/>`;

    if (knobby) {
      for (let i = 0; i < 20; i++) {
        const [x1, y1] = pol(cx, cy, r - r * 0.16, i * 18);
        const [x2, y2] = pol(cx, cy, r + r * 0.04, i * 18);
        s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"
               stroke="${G}" stroke-width="3" stroke-linecap="round"/>`;
      }
    } else {
      s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.9}" fill="none" stroke="rgba(255,255,255,.045)" stroke-width="1.2"/>`;
    }

    s += `<circle cx="${cx}" cy="${cy}" r="${rim}" fill="${G}" stroke="${accent}" stroke-width="${rimW}"/>`;

    for (let i = 0; i < spokes; i++) {
      const [x, y] = pol(cx, cy, rim - 3, (i / spokes) * 360);
      s += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"
             stroke="${M}" stroke-width="${spokes > 12 ? 2 : 3.4}" stroke-linecap="round"/>`;
    }

    if (disc) {
      s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="none" stroke="${M2}" stroke-width="2.6" opacity=".85"/>`;
      s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="none" stroke="${G}" stroke-width="1.2" stroke-dasharray="3 6"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.14}" fill="${M}"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.06}" fill="${G}"/>`;
    return s;
  }

  /* --- drive chain between engine sprocket and rear axle --- */
  const chain = (ex, ey, ax, ay) => `
    <line x1="${ex}" y1="${ey}" x2="${ax}" y2="${ay}" stroke="${M}" stroke-width="3"/>
    <line x1="${ex}" y1="${ey + 9}" x2="${ax}" y2="${ay + 7}" stroke="${M}" stroke-width="3"/>`;

  /* --- per-instance defs so multiple bikes on one page keep their own colour --- */
  function defs(u, accent) {
    return `<defs>
      <linearGradient id="${u}t" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${accent}"/>
        <stop offset="1" stop-color="${accent}" stop-opacity=".55"/>
      </linearGradient>
      <linearGradient id="${u}m" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3B444C"/><stop offset="1" stop-color="#191E23"/>
      </linearGradient>
      <linearGradient id="${u}g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#C6DCEA" stop-opacity=".92"/>
        <stop offset="1" stop-color="#68808F" stop-opacity=".55"/>
      </linearGradient>
      <radialGradient id="${u}s">
        <stop offset="0" stop-color="#000" stop-opacity=".6"/>
        <stop offset="1" stop-color="#000" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="212" cy="228" rx="170" ry="9" fill="url(#${u}s)"/>`;
  }

  /* ======================= COMMUTER ======================= */
  /* Splendor / Shine / Platina — 18" wire wheels, flat seat, low pipe */
  function commuter(u, a) {
    const RX = 106, FX = 320, CY = 170, R = 50;
    return `
    ${defs(u, a)}
    ${chain(198, 162, RX, CY)}
    <path d="M${RX} ${CY} L200 161" stroke="${F}" stroke-width="12" stroke-linecap="round"/>
    <path d="M140 118 L112 163" stroke="${M}" stroke-width="8" stroke-linecap="round"/>
    <path d="M140 118 L112 163" stroke="${a}" stroke-width="3.5" stroke-linecap="round" opacity=".8"/>

    <!-- engine -->
    <path d="M192 130 L242 126 L253 163 L198 171 Z" fill="url(#${u}m)"/>
    <path d="M237 124 L272 112 L286 138 L251 150 Z" fill="${M}"/>
    <g stroke="${G}" stroke-width="2.2" opacity=".55">
      <path d="M241 122 L276 133"/><path d="M245 129 L280 140"/><path d="M249 136 L283 147"/>
    </g>
    <circle cx="214" cy="152" r="13" fill="${M2}" opacity=".45"/>
    <circle cx="214" cy="152" r="5" fill="${G}"/>

    <!-- exhaust -->
    <path d="M251 149 C 268 158, 280 164, 292 165" stroke="${M2}" stroke-width="7"
          fill="none" stroke-linecap="round"/>
    <path d="M250 161 L316 157 L318 173 L252 177 Z" fill="${M}"/>
    <path d="M254 163 L314 159" stroke="${M2}" stroke-width="3" opacity=".7"/>

    ${wheel(RX, CY, R, a, { spokes: 16, rimW: 2.6, disc: false })}
    ${wheel(FX, CY, R, a, { spokes: 16, rimW: 2.6 })}

    <!-- mudguards -->
    <path d="${arc(RX, CY, R + 7, 172, 328)}" stroke="${F2}" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="${arc(FX, CY, R + 7, 212, 334)}" stroke="${F2}" stroke-width="11" fill="none" stroke-linecap="round"/>

    <!-- forks -->
    <path d="M286 92 L320 ${CY}" stroke="${M2}" stroke-width="8" stroke-linecap="round"/>
    <path d="M296 90 L330 166" stroke="${M}" stroke-width="5.5" stroke-linecap="round"/>

    <!-- side panel -->
    <path d="M134 132 L182 124 L177 153 L139 157 Z" fill="url(#${u}t)"/>

    <!-- seat -->
    <path d="M122 136 C 132 121, 168 113, 206 111 L212 123 L197 129 L127 147 Z" fill="${SEAT}"/>
    <path d="M129 133 C 142 122, 174 116, 204 115" stroke="#363C42" stroke-width="2" fill="none"/>
    <path d="M110 129 L128 124" stroke="${M2}" stroke-width="5" stroke-linecap="round"/>

    <!-- tank -->
    <path d="M202 119 C 208 98, 240 88, 274 90 L288 103 C 288 123, 258 133, 214 133 Z" fill="url(#${u}t)"/>
    <path d="M212 114 C 222 101, 244 95, 268 96" stroke="#fff" stroke-width="3.5"
          fill="none" opacity=".3" stroke-linecap="round"/>
    <path d="M226 130 L286 110" stroke="#fff" stroke-width="2" opacity=".12"/>

    <!-- headlamp -->
    <ellipse cx="300" cy="88" rx="18" ry="15" fill="${F}"/>
    <ellipse cx="304" cy="88" rx="12" ry="11" fill="url(#${u}g)"/>
    <ellipse cx="301" cy="84" rx="4.5" ry="3" fill="#fff" opacity=".8"/>

    <!-- bars + mirror -->
    <path d="M285 85 L281 71" stroke="${F}" stroke-width="6" stroke-linecap="round"/>
    <path d="M252 69 L312 65" stroke="${F}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="254" cy="69" r="5" fill="${G}"/><circle cx="310" cy="65" r="5" fill="${G}"/>
    <path d="M260 68 L252 52" stroke="${F}" stroke-width="3.2" stroke-linecap="round"/>
    <ellipse cx="249" cy="49" rx="9.5" ry="6" fill="${M}" transform="rotate(-18 249 49)"/>`;
  }

  /* ======================= SPORT ======================= */
  /* R15 / MT-15 / Apache / Pulsar NS — fairing, alloys, upswept tail */
  function sport(u, a) {
    const RX = 108, FX = 320, CY = 172, R = 48;
    return `
    ${defs(u, a)}
    ${chain(200, 164, RX, CY)}
    <path d="M${RX} ${CY} L202 163" stroke="${F}" stroke-width="13" stroke-linecap="round"/>
    <path d="M138 116 L114 162" stroke="${a}" stroke-width="8" stroke-linecap="round"/>

    <!-- engine + head -->
    <path d="M192 128 L242 124 L254 162 L198 170 Z" fill="url(#${u}m)"/>
    <path d="M237 122 L273 110 L287 136 L251 148 Z" fill="${M}"/>
    <g stroke="${G}" stroke-width="2.2" opacity=".5">
      <path d="M241 120 L277 131"/><path d="M245 127 L281 138"/>
    </g>
    <!-- exhaust: header up, short side can -->
    <path d="M250 147 C 268 152, 276 146, 280 136" stroke="${M2}" stroke-width="6"
          fill="none" stroke-linecap="round"/>
    <path d="M232 165 L280 155 L286 176 L238 186 Z" fill="${M}"/>
    <path d="M236 167 L278 158" stroke="${M2}" stroke-width="3" opacity=".65"/>

    ${wheel(RX, CY, R, a, { spokes: 6, rimW: 4.5 })}
    ${wheel(FX, CY, R, a, { spokes: 6, rimW: 4.5 })}

    <!-- hugger + front guard -->
    <path d="${arc(RX, CY, R + 6, 196, 300)}" stroke="${F2}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="${arc(FX, CY, R + 8, 204, 330)}" stroke="${F2}" stroke-width="10" fill="none" stroke-linecap="round"/>

    <!-- trellis frame -->
    <g stroke="${a}" stroke-width="6.5" stroke-linecap="round" fill="none">
      <path d="M278 96 L226 122 L202 140"/>
      <path d="M278 96 L212 104"/>
      <path d="M212 104 L202 140"/>
    </g>

    <!-- USD forks -->
    <path d="M276 82 L300 130" stroke="${M2}" stroke-width="11" stroke-linecap="round"/>
    <path d="M298 126 L320 ${CY}" stroke="#333B42" stroke-width="7" stroke-linecap="round"/>

    <!-- upswept tail -->
    <path d="M128 100 L142 84 L176 80 L206 90 L204 106 L166 112 L132 114 Z" fill="url(#${u}t)"/>
    <path d="M132 98 L146 86 L174 83" stroke="#fff" stroke-width="2.5" fill="none" opacity=".25"/>
    <path d="M166 112 L204 106 L202 114 L168 118 Z" fill="${G}" opacity=".5"/>

    <!-- seat -->
    <path d="M158 108 L206 97 L212 108 L163 121 Z" fill="${SEAT}"/>

    <!-- tank + shrouds -->
    <path d="M198 110 C 206 86, 242 74, 270 78 L284 92 L280 116 L236 128 L202 126 Z" fill="url(#${u}t)"/>
    <path d="M208 106 C 218 90, 244 82, 264 84" stroke="#fff" stroke-width="3.5"
          fill="none" opacity=".32" stroke-linecap="round"/>
    <path d="M228 127 L282 104 L280 116 L234 130 Z" fill="${G}" opacity=".42"/>

    <!-- fairing -->
    <path d="M272 78 L304 58 L338 76 L344 110 L324 136 L290 128 L274 104 Z" fill="url(#${u}t)"/>
    <path d="M304 58 L338 76 L342 96 L308 82 Z" fill="${G}" opacity=".45"/>
    <path d="M278 84 L300 66" stroke="#fff" stroke-width="3" opacity=".22"/>
    <!-- LED headlight -->
    <path d="M322 86 L350 94 L344 112 L320 104 Z" fill="url(#${u}g)"/>
    <path d="M325 91 L344 97" stroke="#fff" stroke-width="2.6" opacity=".85"/>
    <!-- screen -->
    <path d="M304 58 L318 40 L338 48 L340 72 Z" fill="url(#${u}g)" opacity=".45"/>
    <path d="M304 58 L318 40" stroke="${M2}" stroke-width="2"/>
    <!-- clip-on + mirror -->
    <path d="M274 88 L252 80" stroke="${F}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="250" cy="80" r="5" fill="${G}"/>
    <path d="M312 66 L296 50" stroke="${F}" stroke-width="3" stroke-linecap="round"/>
    <path d="M284 42 L302 46 L298 58 L280 53 Z" fill="${M}"/>
    <circle cx="202" cy="156" r="5" fill="${M2}"/>`;
  }

  /* ======================= CRUISER ======================= */
  /* Classic 350 / Meteor / Avenger — spoke wheels, valanced fenders */
  function cruiser(u, a) {
    const RX = 100, RR = 52, RY = 170;
    const FX = 328, FR = 56, FY = 166;
    return `
    ${defs(u, a)}
    ${chain(196, 166, RX, RY)}
    <path d="M${RX} ${RY} L198 164" stroke="${F}" stroke-width="12" stroke-linecap="round"/>
    <path d="M142 122 L112 164" stroke="${M2}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="127" cy="143" r="7" fill="${a}"/>

    <!-- big single-cylinder engine -->
    <path d="M188 132 L240 128 L252 168 L194 176 Z" fill="url(#${u}m)"/>
    <path d="M233 126 L270 112 L284 142 L247 156 Z" fill="${M}"/>
    <g stroke="${G}" stroke-width="2.6" opacity=".6">
      <path d="M237 124 L274 137"/><path d="M241 132 L278 145"/><path d="M245 140 L281 153"/>
    </g>
    <circle cx="212" cy="156" r="15" fill="${M2}" opacity=".45"/>
    <circle cx="212" cy="156" r="6" fill="${G}"/>

    <!-- long low pipe -->
    <path d="M248 158 C 276 172, 300 176, 322 176" stroke="${M2}" stroke-width="9"
          fill="none" stroke-linecap="round"/>
    <path d="M272 170 L356 168 L358 182 L274 185 Z" fill="${M2}"/>
    <path d="M278 173 L352 171" stroke="#fff" stroke-width="2" opacity=".35"/>

    ${wheel(RX, RY, RR, a, { spokes: 24, rimW: 2.4, disc: false })}
    ${wheel(FX, FY, FR, a, { spokes: 24, rimW: 2.4 })}

    <!-- deep valanced fenders -->
    <path d="${arc(RX, RY, RR + 8, 176, 326)}" stroke="url(#${u}t)" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="${arc(FX, FY, FR + 8, 208, 326)}" stroke="url(#${u}t)" stroke-width="13" fill="none" stroke-linecap="round"/>
    <path d="${arc(RX, RY, RR + 11, 205, 300)}" stroke="#fff" stroke-width="2" fill="none" opacity=".18"/>

    <!-- raked chrome forks -->
    <path d="M290 96 L${FX} ${FY}" stroke="${M2}" stroke-width="9" stroke-linecap="round"/>
    <path d="M300 94 L338 160" stroke="${M2}" stroke-width="6.5" stroke-linecap="round" opacity=".75"/>

    <!-- low seat -->
    <path d="M110 134 C 126 119, 172 112, 220 112 L226 126 L198 134 L116 148 Z" fill="${SEAT}"/>
    <path d="M118 131 C 136 120, 176 115, 216 115" stroke="#363C42" stroke-width="2" fill="none"/>
    <path d="M96 130 L116 124" stroke="${M2}" stroke-width="5" stroke-linecap="round"/>

    <!-- teardrop tank -->
    <path d="M198 124 C 204 96, 244 84, 280 88 L294 108 C 294 132, 258 144, 212 142 Z" fill="url(#${u}t)"/>
    <path d="M210 116 C 222 100, 250 92, 274 94" stroke="#fff" stroke-width="4"
          fill="none" opacity=".32" stroke-linecap="round"/>
    <path d="M216 134 L290 112" stroke="#D9B45C" stroke-width="2.6" opacity=".9"/>
    <path d="M220 139 L290 118" stroke="#D9B45C" stroke-width="1.2" opacity=".6"/>

    <!-- round headlamp -->
    <circle cx="302" cy="96" r="21" fill="${F}"/>
    <circle cx="304" cy="96" r="16" fill="url(#${u}g)"/>
    <circle cx="298" cy="90" r="5.5" fill="#fff" opacity=".75"/>

    <!-- wide bars + mirror -->
    <path d="M290 88 L284 64" stroke="${F}" stroke-width="7" stroke-linecap="round"/>
    <path d="M248 58 L326 54" stroke="${F}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="250" cy="58" r="6" fill="${G}"/><circle cx="324" cy="54" r="6" fill="${G}"/>
    <path d="M258 57 L248 40" stroke="${M2}" stroke-width="3.4" stroke-linecap="round"/>
    <ellipse cx="245" cy="37" rx="10" ry="6.5" fill="${M2}" transform="rotate(-18 245 37)"/>`;
  }

  /* ======================= SCOOTER ======================= */
  /* Activa / Jupiter / Access — step-through, 12" wheels */
  function scooter(u, a) {
    const RX = 138, FX = 320, CY = 184, R = 38;
    return `
    ${defs(u, a)}
    <!-- engine / swing unit -->
    <path d="M120 150 L188 142 L196 182 L128 190 Z" fill="url(#${u}m)"/>
    <path d="M160 124 L136 164" stroke="${M}" stroke-width="7" stroke-linecap="round"/>

    ${wheel(RX, CY, R, a, { spokes: 5, rimW: 3.4, disc: false })}
    ${wheel(FX, CY, R, a, { spokes: 5, rimW: 3.4 })}

    <!-- rear body -->
    <path d="M98 136 C 98 112, 118 100, 150 100 L200 100 C 216 100, 224 112, 226 132
             L232 160 L182 172 L140 172 C 110 170, 96 158, 98 136 Z" fill="url(#${u}t)"/>
    <path d="M108 128 C 110 112, 128 104, 152 104 L196 104" stroke="#fff"
          stroke-width="3.5" fill="none" opacity=".26" stroke-linecap="round"/>
    <!-- floorboard / tunnel -->
    <path d="M178 154 L264 144 L268 166 L184 176 Z" fill="${F}"/>
    <path d="M186 159 L262 150" stroke="${M}" stroke-width="1.6" opacity=".5"/>
    <path d="M188 165 L264 156" stroke="${M}" stroke-width="1.6" opacity=".5"/>
    <!-- front apron -->
    <path d="M260 146 C 262 116, 278 94, 300 86 L330 90 C 334 116, 332 148, 326 166
             L290 170 L262 168 Z" fill="url(#${u}t)"/>
    <path d="M272 144 C 274 120, 286 104, 300 96" stroke="#fff" stroke-width="3.5"
          fill="none" opacity=".28" stroke-linecap="round"/>
    <path d="M290 170 L326 166 L324 180 L292 182 Z" fill="${G}" opacity=".45"/>

    <!-- seat -->
    <path d="M96 120 C 100 106, 122 98, 152 98 L192 98 C 206 98, 212 106, 210 116
             L198 122 L108 132 Z" fill="${SEAT}"/>
    <path d="M106 116 C 114 106, 134 102, 158 102" stroke="#363C42" stroke-width="2" fill="none"/>
    <path d="M86 118 L108 112" stroke="${M2}" stroke-width="5" stroke-linecap="round"/>

    <!-- headlamp in apron -->
    <path d="M302 102 L334 108 L330 128 L300 122 Z" fill="url(#${u}g)"/>
    <path d="M305 107 L330 112" stroke="#fff" stroke-width="2.6" opacity=".8"/>

    <!-- handlebar cowl -->
    <path d="M280 82 C 286 68, 302 62, 320 64 L336 72 L332 90 L296 86 Z" fill="${F}"/>
    <circle cx="308" cy="75" r="7" fill="url(#${u}g)" opacity=".85"/>
    <path d="M278 78 L256 72" stroke="${F}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="254" cy="72" r="5" fill="${G}"/>
    <path d="M292 66 L284 50" stroke="${F}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="281" cy="47" rx="9" ry="6" fill="${M}" transform="rotate(-18 281 47)"/>

    <!-- front fork + guard -->
    <path d="M312 126 L${FX} 176" stroke="${M2}" stroke-width="7" stroke-linecap="round"/>
    <path d="${arc(FX, CY, R + 8, 200, 340)}" stroke="url(#${u}t)" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  }

  /* ======================= ADVENTURE ======================= */
  /* Xpulse / Himalayan / V-Strom — 21" front, knobbies, tall stance */
  function adventure(u, a) {
    const RX = 104, RR = 48, RY = 174;
    const FX = 326, FR = 56, FY = 166;
    return `
    ${defs(u, a)}
    ${chain(198, 166, RX, RY)}
    <path d="M${RX} ${RY} L200 164" stroke="${F}" stroke-width="12" stroke-linecap="round"/>
    <path d="M142 110 L116 160" stroke="${a}" stroke-width="8" stroke-linecap="round"/>

    <!-- engine + bash plate -->
    <path d="M190 128 L242 124 L254 162 L196 170 Z" fill="url(#${u}m)"/>
    <path d="M235 122 L272 110 L286 138 L249 150 Z" fill="${M}"/>
    <g stroke="${G}" stroke-width="2.4" opacity=".55">
      <path d="M239 120 L276 131"/><path d="M243 127 L280 138"/><path d="M247 134 L284 145"/>
    </g>
    <path d="M192 164 L256 156 L260 174 L196 180 Z" fill="${M2}" opacity=".5"/>
    <!-- high exhaust -->
    <path d="M250 150 C 268 150, 276 140, 280 128" stroke="${M2}" stroke-width="6"
          fill="none" stroke-linecap="round"/>
    <path d="M262 142 L296 122 L306 140 L272 160 Z" fill="${M}"/>

    ${wheel(RX, RY, RR, a, { spokes: 20, knobby: true, rimW: 2.4, disc: false })}
    ${wheel(FX, FY, FR, a, { spokes: 20, knobby: true, rimW: 2.4 })}

    <!-- high-mounted guards -->
    <path d="${arc(RX, RY, RR + 10, 182, 318)}" stroke="${F2}" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="${arc(FX, FY, FR + 14, 214, 320)}" stroke="url(#${u}t)" stroke-width="10" fill="none" stroke-linecap="round"/>

    <!-- luggage rack -->
    <path d="M88 104 L152 96 L154 106 L90 114 Z" fill="${M}"/>
    <g stroke="${G}" stroke-width="1.6" opacity=".5">
      <path d="M104 101 L106 111"/><path d="M122 99 L124 109"/><path d="M140 97 L142 107"/>
    </g>

    <!-- frame -->
    <g stroke="${a}" stroke-width="6.5" stroke-linecap="round" fill="none">
      <path d="M282 92 L224 122 L202 140"/>
      <path d="M282 92 L210 100"/>
      <path d="M210 100 L202 140"/>
    </g>

    <!-- long-travel forks + gaiters -->
    <path d="M284 84 L306 128" stroke="${M2}" stroke-width="9" stroke-linecap="round"/>
    <path d="M304 124 L${FX} ${FY}" stroke="#333B42" stroke-width="7" stroke-linecap="round"/>
    <g stroke="${G}" stroke-width="2" opacity=".55">
      <path d="M288 96 L300 92"/><path d="M292 106 L304 102"/><path d="M296 116 L308 112"/>
    </g>

    <!-- tall flat seat -->
    <path d="M132 104 L198 92 L216 96 L212 110 L178 118 L136 120 Z" fill="${SEAT}"/>

    <!-- tank + shrouds -->
    <path d="M204 108 C 212 82, 244 70, 272 74 L286 90 L282 114 L238 126 L208 124 Z" fill="url(#${u}t)"/>
    <path d="M214 104 C 224 86, 246 78, 266 80" stroke="#fff" stroke-width="3.5"
          fill="none" opacity=".3" stroke-linecap="round"/>
    <path d="M230 125 L284 100 L282 112 L236 128 Z" fill="${G}" opacity=".4"/>

    <!-- round ADV lamp, screen, handguard -->
    <circle cx="300" cy="80" r="20" fill="${F}"/>
    <circle cx="302" cy="80" r="15" fill="url(#${u}g)"/>
    <circle cx="296" cy="74" r="5" fill="#fff" opacity=".75"/>
    <path d="M282 62 A24 24 0 0 1 320 66" stroke="${M2}" stroke-width="3" fill="none"/>
    <path d="M290 58 L304 36 L324 44 L316 68 Z" fill="url(#${u}g)" opacity=".45"/>
    <path d="M290 58 L304 36" stroke="${M2}" stroke-width="2"/>
    <path d="M284 70 L278 52" stroke="${F}" stroke-width="6" stroke-linecap="round"/>
    <path d="M246 48 L314 44" stroke="${F}" stroke-width="6" stroke-linecap="round"/>
    <path d="M242 40 L262 44 L260 58 L240 53 Z" fill="${a}" opacity=".9"/>
    <circle cx="312" cy="44" r="5" fill="${G}"/>`;
  }

  const KINDS = { commuter, sport, cruiser, scooter, adventure };

  /**
   * @param {string} kind   commuter | sport | cruiser | scooter | adventure
   * @param {string} accent brand colour for tank, rims and frame
   */
  function render(kind, accent = '#E11B22') {
    const fn = KINDS[kind] || commuter;
    const u = 'bk' + (++uidN) + '-';
    return `<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img"
              aria-hidden="true">${fn(u, accent)}</svg>`;
  }

  return { render, kinds: Object.keys(KINDS) };
})();

/* ==========================================================================
   SPARE-PART GRAPHICS  —  viewBox 0 0 200 200
   ========================================================================== */
const PartArt = (() => {
  let uidN = 0;

  const base = (inner) =>
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="pm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#8B959D"/><stop offset=".5" stop-color="#525C64"/>
          <stop offset="1" stop-color="#2E353B"/>
        </linearGradient>
        <linearGradient id="pd" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#3A424A"/><stop offset="1" stop-color="#1C2126"/>
        </linearGradient>
        <linearGradient id="pr" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#FF3B33"/><stop offset="1" stop-color="#A8121A"/>
        </linearGradient>
        <linearGradient id="pa" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#FFC64D"/><stop offset="1" stop-color="#D18A00"/>
        </linearGradient>
        <linearGradient id="pb" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#1E2A38"/><stop offset="1" stop-color="#0E1620"/>
        </linearGradient>
      </defs>${inner}</svg>`;

  /* ---- Engine oil bottle ---- */
  const oil = () => base(`
    <path d="M74 44 h52 a6 6 0 0 1 6 6 v8 c22 10 30 26 30 46 v52 a14 14 0 0 1-14 14 H62
             a14 14 0 0 1-14-14 v-52 c0-20 8-36 30-46 v-8 a6 6 0 0 1 6-6z" fill="url(#pa)"/>
    <path d="M74 44 h20 v14 c-14 6 -22 16 -24 28 h-22 c2-20 10-34 26-42z" fill="#fff" opacity=".22"/>
    <rect x="80" y="24" width="40" height="24" rx="4" fill="#2E353B"/>
    <rect x="80" y="24" width="40" height="7" rx="3" fill="#4A535B"/>
    <rect x="52" y="96" width="96" height="52" rx="4" fill="#12161A" opacity=".9"/>
    <path d="M100 106 l11 20 h-22 z" fill="#FFC64D"/>
    <rect x="66" y="130" width="68" height="5" rx="2.5" fill="#FFC64D" opacity=".85"/>
    <rect x="76" y="139" width="48" height="4" rx="2" fill="#FFC64D" opacity=".5"/>
    <rect x="52" y="156" width="96" height="9" rx="3" fill="#12161A" opacity=".55"/>`);

  /* ---- Clutch / brake cable ---- */
  const cable = () => base(`
    <path d="M30 62 C 70 42, 96 96, 132 82 C 158 72, 166 108, 168 136"
          stroke="#22282E" stroke-width="15" fill="none" stroke-linecap="round"/>
    <path d="M30 62 C 70 42, 96 96, 132 82 C 158 72, 166 108, 168 136"
          stroke="url(#pm)" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M30 58 C 68 40, 94 92, 130 78" stroke="#fff" stroke-width="2.4"
          fill="none" opacity=".22"/>
    <g fill="url(#pm)">
      <rect x="16" y="46" width="30" height="30" rx="5"/>
      <rect x="152" y="122" width="32" height="34" rx="5"/>
    </g>
    <rect x="20" y="50" width="22" height="6" rx="3" fill="#fff" opacity=".25"/>
    <circle cx="31" cy="61" r="7" fill="#12161A"/>
    <circle cx="168" cy="139" r="7" fill="#12161A"/>
    <!-- barrel nipple -->
    <rect x="42" y="52" width="14" height="18" rx="4" fill="#8B959D"/>
    <rect x="140" y="118" width="14" height="20" rx="4" fill="#8B959D"/>
    <!-- adjuster threads -->
    <g stroke="#12161A" stroke-width="2" opacity=".55">
      <path d="M46 54 h10"/><path d="M46 60 h10"/><path d="M46 66 h10"/>
    </g>`);

  /* ---- Brake disc + pad ---- */
  const brake = () => base(`
    <circle cx="94" cy="100" r="66" fill="url(#pm)"/>
    <circle cx="94" cy="100" r="66" fill="none" stroke="#12161A" stroke-width="3"/>
    <circle cx="94" cy="100" r="52" fill="none" stroke="#12161A" stroke-width="2" opacity=".6"/>
    <circle cx="94" cy="100" r="30" fill="url(#pd)"/>
    <circle cx="94" cy="100" r="12" fill="#12161A"/>
    <g fill="#12161A">
      <circle cx="94" cy="46" r="6"/><circle cx="140" cy="74" r="6"/>
      <circle cx="140" cy="126" r="6"/><circle cx="94" cy="154" r="6"/>
      <circle cx="48" cy="126" r="6"/><circle cx="48" cy="74" r="6"/>
    </g>
    <g fill="#12161A" opacity=".55">
      <circle cx="118" cy="62" r="4"/><circle cx="130" cy="100" r="4"/>
      <circle cx="118" cy="138" r="4"/><circle cx="70" cy="138" r="4"/>
      <circle cx="58" cy="100" r="4"/><circle cx="70" cy="62" r="4"/>
    </g>
    <path d="M40 62 A66 66 0 0 1 94 34" stroke="#fff" stroke-width="3" fill="none" opacity=".25"/>
    <!-- caliper + pad -->
    <path d="M144 66 h34 a10 10 0 0 1 10 10 v48 a10 10 0 0 1-10 10 h-34 z" fill="url(#pd)"/>
    <rect x="140" y="74" width="10" height="52" rx="3" fill="url(#pr)"/>
    <g stroke="#12161A" stroke-width="2" opacity=".5">
      <path d="M158 82 h22"/><path d="M158 100 h22"/><path d="M158 118 h22"/>
    </g>`);

  /* ---- Chain + sprocket ---- */
  const chain = () => {
    let teeth = '';
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const x = 66 + Math.cos(a) * 56, y = 100 + Math.sin(a) * 56;
      teeth += `<rect x="${(x - 5).toFixed(1)}" y="${(y - 5).toFixed(1)}" width="10" height="10"
                 rx="2" fill="url(#pm)" transform="rotate(${(a * 180 / Math.PI + 45).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    let links = '';
    for (let i = 0; i < 7; i++) {
      links += `<g transform="translate(${132 + i * 0}, ${34 + i * 19})">
          <rect x="0" y="0" width="30" height="13" rx="6" fill="url(#pm)"/>
          <circle cx="7" cy="6.5" r="3" fill="#12161A"/>
          <circle cx="23" cy="6.5" r="3" fill="#12161A"/>
        </g>`;
    }
    return base(`
      ${teeth}
      <circle cx="66" cy="100" r="50" fill="url(#pd)"/>
      <circle cx="66" cy="100" r="50" fill="none" stroke="#12161A" stroke-width="2"/>
      <circle cx="66" cy="100" r="30" fill="#12161A"/>
      <circle cx="66" cy="100" r="16" fill="url(#pm)"/>
      <circle cx="66" cy="100" r="8" fill="#12161A"/>
      <g fill="#12161A">
        <circle cx="66" cy="70" r="5.5"/><circle cx="92" cy="115" r="5.5"/>
        <circle cx="40" cy="115" r="5.5"/><circle cx="92" cy="85" r="5.5"/>
        <circle cx="40" cy="85" r="5.5"/><circle cx="66" cy="130" r="5.5"/>
      </g>
      <path d="M34 72 A50 50 0 0 1 66 50" stroke="#fff" stroke-width="3" fill="none" opacity=".22"/>
      ${links}`);
  };

  /* ---- Air filter ---- */
  const filter = () => {
    let pleats = '';
    for (let i = 0; i < 15; i++) {
      const x = 44 + i * 7.8;
      pleats += `<path d="M${x} 66 L${x + 3.9} 134 L${x + 7.8} 66" stroke="#D9A441"
                  stroke-width="2.6" fill="none" opacity=".9"/>`;
    }
    return base(`
      <rect x="36" y="58" width="128" height="84" rx="10" fill="url(#pd)"/>
      <rect x="42" y="64" width="116" height="72" rx="6" fill="#8A6A22"/>
      ${pleats}
      <rect x="36" y="58" width="128" height="12" rx="6" fill="url(#pm)"/>
      <rect x="36" y="130" width="128" height="12" rx="6" fill="url(#pm)"/>
      <rect x="42" y="61" width="60" height="4" rx="2" fill="#fff" opacity=".25"/>
      <rect x="24" y="82" width="18" height="36" rx="5" fill="url(#pm)"/>
      <rect x="158" y="82" width="18" height="36" rx="5" fill="url(#pm)"/>`);
  };

  /* ---- Spark plug ---- */
  const plug = () => base(`
    <rect x="86" y="18" width="28" height="12" rx="4" fill="url(#pm)"/>
    <path d="M84 30 h32 v46 h-32 z" fill="#C9C2B4"/>
    <path d="M84 30 h10 v46 h-10 z" fill="#fff" opacity=".35"/>
    <g fill="#B5AC9C">
      <rect x="80" y="40" width="40" height="7" rx="3.5"/>
      <rect x="80" y="52" width="40" height="7" rx="3.5"/>
      <rect x="80" y="64" width="40" height="7" rx="3.5"/>
    </g>
    <path d="M78 76 h44 v18 h-44 z" fill="url(#pm)"/>
    <path d="M74 94 l52 0 -6 14 -40 0 z" fill="url(#pm)"/>
    <rect x="82" y="108" width="36" height="34" rx="2" fill="url(#pd)"/>
    <g stroke="#12161A" stroke-width="1.8" opacity=".6">
      <path d="M82 114 h36"/><path d="M82 122 h36"/><path d="M82 130 h36"/><path d="M82 138 h36"/>
    </g>
    <rect x="96" y="142" width="8" height="26" fill="#8B959D"/>
    <path d="M84 142 v18 h12" stroke="#8B959D" stroke-width="7" fill="none" stroke-linejoin="round"/>
    <circle cx="100" cy="166" r="4" fill="#FFC64D" opacity=".85"/>`);

  /* ---- Battery ---- */
  const battery = () => base(`
    <rect x="34" y="52" width="132" height="104" rx="8" fill="url(#pb)"/>
    <rect x="34" y="52" width="132" height="26" rx="8" fill="#2A3B4E"/>
    <rect x="40" y="58" width="60" height="5" rx="2.5" fill="#fff" opacity=".18"/>
    <rect x="52" y="36" width="26" height="20" rx="4" fill="#C0392B"/>
    <rect x="122" y="36" width="26" height="20" rx="4" fill="#2A3036"/>
    <path d="M60 42 h10 M65 38 v9" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <path d="M130 44 h10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
    <rect x="46" y="88" width="108" height="56" rx="4" fill="#0C1218"/>
    <path d="M78 98 l-14 24 h14 l-6 18 20-26 h-14 z" fill="#FFC64D"/>
    <rect x="100" y="102" width="44" height="6" rx="3" fill="#4E86C4"/>
    <rect x="100" y="114" width="34" height="5" rx="2.5" fill="#3A5F86"/>
    <rect x="100" y="124" width="40" height="5" rx="2.5" fill="#3A5F86" opacity=".7"/>
    <rect x="100" y="134" width="26" height="4" rx="2" fill="#3A5F86" opacity=".5"/>`);

  /* ---- Headlight bulb ---- */
  const bulb = () => base(`
    <path d="M100 26 a52 52 0 0 1 34 91 v13 h-68 v-13 a52 52 0 0 1 34-91z" fill="url(#pa)" opacity=".28"/>
    <path d="M100 26 a52 52 0 0 1 34 91 v13 h-68 v-13 a52 52 0 0 1 34-91z" fill="none"
          stroke="#9FB3C2" stroke-width="3"/>
    <path d="M74 46 a44 44 0 0 1 22 -14" stroke="#fff" stroke-width="4" fill="none" opacity=".5"/>
    <path d="M84 106 v-22 a16 16 0 0 1 32 0 v22" stroke="#FFC64D" stroke-width="4" fill="none"/>
    <path d="M84 96 h32" stroke="#FFC64D" stroke-width="3" opacity=".7"/>
    <rect x="64" y="130" width="72" height="14" rx="3" fill="url(#pm)"/>
    <g fill="#6E7A83">
      <rect x="68" y="146" width="64" height="9" rx="3"/>
      <rect x="68" y="157" width="64" height="9" rx="3"/>
    </g>
    <rect x="84" y="168" width="32" height="10" rx="3" fill="#2A3036"/>
    <circle cx="100" cy="60" r="16" fill="#FFC64D" opacity=".35"/>`);

  /* ---- Tyre ---- */
  const tyre = () => {
    let tread = '';
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      const x1 = 100 + Math.cos(a) * 60, y1 = 100 + Math.sin(a) * 60;
      const x2 = 100 + Math.cos(a) * 76, y2 = 100 + Math.sin(a) * 76;
      tread += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}"
                 y2="${y2.toFixed(1)}" stroke="#0C0F11" stroke-width="5" stroke-linecap="round"/>`;
    }
    return base(`
      <circle cx="100" cy="100" r="76" fill="#22272B"/>
      ${tread}
      <circle cx="100" cy="100" r="76" fill="none" stroke="#0C0F11" stroke-width="3"/>
      <circle cx="100" cy="100" r="58" fill="#1A1E21"/>
      <circle cx="100" cy="100" r="46" fill="none" stroke="url(#pm)" stroke-width="7"/>
      <circle cx="100" cy="100" r="38" fill="#0E1113"/>
      <circle cx="100" cy="100" r="14" fill="url(#pm)"/>
      <circle cx="100" cy="100" r="6" fill="#0C0F11"/>
      <g stroke="#6E7A83" stroke-width="4" stroke-linecap="round">
        <path d="M100 100 L100 62"/><path d="M100 100 L132 118"/><path d="M100 100 L68 118"/>
      </g>
      <path d="M56 58 A60 60 0 0 1 100 40" stroke="#fff" stroke-width="3" fill="none" opacity=".16"/>`);
  };

  /* ---- Clutch plate set ---- */
  const clutch = () => {
    let teeth = '';
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const x = 100 + Math.cos(a) * 68, y = 100 + Math.sin(a) * 68;
      teeth += `<rect x="${(x - 6).toFixed(1)}" y="${(y - 5).toFixed(1)}" width="12" height="10"
                 rx="2" fill="url(#pm)"
                 transform="rotate(${(a * 180 / Math.PI).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }
    return base(`
      ${teeth}
      <circle cx="100" cy="100" r="66" fill="url(#pd)"/>
      <circle cx="100" cy="100" r="66" fill="none" stroke="#12161A" stroke-width="2"/>
      <circle cx="100" cy="100" r="52" fill="#4A3B22"/>
      <circle cx="100" cy="100" r="52" fill="none" stroke="#12161A" stroke-width="2"/>
      <g fill="#6B5528">
        <path d="M100 48 a52 52 0 0 1 37 15 l-37 37z"/>
        <path d="M152 100 a52 52 0 0 1-15 37 l-37-37z"/>
        <path d="M100 152 a52 52 0 0 1-37-15 l37-37z"/>
        <path d="M48 100 a52 52 0 0 1 15-37 l37 37z"/>
      </g>
      <circle cx="100" cy="100" r="26" fill="url(#pm)"/>
      <circle cx="100" cy="100" r="14" fill="#12161A"/>
      <g fill="#12161A">
        <circle cx="100" cy="76" r="5"/><circle cx="121" cy="112" r="5"/><circle cx="79" cy="112" r="5"/>
      </g>
      <path d="M62 66 A52 52 0 0 1 100 48" stroke="#fff" stroke-width="3" fill="none" opacity=".2"/>`);
  };

  /* ---- Bearing ---- */
  const bearing = () => {
    let balls = '';
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      balls += `<circle cx="${(100 + Math.cos(a) * 48).toFixed(1)}"
                 cy="${(100 + Math.sin(a) * 48).toFixed(1)}" r="11" fill="url(#pm)"/>
                <circle cx="${(100 + Math.cos(a) * 48 - 3).toFixed(1)}"
                 cy="${(100 + Math.sin(a) * 48 - 3).toFixed(1)}" r="4" fill="#fff" opacity=".4"/>`;
    }
    return base(`
      <circle cx="100" cy="100" r="70" fill="url(#pm)"/>
      <circle cx="100" cy="100" r="60" fill="#15181B"/>
      ${balls}
      <circle cx="100" cy="100" r="36" fill="url(#pm)"/>
      <circle cx="100" cy="100" r="24" fill="#15181B"/>
      <circle cx="100" cy="100" r="70" fill="none" stroke="#12161A" stroke-width="2"/>
      <path d="M56 60 A62 62 0 0 1 100 34" stroke="#fff" stroke-width="3.5" fill="none" opacity=".3"/>`);
  };

  /* ---- Mirror / body part ---- */
  const mirror = () => base(`
    <ellipse cx="112" cy="66" rx="52" ry="36" fill="url(#pd)" transform="rotate(-14 112 66)"/>
    <ellipse cx="112" cy="66" rx="44" ry="29" fill="#9FB8C9" transform="rotate(-14 112 66)"/>
    <path d="M78 52 a44 29 0 0 1 34 -14" stroke="#fff" stroke-width="5" fill="none"
          opacity=".55" transform="rotate(-14 112 66)"/>
    <path d="M84 92 C 74 118, 70 140, 74 164" stroke="url(#pm)" stroke-width="13"
          fill="none" stroke-linecap="round"/>
    <rect x="58" y="158" width="34" height="18" rx="4" fill="url(#pm)"/>
    <g stroke="#12161A" stroke-width="2" opacity=".5">
      <path d="M62 163 h26"/><path d="M62 169 h26"/>
    </g>`);

  /* ---- Horn ---- */
  const horn = () => base(`
    <circle cx="96" cy="100" r="60" fill="url(#pd)"/>
    <circle cx="96" cy="100" r="48" fill="#1A1E21"/>
    <g stroke="url(#pm)" stroke-width="3" fill="none" opacity=".8">
      <circle cx="96" cy="100" r="40"/><circle cx="96" cy="100" r="30"/><circle cx="96" cy="100" r="20"/>
    </g>
    <circle cx="96" cy="100" r="12" fill="url(#pm)"/>
    <circle cx="96" cy="100" r="60" fill="none" stroke="#12161A" stroke-width="3"/>
    <path d="M56 64 A56 56 0 0 1 96 44" stroke="#fff" stroke-width="3" fill="none" opacity=".22"/>
    <path d="M150 84 l24 -10 v52 l-24 -10z" fill="url(#pm)"/>
    <rect x="150" y="92" width="10" height="18" rx="2" fill="#12161A"/>
    <path d="M40 138 l-16 12" stroke="#C0392B" stroke-width="6" stroke-linecap="round"/>
    <path d="M52 150 l-10 16" stroke="#2A3036" stroke-width="6" stroke-linecap="round"/>`);

  /* ---- Generic gasket / seal ---- */
  const seal = () => base(`
    <circle cx="100" cy="100" r="68" fill="#1E2226"/>
    <circle cx="100" cy="100" r="68" fill="none" stroke="url(#pm)" stroke-width="6"/>
    <circle cx="100" cy="100" r="50" fill="#12161A"/>
    <circle cx="100" cy="100" r="50" fill="none" stroke="#3A424A" stroke-width="4"/>
    <circle cx="100" cy="100" r="38" fill="#2A3036"/>
    <circle cx="100" cy="100" r="26" fill="#0C0F11"/>
    <path d="M58 62 A60 60 0 0 1 100 40" stroke="#fff" stroke-width="3" fill="none" opacity=".2"/>
    <g fill="url(#pm)">
      <rect x="96" y="24" width="8" height="14" rx="3"/>
      <rect x="96" y="162" width="8" height="14" rx="3"/>
    </g>`);

  /* ---- Coolant / brake fluid can ---- */
  const fluid = () => base(`
    <path d="M62 56 h76 a10 10 0 0 1 10 10 v92 a10 10 0 0 1-10 10 H62 a10 10 0 0 1-10-10 V66
             a10 10 0 0 1 10-10z" fill="url(#pr)"/>
    <path d="M62 56 h18 v112 h-18 a10 10 0 0 1-10-10 V66 a10 10 0 0 1 10-10z" fill="#fff" opacity=".18"/>
    <rect x="84" y="30" width="32" height="28" rx="4" fill="#2E353B"/>
    <rect x="84" y="30" width="32" height="8" rx="3" fill="#4A535B"/>
    <rect x="62" y="86" width="76" height="52" rx="4" fill="#12161A" opacity=".85"/>
    <path d="M100 96 c 12 14, 18 20, 18 28 a18 18 0 0 1-36 0 c0-8 6-14 18-28z" fill="#7FC8F0" opacity=".9"/>
    <rect x="72" y="146" width="56" height="5" rx="2.5" fill="#fff" opacity=".35"/>
    <rect x="80" y="155" width="40" height="4" rx="2" fill="#fff" opacity=".22"/>`);

  /* ---- Piston with rings and gudgeon pin ---- */
  const piston = () => base(`
    <path d="M62 46 h76 a6 6 0 0 1 6 6 v88 a6 6 0 0 1-6 6 H62 a6 6 0 0 1-6-6 V52
             a6 6 0 0 1 6-6z" fill="url(#pm)"/>
    <path d="M62 46 h20 v100 H62 a6 6 0 0 1-6-6 V52 a6 6 0 0 1 6-6z" fill="#fff" opacity=".18"/>
    <rect x="56" y="48" width="88" height="8" rx="3" fill="#12161A" opacity=".7"/>
    <g fill="#12161A" opacity=".8">
      <rect x="56" y="62" width="88" height="7" rx="2"/>
      <rect x="56" y="74" width="88" height="7" rx="2"/>
      <rect x="56" y="86" width="88" height="5" rx="2"/>
    </g>
    <circle cx="100" cy="116" r="20" fill="#12161A"/>
    <circle cx="100" cy="116" r="13" fill="#0A0D0F"/>
    <path d="M70 150 q30 14 60 0 v-6 H70 z" fill="#12161A" opacity=".55"/>
    <rect x="150" y="104" width="34" height="24" rx="6" fill="url(#pm)"/>
    <circle cx="167" cy="116" r="7" fill="#12161A"/>`);

  /* ---- Inlet / exhaust valve pair ---- */
  const valve = () => base(`
    ${[70, 128].map((x, i) => `
      <g>
        <rect x="${x - 5}" y="26" width="10" height="112" rx="4" fill="url(#pm)"/>
        <rect x="${x - 5}" y="26" width="4" height="112" fill="#fff" opacity=".28"/>
        <rect x="${x - 8}" y="34" width="16" height="5" rx="2" fill="#12161A" opacity=".7"/>
        <rect x="${x - 8}" y="42" width="16" height="5" rx="2" fill="#12161A" opacity=".7"/>
        <path d="M${x - 30} 168 q${30} -34 ${60} 0 z" fill="url(#pm)"/>
        <path d="M${x - 30} 168 q30 -34 60 0" stroke="#12161A" stroke-width="2.5" fill="none"/>
        <ellipse cx="${x}" cy="168" rx="30" ry="7" fill="${i ? '#3A424A' : '#4A535B'}"/>
        <ellipse cx="${x}" cy="167" rx="22" ry="4" fill="#12161A" opacity=".5"/>
      </g>`).join('')}`);

  /* ---- Head gasket ---- */
  const gasket = () => base(`
    <path d="M34 52 h132 a8 8 0 0 1 8 8 v80 a8 8 0 0 1-8 8 H34 a8 8 0 0 1-8-8 V60
             a8 8 0 0 1 8-8z" fill="#2E353B"/>
    <path d="M34 52 h132 a8 8 0 0 1 8 8 v80 a8 8 0 0 1-8 8 H34 a8 8 0 0 1-8-8 V60
             a8 8 0 0 1 8-8z" fill="none" stroke="url(#pm)" stroke-width="4"/>
    <circle cx="82" cy="100" r="34" fill="#12161A"/>
    <circle cx="82" cy="100" r="34" fill="none" stroke="url(#pm)" stroke-width="4"/>
    <g fill="#12161A">
      <circle cx="40" cy="66" r="6"/><circle cx="160" cy="66" r="6"/>
      <circle cx="40" cy="134" r="6"/><circle cx="160" cy="134" r="6"/>
      <circle cx="132" cy="82" r="9"/><circle cx="132" cy="120" r="9"/>
    </g>
    <path d="M34 56 h60" stroke="#fff" stroke-width="3" opacity=".2"/>`);

  /* ---- Camshaft ---- */
  const cam = () => base(`
    <rect x="20" y="88" width="160" height="24" rx="12" fill="url(#pm)"/>
    <rect x="20" y="92" width="160" height="7" rx="3" fill="#fff" opacity=".22"/>
    ${[68, 132].map(x => `
      <path d="M${x} 56 a44 44 0 0 1 0 88 a30 30 0 0 1 0-88z" fill="url(#pd)"/>
      <path d="M${x} 56 a44 44 0 0 1 0 88 a30 30 0 0 1 0-88z" fill="none" stroke="#12161A" stroke-width="2"/>
      <circle cx="${x}" cy="100" r="14" fill="#12161A"/>`).join('')}
    <g fill="#12161A" opacity=".6">
      <rect x="26" y="90" width="4" height="20"/><rect x="34" y="90" width="4" height="20"/>
      <rect x="164" y="90" width="4" height="20"/><rect x="172" y="90" width="4" height="20"/>
    </g>`);

  /* ---- Shock absorber ---- */
  const shock = () => {
    let coil = '';
    for (let i = 0; i < 9; i++) {
      const y = 58 + i * 12;
      coil += `<path d="M66 ${y} Q100 ${y + 10} 134 ${y} Q100 ${y + 16} 66 ${y + 12}"
                stroke="url(#pm)" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    }
    return base(`
      <rect x="92" y="40" width="16" height="130" rx="6" fill="#3A424A"/>
      ${coil}
      <rect x="60" y="28" width="80" height="20" rx="8" fill="url(#pm)"/>
      <rect x="60" y="160" width="80" height="18" rx="8" fill="url(#pm)"/>
      <circle cx="100" cy="26" r="14" fill="url(#pd)"/>
      <circle cx="100" cy="26" r="6" fill="#12161A"/>
      <circle cx="100" cy="176" r="14" fill="url(#pd)"/>
      <circle cx="100" cy="176" r="6" fill="#12161A"/>
      <rect x="64" y="31" width="30" height="5" rx="2" fill="#fff" opacity=".28"/>`);
  };

  /* ---- Body panel / mudguard ---- */
  const panel = () => base(`
    <path d="M28 154 C 28 84, 78 34, 148 34 L172 34 L172 74 L148 74
             C 100 74, 68 106, 68 154 Z" fill="url(#pr)"/>
    <path d="M40 150 C 42 92, 88 46, 146 46" stroke="#fff" stroke-width="5"
          fill="none" opacity=".3" stroke-linecap="round"/>
    <path d="M28 154 h40 v18 a8 8 0 0 1-8 8 H36 a8 8 0 0 1-8-8 z" fill="#2E353B"/>
    <path d="M148 34 h24 v40 h-24 z" fill="#12161A" opacity=".28"/>
    <g fill="#12161A" opacity=".55">
      <circle cx="48" cy="164" r="4"/><circle cx="160" cy="54" r="4"/>
    </g>`);

  /* ---- Brake / clutch lever pair ---- */
  const lever = () => base(`
    ${[[54, 0], [118, 1]].map(([y]) => `
      <path d="M26 ${y} h34 a14 14 0 0 1 14 14 v0 a10 10 0 0 1-10 10
               C 108 ${y + 6} 150 ${y + 12} 176 ${y + 20}
               L172 ${y + 32} C 140 ${y + 24} 100 ${y + 20} 64 ${y + 22}
               a14 14 0 0 1-14-12 z" fill="url(#pm)"/>
      <path d="M70 ${y + 6} C 108 ${y + 10} 146 ${y + 16} 172 ${y + 24}"
            stroke="#fff" stroke-width="2.5" fill="none" opacity=".28"/>
      <circle cx="40" cy="${y + 12}" r="9" fill="#12161A"/>`).join('')}
    <rect x="14" y="48" width="14" height="94" rx="5" fill="#2E353B"/>`);

  const MAP = {
    oil, cable, brake, chain, filter, plug, battery, bulb,
    tyre, clutch, bearing, mirror, horn, seal, fluid,
    piston, valve, gasket, cam, shock, panel, lever
  };

  /* Gradient ids are document-global, so namespace them per instance —
     otherwise every part on a page would paint with the first one's defs. */
  function render(key) {
    const u = 'pt' + (++uidN) + '-';
    return (MAP[key] || seal)()
      .replace(/id="(p[a-z])"/g, `id="${u}$1"`)
      .replace(/url\(#(p[a-z])\)/g, `url(#${u}$1)`);
  }

  return { render, keys: Object.keys(MAP) };
})();
