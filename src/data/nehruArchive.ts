export type PrintTone = 'silver' | 'sepia' | 'selenium' | 'litho';

export interface PortraitAnnotation {
  id: string;
  index: string;
  title: string;
  xPercent: number;
  yPercent: number;
  category: string;
  summary: string;
  technicalNote: string;
}

export interface TimelineEntry {
  year: string;
  dateLabel: string;
  era: 'freedom' | 'statecraft' | 'literary';
  eraLabel: string;
  location: string;
  title: string;
  event: string;
  primarySourceQuote: string;
  sourceCitation: string;
  archiveRef: string;
}

export interface ArchivalPlate {
  id: string;
  figureNumber: string;
  accessionNumber: string;
  year: string;
  title: string;
  location: string;
  photographer: string;
  medium: string;
  dimensions: string;
  caption: string;
  curatorialEssay: string;
  svgDataUri: string;
  wikimediaUrl: string;
}

export interface SpeechAnnotation {
  id: string;
  marker: string;
  heading: string;
  note: string;
  historicalContext: string;
}

const createSvgDataUri = (svgContent: string): string => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
};

/**
 * High-detail Silver Gelatin Portrait Plate: Jawaharlal Nehru (1956 Study after Yousuf Karsh)
 * Features Rembrandt chiaroscuro lighting, traditional khadi cap, high-collared achkan coat,
 * and the signature rosebud tucked into the third buttonhole.
 */
