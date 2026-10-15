// High-fidelity SVG and visual assets for GLAM STUDIO and partner brands

export const BRAND_LOGOS = {
  glamStudio: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" fill="none">
      <text x="200" y="55" font-family="'Cormorant Garamond', 'Playfair Display', serif" font-size="34" font-weight="600" letter-spacing="6" fill="#171512" text-anchor="middle">GLAM STUDIO</text>
      <line x1="130" y1="72" x2="270" y2="72" stroke="#C9B18A" stroke-width="1.2" />
      <text x="200" y="92" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="500" letter-spacing="4.5" fill="#77716B" text-anchor="middle">SKINCARE • NUTRITION</text>
    </svg>
  `)}`,

  glamStudioLight: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120" fill="none">
      <text x="200" y="55" font-family="'Cormorant Garamond', 'Playfair Display', serif" font-size="34" font-weight="600" letter-spacing="6" fill="#FFFFFF" text-anchor="middle">GLAM STUDIO</text>
      <line x1="130" y1="72" x2="270" y2="72" stroke="#E5DED4" stroke-width="1.2" />
      <text x="200" y="92" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="500" letter-spacing="4.5" fill="#EFE7DC" text-anchor="middle">SKINCARE • NUTRITION</text>
    </svg>
  `)}`,

  minimalist: '/brands/minimalist.webp',
  pilgrim: '/brands/pilgrim.jpg',
  mamaearth: '/brands/mamaearth.png',
  dermaCo: '/brands/the-derma-co.webp',

  anua: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 70" fill="none">
      <text x="110" y="46" font-family="'Plus Jakarta Sans', sans-serif" font-size="32" font-weight="600" letter-spacing="3" fill="#171512" text-anchor="middle">Anua</text>
      <circle cx="160" cy="22" r="3" fill="#C9B18A" />
    </svg>
  `)}`,

  bareAnatomy: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" fill="none">
      <text x="140" y="38" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#171512" text-anchor="middle">BARE ANATOMY</text>
      <text x="140" y="56" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" letter-spacing="3" fill="#77716B" text-anchor="middle">NATURE × SCIENCE</text>
    </svg>
  `)}`,

  purito: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 70" fill="none">
      <text x="120" y="40" font-family="'Cormorant Garamond', serif" font-size="36" font-weight="700" letter-spacing="1" fill="#007A55" text-anchor="middle">Purito</text>
      <text x="120" y="56" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" letter-spacing="4" fill="#171512" text-anchor="middle">SEOUL</text>
    </svg>
  `)}`,

  medicube: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 70" fill="none">
      <text x="110" y="46" font-family="'Plus Jakarta Sans', sans-serif" font-size="30" font-weight="700" letter-spacing="1" fill="#171512" text-anchor="middle">medicube</text>
      <g transform="translate(195, 23)">
        <rect x="0" y="0" width="20" height="20" rx="3" fill="#171512"/>
        <rect x="8" y="4" width="4" height="12" fill="#FFFFFF"/>
        <rect x="4" y="8" width="12" height="4" fill="#FFFFFF"/>
      </g>
    </svg>
  `)}`,

  cosrx: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 70" fill="none">
      <text x="110" y="46" font-family="'Plus Jakarta Sans', sans-serif" font-size="32" font-weight="800" letter-spacing="4" fill="#171512" text-anchor="middle">COSRX</text>
    </svg>
  `)}`,

  beautyOfJoseon: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 80" fill="none">
      <rect x="25" y="18" width="36" height="36" rx="4" stroke="#9E3B33" stroke-width="2" fill="none" />
      <text x="43" y="42" font-family="'Cormorant Garamond', serif" font-size="20" font-weight="700" fill="#9E3B33" text-anchor="middle">조선</text>
      <text x="165" y="40" font-family="'Cormorant Garamond', serif" font-size="22" font-weight="600" letter-spacing="2" fill="#171512" text-anchor="middle">Beauty of Joseon</text>
      <text x="165" y="56" font-family="'Plus Jakarta Sans', sans-serif" font-size="8.5" font-weight="500" letter-spacing="3" fill="#77716B" text-anchor="middle">HANBANG HERBAL CARE</text>
    </svg>
  `)}`,

  aqualogica: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 70" fill="none">
      <text x="130" y="44" font-family="'Plus Jakarta Sans', sans-serif" font-size="26" font-weight="700" letter-spacing="1.5" fill="#0284C7" text-anchor="middle">Aqualogica</text>
      <circle cx="120" cy="54" r="2.5" fill="#38BDF8"/>
    </svg>
  `)}`
};

