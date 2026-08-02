// parda breaket 
import breaket from "../assets/locks/pardabraket/pardabreaket.jpg";

// multi and cupoard lcoks
import whitemetalmultig from "../assets/locks/multilocks/orelmultiwhitemetallever.png";
import whitemetalmultii from "../assets/locks/multilocks/orelmultiwhitemetalleverlk2.png";
import multi from "../assets/locks/multilocks/cellomultibluelever.png";
import ultraeurobluecupboardi from "../assets/locks/multilocks/ultraeurobluecupboard.png";
import ultraeurobluecupboardg from "../assets/locks/multilocks/ultracupboardblueeurss.png";
import orelultrasquarecupssi from "../assets/locks/multilocks/orelultrasquarecupss.png";
import orelcupultrasseuroi from "../assets/locks/multilocks/orelcupultrasseuro.png";
import multisqrlevrslvg from "../assets/locks/multilocks/multisqrlevrslv.png";
import multisqrlevrslvi from "../assets/locks/multilocks/multisqrleverslv.png";
import levercupboardsseur from "../assets/locks/multilocks/levercupboardsseur.png";
import euroultrassjordancup from "../assets/locks/multilocks/euroultrassjordancup.png";
import aldropeuropaslv from "../assets/locks/multilocks/aldropeuropaslv.png";




// aldrop/

import aldrop from "../assets/locks/aldrops/aldrop.webp"
import aldropkit from "../assets/locks/aldrops/aldropset.webp";
import aldropkitc from "../assets/locks/aldrops/aldropsetw.jpeg";

// padlocks
import inayatimepremium68mmlki from "../assets/locks/padlocks/inayapremiuim68mmlk.png";
import inayatimepremium68mmlg from "../assets/locks/padlocks/timepremium68mm.png";
import inayaslvi from "../assets/locks/padlocks/inayaslv.png";
import inayaactiveslv5363 from "../assets/locks/padlocks/inayaactiveslv5363.png";
import inaya75mm from "../assets/locks/padlocks/inaya75mm.png";
import lathi74mmlkci from "../assets/locks/padlocks/lathi74mmlkc.png";
import lathi74mmbcg from "../assets/locks/padlocks/lathi74mmbc.png";
import lathi74mmg from "../assets/locks/padlocks/lathi74mm.png";
import remexjeet86mmlkci from "../assets/locks/padlocks/remexjeet86mmlkc.png";
import remexjeetsetcg from "../assets/locks/padlocks/remexjeetsetc.png";





import doorkongalsg from "../assets/locks/padlocks/doorkonshakti65mmrooundc.png";
import doorkonimgi from "../assets/locks/padlocks/doorkonshaktiround64mmlockc.png";
import doorkongalb from "../assets/locks/padlocks/doorkonshaktiround65mmboxc.png";
import doorkongalsn from "../assets/locks/padlocks/doorkonshaktiround65mmsetc.png";
import harrisonboxg from "../assets/locks/padlocks/harrisonboxc.png";
import harrisonsg from "../assets/locks/padlocks/harrisonc.png";
import harrisonlocki from "../assets/locks/padlocks/harrisonlockc.png";
import inaya25sg from "../assets/locks/padlocks/inaya25mmc.png";
import inaya25li from "../assets/locks/padlocks/inaya25mmlockc.png";
import inayablacklockkeylkg from "../assets/locks/padlocks/inayablacklockkeyc.png";
import inayablacksetsi from "../assets/locks/padlocks/inayablacksetc.png";
import inayacaptain52setcmmi from "../assets/locks/padlocks/inayacaptain52setcmm.png";
import inayaclassic65mmlockkeyi from "../assets/locks/padlocks/inayaclassic65mmlockkey.png";
import inayaclassic65mmsetg from "../assets/locks/padlocks/inayaclassic65mmsetc (2).png";
// import padlock15 from "../assets/locks/padlocks/inayaclassic65mmsetc.png";
import inayaclassic75mmroundcatgc from "../assets/locks/padlocks/inayaclassic75mmroundcatc.png";
import inayaclassic75mmlockandlockkeycog from "../assets/locks/padlocks/inayaclassic75mmlockandlockkey.png";
import inayaclassic75mmlockandlockkeyg from "../assets/locks/padlocks/inayaclassic75mmlockandlockkeyc.png";
import inayaclassic75mmroundgli from "../assets/locks/padlocks/inayaclassic75mmroundc.png";
import lathiyuva70mm2sidekeybackg from "../assets/locks/padlocks/lathiyuva70mm2sidekeybackc.png";
import lathiyuva70mmbox2sidekyg from "../assets/locks/padlocks/lathiyuva70mmbox2sidekyc.png";
import lathiyuva70mmlockkey2sidekeyli from "../assets/locks/padlocks/lathiyuva70mmlockkey2sidekeyc.png";
import lthiyuva70mm2sidekeylockfrontg from "../assets/locks/padlocks/lthiyuva70mm2sidekeylockfrontc.png";
import shaktidoorkon65mmcog from "../assets/locks/padlocks/shaktidoorkon65mmc.png";
import takerpushlockc65mmlki from "../assets/locks/padlocks/takerpushlockc65mmc.png";
import takershaktipush64mmsetsg from "../assets/locks/padlocks/takershaktipush64mmsetc.png";
import takershaktipush65mmg from "../assets/locks/padlocks/takershaktipush65mmc.png";
import takershaktipushbox65mmg from "../assets/locks/padlocks/takershaktipushbox65mmc.png";