export const MAIN_PORTRAIT_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1160" width="900" height="1160">
  <defs>
    <radialGradient id="studioBackdrop" cx="46%" cy="38%" r="68%">
      <stop offset="0%" stop-color="#44403C" />
      <stop offset="45%" stop-color="#262320" />
      <stop offset="85%" stop-color="#141210" />
      <stop offset="100%" stop-color="#0B0A09" />
    </radialGradient>
    <linearGradient id="keyLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5F2EB" />
      <stop offset="48%" stop-color="#D6CFC2" />
      <stop offset="82%" stop-color="#8C8478" />
      <stop offset="100%" stop-color="#4A453E" />
    </linearGradient>
    <linearGradient id="faceShadow" x1="15%" y1="10%" x2="88%" y2="90%">
      <stop offset="0%" stop-color="#EAE4D8" />
      <stop offset="50%" stop-color="#B8AFA0" />
      <stop offset="80%" stop-color="#6E665B" />
      <stop offset="100%" stop-color="#2E2A25" />
    </linearGradient>
    <linearGradient id="achkanCoat" x1="10%" y1="0%" x2="90%" y2="100%">
      <stop offset="0%" stop-color="#3A3632" />
      <stop offset="40%" stop-color="#24211E" />
      <stop offset="75%" stop-color="#171513" />
      <stop offset="100%" stop-color="#0D0C0B" />
    </linearGradient>
    <linearGradient id="khadiCap" x1="0%" y1="0%" x2="95%" y2="85%">
      <stop offset="0%" stop-color="#FAF8F5" />
      <stop offset="55%" stop-color="#E2DDD2" />
      <stop offset="88%" stop-color="#A8A093" />
      <stop offset="100%" stop-color="#787166" />
    </linearGradient>
    <radialGradient id="roseTint" cx="45%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#A8423B" />
      <stop offset="65%" stop-color="#6E2420" />
      <stop offset="100%" stop-color="#38110E" />
    </radialGradient>
    <pattern id="halftoneGrid" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.55" fill="#FAF8F5" fill-opacity="0.06" />
      <circle cx="4.5" cy="4.5" r="0.45" fill="#000000" fill-opacity="0.12" />
    </pattern>
  </defs>

  <!-- Outer Darkroom Sheet Film Border -->
  <rect width="900" height="1160" fill="#11100F" />
  <rect x="28" y="28" width="844" height="1104" fill="url(#studioBackdrop)" stroke="#57534E" stroke-width="1.5" />

  <!-- Subtle Studio Rim Light Halo Behind Subject -->
  <ellipse cx="435" cy="440" rx="285" ry="330" fill="#78716C" fill-opacity="0.16" />
  <ellipse cx="410" cy="390" rx="195" ry="230" fill="#A8A29E" fill-opacity="0.1" />

  <!-- Background Architectural Drape Lines (New Delhi Residence Sitting) -->
  <path d="M110 28 L135 1132" stroke="#292524" stroke-width="28" stroke-opacity="0.35" />
  <path d="M760 28 L735 1132" stroke="#1C1917" stroke-width="45" stroke-opacity="0.5" />

  <!-- Shoulders & Classic Buttoned Achkan (Sherwani) -->
  <path d="M115 1132 C125 910, 210 785, 325 735 L455 725 L590 740 C705 795, 775 925, 795 1132 Z" fill="url(#achkanCoat)" stroke="#44403C" stroke-width="1.2" />

  <!-- Achkan Left & Right Lapel Seam Shadows -->
  <path d="M295 750 C250 860, 225 990, 215 1132" stroke="#090807" stroke-width="3" fill="none" opacity="0.65" />
  <path d="M615 755 C655 870, 680 995, 690 1132" stroke="#090807" stroke-width="3.5" fill="none" opacity="0.7" />
  <path d="M165 920 C215 865, 255 825, 315 765" stroke="#57534E" stroke-width="1.2" fill="none" opacity="0.35" />

  <!-- High Mandarin Collar (Bandhgala) of the Achkan -->
  <path d="M332 678 C332 738, 392 778, 456 782 C522 778, 576 736, 578 678 L560 742 C515 785, 400 785, 348 742 Z" fill="#1F1D1A" stroke="#57534E" stroke-width="1.5" />
  <!-- White Inner Collar Rim Highlight -->
  <path d="M352 676 C385 725, 520 725, 558 676" stroke="#D6CFC2" stroke-width="3.5" fill="none" opacity="0.7" />

  <!-- Center Placket & Buttons -->
  <line x1="456" y1="782" x2="456" y2="1132" stroke="#44403C" stroke-width="2" />
  <line x1="448" y1="782" x2="448" y2="1132" stroke="#090807" stroke-width="1.5" />
  <circle cx="468" cy="825" r="7.5" fill="#292524" stroke="#78716C" stroke-width="1.5" />
  <circle cx="468" cy="905" r="7.5" fill="#292524" stroke="#78716C" stroke-width="1.5" />
  <circle cx="468" cy="985" r="7.5" fill="#292524" stroke="#78716C" stroke-width="1.5" />
  <circle cx="468" cy="1065" r="7.5" fill="#292524" stroke="#78716C" stroke-width="1.5" />

  <!-- Signature Fresh Rosebud Tucked into the Achkan Buttonhole -->
  <g transform="translate(495, 868)">
    <!-- Stem and Sepals -->
    <path d="M-24 38 C-14 22, -4 10, 4 -2" stroke="#57634C" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <path d="M-8 14 C-18 8, -22 -2, -14 -8" stroke="#657359" stroke-width="2" fill="none" />
    <path d="M2 8 C14 6, 20 -2, 14 -10" stroke="#657359" stroke-width="2" fill="none" />
    <!-- Rose Petals in Subtle Hand-Tinted Archival Tone -->
    <path d="M-16 -12 C-24 -32, -4 -48, 12 -44 C28 -42, 34 -22, 20 -6 C10 6, -8 4, -16 -12 Z" fill="url(#roseTint)" stroke="#B8867E" stroke-width="1.2" />
    <path d="M-8 -22 C-2 -34, 14 -34, 18 -20 C14 -10, -2 -10, -8 -22 Z" fill="#8C332D" stroke="#D6B4AD" stroke-width="0.9" />
    <path d="M-2 -24 C4 -29, 11 -26, 9 -19" stroke="#E5C5BE" stroke-width="1.2" fill="none" opacity="0.8" />
  </g>

  <!-- Neck & Lower Jaw Shadow -->
  <path d="M356 615 L352 695 C388 736, 518 736, 554 695 L546 615 Z" fill="#6E665B" />
  <path d="M368 625 C405 668, 505 668, 540 618 L536 665 C490 705, 415 705, 368 665 Z" fill="#3D3832" opacity="0.82" />

  <!-- Ears -->
  <path d="M312 438 C292 436, 286 468, 294 504 C300 532, 315 548, 328 542" fill="#9E9587" stroke="#57534E" stroke-width="1.5" />
  <path d="M588 442 C606 440, 614 472, 604 508 C596 534, 582 548, 570 542" fill="#6E665B" stroke="#44403C" stroke-width="1.5" />

  <!-- Head & Facial Structure (Three-Quarter Statesman Pose) -->
  <path d="M322 335 C315 415, 320 510, 345 575 C370 632, 412 662, 455 664 C498 662, 538 630, 562 572 C586 508, 590 415, 580 335 Z" fill="url(#faceShadow)" stroke="#57534E" stroke-width="1.2" />

  <!-- Rembrandt Key Light Highlight on Left Forehead, Cheekbone, and Nose Bridge -->
  <path d="M335 345 C330 415, 338 495, 365 555 C390 600, 425 625, 452 625 C452 550, 448 420, 455 345 Z" fill="url(#keyLight)" opacity="0.65" />

  <!-- Silver Hair Fringe at Temples beneath Khadi Cap -->
  <path d="M318 338 C308 370, 310 412, 322 442 C328 415, 332 375, 338 342 Z" fill="#E5E0D8" />
  <path d="M582 340 C592 372, 590 415, 578 445 C572 415, 568 375, 562 344 Z" fill="#A8A29E" />

  <!-- Iconic White Khadi Gandhi Cap (Tilted Slightly with crisp boat-fold) -->
  <g>
    <!-- Cap Base Band -->
    <path d="M310 342 C355 312, 545 314, 590 346 C586 292, 565 245, 535 212 C480 185, 415 182, 355 210 C328 242, 312 290, 310 342 Z" fill="url(#khadiCap)" stroke="#78716C" stroke-width="1.5" />
    <!-- Central Crown Ridge & Fold crease -->
    <path d="M348 212 C418 168, 485 170, 540 214 C495 232, 405 230, 348 212 Z" fill="#FFFFFF" opacity="0.75" />
    <path d="M312 338 C385 304, 515 306, 588 344" stroke="#8C8478" stroke-width="2" fill="none" />
    <path d="M332 275 C410 254, 495 256, 568 282" stroke="#C7C0B3" stroke-width="1.5" fill="none" opacity="0.8" />
  </g>

  <!-- Thoughtful Brow & Deep-Set Expressive Eyes -->
  <!-- Left Eyebrow (Viewer's Left - Key Lit) -->
  <path d="M352 412 C375 398, 408 400, 428 414" stroke="#44403C" stroke-width="6.5" stroke-linecap="round" fill="none" />
  <!-- Right Eyebrow (Viewer's Right - Shadowed) -->
  <path d="M478 414 C500 400, 532 400, 554 415" stroke="#292524" stroke-width="6.5" stroke-linecap="round" fill="none" />

  <!-- Left Eye -->
  <ellipse cx="392" cy="436" rx="22" ry="11" fill="#F5F2EB" stroke="#44403C" stroke-width="2" />
  <circle cx="394" cy="436" r="8.5" fill="#292524" />
  <circle cx="391" cy="433" r="2.8" fill="#FFFFFF" />
  <path d="M366 434 C382 420, 405 422, 418 436" stroke="#292524" stroke-width="3" fill="none" />
  <path d="M372 450 C388 456, 406 455, 416 447" stroke="#78716C" stroke-width="1.2" fill="none" />

  <!-- Right Eye -->
  <ellipse cx="512" cy="438" rx="21" ry="11" fill="#D6CFC2" stroke="#292524" stroke-width="2" />
  <circle cx="510" cy="438" r="8.5" fill="#1C1917" />
  <circle cx="507" cy="435" r="2.4" fill="#F5F2EB" />
  <path d="M488 436 C502 422, 524 424, 536 438" stroke="#1C1917" stroke-width="3" fill="none" />
  <path d="M492 452 C506 458, 524 456, 534 448" stroke="#57534E" stroke-width="1.2" fill="none" />

  <!-- Sculpted Nose & Chiaroscuro Nose Shadow -->
  <path d="M452 418 L446 512 C436 518, 430 526, 438 532 C448 538, 464 538, 474 530 C480 524, 476 514, 466 510 L458 422" fill="#C7BFB0" stroke="#57534E" stroke-width="1.6" />
  <path d="M456 420 L466 512 L484 522 L456 534 Z" fill="#57534E" opacity="0.65" />

  <!-- Nasolabial Folds & Gentle Contemplative Mouth -->
  <path d="M420 518 C402 542, 392 568, 390 588" stroke="#6E665B" stroke-width="1.8" fill="none" opacity="0.75" />
  <path d="M488 520 C506 544, 514 568, 516 588" stroke="#44403C" stroke-width="1.8" fill="none" opacity="0.75" />

  <!-- Lips -->
  <path d="M412 576 C432 568, 446 572, 455 575 C464 572, 478 568, 498 576 C480 582, 430 582, 412 576 Z" fill="#786E62" />
  <path d="M412 576 C436 592, 474 592, 498 576 C476 584, 434 584, 412 576 Z" fill="#9E9385" />
  <path d="M408 576 C438 579, 472 579, 502 576" stroke="#3D3832" stroke-width="2.2" fill="none" />

  <!-- Chin Contour Highlight -->
  <path d="M428 618 C445 628, 468 628, 484 618" stroke="#57534E" stroke-width="1.6" fill="none" />

  <!-- Contemplative Left Hand Resting Near Lower Chin / Lapel (Classic Karsh Compositional Anchor) -->
  <g opacity="0.92">
    <path d="M250 1132 L285 955 C298 915, 330 895, 365 910 L395 935 C385 985, 365 1050, 345 1132 Z" fill="#292524" stroke="#57534E" stroke-width="1.2" />
  </g>

  <!-- Archival Halftone Texture Overlay -->
  <rect x="28" y="28" width="844" height="1104" fill="url(#halftoneGrid)" />

  <!-- Darkroom Vignette -->
  <rect x="28" y="28" width="844" height="1104" fill="none" stroke="#0B0A09" stroke-width="24" opacity="0.6" />

  <!-- Authentic Sheet Film Edge Markings -->
  <text x="48" y="20" fill="#78716C" font-family="monospace" font-size="11" letter-spacing="3">KODAK SAFETY FILM 5063 · ARCHIVAL SILVER GELATIN PLATE</text>
  <text x="640" y="20" fill="#78716C" font-family="monospace" font-size="11" letter-spacing="3">ACC. 1956.YK.01</text>
  <text x="48" y="1150" fill="#78716C" font-family="monospace" font-size="11" letter-spacing="2">JAWAHARLAL NEHRU · NEW DELHI SITTING, 1956 · AFTER YOUSUF KARSH</text>
  <text x="720" y="1150" fill="#78716C" font-family="monospace" font-size="11" letter-spacing="2">8×10 IN. NEGATIVE</text>
</svg>
`);

/**
 * Plate 1: With Mahatma Gandhi at the AICC Session, Bombay (1946)
 */
const PLATE_GANDHI_1946_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg1946" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#36322E" />
      <stop offset="60%" stop-color="#211E1B" />
      <stop offset="100%" stop-color="#141210" />
    </linearGradient>
    <linearGradient id="khadiLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5F2EB" />
      <stop offset="65%" stop-color="#C7BFB0" />
      <stop offset="100%" stop-color="#787166" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="#141210" />
  <rect x="20" y="20" width="760" height="560" fill="url(#bg1946)" stroke="#57534E" stroke-width="1" />

  <!-- AICC Shamiana Tent Backdrop Folds -->
  <path d="M20 120 L780 90" stroke="#44403C" stroke-width="1.5" opacity="0.4" />
  <path d="M180 20 L160 580 M390 20 L400 580 M620 20 L640 580" stroke="#292524" stroke-width="18" opacity="0.45" />

  <!-- Figure Left: Jawaharlal Nehru leaning in warm dialogue -->
  <g transform="translate(145, 115)">
    <!-- Shoulders & Achkan Vest -->
    <path d="M10 465 C25 335, 75 265, 155 250 C230 265, 270 340, 285 465 Z" fill="#292524" stroke="#57534E" stroke-width="1.2" />
    <path d="M95 255 L150 355 L205 255" fill="#E5E0D8" opacity="0.85" />
    <!-- Head & Khadi Cap -->
    <ellipse cx="155" cy="175" rx="52" ry="66" fill="#C7BFB0" />
    <path d="M102 145 C135 118, 185 118, 210 148 C202 102, 182 82, 152 80 C122 82, 108 105, 102 145 Z" fill="url(#khadiLight)" />
    <!-- Profile features smiling toward right -->
    <circle cx="176" cy="168" r="4.5" fill="#292524" />
    <path d="M164 156 C174 151, 186 152, 194 158" stroke="#292524" stroke-width="3" fill="none" />
    <path d="M196 172 L212 192 L196 196" fill="#B8AFA0" stroke="#44403C" stroke-width="1.5" />
    <path d="M168 210 C180 216, 192 214, 198 206" stroke="#292524" stroke-width="2.2" fill="none" />
  </g>

  <!-- Figure Right: Mahatma Gandhi seated on bolster with khadi shawl & round spectacles -->
  <g transform="translate(435, 145)">
    <!-- Khadi Dhoti & Shawl -->
    <path d="M0 435 C20 310, 75 245, 155 235 C235 245, 280 315, 305 435 Z" fill="url(#khadiLight)" stroke="#78716C" stroke-width="1.2" />
    <path d="M55 265 C115 320, 185 325, 235 260" stroke="#787166" stroke-width="2" fill="none" />
    <!-- Head -->
    <ellipse cx="145" cy="155" rx="54" ry="64" fill="#B8AFA0" />
    <!-- Iconic Round Wire Spectacles -->
    <circle cx="118" cy="152" r="14" fill="none" stroke="#E5E0D8" stroke-width="2.5" />
    <circle cx="152" cy="152" r="14" fill="none" stroke="#E5E0D8" stroke-width="2.5" />
    <line x1="132" y1="152" x2="138" y2="152" stroke="#E5E0D8" stroke-width="2.5" />
    <line x1="166" y1="152" x2="195" y2="146" stroke="#E5E0D8" stroke-width="2" />
    <!-- Warm smile -->
    <path d="M118 188 C132 198, 152 196, 164 186" stroke="#292524" stroke-width="2.5" fill="none" />
  </g>

  <!-- Foreground Dais Bolster -->
  <rect x="20" y="520" width="760" height="60" fill="#1C1917" stroke="#44403C" stroke-width="1" />
  <text x="40" y="555" fill="#A8A29E" font-family="monospace" font-size="11" letter-spacing="2">FIG. 01 · ALL INDIA CONGRESS COMMITTEE SESSION, BOMBAY · JULY 1946</text>
  <text x="635" y="555" fill="#78716C" font-family="monospace" font-size="11" letter-spacing="2">ACC. 1946.BY.07</text>
</svg>
`);

/**
 * Plate 2: Midnight Session of the Constituent Assembly, New Delhi (14 August 1947)
 */
const PLATE_MIDNIGHT_1947_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <radialGradient id="chamberLight" cx="50%" cy="25%" r="70%">
      <stop offset="0%" stop-color="#4A443C" />
      <stop offset="55%" stop-color="#24201C" />
      <stop offset="100%" stop-color="#0E0D0B" />
    </radialGradient>
  </defs>
  <rect width="800" height="600" fill="#12100E" />
  <rect x="20" y="20" width="760" height="560" fill="url(#chamberLight)" stroke="#57534E" stroke-width="1" />

  <!-- Wood-Paneled Circular Chamber Columns & Archways -->
  <g stroke="#44403C" stroke-width="1.5" opacity="0.55">
    <line x1="120" y1="20" x2="120" y2="520" />
    <line x1="240" y1="20" x2="240" y2="520" />
    <line x1="560" y1="20" x2="560" y2="520" />
    <line x1="680" y1="20" x2="680" y2="520" />
    <path d="M20 110 Q400 65 780 110" fill="none" stroke-width="2" />
  </g>

  <!-- Overhead Parliamentary Spotlight Beams -->
  <polygon points="400,20 240,520 560,520" fill="#F5F2EB" fill-opacity="0.07" />

  <!-- Statesman at the Rostrum Delivering "Tryst with Destiny" -->
  <g transform="translate(310, 145)">
    <!-- Achkan Coat & Khadi Cap -->
    <path d="M25 375 C32 250, 58 195, 92 185 C128 195, 152 250, 160 375 Z" fill="#1C1917" stroke="#78716C" stroke-width="1.2" />
    <ellipse cx="92" cy="128" rx="34" ry="44" fill="#D6CFC2" />
    <path d="M56 112 C78 94, 108 94, 128 112 C122 82, 106 68, 92 68 C76 68, 62 82, 56 112 Z" fill="#FAF8F5" />
    <!-- Raised Right Hand Gesture -->
    <path d="M28 245 L-12 185 L4 175 L46 225" fill="#292524" stroke="#78716C" stroke-width="1" />
    <circle cx="-8" cy="176" r="10" fill="#D6CFC2" />
  </g>

  <!-- Vintage Dual Brass Microphones & Teak Rostrum -->
  <g transform="translate(345, 320)">
    <line x1="35" y1="0" x2="35" y2="95" stroke="#A8A29E" stroke-width="3" />
    <line x1="75" y1="8" x2="75" y2="95" stroke="#A8A29E" stroke-width="3" />
    <rect x="24" y="-22" width="22" height="30" rx="6" fill="#D6CFC2" stroke="#44403C" stroke-width="1.5" />
    <rect x="64" y="-14" width="22" height="30" rx="6" fill="#D6CFC2" stroke="#44403C" stroke-width="1.5" />
    <rect x="-45" y="95" width="200" height="115" fill="#292524" stroke="#78716C" stroke-width="1.5" />
    <rect x="-30" y="110" width="170" height="85" fill="none" stroke="#57534E" stroke-width="1" />
  </g>

  <!-- Silhouetted Assembly Benches -->
  <g fill="#141210" stroke="#44403C" stroke-width="1">
    <circle cx="145" cy="445" r="24" />
    <path d="M105 520 C110 475, 180 475, 185 520 Z" />
    <circle cx="235" cy="455" r="22" />
    <path d="M198 520 C205 480, 265 480, 272 520 Z" />
    <circle cx="575" cy="455" r="22" />
    <path d="M538 520 C545 480, 605 480, 612 520 Z" />
    <circle cx="665" cy="445" r="24" />
    <path d="M625 520 C630 475, 700 475, 705 520 Z" />
  </g>

  <rect x="20" y="520" width="760" height="60" fill="#1C1917" stroke="#44403C" stroke-width="1" />
  <text x="40" y="555" fill="#A8A29E" font-family="monospace" font-size="11" letter-spacing="2">FIG. 02 · CONSTITUENT ASSEMBLY MIDNIGHT SESSION, NEW DELHI · 14 AUG 1947</text>
  <text x="635" y="555" fill="#78716C" font-family="monospace" font-size="11" letter-spacing="2">ACC. 1947.ND.14</text>
</svg>
`);

/**
 * Plate 3: With Albert Einstein at One Mercer Street, Princeton (5 November 1949)
 */
const PLATE_EINSTEIN_1949_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="princetonWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3E3A35" />
      <stop offset="55%" stop-color="#262320" />
      <stop offset="100%" stop-color="#171513" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="#141210" />
  <rect x="20" y="20" width="760" height="560" fill="url(#princetonWall)" stroke="#57534E" stroke-width="1" />

  <!-- Princeton Leaded Window & Clapboard Siding Detail -->
  <rect x="55" y="55" width="210" height="290" fill="#1C1917" stroke="#78716C" stroke-width="2" />
  <line x1="160" y1="55" x2="160" y2="345" stroke="#57534E" stroke-width="2" />
  <line x1="55" y1="150" x2="265" y2="150" stroke="#57534E" stroke-width="2" />
  <line x1="55" y1="245" x2="265" y2="245" stroke="#57534E" stroke-width="2" />

  <!-- Left Figure: Jawaharlal Nehru in Dark Achkan & Khadi Cap -->
  <g transform="translate(175, 125)">
    <path d="M15 395 C25 275, 72 215, 145 205 C215 215, 255 275, 268 395 Z" fill="#1F1D1A" stroke="#78716C" stroke-width="1.2" />
    <line x1="145" y1="205" x2="145" y2="395" stroke="#57534E" stroke-width="1.5" />
    <circle cx="155" cy="245" r="4" fill="#A8A29E" />
    <circle cx="155" cy="285" r="4" fill="#A8A29E" />
    <circle cx="155" cy="325" r="4" fill="#A8A29E" />
    <ellipse cx="145" cy="138" rx="46" ry="58" fill="#D6CFC2" />
    <path d="M98 116 C125 92, 168 92, 192 118 C186 78, 168 62, 145 60 C122 62, 104 78, 98 116 Z" fill="#FAF8F5" />
    <circle cx="164" cy="132" r="4" fill="#1C1917" />
    <path d="M154 166 C165 172, 178 170, 184 162" stroke="#292524" stroke-width="2" fill="none" />
  </g>

  <!-- Right Figure: Albert Einstein with Iconic Silver Halo of Hair & Knit Sweater -->
  <g transform="translate(435, 130)">
    <!-- Loose Knit Sweater -->
    <path d="M15 390 C28 280, 75 225, 148 215 C220 225, 265 280, 278 390 Z" fill="#57534E" stroke="#A8A29E" stroke-width="1.2" />
    <path d="M105 218 C128 248, 168 248, 190 218" stroke="#D6CFC2" stroke-width="3" fill="none" />
    <!-- Iconic Wild White Hair Halo -->
    <path d="M72 155 C55 115, 78 65, 118 58 C145 45, 185 48, 212 68 C242 92, 238 142, 218 168 Z" fill="#EAE4D8" stroke="#A8A29E" stroke-width="1.5" />
    <ellipse cx="146" cy="145" rx="46" ry="55" fill="#C7BFB0" />
    <!-- Mustache & Expressive Eyes -->
    <circle cx="128" cy="138" r="4" fill="#1C1917" />
    <circle cx="162" cy="138" r="4" fill="#1C1917" />
    <path d="M118 172 C134 162, 158 162, 174 172 C164 182, 128 182, 118 172 Z" fill="#E5E0D8" />
  </g>

  <rect x="20" y="520" width="760" height="60" fill="#1C1917" stroke="#44403C" stroke-width="1" />
  <text x="40" y="555" fill="#A8A29E" font-family="monospace" font-size="11" letter-spacing="2">FIG. 03 · WITH ALBERT EINSTEIN AT PRINCETON, NEW JERSEY · 5 NOV 1949</text>
  <text x="635" y="555" fill="#78716C" font-family="monospace" font-size="11" letter-spacing="2">ACC. 1949.PR.11</text>
</svg>
`);

