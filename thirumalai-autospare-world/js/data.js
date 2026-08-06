/* ==========================================================================
   data.js — Catalog
   Brands  →  Bike models  →  Fitment-aware spare parts.

   Parts are generated from templates against every compatible model, so the
   catalog stays consistent and every bike page is fully stocked end-to-end
   (oil, clutch cable, brakes, chain, electricals, body — the lot).
   ========================================================================== */

/* ---------- Deterministic pseudo-random, seeded by SKU ---------- */
function hashOf(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0);
}
/** Stable 0..1 from a seed string + salt */
function rand01(seed, salt = '') {
  return (hashOf(seed + '|' + salt) % 10000) / 10000;
}
function pick(seed, salt, arr) {
  return arr[hashOf(seed + '|' + salt) % arr.length];
}

/* ==========================================================================
   1. BRANDS
   ========================================================================== */
const BRANDS = [
  { id: 'hero',    name: 'Hero',          full: 'Hero MotoCorp',              code: 'HR', color: '#E11B22', since: 1984, blurb: 'The world’s largest two-wheeler manufacturer. Commuters built for Indian roads and Indian mileage.' },
  { id: 'honda',   name: 'Honda',         full: 'Honda Motorcycle & Scooter', code: 'HO', color: '#D42027', since: 1999, blurb: 'Refined engines, bullet-proof reliability. From the Activa to the CB350 — parts for the whole range.' },
  { id: 'yamaha',  name: 'Yamaha',        full: 'India Yamaha Motor',         code: 'YA', color: '#0B4EA2', since: 1985, blurb: 'The Call of the Blue. Sharp-handling street bikes and the R-series track DNA.' },
  { id: 'bajaj',   name: 'Bajaj',         full: 'Bajaj Auto',                 code: 'BJ', color: '#0072BC', since: 1945, blurb: 'Pulsar, Platina, Dominar. Value-first engineering with performance in the DNA.' },
  { id: 'tvs',     name: 'TVS',           full: 'TVS Motor Company',          code: 'TV', color: '#1B4E9B', since: 1978, blurb: 'Race-bred Apache, city-smart Jupiter and Ntorq. Built in Hosur, ridden everywhere.' },
  { id: 're',      name: 'Royal Enfield', full: 'Royal Enfield',              code: 'RE', color: '#B8912F', since: 1955, blurb: 'Thump, torque and character. Classic, Bullet, Meteor, Hunter and Himalayan spares.' },
  { id: 'suzuki',  name: 'Suzuki',        full: 'Suzuki Motorcycle India',    code: 'SZ', color: '#00539F', since: 1997, blurb: 'Gixxer sharpness and Access practicality — Japanese build, Indian pricing.' },
  { id: 'ktm',     name: 'KTM',           full: 'KTM India (Bajaj)',          code: 'KT', color: '#FF6600', since: 2012, blurb: 'Ready to Race. Duke and RC spares for riders who use the whole rev range.' }
];

/* ==========================================================================
   2. MODELS
   kind: commuter | sport | cruiser | scooter | adventure
   ========================================================================== */