// Realistic Product SVG Renderings matching the uploaded assets
export const PRODUCT_IMAGES = {
  // 1. Bare Anatomy Rosemary & Rice Water Hair Growth Spray (Uploaded Studio Photo)
  bareAnatomyHairGrowth: '/products/bare-anatomy-hair-growth-spray.jpg',

  // 2. Anua Heartleaf Pore Control Cleansing Oil (Uploaded Studio Photo)
  anuaCleansingOil: '/products/anua-cleansing-oil.jpg',

  // 3. Bare Anatomy Ultra Smoothing Hair Mask (Uploaded Studio Photo)
  bareAnatomyHairMask: '/products/bare-anatomy-hair-mask.jpg',

  // 4. Purito Seoul Mighty Bamboo Panthenol Cream (Uploaded Studio Photo)
  puritoBambooCream: '/products/purito-bamboo-cream.jpg',

  // 5. Medicube PDRN Pink Peptide Serum (Uploaded Studio Photo)
  medicubePinkSerum: '/products/medicube-pink-serum.jpg',

  // 6. Beauty of Joseon Relief Sun Rice + Probiotics
  bojReliefSun: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" fill="none">
      <rect width="600" height="750" fill="#F8F5F0"/>
      <ellipse cx="300" cy="690" rx="130" ry="20" fill="#000000" opacity="0.08"/>
      <!-- Soft ivory/rice white matte tube -->
      <path d="M230 220 L370 220 L355 580 L245 580 Z" fill="#FCFAF6" stroke="#EAE5DE" stroke-width="2"/>
      <!-- Hanbang red seal -->
      <rect x="285" y="270" width="30" height="30" rx="3" fill="#9E3B33"/>
      <text x="300" y="291" font-family="'Cormorant Garamond', serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">조선</text>
      
      <text x="300" y="340" font-family="'Cormorant Garamond', serif" font-size="22" font-weight="600" letter-spacing="1" fill="#171512" text-anchor="middle">Beauty of Joseon</text>
      <text x="300" y="390" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" letter-spacing="1" fill="#171512" text-anchor="middle">RELIEF SUN</text>
      <text x="300" y="412" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" fill="#77716B" text-anchor="middle">Rice + Probiotics</text>
      <text x="300" y="435" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" letter-spacing="1" fill="#C9B18A" text-anchor="middle">SPF50+ PA++++</text>
      <text x="300" y="550" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#171512" text-anchor="middle">50 ml / 1.69 fl. oz.</text>
      <!-- Cap -->
      <rect x="270" y="580" width="60" height="40" rx="6" fill="#F3EFEA" stroke="#E5DED4"/>
    </svg>
  `)}`,

  // 7. COSRX Advanced Snail 96 Mucin Power Essence
  cosrxSnailMucin: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" fill="none">
      <rect width="600" height="750" fill="#F8F5F0"/>
      <ellipse cx="300" cy="690" rx="120" ry="18" fill="#000000" opacity="0.08"/>
      <!-- Tall cylindrical pump bottle -->
      <rect x="235" y="270" width="130" height="400" rx="16" fill="#FFFFFF" stroke="#E5DED4" stroke-width="2"/>
      <!-- Black pump dispenser -->
      <rect x="275" y="220" width="50" height="50" fill="#171512"/>
      <path d="M280 220 L350 205 L350 220 Z" fill="#171512"/>
      <!-- Label -->
      <rect x="245" y="340" width="110" height="260" fill="#FFFFFF"/>
      <text x="300" y="380" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800" letter-spacing="2" fill="#171512" text-anchor="middle">COSRX</text>
      <text x="300" y="430" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#171512" text-anchor="middle">Advanced Snail 96</text>
      <text x="300" y="445" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#77716B" text-anchor="middle">Mucin Power Essence</text>
      <text x="300" y="560" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#171512" text-anchor="middle">100 ml / 3.38 fl. oz.</text>
    </svg>
  `)}`,

  // 8. Minimalist 10% Niacinamide Serum
  minimalistNiacinamide: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" fill="none">
      <rect width="600" height="750" fill="#F8F5F0"/>
      <ellipse cx="300" cy="690" rx="120" ry="18" fill="#000000" opacity="0.08"/>
      <!-- Amber / UV-protective dark bottle -->
      <rect x="230" y="330" width="140" height="340" rx="20" fill="#382619" stroke="#25180E" stroke-width="2"/>
      <!-- Black dropper bulb & collar -->
      <rect x="270" y="280" width="60" height="50" rx="4" fill="#171512"/>
      <path d="M285 280 C280 230, 320 230, 315 280 Z" fill="#111111"/>
      <!-- Stark white pharmaceutical label -->
      <rect x="235" y="400" width="130" height="200" fill="#FFFFFF"/>
      <text x="300" y="435" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="800" fill="#171512" text-anchor="middle">Minimalist</text>
      <line x1="255" y1="455" x2="345" y2="455" stroke="#171512" stroke-width="1"/>
      <text x="300" y="480" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#171512" text-anchor="middle">Niacinamide 10%</text>
      <text x="300" y="498" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#77716B" text-anchor="middle">+ Zinc 1%</text>
      <text x="300" y="525" font-family="'Plus Jakarta Sans', sans-serif" font-size="7" font-weight="600" fill="#171512" text-anchor="middle">Reduces Blemishes &amp; Oil</text>
      <text x="300" y="570" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#171512" text-anchor="middle">30 ml</text>
    </svg>
  `)}`,

  // 9. The Derma Co 1% Hyaluronic Sunscreen Aqua Gel
  dermaCoSunscreen: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" fill="none">
      <rect width="600" height="750" fill="#F8F5F0"/>
      <ellipse cx="300" cy="690" rx="120" ry="18" fill="#000000" opacity="0.08"/>
      <!-- Squeeze Tube with turquoise accents -->
      <path d="M235 220 L365 220 L350 580 L250 580 Z" fill="#FFFFFF" stroke="#E5DED4" stroke-width="2"/>
      <!-- Turquoise cross -->
      <g transform="translate(285, 260) scale(0.6)">
        <rect x="18" y="0" width="14" height="44" rx="6" fill="#20B2AA"/>
        <rect x="3" y="15" width="44" height="14" rx="6" fill="#20B2AA"/>
      </g>
      <text x="300" y="325" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="900" fill="#171512" text-anchor="middle">THE derma co</text>
      <text x="300" y="340" font-family="'Plus Jakarta Sans', sans-serif" font-size="6" font-weight="800" letter-spacing="1.5" fill="#77716B" text-anchor="middle">DESIGNED BY DERMATOLOGISTS</text>
      <text x="300" y="395" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#171512" text-anchor="middle">1% Hyaluronic</text>
      <text x="300" y="412" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="700" fill="#20B2AA" text-anchor="middle">Sunscreen Aqua Gel</text>
      <text x="300" y="435" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="800" fill="#171512" text-anchor="middle">SPF 50 PA++++</text>
      <text x="300" y="550" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#171512" text-anchor="middle">50 g</text>
      <!-- Cap -->
      <rect x="270" y="580" width="60" height="40" rx="6" fill="#20B2AA"/>
    </svg>
  `)}`,

  // 10. Pilgrim Salicylic & Glycolic Acid Anti Acne Serum
  pilgrimSerum: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" fill="none">
      <rect width="600" height="750" fill="#F8F5F0"/>
      <ellipse cx="300" cy="690" rx="120" ry="18" fill="#000000" opacity="0.08"/>
      <!-- Forest green glass bottle -->
      <rect x="235" y="330" width="130" height="340" rx="20" fill="#1C3829" stroke="#13261C" stroke-width="2"/>
      <rect x="270" y="280" width="60" height="50" rx="4" fill="#C9B18A"/>
      <path d="M285 280 C280 230, 320 230, 315 280 Z" fill="#171512"/>
      <!-- Label -->
      <rect x="245" y="400" width="110" height="200" fill="#FFFFFF"/>
      <text x="300" y="435" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="800" fill="#171512" text-anchor="middle">pilgrim®</text>
      <text x="300" y="480" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#1C3829" text-anchor="middle">Salicylic &amp; Glycolic</text>
      <text x="300" y="495" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="600" fill="#171512" text-anchor="middle">Anti Acne Serum</text>
      <text x="300" y="570" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#171512" text-anchor="middle">30 ml</text>
    </svg>
  `)}`
};