/**
 * Plate 4: Signing the Illuminated Manuscript of the Constitution of India (24 January 1950)
 */
const PLATE_CONSTITUTION_1950_SVG = createSvgDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="deskSurface" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2E2925" />
      <stop offset="100%" stop-color="#171412" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="#141210" />
  <rect x="20" y="20" width="760" height="560" fill="#211E1B" stroke="#57534E" stroke-width="1" />

  <!-- Statesman Seated at Carved Teak Desk Leaning Forward to Sign -->
  <g transform="translate(230, 65)">
    <path d="M25 320 C40 205, 95 155, 175 150 C255 155, 305 205, 325 320 Z" fill="#1C1917" stroke="#78716C" stroke-width="1.2" />
    <ellipse cx="175" cy="108" rx="46" ry="56" fill="#D6CFC2" />
    <path d="M128 88 C155 68, 198 68, 222 88 C215 55, 196 42, 175 42 C154 42, 135 55, 128 88 Z" fill="#FAF8F5" />
    <!-- Downward focused gaze on manuscript -->
    <path d="M152 108 C162 114, 172 114, 178 108" stroke="#292524" stroke-width="2.5" fill="none" />
    <path d="M188 108 C196 114, 206 114, 212 108" stroke="#292524" stroke-width="2.5" fill="none" />
    <!-- Right Arm & Hand Holding Fountain Pen -->
    <path d="M55 245 L135 315 L175 305 L110 225 Z" fill="#292524" stroke="#57534E" stroke-width="1" />
    <circle cx="165" cy="312" r="14" fill="#D6CFC2" />
    <!-- Fountain Pen -->
    <line x1="145" y1="270" x2="188" y2="336" stroke="#FAF8F5" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Carved Teak Parliamentary Desk -->
  <polygon points="20,365 780,365 780,520 20,520" fill="url(#deskSurface)" stroke="#57534E" stroke-width="1.5" />

  <!-- Illuminated Calligraphic Constitution Manuscript Book (Nandalal Bose Borders) -->
  <g transform="translate(245, 330)">
    <polygon points="0,45 155,30 315,45 295,125 155,112 -20,125" fill="#F5F2EB" stroke="#78716C" stroke-width="2" />
    <line x1="155" y1="30" x2="155" y2="112" stroke="#78716C" stroke-width="2" />
    <!-- Illuminated border frame & text lines -->
    <rect x="18" y="46" width="115" height="60" fill="none" stroke="#787166" stroke-width="1.5" />
    <rect x="175" y="46" width="105" height="60" fill="none" stroke="#787166" stroke-width="1.5" />
    <line x1="32" y1="62" x2="118" y2="62" stroke="#57534E" stroke-width="1.5" />
    <line x1="32" y1="74" x2="118" y2="74" stroke="#57534E" stroke-width="1.5" />
    <line x1="32" y1="86" x2="98" y2="86" stroke="#57534E" stroke-width="1.5" />
  </g>

  <!-- Brass Inkwell Stand -->
  <rect x="605" y="340" width="65" height="42" rx="4" fill="#78716C" stroke="#D6CFC2" stroke-width="1.2" />
  <circle cx="637" cy="340" r="12" fill="#A8A29E" />

  <rect x="20" y="520" width="760" height="60" fill="#1C1917" stroke="#44403C" stroke-width="1" />
  <text x="40" y="555" fill="#A8A29E" font-family="monospace" font-size="11" letter-spacing="2">FIG. 04 · SIGNING THE CONSTITUTION OF INDIA, NEW DELHI · 24 JAN 1950</text>
  <text x="635" y="555" fill="#78716C" font-family="monospace" font-size="11" letter-spacing="2">ACC. 1950.CA.24</text>