export const CATEGORIES = [
  { slug: "padlocks", name: "Padlocks", description: "Brass, iron, SS & specialty padlocks." },
  
  {
    slug: "multi-purpose-locks",
    name: "Multi Purpose and drawer Locks",
    description: "Industrial safety & disc locks.",
  },
  {
    slug: "aldrop",
    name: "Alrop-Aldrop kit",
    description: "Heavy aldrop for best safety",
  },
  {
    slug: "Breaket",
    name: "Parda breaket",
    description: "All type parda barackets with large amount of designs",
  },
];

const img = (q) => `https://source.unsplash.com/800x600/?${encodeURIComponent(q)}`;


export const PRODUCTS = [
  {
    id: 1,
    gallery: [doorkongalsg, doorkongalsn, doorkongalb],
    name: "Iron Padlock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 49,
    price: 49,
    // shortDescription: "Industrial-grade iron padlock with double-locking mechanism.",
    image: doorkonimgi,
    material: "Iron",
    // qualityGrade: "Heavy Duty",
    description:
      "Heavy-duty mild steel iron padlocks built in our Aligarh facility. Hardened shackle, 7-lever mechanism, chrome finish. Trusted by hardware distributors across India for shops, warehouses & domestic use.",
    moq: "450 Piece",
    Weight: "200 g",
    size: "65 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 49,
      },
    ],
  },
  {
    id: 2,
    gallery: [harrisonsg, harrisonboxg],
    name: "Brass Padlock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 140,
    price: 140,
    // shortDescription: "Solid brass padlock — premium finish, rust-proof.",
    image: harrisonlocki,
    material: "Solid Brass",
    // qualityGrade: "Premium",
    description:
      "Solid brass body padlock — rust-proof, weather-resistant, premium polished finish. Ideal for residential and outdoor use across coastal India.",
    moq: "200 Piece",
    Weight: "90 g",
    size: "30 mm",
    keys: 3,
    variants: [
      {
        size: "30 mm",
        price: 140,
      },
    ],
  },
  {
    id: 3,
    gallery: [inaya25li, inaya25sg],
    name: "Long Shackle Padlock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 95,
    price: 95,
    // shortDescription: "Extended shackle for gates, chains & shutters.",
    image: inaya25li,
    material: "Hardened Steel",
    // qualityGrade: "Heavy Duty",
    description:
      "Long shackle padlocks for gates, chains, and shutters. Hardened steel shackle, brass-plated body.",
    moq: "300 Piece",
    Weight: "240 g",
    size: "50 mm",
    keys: 3,
    variants: [],
  },
  {
    id: 4,
    gallery: [inayablacksetsi, inayablacklockkeylkg],
    name: "Heavy Duty Padlock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 260,
    price: 260,
    // shortDescription: "Marine-grade stainless steel padlock, weather-proof.",
    image: inayablacksetsi,
    material: "SS 304",
    // qualityGrade: "Industrial",
    description:
      "Marine-grade SS 304 padlocks for outdoor, coastal and industrial sites. Anti-corrosion, anti-cut shackle.",
    moq: "150 Piece",
    Weight: "260 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 260,
      },
    ],
  },

  // Safety Disc Locks
  {
    id: 5,
    gallery: [inayatimepremium68mmlki, inayatimepremium68mmlki],
    name: "Safety Padlock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 240,
    price: 240,
    // shortDescription: "Tamper-proof safety padlock for industrial lockout/tagout.",
    image: inayatimepremium68mmlki,
    material: "Reinforced Steel",
    // qualityGrade: "Industrial Safety",
    description:
      "Tamper-proof safety padlocks engineered for lockout/tagout in factories. High-visibility colors, keyed-different option.",
    moq: "50 Piece",
    Weight: "260 g",
    size: "60 mm",
    keys: 2,
    variants: [
      {
        size: "50 mm",
        price: 240,
      },
      {
        size: "65 mm",
        price: 240,
      },
    ],
  },
  {
    id: 6,
    gallery: [
      inayaclassic75mmroundcatgc,
      inayaclassic75mmlockandlockkeycog,
      inayaclassic75mmlockandlockkeyg,
      inayaclassic75mmroundcatgc,
      inayaclassic75mmroundgli,
      inaya75mm,
    ],
    name: "Disc Padlock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 180,
    price: 180,
    // shortDescription: "High-security disc detainer padlock, pick-resistant.",
    image: inayaclassic75mmroundgli,
    material: "Hardened Alloy",
    // qualityGrade: "High Security",
    description:
      "Disc-detainer mechanism — pick-resistant, drill-resistant. Closed shoulder body protects the shackle.",
    moq: "100 Piece",
    Weight: "300 g",
    size: "60 mm",
    keys: 3,
    variants: [
      {
        size: "65 mm",
        price: 180,
      },
    ],
  },
  {
    id: 7,
    gallery: [inayaactiveslv5363, inayaslvi],
    name: "Combination Lock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 180,
    price: 180,
    // shortDescription: "4-digit combination padlock, keyless convenience.",
    image: inayaslvi,
    material: "Zinc Alloy",
    // qualityGrade: "Standard",
    description: "Resettable 4-digit combination padlock for lockers, gym bags and light security.",
    moq: "100 Piece",
    Weight: "140 g",
    size: "63 mm",
    keys: 0,
    variants: [
      {
        size: "53 mm",
        price: 180,
      },
    ],
  },

  // Hardware
  {
    id: 8,
    name: "Shutter Lock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 150,
    price: 20,
    // shortDescription: "Robust shutter lock for shops, warehouses & garages.",
    image: inayaclassic65mmlockkeyi,
    material: "Mild Steel",
    // qualityGrade: "Commercial",
    description:
      "Heavy-gauge shutter locks for shop fronts, godowns and warehouses. Galvanized finish, anti-rust.",
    moq: "100 Piece",
    gallery: [inayaclassic65mmsetg, inayaclassic65mmlockkeyi, inayaclassic65mmsetg],
    Weight: "350 g",
    size: "Standard",
    keys: 3,
    variants: [
      {
        size: "Standard",
        price: 150,
      },
      {
        size: "Heavy",
        price: 20,
      },
    ],
  },
  {
    id: 9,
    name: "Tower Bolt",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 45,
    price: 45,
    // shortDescription: "Heavy tower bolt for doors & gates, smooth slide.",
    image: lathi74mmlkci,
    material: "Brass / SS",
    // qualityGrade: "Premium",
    description:
      "Tower bolts in brass and stainless steel — smooth slide action, polished finish. For doors, windows, and gates.",
    moq: "200 Piece",
    gallery: [lathi74mmlkci, lathi74mmg, lathi74mmbcg],
    Weight: "120 g",
    size: '4"',
    keys: 0,
    variants: [
      {
        size: '65 mm"',
        price: 45,
      },
    ],
  },
  {
    id: 10,
    name: "Cupboard Lock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 35,
    price: 35,
    // shortDescription: "Compact cupboard / drawer lock with smooth cam action.",
    image: takerpushlockc65mmlki,
    material: "Brass + Steel",
    // qualityGrade: "Standard",
    description:
      "Cam-action cupboard and drawer locks. Nickel finish, smooth action. Used in furniture industry across India.",
    moq: "300 Piece",
    gallery: [
      takershaktipush65mmg,
      takershaktipushbox65mmg,
      takershaktipush64mmsetsg,
      takerpushlockc65mmlki,
    ],
    Weight: "60 g",
    size: "16 mm",
    keys: 0,
    variants: [
      {
        size: "16 mm",
        price: 35,
      },
      {
        size: "22 mm",
        price: 55,
      },
    ],
  },
  {
    id: 11,
    name: "padlocks",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 59,
    price: 59,
    // shortDescription: "Versatile multi-purpose lock suitable for doors, shutters, gates, cabinets, and luggage.",
    image: lathiyuva70mmlockkey2sidekeyli,
    material: "Hardened Steel",
    // qualityGrade: "Premium",
    description:
      "Our premium multi-purpose locks are designed for maximum security and durability. Manufactured in Aligarh using high-quality materials, these locks feature a hardened steel shackle, precision locking mechanism, and corrosion-resistant finish. Ideal for homes, offices, shops, warehouses, gates, shutters, lockers, and luggage. Trusted by distributors and hardware dealers across India.",
    moq: "400 Piece",
    gallery: [
      lathiyuva70mm2sidekeybackg,
      lathiyuva70mmbox2sidekyg,
      lthiyuva70mm2sidekeylockfrontg,
      lathiyuva70mmlockkey2sidekeyli,
    ],
    Weight: "220 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 59,
      },
      {
        size: "60 mm",
        price: 75,
      },
      {
        size: "70 mm",
        price: 95,
      },
    ],
  },
  {
    id: 12,
    name: "Multi Purpose Lock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 59,
    price: 59,
    // shortDescription: "Versatile multi-purpose lock suitable for doors, shutters, gates, cabinets, and luggage.",
    image: inayacaptain52setcmmi,
    material: "Hardened Steel",
    // qualityGrade: "Premium",
    description:
      "Our premium multi-purpose locks are designed for maximum security and durability. Manufactured in Aligarh using high-quality materials, these locks feature a hardened steel shackle, precision locking mechanism, and corrosion-resistant finish. Ideal for homes, offices, shops, warehouses, gates, shutters, lockers, and luggage. Trusted by distributors and hardware dealers across India.",
    moq: "400 Piece",
    gallery: [],
    Weight: "220 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 59,
      },
      {
        size: "60 mm",
        price: 75,
      },
      {
        size: "70 mm",
        price: 95,
      },
    ],
  },
  {
    id: 13,
    name: "Multi Purpose Lock",
    categorySlug: "padlocks",
    quality: "best",
    status: "active",
    // startingPrice: 59,
    price: 59,
    // shortDescription: "Versatile multi-purpose lock suitable for doors, shutters, gates, cabinets, and luggage.",
    image: remexjeet86mmlkci,
    material: "Hardened Steel",
    // qualityGrade: "Premium",
    description:
      "Our premium multi-purpose locks are designed for maximum security and durability. Manufactured in Aligarh using high-quality materials, these locks feature a hardened steel shackle, precision locking mechanism, and corrosion-resistant finish. Ideal for homes, offices, shops, warehouses, gates, shutters, lockers, and luggage. Trusted by distributors and hardware dealers across India.",
    moq: "400 Piece",
    gallery: [remexjeetsetcg, remexjeet86mmlkci],
    Weight: "220 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 59,
      },
      {
        size: "60 mm",
        price: 75,
      },
      {
        size: "70 mm",
        price: 95,
      },
    ],
  },
  {
    id: 14,
    name: "Multi Purpose Lock",
    categorySlug: "aldrop",
    quality: "best",
    status: "active",
    // startingPrice: 59,
    price: 59,
    // shortDescription: "Versatile multi-purpose lock suitable for doors, shutters, gates, cabinets, and luggage.",
    image: aldrop,
    material: "Hardened Steel",
    // qualityGrade: "Premium",
    description:
      "Our premium multi-purpose locks are designed for maximum security and durability. Manufactured in Aligarh using high-quality materials, these locks feature a hardened steel shackle, precision locking mechanism, and corrosion-resistant finish. Ideal for homes, offices, shops, warehouses, gates, shutters, lockers, and luggage. Trusted by distributors and hardware dealers across India.",
    moq: "400 Piece",
    gallery: [remexjeetsetcg, remexjeet86mmlkci],
    Weight: "220 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 59,
      },
      {
        size: "60 mm",
        price: 75,
      },
      {
        size: "70 mm",
        price: 95,
      },
    ],
  },
  {
    id: 15,
    name: "Multi Purpose Lock",
    categorySlug: "aldrop",
    quality: "best",
    status: "active",
    // startingPrice: 59,
    price: 59,
    // shortDescription: "Versatile multi-purpose lock suitable for doors, shutters, gates, cabinets, and luggage.",
    image: aldropkit,
    material: "Hardened Steel",
    // qualityGrade: "Premium",
    description:
      "Our premium multi-purpose locks are designed for maximum security and durability. Manufactured in Aligarh using high-quality materials, these locks feature a hardened steel shackle, precision locking mechanism, and corrosion-resistant finish. Ideal for homes, offices, shops, warehouses, gates, shutters, lockers, and luggage. Trusted by distributors and hardware dealers across India.",
    moq: "400 Piece",
    gallery: [aldropkit, aldrop, aldropkitc],
    Weight: "220 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 59,
      },
      {
        size: "60 mm",
        price: 75,
      },
      {
        size: "70 mm",
        price: 95,
      },
    ],
  },
  {
    id: 16,
    name: "Multi Purpose Lock",
    categorySlug: "aldrop",
    quality: "best",
    status: "active",
    // startingPrice: 59,
    price: 59,
    // shortDescription: "Versatile multi-purpose lock suitable for doors, shutters, gates, cabinets, and luggage.",
    image: aldropkitc,
    material: "Hardened Steel",
    // qualityGrade: "Premium",
    description:
      "Our premium multi-purpose locks are designed for maximum security and durability. Manufactured in Aligarh using high-quality materials, these locks feature a hardened steel shackle, precision locking mechanism, and corrosion-resistant finish. Ideal for homes, offices, shops, warehouses, gates, shutters, lockers, and luggage. Trusted by distributors and hardware dealers across India.",
    moq: "400 Piece",
    gallery: [aldropkit, aldrop, aldropkitc],
    Weight: "220 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 59,
      },
    ],
  },
  {
    id: 17,
    name: "Multi Purpose Lock",
    categorySlug: "multi-purpose-locks",
    quality: "best",
    status: "active",
    // startingPrice: 59,
    price: 59,
    // shortDescription: "Versatile multi-purpose lock suitable for doors, shutters, gates, cabinets, and luggage.",
    image: multi,
    material: "Hardened Steel",
    // qualityGrade: "Premium",
    description:
      "Our premium multi-purpose locks are designed for maximum security and durability. Manufactured in Aligarh using high-quality materials, these locks feature a hardened steel shackle, precision locking mechanism, and corrosion-resistant finish. Ideal for homes, offices, shops, warehouses, gates, shutters, lockers, and luggage. Trusted by distributors and hardware dealers across India.",
    moq: "400 Piece",
    gallery: [],
    Weight: "220 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 59,
      },
    ],
  },
  {
    id: 18,
    name: "Parda breaket",
    categorySlug: "Breaket",
    quality: "best",
    status: "active",
    // startingPrice: 59,
    price: 59,
    // shortDescription: "Versatile multi-purpose lock suitable for doors, shutters, gates, cabinets, and luggage.",
    image: breaket,
    material: "Hardened Steel",
    // qualityGrade: "Premium",
    description:
      "Our premium multi-purpose locks are designed for maximum security and durability. Manufactured in Aligarh using high-quality materials, these locks feature a hardened steel shackle, precision locking mechanism, and corrosion-resistant finish. Ideal for homes, offices, shops, warehouses, gates, shutters, lockers, and luggage. Trusted by distributors and hardware dealers across India.",
    moq: "400 Piece",
    gallery: [],
    Weight: "220 g",
    size: "50 mm",
    keys: 3,
    variants: [
      {
        size: "50 mm",
        price: 59,
      },
    ],
  },

  {
    id: 18,
    name: "White Metal Multi Lever Lock",
    categorySlug: "multi-purpose-locks",
    quality: "best",
    status: "active",
    price: 0, // TODO: add real price
    image: whitemetalmultii,
    material: "Hardened Steel", // TODO: confirm material
    description: "White metal multi-lever lock — precision locking mechanism.", // TODO: replace with real description
    moq: "N/A", // TODO
    gallery: [whitemetalmultig],
    Weight: "N/A", // TODO
    size: "N/A", // TODO
    keys: 3, // TODO
    variants: [
      { size: "N/A", price: 0 }, // TODO: fill actual size/price
    ],
  },
  {
    id: 19,
    name: "Cello Multi Blue Lever Lock",
    categorySlug: "multi-purpose-locks",
    quality: "best",
    status: "active",
    price: 0, // TODO
    image: "black metal",// blck white metal multi image
    material: "Hardened Steel", // TODO
    description: "Cello multi-purpose blue lever lock.", // TODO
    moq: "N/A", // TODO
    gallery: [multi], // no separate gallery image found for this one
    Weight: "N/A", // TODO
    size: "N/A", // TODO
    keys: 3, // TODO
    variants: [
      { size: "N/A", price: 0 }, // TODO
    ],
  },
  {
    id: 20,
    name: "Ultra Euro Blue Cupboard Lock",
    categorySlug: "multi-purpose-locks",
    quality: "best",
    status: "active",
    price: 0, // TODO
    image: ultraeurobluecupboardi,
    material: "Hardened Steel", // TODO
    description: "Ultra Euro series blue cupboard lock.", // TODO
    moq: "N/A", // TODO
    gallery: [ultraeurobluecupboardg],
    Weight: "N/A", // TODO
    size: "N/A", // TODO
    keys: 3, // TODO
    variants: [
      { size: "N/A", price: 0 }, // TODO
    ],
  },
  {
    id: 21,
    name: "Orel Ultra Square Cupboard SS Lock",
    categorySlug: "multi-purpose-locks",
    quality: "best",
    status: "active",
    price: 0, // TODO
    image: orelultrasquarecupssi,
    material: "Stainless Steel", // TODO: confirm
    description: "Orel Ultra square cupboard lock in stainless steel finish.", // TODO
    moq: "N/A", // TODO
    gallery: [], // no separate gallery image found for this one
    Weight: "N/A", // TODO
    size: "N/A", // TODO
    keys: 3, // TODO
    variants: [
      { size: "N/A", price: 0 }, // TODO
    ],
  },
  // {
  //   id: 22,
  //   name: "Orel Cup Ultra SS Euro Lock",
  //   categorySlug: "multi-purpose-locks",
  //   quality: "best",
  //   status: "active",
  //   price: 0, // TODO
  //   image: orelcupultrasseuroi,
  //   material: "Stainless Steel", // TODO: confirm
  //   description: "Orel Euro series cupboard lock, stainless steel body.", // TODO
  //   moq: "N/A", // TODO
  //   gallery: [], // no separate gallery image found for this one
  //   Weight: "N/A", // TODO
  //   size: "N/A", // TODO
  //   keys: 3, // TODO
  //   variants: [
  //     { size: "N/A", price: 0 }, // TODO
  //   ],
  // },
  {
    id: 23,
    name: "Multi Square Lever Silver Lock",
    categorySlug: "multi-purpose-locks",
    quality: "best",
    status: "active",
    price: 0, // TODO
    image: multisqrlevrslvi,
    material: "Hardened Steel", // TODO
    description: "Multi-purpose square lever lock, silver finish.", // TODO
    moq: "N/A", // TODO
    gallery: [multisqrlevrslvg],
    Weight: "N/A", // TODO
    size: "N/A", // TODO
    keys: 3, // TODO
    variants: [
      { size: "N/A", price: 0 }, // TODO
    ],
  },
  {
    id: 24,
    name: "Lever Cupboard SS Euro Lock",
    categorySlug: "multi-purpose-locks",
    quality: "best",
    status: "active",
    price: 0, // TODO
    image: levercupboardsseur,
    material: "Stainless Steel", // TODO
    description: "Lever cupboard lock, stainless steel Euro finish.", // TODO
    moq: "N/A", // TODO
    gallery: [], // no separate gallery image found for this one
    Weight: "N/A", // TODO
    size: "N/A", // TODO
    keys: 3, // TODO
    variants: [
      { size: "N/A", price: 0 }, // TODO
    ],
  },
  {
    id: 25,
    name: "Euro Ultra SS Jordan Cupboard Lock",
    categorySlug: "multi-purpose-locks",
    quality: "best",
    status: "active",
    price: 0, // TODO
    image: euroultrassjordancup,
    material: "Stainless Steel", // TODO
    description: "Euro Ultra Jordan-series cupboard lock, stainless steel finish.", // TODO
    moq: "N/A", // TODO
    gallery: [], // no separate gallery image found for this one
    Weight: "N/A", // TODO
    size: "N/A", // TODO
    keys: 3, // TODO
    variants: [
      { size: "N/A", price: 0 }, // TODO
    ],
  },
  {
    id: 26,
    name: "Aldrop Europa Silver Lock",
    categorySlug: "hardware",
    quality: "best",
    status: "active",
    price: 0, // TODO
    image: aldropeuropaslv,
    material: "Hardened Steel", // TODO
    description: "Aldrop Europa series lock, silver finish — for doors and gates.", // TODO
    moq: "N/A", // TODO
    gallery: [], // no separate gallery image found for this one
    Weight: "N/A", // TODO
    size: "N/A", // TODO
    keys: 3, // TODO
    variants: [
      { size: "N/A", price: 0 }, // TODO
    ],
  },
];

export const getCategoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug);
export const getProductsByCategory = (slug) => PRODUCTS.filter((p) => p.categorySlug === slug);