// Editorial category lifestyle visuals
export const CATEGORY_IMAGES = {
  skincare: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" fill="none">
      <rect width="500" height="650" fill="#F3EFE9"/>
      <!-- Travertine texture -->
      <path d="M0 0 L500 0 L500 650 L0 650 Z" fill="url(#stoneGrad)"/>
      <!-- Elegant amber serum dropper bottle silhouette -->
      <g transform="translate(180, 200)">
        <rect x="30" y="100" width="80" height="220" rx="16" fill="#3D2B1F" opacity="0.9"/>
        <rect x="55" y="70" width="30" height="30" fill="#C9B18A"/>
        <path d="M60 70 C58 40, 82 40, 80 70 Z" fill="#171512"/>
        <rect x="35" y="150" width="70" height="110" fill="#FAF8F5"/>
        <!-- Droplet falling -->
        <circle cx="70" cy="360" r="12" fill="#C9B18A" opacity="0.6"/>
      </g>
      <text x="250" y="580" font-family="'Cormorant Garamond', serif" font-size="30" font-weight="500" fill="#171512" text-anchor="middle">Skincare</text>
      <text x="250" y="605" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="#77716B" text-anchor="middle">GLOBAL SERUMS &amp; ESSENCES</text>
      <defs>
        <linearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FBF9F5"/>
          <stop offset="50%" stop-color="#EFE9DE"/>
          <stop offset="100%" stop-color="#E5DEC9"/>
        </linearGradient>
      </defs>
    </svg>
  `)}`,

  cleansers: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" fill="none">
      <rect width="500" height="650" fill="#F2EFEA"/>
      <!-- Liquid water ripple & golden oil aesthetic -->
      <circle cx="250" cy="300" r="160" fill="#FBF8EE" stroke="#E6DEC9" stroke-width="1"/>
      <circle cx="250" cy="300" r="110" fill="#F6F0DC" stroke="#DFD5BC" stroke-width="1"/>
      <circle cx="250" cy="300" r="60" fill="#EFE5C5" stroke="#D7C9A4" stroke-width="1"/>
      <circle cx="250" cy="300" r="18" fill="#C9B18A"/>
      <text x="250" y="580" font-family="'Cormorant Garamond', serif" font-size="30" font-weight="500" fill="#171512" text-anchor="middle">Cleansers</text>
      <text x="250" y="605" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="#77716B" text-anchor="middle">PORE REFINING OILS &amp; FOAMS</text>
    </svg>
  `)}`,

  moisturisers: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" fill="none">
      <rect width="500" height="650" fill="#EFECE5"/>
      <!-- Luxurious velvety cream swirl -->
      <path d="M120 320 C140 220, 240 200, 280 260 C320 320, 390 280, 360 380 C330 460, 200 460, 140 400 C110 370, 100 350, 120 320 Z" fill="#FFFFFF" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.06))"/>
      <path d="M180 340 C200 280, 270 270, 290 320 C300 360, 260 400, 210 380 Z" fill="#F8F6F0"/>
      <text x="250" y="580" font-family="'Cormorant Garamond', serif" font-size="30" font-weight="500" fill="#171512" text-anchor="middle">Moisturisers</text>
      <text x="250" y="605" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="#77716B" text-anchor="middle">BARRIER RESTORATION CREAMS</text>
    </svg>
  `)}`,

  treatments: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" fill="none">
      <rect width="500" height="650" fill="#F5EFEF"/>
      <!-- Clinical pink peptide aesthetic -->
      <circle cx="250" cy="300" r="140" fill="#FCE7F3" opacity="0.7"/>
      <!-- Dropper pipette precision tip with drop -->
      <g transform="translate(235, 160)">
        <path d="M10 0 L20 0 L18 160 C18 175, 12 185, 15 200 L15 205 L15 200 C18 185, 12 175, 12 160 Z" fill="#FFFFFF" stroke="#E5DED4"/>
        <circle cx="15" cy="235" r="9" fill="#EC4899" opacity="0.8"/>
      </g>
      <text x="250" y="580" font-family="'Cormorant Garamond', serif" font-size="30" font-weight="500" fill="#171512" text-anchor="middle">Treatments</text>
      <text x="250" y="605" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="#77716B" text-anchor="middle">PEPTIDES, PDRN &amp; ACTIVES</text>
    </svg>
  `)}`,

  nutrition: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" fill="none">
      <rect width="500" height="650" fill="#EEF2EA"/>
      <!-- Botanical herb & clean wellness glow -->
      <circle cx="250" cy="300" r="130" fill="#E2EAD9" opacity="0.8"/>
      <!-- Delicate herbal leaf & amber wellness capsule -->
      <g transform="translate(200, 240)">
        <path d="M50 0 C20 40, 20 80, 50 120 C80 80, 80 40, 50 0 Z" fill="#6B8E23" opacity="0.7"/>
        <ellipse cx="50" cy="60" rx="35" ry="16" transform="rotate(-30 50 60)" fill="#D4AF37" opacity="0.85"/>
      </g>
      <text x="250" y="580" font-family="'Cormorant Garamond', serif" font-size="30" font-weight="500" fill="#171512" text-anchor="middle">Nutrition</text>
      <text x="250" y="605" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="#77716B" text-anchor="middle">BEAUTY ELIXIRS &amp; COLLAGEN</text>
    </svg>
  `)}`
};
