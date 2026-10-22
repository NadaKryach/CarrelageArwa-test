import fs from 'fs';
import path from 'path';

// Exact products parsed from the 6 uploaded photos of the user's ERP (Stock Mirage / Carrelage Arwa Meknes)
const rawItems = [
  // Image 0 (IMG-20261010-WA0000)
  { ref: 'CCRIS 9017', des: 'CAR 19*57 REF 2206 1ER (1.40)', l: 57, w: 19, boxM2: 1.40, tpb: 13, price: 78.00 },
  { ref: 'CCRIS 9018', des: 'CAR 19*57 REF 2207 1ER (1.40)', l: 57, w: 19, boxM2: 1.40, tpb: 13, price: 78.00 },
  { ref: 'CCRIS 9019', des: 'CAR 19*57 REF 2208 1ER (1.40)', l: 57, w: 19, boxM2: 1.40, tpb: 13, price: 78.00 },
  { ref: 'CCRIS 9022', des: 'CAR 19*57 REF 2211 1ER (1.40)', l: 57, w: 19, boxM2: 1.40, tpb: 13, price: 78.00 },
  { ref: 'CCRIS 1000088', des: 'CAR 25*50 REF 1014 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 1000087', des: 'CAR 25*50 REF 1017 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 20030', des: 'CAR 25*50 REF 1085 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 20031', des: 'CAR 25*50 REF 1086 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 8009', des: 'CAR 25*50 REF 1102 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 8012', des: 'CAR 25*50 REF 1103/D 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 8015', des: 'CAR 25*50 REF 1109 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 8025', des: 'CAR 25*50 REF 1115 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 100332', des: 'CAR 25*50 REF 1115/P 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 9100', des: 'CAR 25*50 REF 1119 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 100336', des: 'CAR 25*50 REF 1119/P 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 72.00 },
  { ref: 'CCRIS 20036', des: 'CAR 25*50 REF 1142 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 20038', des: 'CAR 25*50 REF 1142/P 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 20037', des: 'CAR 25*50 REF 1143 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 20040', des: 'CAR 25*50 REF 1144 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 20041', des: 'CAR 25*50 REF 1145 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 571', des: 'CAR 25*50 REF 500 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 7701', des: 'CAR 25*50 REF 544 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7716', des: 'CAR 25*50 REF 549 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 7780', des: 'CAR 25*50 REF 565 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7871', des: 'CAR 25*50 REF 577/P 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7917', des: 'CAR 25*50 REF 578 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7920', des: 'CAR 25*50 REF 578/P 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7916', des: 'CAR 25*50 REF 579 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7919', des: 'CAR 25*50 REF 579/P 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7918', des: 'CAR 25*50 REF 580 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7989', des: 'CAR 25*50 REF 645 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 65.00 },
  { ref: 'CCRIS 7504', des: 'CAR 25*50 REF 646 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 65.00 },
  { ref: 'CCRIS 7513', des: 'CAR 25*50 REF 658/D 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 80.00 },
  { ref: 'CCRIS 7577', des: 'CAR 25*50 REF 705 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 7578', des: 'CAR 25*50 REF 706 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 7573', des: 'CAR 25*50 REF 707 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },

  // Image 1 (IMG-20261010-WA0001)
  { ref: 'CCRIS 30045', des: 'CAR 30*90 REF 91031 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30046', des: 'CAR 30*90 REF 91034 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 300010', des: 'CAR 30*90 REF 92001 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30016', des: 'CAR 30*90 REF 92004 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30018', des: 'CAR 30*90 REF 92010/D 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30019', des: 'CAR 30*90 REF 92011/D 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30020', des: 'CAR 30*90 REF 92012/D 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 2132', des: 'CAR 35*35 REF 35049 2EME', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 55.00 },
  { ref: 'CCRIS 2149', des: 'CAR 35*35 REF 35064 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 65.00 },
  { ref: 'CCRIS 2056', des: 'CAR 35*35 REF 3549 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 2057', des: 'CAR 35*35 REF 3550 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 2167', des: 'CAR 35*35 REF 3578 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 2177', des: 'CAR 35*35 REF 3588 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2179', des: 'CAR 35*35 REF 3589 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2181', des: 'CAR 35*35 REF 3591 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2178', des: 'CAR 35*35 REF 3593 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2182', des: 'CAR 35*35 REF 3594 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2184', des: 'CAR 35*35 REF 3597 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2188', des: 'CAR 35*35 REF 3598 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2187', des: 'CAR 35*35 REF 3599 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2042', des: 'CAR 35*35 REF ATLAS 3541 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 2043', des: 'CAR 35*35 REF ATLAS 3542 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 65.00 },
  { ref: 'CCRIS 2044', des: 'CAR 35*35 REF ATLAS 3543 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 2012', des: 'CAR 35*35 REF MARRAKECH 3532', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 426', des: 'CAR 35*35 REF PIEDRAS 3517 1ER', l: 35, w: 35, boxM2: 1.47, tpb: 12, price: 80.00 },
  { ref: 'CCRIS 2000061', des: 'CAR 35*60 REF 36001 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000059', des: 'CAR 35*60 REF 36004 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000080', des: 'CAR 35*60 REF 36009 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000050', des: 'CAR 35*60 REF 36011 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000051', des: 'CAR 35*60 REF 36012 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200149', des: 'CAR 35*60 REF 36048/D (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000073', des: 'CAR 35*60 REF 36056 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000076', des: 'CAR 35*60 REF 36071/D 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200092', des: 'CAR 35*60 REF 36113 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000099', des: 'CAR 35*60 REF 36119 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200105', des: 'CAR 35*60 REF 36122 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },

  // Image 2 (IMG-20261010-WA0002)
  { ref: 'CCRIS 200104', des: 'CAR 35*60 REF 36125 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200106', des: 'CAR 35*60 REF 36131 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200111', des: 'CAR 35*60 REF 36134 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200114', des: 'CAR 35*60 REF 36140 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200131', des: 'CAR 35*60 REF 36151 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200130', des: 'CAR 35*60 REF 36154 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200133', des: 'CAR 35*60 REF 36157 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200143', des: 'CAR 35*60 REF 36160 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200171', des: 'CAR 35*60 REF 36189 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200191', des: 'CAR 35*60 REF 36190 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200188', des: 'CAR 35*60 REF 36191 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200190', des: 'CAR 35*60 REF 36193 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200208', des: 'CAR 35*60 REF 36206 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000049', des: 'CAR 35*60 REF 37002 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200090', des: 'CAR 35*60 REF 37004 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000053', des: 'CAR 35*60 REF 37005 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 2000078', des: 'CAR 35*60 REF 37050 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200177', des: 'CAR 35*60 REF 37067 1ER (1.47)', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 200199', des: 'CAR 35*60 REF BCH 37025 1ER', l: 60, w: 35, boxM2: 1.47, tpb: 7, price: 78.00 },
  { ref: 'CCRIS 1455', des: 'CAR 40*40 RE 40533 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1068', des: 'CAR 40*40 REF 40007 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1059', des: 'CAR 40*40 REF 40012 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1058', des: 'CAR 40*40 REF 40027 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1061', des: 'CAR 40*40 REF 40028 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1074', des: 'CAR 40*40 REF 40031 1ER(1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1080', des: 'CAR 40*40 REF 40052 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1101', des: 'CAR 40*40 REF 40096 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 1110', des: 'CAR 40*40 REF 40115 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1298', des: 'CAR 40*40 REF 40117 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1153', des: 'CAR 40*40 REF 40118 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1121', des: 'CAR 40*40 REF 40139 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1188', des: 'CAR 40*40 REF 40152 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1226', des: 'CAR 40*40 REF 40174 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1229', des: 'CAR 40*40 REF 40175 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 65, price: 65.00 },
  { ref: 'CCRIS 1182', des: 'CAR 40*40 REF 40190 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },

  // Image 3 (IMG-20261010-WA0003)
  { ref: 'CCRIS 1215', des: 'CAR 40*40 REF 40231 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 64.50 },
  { ref: 'CCRIS 1187', des: 'CAR 40*40 REF 40236 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1191', des: 'CAR 40*40 REF 40238 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1198', des: 'CAR 40*40 REF 40241 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1209', des: 'CAR 40*40 REF 40255 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 64.00 },
  { ref: 'CCRIS 1207', des: 'CAR 40*40 REF 40256 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 64.00 },
  { ref: 'CCRIS 1208', des: 'CAR 40*40 REF 40257 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 64.00 },
  { ref: 'CCRIS 1236', des: 'CAR 40*40 REF 40266 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1239', des: 'CAR 40*40 REF 40269 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1247', des: 'CAR 40*40 REF 40277 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1248', des: 'CAR 40*40 REF 40278 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1392', des: 'CAR 40*40 REF 40280 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1265', des: 'CAR 40*40 REF 40284 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1267', des: 'CAR 40*40 REF 40291 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1269', des: 'CAR 40*40 REF 40293 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1324', des: 'CAR 40*40 REF 40311 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1320', des: 'CAR 40*40 REF 40312 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1325', des: 'CAR 40*40 REF 40313 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1326', des: 'CAR 40*40 REF 40315 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1327', des: 'CAR 40*40 REF 40316 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1349', des: 'CAR 40*40 REF 40318 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1355', des: 'CAR 40*40 REF 40319 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1383', des: 'CAR 40*40 REF 40321 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1385', des: 'CAR 40*40 REF 40322 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1386', des: 'CAR 40*40 REF 40322 2EME (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 55.00 },
  { ref: 'CCRIS 1388', des: 'CAR 40*40 REF 40344 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 1390', des: 'CAR 40*40 REF 40345 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 1400', des: 'CAR 40*40 REF 40359 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 1401', des: 'CAR 40*40 REF 40359 2EME (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1402', des: 'CAR 40*40 REF 40366 1ER', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 1407', des: 'CAR 40*40 REF 40394 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 75.00 },
  { ref: 'CCRIS 1414', des: 'CAR 40*40 REF 40445 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1415', des: 'CAR 40*40 REF 40446 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1440', des: 'CAR 40*40 REF 40524 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },

  // Image 4 (IMG-20261010-WA0004)
  { ref: 'CCRIS 7580', des: 'CAR 25*50 REF 709 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 65.00 },
  { ref: 'CCRIS 7686', des: 'CAR 25*50 REF 71308 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 80.00 },
  { ref: 'CCRIS 1000026', des: 'CAR 25*50 REF 71310 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 1000036', des: 'CAR 25*50 REF 71314 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 20027', des: 'CAR 25*50 REF 73216 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 8006', des: 'CAR 25*50 REF 73218 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 100021', des: 'CAR 25*50 REF 73301 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 100022', des: 'CAR 25*50 REF 73302 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 968', des: 'CAR 25*50 REF 753 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 985', des: 'CAR 25*50 REF 760 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 986', des: 'CAR 25*50 REF 761 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 994', des: 'CAR 25*50 REF 774 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 65.00 },
  { ref: 'CCRIS 100000', des: 'CAR 25*50 REF 832 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 68.00 },
  { ref: 'CCRIS 100009', des: 'CAR 25*50 REF 847 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 75.00 },
  { ref: 'CCRIS 573', des: 'CAR 25*50 REF 8507 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 85.00 },
  { ref: 'CCRIS 746', des: 'CAR 25*50 REF 8511 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 85.00 },
  { ref: 'CCRIS 1000056', des: 'CAR 25*50 REF 931 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 1000060', des: 'CAR 25*50 REF 955 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 1000061', des: 'CAR 25*50 REF 958 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 1000065', des: 'CAR 25*50 REF 959/D 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 78.00 },
  { ref: 'CCRIS 1000063', des: 'CAR 25*50 REF 964 1ER', l: 50, w: 25, boxM2: 1.50, tpb: 12, price: 70.00 },
  { ref: 'CCRIS 60002', des: 'CAR 25*75 REF 75003 1ER', l: 75, w: 25, boxM2: 1.50, tpb: 8, price: 85.00 },
  { ref: 'CCRIS 60049', des: 'CAR 25*75 REF 75012 RLV 2EME', l: 75, w: 25, boxM2: 1.50, tpb: 8, price: 75.00 },
  { ref: 'CCRIS 60031', des: 'CAR 25*75 REF 75019 1ER', l: 75, w: 25, boxM2: 1.50, tpb: 8, price: 85.00 },
  { ref: 'CCRIS 60023', des: 'CAR 25*75 REF 76006 1ER', l: 75, w: 25, boxM2: 1.50, tpb: 8, price: 85.00 },
  { ref: 'CCRIS 60026', des: 'CAR 25*75 REF 76008 RLV 1ER', l: 75, w: 25, boxM2: 1.50, tpb: 8, price: 90.00 },
  { ref: 'CCRIS 300003', des: 'CAR 30*90 REF 91004 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 300007', des: 'CAR 30*90 REF 91007 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 300006', des: 'CAR 30*90 REF 91008 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 300009', des: 'CAR 30*90 REF 91010 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30026', des: 'CAR 30*90 REF 91013/D 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30030', des: 'CAR 30*90 REF 91017/D 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30038', des: 'CAR 30*90 REF 91024 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },
  { ref: 'CCRIS 30044', des: 'CAR 30*90 REF 91028 1ER', l: 90, w: 30, boxM2: 1.08, tpb: 4, price: 110.00 },

  // Image 5 (IMG-20261010-WA0005)
  { ref: 'CCRIS 1445', des: 'CAR 40*40 REF 40525 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1444', des: 'CAR 40*40 REF 40526 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1446', des: 'CAR 40*40 REF 40529 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1449', des: 'CAR 40*40 REF 40530 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1451', des: 'CAR 40*40 REF 40532 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 1453', des: 'CAR 40*40 REF 40532 2EME (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 60.00 },
  { ref: 'CCRIS 1459', des: 'CAR 40*40 REF 40540 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 1467', des: 'CAR 40*40 REF 40549 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1485', des: 'CAR 40*40 REF ART 40584 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1484', des: 'CAR 40*40 REF ART 40592 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 1163', des: 'CAR 40*40 REF ATHENES 40179 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1165', des: 'CAR 40*40 REF ATHENES 40188 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1482', des: 'CAR 40*40 REF REVQ 42 (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1483', des: 'CAR 40*40 REF REVQ 43 (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 65.00 },
  { ref: 'CCRIS 1412', des: 'CAR 40*40*REF 40439 1ER (1.47)', l: 40, w: 40, boxM2: 1.44, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 3000001', des: 'CAR 40.5*40.5 REF 40487 1ER', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 3000002', des: 'CAR 40.5*40.5 REF 40492 1ER', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 3000004', des: 'CAR 40.5*40.5 REF 40494 1ER', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 3000005', des: 'CAR 40.5*40.5 REF 40495 1ER', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 3000008', des: 'CAR 40.5*40.5 REF 40497 1ER', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 70.00 },
  { ref: 'CCRIS 3000028', des: 'CAR 40.5*40.5 REF 40541 1ER (1.47)', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 3000011', des: 'CAR 40.5*40.5 REF 40548 1ER', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 3000012', des: 'CAR 40.5*40.5 REF 40551 1ER (1.47)', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 3000014', des: 'CAR 40.5*40.5 REF 40552 1ER (1.47)', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 3000015', des: 'CAR 40.5*40.5 REF 40553 1ER (1.47)', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 3000020', des: 'CAR 40.5*40.5 REF 40559 1ER (1.47)', l: 40.5, w: 40.5, boxM2: 1.47, tpb: 9, price: 68.00 },
  { ref: 'CCRIS 200002', des: 'CAR 62*62 REF 62002 1ER (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 110.00 },
  { ref: 'CCRIS 800013', des: 'CAR 62*62 REF 62014 1ER (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 110.00 },
  { ref: 'CCRIS 200009', des: 'CAR 62*62 REF 62041 1ER (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 110.00 },
  { ref: 'CCRIS 200013', des: 'CAR 62*62 REF 62070 1ER (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 110.00 },
  { ref: 'CCRIS 800004', des: 'CAR 62*62 REF 65013 2EME (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 78.00 },
  { ref: 'CCRIS 700002', des: 'CAR 62*62 REF 65014 2EME (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 80.00 },
  { ref: 'CCRIS 800019', des: 'CAR 62*62 REF 65017 2EME (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 78.00 },
  { ref: 'CCRIS 800012', des: 'CAR 62*62 REF 65018 1ER (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 110.00 },
  { ref: 'CAR 200024', des: 'CAR 62*62 REF LAR 62060 1ER (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 110.00 },
  { ref: 'CCRIS 200021', des: 'CAR 62*62 REF LAR 62066 1ER (1.92)', l: 62, w: 62, boxM2: 1.92, tpb: 5, price: 110.00 },
];

// Deduplicate by reference if any
const seenRefs = new Set();
const uniqueItems = [];
for (const item of rawItems) {
  if (!seenRefs.has(item.ref)) {
    seenRefs.add(item.ref);
    uniqueItems.push(item);
  }
}

console.log(`Parsed ${uniqueItems.length} unique carrelage products.`);

// Build Product objects
const TARGET_M2 = 1000;
const MIN_ALERT_M2 = 100;
const now = new Date().toISOString();

const categories = [
  {
    id: 'cat_carr',
    name: 'Carrelage',
    description: 'Carrelage sol, mural, faïence, grès cérame, plinthes et décors',
    icon: 'Layers',
    defaultSalesUnit: 'm²',
    active: true,
  },
  {
    id: 'cat_sanit',
    name: 'Sanitaires',
    description: 'Cuvettes, lavabos, meubles sdb, receveurs et robinetterie',
    icon: 'Bath',
    defaultSalesUnit: 'pièce',
    active: true,
  },
  {
    id: 'cat_colle',
    name: 'Colles & Accessoires',
    description: 'Ciment colle, mortiers de jointoiement, profilés et croisillons',
    icon: 'Boxes',
    defaultSalesUnit: 'sac',
    active: true,
  },
];

const products = uniqueItems.map((item, idx) => {
  const surfacePerTile = (item.l * item.w) / 10000;
  const surfacePerBox = item.boxM2 || (surfacePerTile * item.tpb);
  
  // Exactly 1000 m² stock
  const totalTiles = Math.round(TARGET_M2 / surfacePerTile);
  const boxesInStock = Math.floor(totalTiles / item.tpb);
  const looseTilesInStock = totalTiles % item.tpb;
  const actualTotalM2 = Number((totalTiles * surfacePerTile).toFixed(2));

  // Wholesale cost estimated ~65% of selling price
  const prixVente = Number(item.price.toFixed(2));
  const prixAchat = Number((item.price * 0.65).toFixed(2));

  const carrelageDetails = {
    lengthCm: item.l,
    widthCm: item.w,
    tilesPerBox: item.tpb,
    surfacePerTile: Number(surfacePerTile.toFixed(4)),
    surfacePerBox: Number(surfacePerBox.toFixed(4)),
    boxesInStock,
    looseTilesInStock,
    totalTilesInStock: totalTiles,
    totalSurfaceM2: actualTotalM2, // ~1000 m²
    priceBasis: 'm2',
    purchasePricePerM2: prixAchat,
    sellingPricePerM2: prixVente,
    purchaseCostPerBox: Number((prixAchat * surfacePerBox).toFixed(2)),
    sellingPricePerBox: Number((prixVente * surfacePerBox).toFixed(2)),
  };

  return {
    id: `prod_carr_${String(idx + 1).padStart(3, '0')}`,
    designation: item.des,
    reference: item.ref,
    categoryId: 'cat_carr',
    productType: 'carrelage',
    description: `Carrelage ${item.l}x${item.w} cm de 1er choix - Stock disponible 1000 m²`,
    prixAchat,
    prixVente,
    stockQuantity: actualTotalM2, // 1000 m²
    stockMin: MIN_ALERT_M2, // 100 m² as requested!
    origin: 'local',
    active: true,
    isArchived: false,
    carrelageDetails,
    createdAt: now,
    updatedAt: now,
  };
});

// Update data/database.json
const dbPath = path.resolve('data/database.json');
if (fs.existsSync(dbPath)) {
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  dbData.categories = categories;
  dbData.products = products;
  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
  console.log(`Successfully updated ${dbPath} with ${products.length} products and ${categories.length} categories.`);
} else {
  console.error('database.json not found!');
}