</svg>
`);

export const PORTRAIT_ANNOTATIONS: PortraitAnnotation[] = [
  {
    id: 'khadi-cap',
    index: '01',
    title: 'Hand-Spun Khadi Topi',
    xPercent: 49,
    yPercent: 22,
    category: 'Sartorial Iconography',
    summary:
      'Adopted during the Non-Cooperation Movement of 1920–22, the white hand-spun khadi cap symbolized self-reliance (Swadeshi) and solidarity with agrarian weavers across the subcontinent.',
    technicalNote:
      'High-key silver highlight retained through selective darkroom dodging to preserve fabric weave.'
  },
  {
    id: 'rembrandt-gaze',
    index: '02',
    title: 'Chiaroscuro Key Lighting & Gaze',
    xPercent: 44,
    yPercent: 39,
    category: 'Optical Composition',
    summary:
      'Photographed at Teen Murti Bhavan in 1956, Yousuf Karsh positioned a single high-intensity key lamp at 45 degrees to sculpt the brow and capture introspective gravity after a nine-year tenure as Prime Minister.',
    technicalNote:
      'Calumet 8×10 inch view camera, 14-inch Commercial Ektar lens at f/11, 1/10s exposure.'
  },
  {
    id: 'red-rose',
    index: '03',
    title: 'The Red Rosebud in the Third Buttonhole',
    xPercent: 55,
    yPercent: 75,
    category: 'Biographical Emblem',
    summary:
      'Pinned daily into the third buttonhole of his bandhgala achkan coat, the fresh red rose became an enduring personal signature—commemorating his late wife Kamala Nehru and bringing organic warmth to formal statecraft.',
    technicalNote:
      'Renders in deep mid-tone density on panchromatic sheet film; subtle warm tint visible in sepia mode.'
  },
  {
    id: 'achkan-tailoring',
    index: '04',
    title: 'Bandhgala Sherwani Achkan',
    xPercent: 34,
    yPercent: 82,
    category: 'Diplomatic Dress',
    summary:
      'The high-collared wool and khadi achkan bridged classical North Indian courtly tailoring with mid-century international diplomacy, soon recognized globally as the "Nehru Jacket" silhouette.',
    technicalNote:
      'Deep shadow separation achieved via low-ratio fill reflector placed camera-right.'
  }
];

export const PORTRAIT_ACCESSION_RECORD = {
  accessionNumber: 'ACC. 1956.YK.01-ND',
  title: 'Jawaharlal Nehru, Prime Minister of India',
  artist: 'Yousuf Karsh (Armenian-Canadian, 1908–2002)',
  dateOfSitting: 'March 1956 (New Delhi Sitting)',
  medium: 'Gelatin silver print from 8 × 10 inch sheet film negative, mounted on archival museum board',
  dimensions: '50.8 × 40.6 cm (20 × 16 in.) sheet; 48.2 × 38.1 cm (19 × 15 in.) image',
  negativeFormat: 'Kodak Super-XX Panchromatic Safety Film, 8 × 10 in.',
  creditLine: 'Permanent Archival Collection · Estate of Yousuf Karsh / Public Domain Historical Commons',
  provenance: [
    '1956: Photographed on location at the Prime Minister’s Residence, New Delhi, India.',
    '1959: Published in "Portraits of Greatness" (University of Toronto Press, Plate 68).',
    '1987: Donated to the National Archives & Library of Parliament Permanent Study Collection.',
    '2026: Digitized at 1,200 dpi bitonal & 16-bit grayscale archival standard for monograph exhibition.'
  ],
  wikimediaUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Jawaharlal_Nehru_by_Karsh.jpg'
};

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    year: '1889',
    dateLabel: '14 November 1889',
    era: 'freedom',
    eraLabel: 'Early Life & Formation',
    location: 'Allahabad, North-Western Provinces',
    title: 'Birth at Anand Bhavan in Allahabad',
    event:
      'Born to Motilal Nehru, a prominent barrister and twice President of the Indian National Congress, and Swarup Rani Thussu. Raised in an atmosphere blending cosmopolitan legal scholarship with emergent nationalist politics.',
    primarySourceQuote:
      'Childhood memories of Anand Bhavan were woven with the cadence of constitutional debate and the quiet gathering of a nation seeking its voice.',
    sourceCitation: 'An Autobiography (London: John Lane The Bodley Head, 1936), Chapter I.',
    archiveRef: 'MS-ALL-1889-01'
  },
  {
    year: '1912',
    dateLabel: 'October 1912',
    era: 'freedom',
    eraLabel: 'Freedom Movement',
    location: 'Cambridge, London & Allahabad',
    title: 'Natural Sciences Tripos at Trinity College & Call to the Bar',
    event:
      'Graduated with honours in Natural Sciences (Chemistry, Geology, and Botany) from Trinity College, Cambridge (1910), before being called to the Bar at the Inner Temple, London (1912). Returned to India to enroll as an advocate of the Allahabad High Court, bringing lifelong scientific temper to political thought.',
    primarySourceQuote:
      'My study of the natural sciences at Cambridge left an indelible conviction that no modern society could advance without the spirit of free inquiry.',
    sourceCitation: 'Trinity College Matriculation & Inner Temple Call Register, 1907–1912.',
    archiveRef: 'MS-CAM-1912-04'
  },
  {
    year: '1929',
    dateLabel: '31 December 1929',
    era: 'freedom',
    eraLabel: 'Freedom Movement',
    location: 'Banks of the Ravi River, Lahore',
    title: 'Presidency of the Lahore Congress & Declaration of Purna Swaraj',
    event:
      'Elected President of the Indian National Congress at the historic Lahore session. At midnight on New Year’s Eve, Nehru hoisted the tricolour on the banks of the Ravi River and moved the Purna Swaraj resolution demanding complete independence from British rule.',
    primarySourceQuote:
      'We have now an open conspiracy to free this country from foreign rule, and you, comrades, and all our countrymen and countrywomen are invited to join it.',
    sourceCitation: 'Presidential Address, 44th Session of the Indian National Congress, Lahore, December 1929.',
    archiveRef: 'AICC-LAH-1929-12'
  },
  {
    year: '1944',
    dateLabel: 'April – September 1944',
    era: 'literary',
    eraLabel: 'Literary & Philosophical Works',
    location: 'Ahmadnagar Fort Prison, Maharashtra',
    title: 'Composition of "The Discovery of India" in Detainment',
    event:
      'During his ninth and final imprisonment by British authorities following the Quit India Resolution (1942–1945), Nehru wrote the 500-page manuscript of "The Discovery of India" over five months in Room No. 8 of Ahmadnagar Fort, tracing 5,000 years of subcontinental intellectual synthesis.',
    primarySourceQuote:
      'She was like some ancient palimpsest on which layer upon layer of thought and reverie had been inscribed, and yet no succeeding layer had completely hidden or erased what had been written previously.',
    sourceCitation: 'The Discovery of India (Calcutta: The Signet Press, 1946), p. 48.',
    archiveRef: 'MS-AHM-1944-08'
  },
  {
    year: '1947',
    dateLabel: '14–15 August 1947',
    era: 'statecraft',
    eraLabel: 'Nation Building & Statecraft',
    location: 'Council House, New Delhi',
    title: 'Tryst with Destiny & Swearing-In as First Prime Minister',
    event:
      'Shortly before midnight on 14 August 1947, Nehru addressed the Constituent Assembly in New Delhi with his immortal "Tryst with Destiny" speech. The following morning, he was sworn in at the Red Fort and Government House as the first Prime Minister of independent India.',
    primarySourceQuote:
      'At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.',
    sourceCitation: 'Constituent Assembly of India Debates, Vol. V, 14 August 1947, pp. 4–5.',
    archiveRef: 'CAD-ND-1947-08'
  },
  {
    year: '1951',
    dateLabel: '1951 – 1956',
    era: 'statecraft',
    eraLabel: 'Nation Building & Statecraft',
    location: 'New Delhi & Kharagpur',
    title: 'First Five-Year Plan, IITs & Parliamentary Democracy',
    event:
      'Spearheaded the first universal-suffrage general election in 1951–52 (173 million registered voters), launched the First Five-Year Plan, and established foundational institutions including the Indian Institutes of Technology (beginning with IIT Kharagpur in 1951), the Atomic Energy Commission, and the Sahitya Akademi.',
    primarySourceQuote:
      'It is science alone that can solve the problems of hunger and poverty, of insanitation and illiteracy, of superstition and deadening custom and tradition.',
    sourceCitation: 'Address to the Indian Science Congress, 1951 · Planning Commission Archives.',
    archiveRef: 'PC-GOI-1951-02'
  },
  {
    year: '1955',
    dateLabel: '15 July 1955',
    era: 'statecraft',
    eraLabel: 'Nation Building & Statecraft',
    location: 'Bandung & Rashtrapati Bhavan, New Delhi',
    title: 'Bandung Conference & Conferral of the Bharat Ratna',
    event:
      'Co-convened the Asian-African Conference in Bandung, Indonesia, laying the diplomatic cornerstone for the Non-Aligned Movement (1961). Upon returning from his diplomatic tour of Europe and the Soviet Union, President Rajendra Prasad conferred upon him the Bharat Ratna, India’s highest civilian honour.',
    primarySourceQuote:
      'Peace is not merely the absence of war; it is also a state of mind, born of non-alignment with military blocs and mutual respect among sovereign nations.',
    sourceCitation: 'Gazette of India Extraordinary, Presidential Secretariat Notification, July 1955.',
    archiveRef: 'MEA-BAN-1955-07'
  },
  {
    year: '1964',
    dateLabel: '27 May 1964',
    era: 'statecraft',
    eraLabel: 'Nation Building & Statecraft',
    location: 'Teen Murti Bhavan, New Delhi',
    title: 'Passing in Office & Enduring Constitutional Legacy',
    event:
      'Passed away at Teen Murti Bhavan on 27 May 1964 after serving seventeen consecutive years as Prime Minister and Minister of External Affairs. On his study desk lay a handwritten transcription of Robert Frost’s lines: "The woods are lovely, dark and deep, / But I have promises to keep, / And miles to go before I sleep."',
    primarySourceQuote:
      'If any people choose to think of me, then I should like them to say: "This was a man who, with all his mind and heart, loved India and the Indian people."',
    sourceCitation: 'Last Will and Testament of Jawaharlal Nehru, dated 21 June 1954.',
    archiveRef: 'NMM-TM-1964-05'
  }
];

export const ARCHIVAL_PLATES: ArchivalPlate[] = [
  {
    id: 'gandhi-1946',
    figureNumber: 'Fig. 01',
    accessionNumber: 'ACC. 1946.BY.07',
    year: '1946',
    title: 'With Mahatma Gandhi at the All India Congress Committee Session',
    location: 'Gowalia Tank, Bombay',
    photographer: 'Press Photo Bureau / Public Domain Archive',
    medium: 'Gelatin silver press print on ferrotyped fiber paper',
    dimensions: '20.3 × 25.4 cm (8 × 10 in.)',
    caption: 'With Mahatma Gandhi during the All India Congress Committee (AICC) meeting in Bombay, July 6, 1946.',
    curatorialEssay:
      'Taken thirteen months before independence during the critical Cabinet Mission deliberations in Bombay, this candid frame captures the unguarded camaraderie between mentor and political heir. Despite philosophical divergences on industrialization, Gandhi had declared in 1942: "When I am gone, he will speak my language."',
    svgDataUri: PLATE_GANDHI_1946_SVG,
    wikimediaUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Jawaharlal_Nehru_and_Mahatma_Gandhi_1946.jpg/800px-Jawaharlal_Nehru_and_Mahatma_Gandhi_1946.jpg'
  },
  {
    id: 'midnight-1947',
    figureNumber: 'Fig. 02',
    accessionNumber: 'ACC. 1947.ND.14',
    year: '1947',
    title: 'Delivering the "Tryst with Destiny" Address at Midnight',
    location: 'Constituent Assembly Chamber, New Delhi',
    photographer: 'Photo Division, Ministry of Information & Broadcasting',
    medium: 'Gelatin silver print from medium-format press negative',
    dimensions: '24.0 × 30.5 cm (9.5 × 12 in.)',
    caption: 'Addressing the Fifth Session of the Constituent Assembly of India moments before midnight, August 14, 1947.',
    curatorialEssay:
      'Standing before dual brass ribbon microphones in the wood-paneled Constitution Hall, Nehru spoke without theatrical flourish, framing independence not as a triumphalist conclusion but as a solemn pledge to "wipe every tear from every eye" and end poverty, ignorance, and inequality.',
    svgDataUri: PLATE_MIDNIGHT_1947_SVG,
    wikimediaUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Jawaharlal_Nehru_delivering_his_Tryst_with_Destiny_speech.jpg/800px-Jawaharlal_Nehru_delivering_his_Tryst_with_Destiny_speech.jpg'
  },
  {
    id: 'einstein-1949',
    figureNumber: 'Fig. 03',
    accessionNumber: 'ACC. 1949.PR.11',
    year: '1949',
    title: 'Dialogue with Albert Einstein at One Mercer Street',
    location: 'Princeton, New Jersey, United States',
    photographer: 'Alan Richards / Princeton University Archives',
    medium: 'Gelatin silver print from 4 × 5 inch press negative',
    dimensions: '20.3 × 25.4 cm (8 × 10 in.)',
    caption: 'With Albert Einstein on the porch of 112 Mercer Street at Princeton, New Jersey, November 5, 1949.',
    curatorialEssay:
      'During his first official visit to the United States in autumn 1949, Nehru traveled specifically to Princeton to spend an afternoon with Albert Einstein. Their conversation spanned nuclear disarmament, world federalism, and the ethical obligations of scientific discovery in the atomic age.',
    svgDataUri: PLATE_EINSTEIN_1949_SVG,
    wikimediaUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Albert_Einstein_and_Jawaharlal_Nehru_at_Princeton.jpg/800px-Albert_Einstein_and_Jawaharlal_Nehru_at_Princeton.jpg'
  },
  {
    id: 'constitution-1950',
    figureNumber: 'Fig. 04',
    accessionNumber: 'ACC. 1950.CA.24',
    year: '1950',
    title: 'Signing the Illuminated Manuscript of the Constitution of India',
    location: 'Parliament House, New Delhi',
    photographer: 'Press Information Bureau, Government of India',
    medium: 'Gelatin silver archival print',
    dimensions: '20.3 × 25.4 cm (8 × 10 in.)',
    caption: 'Signing the hand-calligraphed original manuscript of the Constitution of India, January 24, 1950.',
    curatorialEssay:
      'Two days before India formally became a sovereign democratic republic on January 26, 1950, the 284 members of the Constituent Assembly signed the parchment manuscript calligraphed by Prem Behari Narain Raizada and illuminated by Nandalal Bose of Santiniketan—Nehru affixed the first signature.',
    svgDataUri: PLATE_CONSTITUTION_1950_SVG,
    wikimediaUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Nehru_signing_Indian_Constitution.jpg/800px-Nehru_signing_Indian_Constitution.jpg'
  }
];

export const SPEECH_ANNOTATIONS: SpeechAnnotation[] = [
  {
    id: 'note-1',
    marker: '[1]',
    heading: 'Parliamentary Context & Timing',
    note: 'Spoken between 11:51 PM and 11:59 PM IST on 14 August 1947 during the special midnight sitting of the Fifth Session of the Constituent Assembly, presided over by Dr. Rajendra Prasad.',
    historicalContext: 'Followed immediately by the blowing of a conch shell at the stroke of midnight and the taking of the pledge by members.'
  },
  {
    id: 'note-2',
    marker: '[2]',
    heading: 'Rhetorical Cadence & Draftsmanship',
    note: 'Unlike typical state addresses drafted by secretariat committees, Nehru composed the text personally in a single sitting. He originally wrote "a date with destiny" before revising it to the elevated phrase "a tryst with destiny."',
    historicalContext: 'Broadcast live by All India Radio across the subcontinent and via shortwave relay by the BBC.'
  },
  {
    id: 'note-3',
    marker: '[3]',
    heading: 'Echoes of Mahatma Gandhi',
    note: 'The phrase "to wipe every tear from every eye" directly invokes Mahatma Gandhi, who spent that very midnight in Calcutta fasting and working to quell communal violence rather than attending the state ceremonies in New Delhi.',
    historicalContext: 'Anchors political sovereignty in social justice and moral responsibility rather than mere territorial transfer.'
  }
];