const MODELS = [
  /* ---- HERO ---- */
  { id: 'splendor-plus',   brand: 'hero',  name: 'Splendor Plus',    cc: 97,  kind: 'commuter',  years: '2005 – Present', power: '7.9 bhp',  torque: '8.05 Nm',  mileage: '70 kmpl', brake: 'drum',  tyreF: '2.75-18', tyreR: '2.75-18' },
  { id: 'hf-deluxe',       brand: 'hero',  name: 'HF Deluxe',        cc: 97,  kind: 'commuter',  years: '2008 – Present', power: '7.9 bhp',  torque: '8.05 Nm',  mileage: '72 kmpl', brake: 'drum',  tyreF: '2.75-18', tyreR: '2.75-18' },
  { id: 'passion-pro',     brand: 'hero',  name: 'Passion Pro',      cc: 113, kind: 'commuter',  years: '2010 – Present', power: '9.1 bhp',  torque: '9.79 Nm',  mileage: '60 kmpl', brake: 'disc',  tyreF: '80/100-18', tyreR: '80/100-18' },
  { id: 'super-splendor',  brand: 'hero',  name: 'Super Splendor',   cc: 124, kind: 'commuter',  years: '2005 – Present', power: '10.7 bhp', torque: '10.6 Nm',  mileage: '65 kmpl', brake: 'disc',  tyreF: '80/100-18', tyreR: '80/100-18' },
  { id: 'glamour-125',     brand: 'hero',  name: 'Glamour 125',      cc: 124, kind: 'commuter',  years: '2005 – Present', power: '10.7 bhp', torque: '10.6 Nm',  mileage: '63 kmpl', brake: 'disc',  tyreF: '80/100-18', tyreR: '80/100-18' },
  { id: 'xtreme-160r',     brand: 'hero',  name: 'Xtreme 160R',      cc: 163, kind: 'sport',     years: '2020 – Present', power: '15 bhp',   torque: '14 Nm',    mileage: '45 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '130/70-17' },
  { id: 'xpulse-200-4v',   brand: 'hero',  name: 'Xpulse 200 4V',    cc: 199, kind: 'adventure', years: '2021 – Present', power: '18.9 bhp', torque: '17.35 Nm', mileage: '40 kmpl', brake: 'disc',  tyreF: '90/90-21', tyreR: '120/80-18' },
  { id: 'pleasure-plus',   brand: 'hero',  name: 'Pleasure+ 110',    cc: 110, kind: 'scooter',   years: '2019 – Present', power: '8 bhp',    torque: '8.7 Nm',   mileage: '52 kmpl', brake: 'drum',  tyreF: '90/100-10', tyreR: '90/100-10' },
  { id: 'destini-125',     brand: 'hero',  name: 'Destini 125',      cc: 124, kind: 'scooter',   years: '2018 – Present', power: '9 bhp',    torque: '10.4 Nm',  mileage: '50 kmpl', brake: 'drum',  tyreF: '90/90-12', tyreR: '90/100-10' },
  { id: 'maestro-edge-125',brand: 'hero',  name: 'Maestro Edge 125', cc: 124, kind: 'scooter',   years: '2019 – Present', power: '9 bhp',    torque: '10.4 Nm',  mileage: '48 kmpl', brake: 'disc',  tyreF: '90/90-12', tyreR: '90/100-10' },

  /* ---- HONDA ---- */
  { id: 'shine-125',       brand: 'honda', name: 'Shine 125',        cc: 124, kind: 'commuter',  years: '2006 – Present', power: '10.6 bhp', torque: '11 Nm',    mileage: '65 kmpl', brake: 'disc',  tyreF: '80/100-18', tyreR: '80/100-18' },
  { id: 'sp-125',          brand: 'honda', name: 'SP 125',           cc: 124, kind: 'commuter',  years: '2019 – Present', power: '10.7 bhp', torque: '10.9 Nm',  mileage: '65 kmpl', brake: 'disc',  tyreF: '80/100-18', tyreR: '80/100-18' },
  { id: 'livo-110',        brand: 'honda', name: 'Livo 110',         cc: 109, kind: 'commuter',  years: '2015 – Present', power: '8.7 bhp',  torque: '9.3 Nm',   mileage: '68 kmpl', brake: 'drum',  tyreF: '80/100-18', tyreR: '80/100-18' },
  { id: 'unicorn-160',     brand: 'honda', name: 'Unicorn 160',      cc: 162, kind: 'commuter',  years: '2004 – Present', power: '12.7 bhp', torque: '14.6 Nm',  mileage: '50 kmpl', brake: 'disc',  tyreF: '80/100-17', tyreR: '110/80-17' },
  { id: 'hornet-2-0',      brand: 'honda', name: 'Hornet 2.0',       cc: 184, kind: 'sport',     years: '2020 – Present', power: '17 bhp',   torque: '15.9 Nm',  mileage: '42 kmpl', brake: 'disc',  tyreF: '110/70-17', tyreR: '140/70-17' },
  { id: 'cb350-hness',     brand: 'honda', name: "CB350 H'ness",     cc: 348, kind: 'cruiser',   years: '2020 – Present', power: '20.8 bhp', torque: '30 Nm',    mileage: '38 kmpl', brake: 'disc',  tyreF: '100/90-19', tyreR: '130/70-18' },
  { id: 'cb300f',          brand: 'honda', name: 'CB300F',           cc: 293, kind: 'sport',     years: '2022 – Present', power: '24.5 bhp', torque: '25.6 Nm',  mileage: '35 kmpl', brake: 'disc',  tyreF: '110/70-17', tyreR: '150/60-17' },
  { id: 'activa-6g',       brand: 'honda', name: 'Activa 6G',        cc: 109, kind: 'scooter',   years: '2020 – Present', power: '7.7 bhp',  torque: '8.8 Nm',   mileage: '50 kmpl', brake: 'drum',  tyreF: '90/90-12', tyreR: '90/100-10' },
  { id: 'dio-125',         brand: 'honda', name: 'Dio 125',          cc: 124, kind: 'scooter',   years: '2023 – Present', power: '8.2 bhp',  torque: '10.4 Nm',  mileage: '48 kmpl', brake: 'disc',  tyreF: '90/90-12', tyreR: '90/100-10' },
  { id: 'grazia-125',      brand: 'honda', name: 'Grazia 125',       cc: 124, kind: 'scooter',   years: '2018 – Present', power: '8.2 bhp',  torque: '10.3 Nm',  mileage: '47 kmpl', brake: 'disc',  tyreF: '90/90-12', tyreR: '90/100-10' },

  /* ---- YAMAHA ---- */
  { id: 'fz-s-fi-v4',      brand: 'yamaha',name: 'FZ-S FI V4',       cc: 149, kind: 'sport',     years: '2021 – Present', power: '12.4 bhp', torque: '13.3 Nm',  mileage: '48 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '140/60-17' },
  { id: 'fz-x',            brand: 'yamaha',name: 'FZ-X',             cc: 149, kind: 'sport',     years: '2021 – Present', power: '12.4 bhp', torque: '13.3 Nm',  mileage: '45 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '140/60-17' },
  { id: 'mt-15-v2',        brand: 'yamaha',name: 'MT-15 V2',         cc: 155, kind: 'sport',     years: '2022 – Present', power: '18.1 bhp', torque: '14.1 Nm',  mileage: '45 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '140/70-17' },
  { id: 'r15-v4',          brand: 'yamaha',name: 'YZF-R15 V4',       cc: 155, kind: 'sport',     years: '2021 – Present', power: '18.1 bhp', torque: '14.2 Nm',  mileage: '45 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '140/70-17' },
  { id: 'fz25',            brand: 'yamaha',name: 'FZ25',             cc: 249, kind: 'sport',     years: '2017 – Present', power: '20.8 bhp', torque: '20.1 Nm',  mileage: '40 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '140/70-17' },
  { id: 'fascino-125',     brand: 'yamaha',name: 'Fascino 125 Fi',   cc: 125, kind: 'scooter',   years: '2020 – Present', power: '8.2 bhp',  torque: '10.3 Nm',  mileage: '55 kmpl', brake: 'drum',  tyreF: '90/90-12', tyreR: '110/90-10' },
  { id: 'rayzr-125',       brand: 'yamaha',name: 'RayZR 125 Fi',     cc: 125, kind: 'scooter',   years: '2020 – Present', power: '8.2 bhp',  torque: '10.3 Nm',  mileage: '55 kmpl', brake: 'drum',  tyreF: '90/90-12', tyreR: '110/90-10' },
  { id: 'saluto-rx',       brand: 'yamaha',name: 'Saluto RX 110',    cc: 110, kind: 'commuter',  years: '2016 – 2021',    power: '7.4 bhp',  torque: '8.5 Nm',   mileage: '68 kmpl', brake: 'drum',  tyreF: '2.75-18', tyreR: '2.75-18' },

  /* ---- BAJAJ ---- */
  { id: 'pulsar-150',      brand: 'bajaj', name: 'Pulsar 150',       cc: 149, kind: 'sport',     years: '2001 – Present', power: '13.8 bhp', torque: '13.25 Nm', mileage: '50 kmpl', brake: 'disc',  tyreF: '80/100-17', tyreR: '100/90-17' },
  { id: 'pulsar-ns200',    brand: 'bajaj', name: 'Pulsar NS200',     cc: 199, kind: 'sport',     years: '2012 – Present', power: '24.1 bhp', torque: '18.7 Nm',  mileage: '38 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '130/70-17' },
  { id: 'pulsar-n160',     brand: 'bajaj', name: 'Pulsar N160',      cc: 164, kind: 'sport',     years: '2022 – Present', power: '15.7 bhp', torque: '14.65 Nm', mileage: '45 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '130/70-17' },
  { id: 'platina-110',     brand: 'bajaj', name: 'Platina 110 ABS',  cc: 115, kind: 'commuter',  years: '2019 – Present', power: '8.5 bhp',  torque: '9.81 Nm',  mileage: '70 kmpl', brake: 'disc',  tyreF: '80/100-17', tyreR: '80/100-17' },
  { id: 'ct-110x',         brand: 'bajaj', name: 'CT 110X',          cc: 115, kind: 'commuter',  years: '2021 – Present', power: '8.5 bhp',  torque: '9.81 Nm',  mileage: '70 kmpl', brake: 'drum',  tyreF: '2.75-17', tyreR: '3.00-17' },
  { id: 'avenger-220',     brand: 'bajaj', name: 'Avenger Cruise 220',cc: 220,kind: 'cruiser',   years: '2005 – Present', power: '18.8 bhp', torque: '17.5 Nm',  mileage: '40 kmpl', brake: 'disc',  tyreF: '90/90-17', tyreR: '130/90-15' },
  { id: 'dominar-400',     brand: 'bajaj', name: 'Dominar 400',      cc: 373, kind: 'adventure', years: '2016 – Present', power: '39.4 bhp', torque: '35 Nm',    mileage: '30 kmpl', brake: 'disc',  tyreF: '110/70-17', tyreR: '150/60-17' },

  /* ---- TVS ---- */
  { id: 'apache-rtr-160-4v',brand: 'tvs',  name: 'Apache RTR 160 4V',cc: 159, kind: 'sport',     years: '2018 – Present', power: '17.3 bhp', torque: '14.7 Nm',  mileage: '45 kmpl', brake: 'disc',  tyreF: '90/90-17', tyreR: '130/70-17' },
  { id: 'apache-rtr-200-4v',brand: 'tvs',  name: 'Apache RTR 200 4V',cc: 197, kind: 'sport',     years: '2016 – Present', power: '20.2 bhp', torque: '17.25 Nm', mileage: '40 kmpl', brake: 'disc',  tyreF: '90/90-17', tyreR: '130/70-17' },
  { id: 'raider-125',      brand: 'tvs',   name: 'Raider 125',       cc: 124, kind: 'commuter',  years: '2021 – Present', power: '11.2 bhp', torque: '11.2 Nm',  mileage: '67 kmpl', brake: 'disc',  tyreF: '80/100-17', tyreR: '100/90-17' },
  { id: 'sport-100',       brand: 'tvs',   name: 'Sport 100',        cc: 99,  kind: 'commuter',  years: '2013 – Present', power: '7.4 bhp',  torque: '7.8 Nm',   mileage: '73 kmpl', brake: 'drum',  tyreF: '2.75-17', tyreR: '3.00-17' },
  { id: 'radeon-110',      brand: 'tvs',   name: 'Radeon 110',       cc: 109, kind: 'commuter',  years: '2018 – Present', power: '8.1 bhp',  torque: '8.7 Nm',   mileage: '69 kmpl', brake: 'drum',  tyreF: '2.75-17', tyreR: '3.00-17' },
  { id: 'jupiter-110',     brand: 'tvs',   name: 'Jupiter 110',      cc: 113, kind: 'scooter',   years: '2013 – Present', power: '7.9 bhp',  torque: '9.8 Nm',   mileage: '50 kmpl', brake: 'disc',  tyreF: '90/90-12', tyreR: '90/90-12' },
  { id: 'ntorq-125',       brand: 'tvs',   name: 'NTORQ 125',        cc: 124, kind: 'scooter',   years: '2018 – Present', power: '9.4 bhp',  torque: '10.5 Nm',  mileage: '47 kmpl', brake: 'disc',  tyreF: '100/80-12', tyreR: '110/80-12' },

  /* ---- ROYAL ENFIELD ---- */
  { id: 'classic-350',     brand: 're',    name: 'Classic 350',      cc: 349, kind: 'cruiser',   years: '2021 – Present', power: '20.2 bhp', torque: '27 Nm',    mileage: '35 kmpl', brake: 'disc',  tyreF: '100/90-19', tyreR: '120/80-18' },
  { id: 'bullet-350',      brand: 're',    name: 'Bullet 350',       cc: 349, kind: 'cruiser',   years: '2023 – Present', power: '20.2 bhp', torque: '27 Nm',    mileage: '36 kmpl', brake: 'disc',  tyreF: '100/90-19', tyreR: '120/80-18' },
  { id: 'hunter-350',      brand: 're',    name: 'Hunter 350',       cc: 349, kind: 'cruiser',   years: '2022 – Present', power: '20.2 bhp', torque: '27 Nm',    mileage: '36 kmpl', brake: 'disc',  tyreF: '110/70-17', tyreR: '140/70-17' },
  { id: 'meteor-350',      brand: 're',    name: 'Meteor 350',       cc: 349, kind: 'cruiser',   years: '2020 – Present', power: '20.2 bhp', torque: '27 Nm',    mileage: '35 kmpl', brake: 'disc',  tyreF: '100/90-19', tyreR: '140/70-17' },
  { id: 'himalayan-411',   brand: 're',    name: 'Himalayan 411',    cc: 411, kind: 'adventure', years: '2016 – 2023',    power: '24.3 bhp', torque: '32 Nm',    mileage: '30 kmpl', brake: 'disc',  tyreF: '90/90-21', tyreR: '120/90-17' },
  { id: 'interceptor-650', brand: 're',    name: 'Interceptor 650',  cc: 648, kind: 'cruiser',   years: '2018 – Present', power: '47 bhp',   torque: '52 Nm',    mileage: '25 kmpl', brake: 'disc',  tyreF: '100/90-18', tyreR: '130/70-18' },

  /* ---- SUZUKI ---- */
  { id: 'gixxer-155',      brand: 'suzuki',name: 'Gixxer 155',       cc: 155, kind: 'sport',     years: '2014 – Present', power: '13.6 bhp', torque: '13.8 Nm',  mileage: '45 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '140/60-17' },
  { id: 'gixxer-sf-155',   brand: 'suzuki',name: 'Gixxer SF 155',    cc: 155, kind: 'sport',     years: '2015 – Present', power: '13.6 bhp', torque: '13.8 Nm',  mileage: '45 kmpl', brake: 'disc',  tyreF: '100/80-17', tyreR: '140/60-17' },
  { id: 'access-125',      brand: 'suzuki',name: 'Access 125',       cc: 124, kind: 'scooter',   years: '2007 – Present', power: '8.7 bhp',  torque: '10 Nm',    mileage: '52 kmpl', brake: 'disc',  tyreF: '90/90-12', tyreR: '90/100-10' },
  { id: 'burgman-125',     brand: 'suzuki',name: 'Burgman Street 125',cc: 124,kind: 'scooter',   years: '2018 – Present', power: '8.7 bhp',  torque: '10 Nm',    mileage: '50 kmpl', brake: 'disc',  tyreF: '90/90-12', tyreR: '90/100-10' },
  { id: 'v-strom-sx-250',  brand: 'suzuki',name: 'V-Strom SX 250',   cc: 249, kind: 'adventure', years: '2022 – Present', power: '26.1 bhp', torque: '22.2 Nm',  mileage: '38 kmpl', brake: 'disc',  tyreF: '100/80-19', tyreR: '140/70-17' },

  /* ---- KTM ---- */
  { id: 'duke-200',        brand: 'ktm',   name: '200 Duke',         cc: 199, kind: 'sport',     years: '2012 – Present', power: '24.6 bhp', torque: '19.3 Nm',  mileage: '35 kmpl', brake: 'disc',  tyreF: '110/70-17', tyreR: '150/60-17' },
  { id: 'duke-250',        brand: 'ktm',   name: '250 Duke',         cc: 248, kind: 'sport',     years: '2017 – Present', power: '30 bhp',   torque: '24 Nm',    mileage: '32 kmpl', brake: 'disc',  tyreF: '110/70-17', tyreR: '150/60-17' },
  { id: 'duke-390',        brand: 'ktm',   name: '390 Duke',         cc: 399, kind: 'sport',     years: '2013 – Present', power: '45.3 bhp', torque: '39 Nm',    mileage: '28 kmpl', brake: 'disc',  tyreF: '110/70-17', tyreR: '150/60-17' },
  { id: 'rc-200',          brand: 'ktm',   name: 'RC 200',           cc: 199, kind: 'sport',     years: '2014 – Present', power: '24.6 bhp', torque: '19.2 Nm',  mileage: '35 kmpl', brake: 'disc',  tyreF: '110/70-17', tyreR: '150/60-17' }
];

/* ==========================================================================
   3. CATEGORIES
   ========================================================================== */
const CATEGORIES = [
  { id: 'engine',     name: 'Engine & Oil',       short: 'Engine',     art: 'oil',     blurb: 'Oils, pistons, gaskets, valves' },
  { id: 'clutch',     name: 'Clutch & Cables',    short: 'Clutch',     art: 'cable',   blurb: 'Plates, cables, levers' },
  { id: 'brakes',     name: 'Brake System',       short: 'Brakes',     art: 'brake',   blurb: 'Pads, shoes, discs, fluid' },
  { id: 'drive',      name: 'Chain & Sprocket',   short: 'Drive',      art: 'chain',   blurb: 'Chain kits, belts, rollers' },
  { id: 'filters',    name: 'Filters',            short: 'Filters',    art: 'filter',  blurb: 'Air, oil and fuel filters' },
  { id: 'electrical', name: 'Electricals',        short: 'Electrical', art: 'plug',    blurb: 'Plugs, CDI, coils, battery' },
  { id: 'lighting',   name: 'Lighting & Horn',    short: 'Lighting',   art: 'bulb',    blurb: 'Headlamps, indicators, horns' },
  { id: 'suspension', name: 'Suspension',         short: 'Suspension', art: 'seal',    blurb: 'Forks, shockers, seals' },
  { id: 'tyres',      name: 'Tyres & Tubes',      short: 'Tyres',      art: 'tyre',    blurb: 'Front, rear, tubes' },
  { id: 'bearings',   name: 'Bearings & Seals',   short: 'Bearings',   art: 'bearing', blurb: 'Wheel, steering, oil seals' },
  { id: 'body',       name: 'Body & Mirrors',     short: 'Body',       art: 'mirror',  blurb: 'Panels, mirrors, grips' }
];

/* ==========================================================================
   4. PART TEMPLATES
   scope   : 'model'      → one SKU per compatible bike
             'universal'  → single SKU, fits every bike
   only    : restrict to these bike kinds
   exclude : skip these bike kinds
   needs   : 'disc' → only bikes with a disc brake
   base    : base price (₹)
   ccRate  : ₹ added per cc  (so a 650 costs more than a 100)
   ========================================================================== */
const PART_TEMPLATES = [
  /* ---------- ENGINE ---------- */
  { key: 'eng-oil-10w30',  cat: 'engine', scope: 'universal', name: 'Engine Oil 10W-30 API SL — 900 ML',      makers: ['Castrol'],  base: 465, art: 'oil',   tags: ['bestseller'], desc: 'Semi-synthetic 4T engine oil for 100–150cc motorcycles. Protects against wear at high RPM and holds viscosity through Indian summer traffic.' },
  { key: 'eng-oil-20w40',  cat: 'engine', scope: 'universal', name: 'Engine Oil 20W-40 API SL — 1 L',         makers: ['Servo'],    base: 520, art: 'oil',   desc: 'Mineral 4T oil for higher-displacement and older engines. JASO MA2 rated for wet clutch operation.' },
  { key: 'eng-oil-syn',    cat: 'engine', scope: 'universal', name: 'Fully Synthetic 10W-40 4T — 1 L',        makers: ['Motul'],    base: 1150, art: 'oil',  tags: ['premium'], desc: 'Ester-based fully synthetic. Recommended for KTM, Duke, RC and performance 200cc+ engines running hard.' },
  { key: 'gear-oil',       cat: 'engine', scope: 'universal', name: 'Scooter Gear Oil 80W-90 — 130 ML',       makers: ['Shell'],    base: 145, art: 'oil',   only: ['scooter'], desc: 'Final-drive gear oil for CVT scooters. Change every 6,000 km.' },
  { key: 'piston-kit',     cat: 'engine', scope: 'model', name: 'Piston Kit with Rings & Pin',                makers: ['Shriram Pistons', 'Goetze', 'Uma'], base: 780, ccRate: 4.2, art: 'piston', desc: 'Complete piston assembly — piston, ring set, gudgeon pin and circlips. Machined to OEM bore tolerance.' },
  { key: 'ring-set',       cat: 'engine', scope: 'model', name: 'Piston Ring Set (STD)',                      makers: ['IP Rings', 'Goetze'], base: 340, ccRate: 1.4, art: 'piston', desc: 'Chrome-faced top ring, taper second ring and 3-piece oil control ring.' },
  { key: 'gasket-full',    cat: 'engine', scope: 'model', name: 'Full Engine Gasket Set',                     makers: ['Uma', 'Talbros'], base: 420, ccRate: 1.9, art: 'gasket', desc: 'Head, block, cover and crankcase gaskets in one kit. Non-asbestos, oil resistant.' },
  { key: 'head-gasket',    cat: 'engine', scope: 'model', name: 'Cylinder Head Gasket',                       makers: ['Talbros', 'Uma'], base: 190, ccRate: 0.8, art: 'gasket', desc: 'Multi-layer steel head gasket, resists blow-by at high compression.' },
  { key: 'valve-set',      cat: 'engine', scope: 'model', name: 'Inlet & Exhaust Valve Set',                  makers: ['Uma', 'Rane'], base: 460, ccRate: 1.6, art: 'valve', desc: 'Hardened stem valves, ground and lapped. Sold as a matched inlet + exhaust pair.' },
  { key: 'camshaft',       cat: 'engine', scope: 'model', name: 'Camshaft Assembly',                          makers: ['Uma', 'Endurance'], base: 1250, ccRate: 4.5, art: 'cam', desc: 'Chilled-cast camshaft with decompressor. Profile matched to stock ECU / carb mapping.' },
  { key: 'cyl-block',      cat: 'engine', scope: 'model', name: 'Cylinder Block Assembly',                    makers: ['Uma', 'Menon'], base: 1650, ccRate: 6.5, art: 'piston', desc: 'Cast-iron sleeve cylinder block, honed and ready to fit. Supplied with base gasket.' },

  /* ---------- CLUTCH & CABLES ---------- */
  { key: 'clutch-cable',   cat: 'clutch', scope: 'model', name: 'Clutch Cable Assembly',                      makers: ['Zadon', 'Cifer', 'Endurance'], base: 175, ccRate: 0.35, art: 'cable', exclude: ['scooter'], tags: ['bestseller'], desc: 'Teflon-lined inner wire in a PVC-sheathed outer casing. Zinc-plated barrel nipples, pre-lubricated for a light lever pull.' },
  { key: 'accel-cable',    cat: 'clutch', scope: 'model', name: 'Accelerator / Throttle Cable',               makers: ['Zadon', 'Cifer'], base: 165, ccRate: 0.3, art: 'cable', desc: 'Twin-strand throttle cable with adjuster barrel. Smooth return, no slack build-up.' },
  { key: 'speedo-cable',   cat: 'clutch', scope: 'model', name: 'Speedometer Cable',                          makers: ['Cifer', 'Zadon'], base: 135, ccRate: 0.15, art: 'cable', desc: 'Square-drive inner cable with nylon liner. Eliminates needle flutter.' },
  { key: 'choke-cable',    cat: 'clutch', scope: 'model', name: 'Choke Cable',                                makers: ['Cifer'], base: 125, ccRate: 0.12, art: 'cable', exclude: ['scooter'], desc: 'Cold-start choke cable with knurled knob. Direct OEM replacement.' },
  { key: 'clutch-plate',   cat: 'clutch', scope: 'model', name: 'Clutch Friction Plate Set',                  makers: ['Setco', 'Clutch Auto', 'Uma'], base: 520, ccRate: 2.4, art: 'clutch', exclude: ['scooter'], tags: ['bestseller'], desc: 'Paper-based friction plates with steel separators. Consistent bite point, resists slip under load.' },
  { key: 'clutch-spring',  cat: 'clutch', scope: 'model', name: 'Clutch Spring Set (4 pc)',                   makers: ['Uma', 'Zadon'], base: 145, ccRate: 0.5, art: 'shock', exclude: ['scooter'], desc: 'Heat-treated chrome-silicon springs. Restores clamp load on a slipping clutch.' },
  { key: 'pressure-plate', cat: 'clutch', scope: 'model', name: 'Clutch Pressure Plate',                       makers: ['Setco', 'Uma'], base: 610, ccRate: 2.1, art: 'clutch', exclude: ['scooter'], desc: 'Precision-ground pressure plate, balanced to reduce judder on take-off.' },
  { key: 'clutch-lever',   cat: 'clutch', scope: 'model', name: 'Clutch & Brake Lever Pair',                   makers: ['Zadon', 'Varroc'], base: 230, ccRate: 0.5, art: 'lever', exclude: ['scooter'], desc: 'Die-cast aluminium levers with polished pivot bores. Sold as a matched pair.' },
  { key: 'cvt-belt',       cat: 'drive',  scope: 'model', name: 'CVT Drive Belt',                              makers: ['Gates', 'Bando'], base: 690, ccRate: 1.6, art: 'chain', only: ['scooter'], tags: ['bestseller'], desc: 'Aramid-corded V-belt for CVT scooters. Replace every 20,000–24,000 km for a crisp pick-up.' },
  { key: 'roller-set',     cat: 'drive',  scope: 'model', name: 'Variator Roller Weight Set (6 pc)',           makers: ['Uma', 'Zadon'], base: 320, ccRate: 0.8, art: 'bearing', only: ['scooter'], desc: 'Balanced roller weights to OEM spec. Worn rollers cause juddering and poor top speed.' },
  { key: 'clutch-shoe',    cat: 'drive',  scope: 'model', name: 'Centrifugal Clutch Shoe Set',                 makers: ['Setco', 'Uma'], base: 540, ccRate: 1.5, art: 'clutch', only: ['scooter'], desc: 'Three-shoe centrifugal clutch assembly with springs. Fixes slipping take-off and burning smell.' },

  /* ---------- BRAKES ---------- */
  { key: 'brake-pad-f',    cat: 'brakes', scope: 'model', name: 'Front Disc Brake Pad Set',                    makers: ['TVS Girling', 'Endurance', 'Bosch'], base: 380, ccRate: 1.1, art: 'brake', needs: 'disc', tags: ['bestseller'], desc: 'Semi-metallic friction compound with a chamfered, slotted face — quiet bedding-in and strong cold bite in the wet.' },
  { key: 'brake-shoe-r',   cat: 'brakes', scope: 'model', name: 'Rear Brake Shoe Set',                         makers: ['TVS Girling', 'Endurance'], base: 285, ccRate: 0.7, art: 'brake', desc: 'Riveted non-asbestos lining on a rigid steel shoe. Comes with return springs.' },
  { key: 'brake-disc',     cat: 'brakes', scope: 'model', name: 'Front Brake Disc Rotor',                       makers: ['Endurance', 'Brakes India'], base: 1250, ccRate: 3.4, art: 'brake', needs: 'disc', desc: 'Laser-cut stainless rotor, drilled for heat dissipation. Run-out held under 0.10 mm.' },
  { key: 'caliper-kit',    cat: 'brakes', scope: 'model', name: 'Brake Caliper Seal & Piston Kit',              makers: ['Endurance', 'Bosch'], base: 480, ccRate: 1.5, art: 'seal', needs: 'disc', desc: 'Piston, dust boot and square-section seals. The fix for a dragging or seized caliper.' },
  { key: 'master-cyl',     cat: 'brakes', scope: 'model', name: 'Front Brake Master Cylinder Assembly',         makers: ['Endurance', 'Brakes India'], base: 1420, ccRate: 3.2, art: 'lever', needs: 'disc', desc: 'Complete master cylinder with lever, reservoir and diaphragm. Bleed and go.' },
  { key: 'brake-cable',    cat: 'brakes', scope: 'model', name: 'Rear Brake Cable',                             makers: ['Zadon', 'Cifer'], base: 155, ccRate: 0.25, art: 'cable', desc: 'Galvanised inner wire with adjuster nut. Direct fit, no trimming needed.' },
  { key: 'brake-fluid',    cat: 'brakes', scope: 'universal', name: 'Brake Fluid DOT 4 — 500 ML',               makers: ['Bosch'], base: 340, art: 'fluid', desc: 'High boiling point glycol-ether fluid for disc systems. Change every two years.' },

  /* ---------- DRIVE ---------- */
  { key: 'chain-kit',      cat: 'drive', scope: 'model', name: 'Chain Sprocket Kit (Chain + F/R Sprocket)',     makers: ['Rolon', 'IndoChain', 'Diamond'], base: 1150, ccRate: 3.1, art: 'chain', exclude: ['scooter'], tags: ['bestseller'], desc: 'Complete drive kit — heat-treated chain with induction-hardened front and rear sprockets. Replacing all three together is the only way to get full life out of the set.' },
  { key: 'drive-chain',    cat: 'drive', scope: 'model', name: 'Drive Chain (O-Ring)',                          makers: ['Rolon', 'IndoChain'], base: 690, ccRate: 1.9, art: 'chain', exclude: ['scooter'], desc: 'Sealed O-ring chain that keeps factory grease in and road grit out. Far longer service life than a plain chain.' },
  { key: 'rear-sprocket',  cat: 'drive', scope: 'model', name: 'Rear Sprocket',                                 makers: ['Rolon', 'Diamond'], base: 420, ccRate: 1.2, art: 'chain', exclude: ['scooter'], desc: 'Carbon-steel sprocket, induction hardened on the tooth face. OEM tooth count.' },
  { key: 'front-sprocket', cat: 'drive', scope: 'model', name: 'Front Drive Sprocket',                          makers: ['Rolon', 'Diamond'], base: 245, ccRate: 0.7, art: 'chain', exclude: ['scooter'], desc: 'Splined countershaft sprocket with retaining plate.' },

  /* ---------- FILTERS ---------- */
  { key: 'air-filter',     cat: 'filters', scope: 'model', name: 'Air Filter Element',                          makers: ['Elofic', 'Purolator', 'Bosch'], base: 245, ccRate: 0.6, art: 'filter', tags: ['bestseller'], desc: 'Pleated dry element with high dust-holding capacity. A clogged filter is the single most common cause of poor mileage.' },
  { key: 'oil-filter',     cat: 'filters', scope: 'model', name: 'Oil Filter',                                  makers: ['Elofic', 'Purolator'], base: 165, ccRate: 0.4, art: 'filter', desc: 'Full-flow filter with anti-drainback valve. Change with every second oil service.' },
  { key: 'fuel-filter',    cat: 'filters', scope: 'universal', name: 'Inline Petrol Filter (Universal)',        makers: ['Elofic'], base: 95, art: 'filter', desc: 'Transparent inline fuel filter, 6 mm barbs. Fits most carburettor bikes.' },

  /* ---------- ELECTRICAL ---------- */
  { key: 'spark-plug',     cat: 'electrical', scope: 'model', name: 'Spark Plug',                               makers: ['NGK', 'Bosch', 'Champion'], base: 185, ccRate: 0.5, art: 'plug', tags: ['bestseller'], desc: 'Nickel-alloy centre electrode with the correct heat range for this engine. Gap set at the factory.' },
  { key: 'iridium-plug',   cat: 'electrical', scope: 'model', name: 'Iridium Spark Plug',                       makers: ['NGK'], base: 640, ccRate: 1.2, art: 'plug', tags: ['premium'], desc: '0.6 mm iridium tip — quicker starts, smoother idle and roughly four times the service life of a nickel plug.' },
  { key: 'battery',        cat: 'electrical', scope: 'model', name: 'Maintenance-Free Battery 12V',             makers: ['Exide', 'Amaron'], base: 1350, ccRate: 3.2, art: 'battery', tags: ['bestseller'], desc: 'Sealed VRLA battery, factory charged and ready to fit. 18-month replacement warranty.' },
  { key: 'cdi',            cat: 'electrical', scope: 'model', name: 'CDI / Ignition Control Unit',              makers: ['Minda', 'Varroc'], base: 780, ccRate: 2.2, art: 'plug', desc: 'Potted electronic ignition module. Cures misfire, hard starting and rev-limit cutting in early.' },
  { key: 'ign-coil',       cat: 'electrical', scope: 'model', name: 'Ignition Coil',                            makers: ['Bosch', 'Minda'], base: 420, ccRate: 1.1, art: 'plug', desc: 'High-tension coil with moulded HT lead and cap. Delivers a full-strength spark at high RPM.' },
  { key: 'rect-reg',       cat: 'electrical', scope: 'model', name: 'Regulator Rectifier',                      makers: ['Varroc', 'Minda'], base: 560, ccRate: 1.5, art: 'plug', desc: 'Finned alloy body for heat dissipation. Protects the battery from over-charging.' },
  { key: 'stator',         cat: 'electrical', scope: 'model', name: 'Magneto Stator Coil Assembly',             makers: ['Varroc', 'Uma'], base: 1180, ccRate: 3.0, art: 'plug', desc: 'Copper-wound stator plate with pickup coil. Restores charging output on a flat-battery bike.' },
  { key: 'starter',        cat: 'electrical', scope: 'model', name: 'Self Starter Motor',                       makers: ['Varroc', 'Bosch'], base: 1560, ccRate: 4.0, art: 'plug', desc: 'Rebuilt-to-new starter motor with fresh brushes and bendix. Bolt-on replacement.' },
  { key: 'lock-set',       cat: 'electrical', scope: 'model', name: 'Ignition Lock Set (4 pc)',                 makers: ['Minda', 'Zadon'], base: 720, ccRate: 1.4, art: 'lever', desc: 'Ignition switch, fuel-tank cap lock, seat lock and two keys — all keyed alike.' },

  /* ---------- LIGHTING ---------- */
  { key: 'headlight-asm',  cat: 'lighting', scope: 'model', name: 'Headlight Assembly',                         makers: ['Lumax', 'Varroc'], base: 980, ccRate: 2.6, art: 'bulb', desc: 'Complete headlamp with reflector, lens and holder. Beam pattern matched to the stock housing.' },
  { key: 'head-bulb',      cat: 'lighting', scope: 'universal', name: 'Halogen Headlight Bulb 12V 35/35W',      makers: ['Philips'], base: 210, art: 'bulb', desc: 'Standard BA20D halogen bulb. Fits most Indian motorcycles and scooters.' },
  { key: 'led-bulb',       cat: 'lighting', scope: 'universal', name: 'LED Headlight Bulb Kit (H4 / BA20D)',    makers: ['Osram'], base: 890, art: 'bulb', tags: ['premium'], desc: '6000K LED conversion with built-in driver and cooling fins. Roughly three times the usable light of a stock halogen.' },
  { key: 'tail-light',     cat: 'lighting', scope: 'model', name: 'Tail Light Assembly',                        makers: ['Lumax', 'Varroc'], base: 540, ccRate: 1.3, art: 'bulb', desc: 'LED / bulb tail lamp with lens and gasket. Plug-in connector, no splicing.' },
  { key: 'indicator-set',  cat: 'lighting', scope: 'model', name: 'Indicator Set (4 pc)',                       makers: ['Lumax', 'OSA'], base: 480, ccRate: 0.9, art: 'bulb', desc: 'Front and rear turn indicators with amber lenses and stalks. Complete set of four.' },
  { key: 'horn',           cat: 'lighting', scope: 'universal', name: 'Windtone Horn Set 12V (Pair)',            makers: ['Roots'], base: 690, art: 'horn', tags: ['bestseller'], desc: 'Twin-tone trumpet horn pair, 118 dB. Includes relay and wiring harness.' },
  { key: 'flasher',        cat: 'lighting', scope: 'universal', name: 'LED Flasher Relay (2-Pin)',              makers: ['Minda'], base: 165, art: 'plug', desc: 'Load-independent flasher unit. Stops the hyper-flash after fitting LED indicators.' },

  /* ---------- SUSPENSION ---------- */
  { key: 'rear-shock',     cat: 'suspension', scope: 'model', name: 'Rear Shock Absorber (Pair)',               makers: ['Gabriel', 'Endurance', 'Munjal Showa'], base: 1450, ccRate: 3.6, art: 'shock', desc: 'Twin gas-charged shockers with 5-step preload adjustment. Sold as a matched pair — never replace just one.' },
  { key: 'monoshock',      cat: 'suspension', scope: 'model', name: 'Rear Monoshock Absorber',                  makers: ['Endurance', 'Gabriel'], base: 2650, ccRate: 5.5, art: 'shock', only: ['sport', 'adventure'], desc: 'Nitrogen-charged monoshock with preload collar. Restores damping on a bike that wallows over bumps.' },
  { key: 'fork-pipe',      cat: 'suspension', scope: 'model', name: 'Front Fork Pipe Set (Pair)',               makers: ['Endurance', 'Gabriel'], base: 1750, ccRate: 4.2, art: 'shock', desc: 'Hard-chromed fork tubes, straightened and polished. Replace if pitted or bent.' },
  { key: 'fork-seal',      cat: 'suspension', scope: 'model', name: 'Fork Oil Seal & Dust Seal Kit',            makers: ['NBC', 'SKF'], base: 240, ccRate: 0.6, art: 'seal', desc: 'Nitrile double-lip oil seals with dust covers. The fix for oil weeping down the fork leg.' },
  { key: 'fork-oil',       cat: 'suspension', scope: 'universal', name: 'Fork Oil SAE 10W — 500 ML',            makers: ['Motul'], base: 380, art: 'fluid', desc: 'Anti-foam damping fluid for telescopic forks. Refill both legs to equal level.' },

  /* ---------- TYRES ---------- */
  { key: 'tyre-front',     cat: 'tyres', scope: 'model', name: 'Front Tyre (Tubeless)',                         makers: ['MRF', 'TVS Eurogrip', 'CEAT'], base: 1250, ccRate: 3.8, art: 'tyre', tags: ['bestseller'], desc: 'Tubeless radial-pattern front tyre with deep water channels for monsoon grip. Size matched to this model.' },
  { key: 'tyre-rear',      cat: 'tyres', scope: 'model', name: 'Rear Tyre (Tubeless)',                          makers: ['MRF', 'TVS Eurogrip', 'CEAT'], base: 1650, ccRate: 5.2, art: 'tyre', desc: 'High-mileage rear tyre with a stiff centre compound for straight-line wear and softer shoulders for lean grip.' },
  { key: 'tube-set',       cat: 'tyres', scope: 'model', name: 'Tyre Tube Set (Front + Rear)',                  makers: ['MRF', 'Ralco'], base: 460, ccRate: 0.9, art: 'tyre', desc: 'Butyl rubber tubes with straight metal valves. Pair sized for this bike.' },

  /* ---------- BEARINGS & SEALS ---------- */
  { key: 'wheel-bearing',  cat: 'bearings', scope: 'model', name: 'Wheel Bearing Set (Front + Rear)',           makers: ['SKF', 'NBC'], base: 420, ccRate: 0.9, art: 'bearing', desc: 'Sealed deep-groove ball bearings, pre-greased for life. Cures wheel play and a droning noise at speed.' },
  { key: 'steering-cone',  cat: 'bearings', scope: 'model', name: 'Steering Cone Race Set',                     makers: ['NBC', 'SKF'], base: 340, ccRate: 0.7, art: 'bearing', desc: 'Taper-roller steering head bearings with races and seals. Removes handlebar notchiness.' },
  { key: 'swingarm-bush',  cat: 'bearings', scope: 'model', name: 'Swing Arm Bush Kit',                         makers: ['Uma', 'Endurance'], base: 290, ccRate: 0.6, art: 'bearing', exclude: ['scooter'], desc: 'Nylon-lined bushes with pivot sleeve and grease seals. Tightens up a vague rear end.' },
  { key: 'engine-seal',    cat: 'bearings', scope: 'model', name: 'Engine Oil Seal Kit',                        makers: ['NBC', 'Uma'], base: 260, ccRate: 0.7, art: 'seal', desc: 'Complete set of crank, gear-shift and kick-shaft seals. Stops the classic weeping engine.' },

  /* ---------- BODY ---------- */
  { key: 'mirror-set',     cat: 'body', scope: 'universal', name: 'Rear View Mirror Set (Pair)',                makers: ['OSA'], base: 340, art: 'mirror', desc: 'Convex glass mirrors with 8 mm and 10 mm adaptor bolts. Fits both left- and right-hand threads.' },
  { key: 'side-panel',     cat: 'body', scope: 'model', name: 'Side Panel Set (Pair)',                          makers: ['Zadon', 'OSA'], base: 720, ccRate: 1.4, art: 'panel', exclude: ['scooter'], desc: 'ABS side cowls, primed and colour-matched to the factory shade. Sold in pairs with clips.' },
  { key: 'front-mudguard', cat: 'body', scope: 'model', name: 'Front Mudguard',                                 makers: ['Zadon', 'OSA'], base: 480, ccRate: 1.1, art: 'panel', desc: 'Injection-moulded front fender with mounting brackets and hardware.' },
  { key: 'rear-mudguard',  cat: 'body', scope: 'model', name: 'Rear Mudguard / Hugger',                          makers: ['Zadon', 'OSA'], base: 520, ccRate: 1.2, art: 'panel', desc: 'Rear fender with number-plate mount and reflector bracket.' },
  { key: 'seat-cover',     cat: 'body', scope: 'model', name: 'Seat Cover (Rexine)',                            makers: ['Zadon'], base: 380, ccRate: 0.7, art: 'panel', desc: 'UV-stable rexine cover with anti-slip grain and elastic skirt. Fitting staples included.' },
  { key: 'grip-set',       cat: 'body', scope: 'universal', name: 'Handle Grip Set with Bar Ends',              makers: ['Zadon'], base: 280, art: 'mirror', desc: 'Dual-compound rubber grips, 22 mm bore, with alloy bar-end weights to cut vibration.' },
  { key: 'footrest',       cat: 'body', scope: 'model', name: 'Foot Rest Set (Rider + Pillion)',                makers: ['Zadon', 'Uma'], base: 460, ccRate: 1.0, art: 'panel', desc: 'Steel footrest brackets with rubber pads, zinc-plated against rust.' },
  { key: 'tank-cap',       cat: 'body', scope: 'model', name: 'Fuel Tank Cap with Lock',                        makers: ['Minda', 'Zadon'], base: 340, ccRate: 0.6, art: 'seal', desc: 'Lockable fuel cap with breather and seal ring. Supplied with two keys.' },
  { key: 'chain-cover',    cat: 'body', scope: 'model', name: 'Chain Cover Set',                                makers: ['Zadon'], base: 390, ccRate: 0.8, art: 'panel', exclude: ['scooter'], desc: 'Two-piece chain guard, powder coated. Keeps chain lube off the rear panels.' }
];

/* ==========================================================================
   5. CATALOG BUILDER
   ========================================================================== */
const Catalog = (() => {
  const brandById = Object.fromEntries(BRANDS.map(b => [b.id, b]));
  const modelById = Object.fromEntries(MODELS.map(m => [m.id, m]));
  const catById   = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
  const modelBrandOf = Object.fromEntries(MODELS.map(m => [m.id, m.brand]));

  const CATCODE = {
    engine: 'EN', clutch: 'CL', brakes: 'BR', drive: 'DR', filters: 'FL',
    electrical: 'EL', lighting: 'LT', suspension: 'SU', tyres: 'TY',
    bearings: 'BE', body: 'BD'
  };

  /** Does a template apply to this bike? */
  function fits(t, m) {
    if (t.only && !t.only.includes(m.kind)) return false;
    if (t.exclude && t.exclude.includes(m.kind)) return false;
    if (t.needs === 'disc' && m.brake !== 'disc') return false;
    return true;
  }

  function makeSku(t, m) {
    if (t.scope === 'universal') return `TAW-U-${CATCODE[t.cat]}${hashOf(t.key) % 90 + 10}`;
    const b = brandById[m.brand];
    const mc = m.id.replace(/[^a-z0-9]/g, '').slice(0, 3).toUpperCase();
    return `TAW-${b.code}${mc}-${CATCODE[t.cat]}${hashOf(t.key) % 90 + 10}`;
  }

  function build(t, m) {
    const sku    = makeSku(t, m);
    const maker  = pick(sku, 'mk', t.makers);
    const raw    = t.base + (t.ccRate ? Math.round(t.ccRate * (m ? m.cc : 150)) : 0);
    // small stable jitter so prices don't look machine-generated
    const price  = Math.round((raw * (0.94 + rand01(sku, 'p') * 0.14)) / 5) * 5;
    const offPct = 8 + Math.floor(rand01(sku, 'o') * 28);          // 8–35 % off
    const mrp    = Math.round(price / (1 - offPct / 100) / 5) * 5;
    const stock  = Math.floor(rand01(sku, 's') * 46);              // 0–45
    const rating = +(3.7 + rand01(sku, 'r') * 1.3).toFixed(1);     // 3.7–5.0
    const reviews= 6 + Math.floor(rand01(sku, 'v') * 240);

    const fitAll = t.scope === 'universal';

    /* A "universal" part still honours its template's only/exclude rules —
       scooter gear oil must not show up on a Splendor. */
    const fitIds = fitAll ? MODELS.filter(x => fits(t, x)).map(x => x.id) : [m.id];

    const universalLabel = t.only
      ? 'All ' + t.only.map(k => k + 's').join(' / ')
      : 'All models';

    return {
      fitIds,
      fitSet: new Set(fitIds),
      brandSet: new Set(fitIds.map(id => modelBrandOf[id])),
      id: sku,
      sku,
      key: t.key,
      name: fitAll ? t.name : `${t.name} — ${brandById[m.brand].name} ${m.name}`,
      shortName: t.name,
      cat: t.cat,
      catName: catById[t.cat].name,
      art: t.art,
      maker,
      price,
      mrp,
      offPct,
      stock,
      rating,
      reviews,
      desc: t.desc,
      tags: t.tags || [],
      universal: fitAll,
      brand: fitAll ? null : m.brand,
      model: fitAll ? null : m.id,
      modelName: fitAll ? universalLabel : `${brandById[m.brand].name} ${m.name}`,
      warranty: pick(sku, 'w', ['6 Months', '12 Months', '18 Months', '24 Months']),
      grade: pick(sku, 'g', ['OEM Replacement', 'OES Grade', 'Genuine Aftermarket']),
      hsn: 8714 + (hashOf(sku) % 9),
      weight: +(0.08 + rand01(sku, 'wt') * 3.4).toFixed(2)
    };
  }

  /* ---- generate ---- */
  const PARTS = [];
  for (const t of PART_TEMPLATES) {
    if (t.scope === 'universal') {
      PARTS.push(build(t, null));
    } else {
      for (const m of MODELS) if (fits(t, m)) PARTS.push(build(t, m));
    }
  }

  const partById = Object.fromEntries(PARTS.map(p => [p.id, p]));

  /* ---- queries ---- */
  const modelsOf   = (brandId) => MODELS.filter(m => m.brand === brandId);
  /** Parts confirmed to fit a bike — model-specific plus applicable universals */
  const partsOf    = (modelId) => PARTS.filter(p => p.fitSet.has(modelId));
  const partsOfCat = (catId)   => PARTS.filter(p => p.cat === catId);
  const get        = (id)      => partById[id];

  /** Every model this part fits */
  const fitmentOf = (part) => part.fitIds.map(id => modelById[id]).filter(Boolean);

  /** Other SKUs built from the same template — i.e. the same part for other bikes */
  const siblingsOf = (part) =>
    PARTS.filter(p => p.key === part.key && p.id !== part.id);

  /** Related: same bike, different category */
  function relatedTo(part, n = 5) {
    const pool = part.model
      ? PARTS.filter(p => p.model === part.model && p.id !== part.id)
      : PARTS.filter(p => p.cat === part.cat && p.id !== part.id);
    return pool
      .sort((a, b) => hashOf(a.id + part.id) - hashOf(b.id + part.id))
      .slice(0, n);
  }

  const bestSellers = (n = 12) =>
    PARTS.filter(p => p.tags.includes('bestseller') && p.stock > 0)
      .sort((a, b) => (b.rating * 40 + b.reviews) - (a.rating * 40 + a.reviews))
      .slice(0, n);

  const deals = (n = 8) =>
    PARTS.filter(p => p.offPct >= 28 && p.stock > 3)
      .sort((a, b) => b.offPct - a.offPct || b.reviews - a.reviews)
      .slice(0, n);

  function search(q) {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    const words = s.split(/\s+/);
    return PARTS.filter(p => {
      const hay = `${p.name} ${p.sku} ${p.maker} ${p.catName} ${p.modelName}`.toLowerCase();
      return words.every(w => hay.includes(w));
    });
  }

  const countOf = (modelId) => partsOf(modelId).length;

  return {
    BRANDS, MODELS, CATEGORIES, PARTS,
    brandById, modelById, catById,
    modelsOf, partsOf, partsOfCat, get, fitmentOf, siblingsOf,
    relatedTo, bestSellers, deals, search, countOf
  };
})();
