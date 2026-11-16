import { ShoeProduct, ArchiveRecord, OrderTrackRecord, CommunityStory } from '../types';
import etnikoImg from '../assets/images/etniko_denim_1788175439786.jpg';
import mayonImg from '../assets/images/mayon_hightop_1788175453285.jpg';
import hinabiImg from '../assets/images/hinabi_slipon_1788175465810.jpg';
import workshopImg from '../assets/images/artisan_workshop_1788175478389.jpg';
import packagingImg from '../assets/images/archive_box_1788175492038.jpg';

export { etnikoImg, mayonImg, hinabiImg, workshopImg, packagingImg };

export const COMMUNITY_STORIES: CommunityStory[] = [
  {
    id: 'story-1',
    ownerName: 'Carlo Mendoza',
    location: 'Legazpi City & Manila',
    shoeModel: 'ETNIKO Classic #0184 (Batch 03)',
    wearDuration: '8 Months Daily Commute',
    image: etnikoImg,
    quote: 'The denim upper has softened like my favorite broken-in jeans. Rain or heat, the vulcanized sole hasn’t separated at all. People constantly ask where I got them.',
    patinaDescription: 'Natural whisker fading along the forefoot flex creases with deep indigo retention on the heel counter.'
  },
  {
    id: 'story-2',
    ownerName: 'Danica Ramos',
    location: 'Naga City, Camarines Sur',
    shoeModel: 'Hinabi Heritage Slip-On #0315 (Batch 04)',
    wearDuration: '5 Months Weekend Wear',
    image: hinabiImg,
    quote: 'Knowing my pair directly funded Kuya Nonoy and Nanay Elena’s weaving cooperative makes every step feel intentional. Super easy to slip on and zero blisters from day one.',
    patinaDescription: 'Vibrant terracotta Hinabi threads harmonizing with softened indigo selvedge piping.'
  },
  {
    id: 'story-3',
    ownerName: 'Atty. Jayson Alcantara',
    location: 'Makati City',
    shoeModel: 'Mayon High-Top Artisan #0092 (Batch 02)',
    wearDuration: '1 Year Everyday Wear',
    image: mayonImg,
    quote: 'The 50% downpayment option made reserving a bespoke pair completely painless. The SMS workbench updates kept me excited throughout the 3-week crafting period.',
    patinaDescription: 'Subtle sun-faded indigo highlights with antiqued brass eyelet patina and durable crepe outsole traction.'
  }
];

export const BATCH_INFO = {
  batchNumber: 'Batch 05',
  batchTitle: 'Hinabi & Heavy Indigo Collection',
  slotsTotal: 50,
  slotsClaimed: 38,
  slotsRemaining: 12,
  dropEndDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(),
  estimatedDeliveryDate: 'October 15-22, 2026',
  hubLocation: 'Naga City, Camarines Sur, Bicol Region',
};

export const PRODUCTS: ShoeProduct[] = [
  {
    id: 'pamitisan-slip-on',
    code: 'PAM-0315',
    name: 'Pamitisan Heritage Slip-On',
    tagline: 'Upcycled Denim Vamp with Raw Origin Line & Zero Break-In Comfort',
    price: 1500,
    originalPrice: 1800,
    batch: 'Batch 05',
    slotsTotal: 15,
    slotsRemaining: 4,
    image: hinabiImg,
    gallery: [hinabiImg, packagingImg, etnikoImg],
    description: 'Effortless everyday walking companion. Features an exposed denim "Origin Line" along the vamp and elastic side gussets for effortless on-and-off movement. Pre-softened upcycled denim provides instant zero-break-in comfort from step one.',
    ukaySource: 'Naga City Centro Ukay Hubs (Curated 14oz Denim)',
    textileOrigin: 'Camarines Sur Local Handloom & Upcycled Denim',
    wasteDivertedGrams: 320,
    masterArtisan: 'Master Kuya Nonoy (Naga Artisan Guild)',
    soleType: 'Lightweight Flexible Vulcanized Siped Crepe',
    availableSizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    features: [
      'Pre-Softened Upcycled 14oz Denim with Exposed Origin Line',
      'Elastic Gussets for Instant Slip-On Convenience',
      'Orthopedic Memory-Foam Footbed with Arch Cushioning',
      'Living Archive QR Tag for 1-of-1 Material Provenance',
      'Non-Slip Vulcanized Natural Crepe Outsole'
    ],
    materialsBreakdown: {
      upper: 'Upcycled Heavyweight Thrifted Denim (Naga City Hubs)',
      accents: 'Exposed Raw Denim Selvedge & Pull Tab',
      lining: 'Breathable Unbleached Cotton Canvas',
      insole: 'Dual-Density Recycled EVA + Cork Top Layer',
      outsole: 'Flexible Siped Eco-Rubber'
    }
  },
  {
    id: 'pamitisan-etniko-classic',
    code: 'PAM-0184',
    name: 'ETNIKO Classic Low-Cut Denim',
    tagline: 'Iconic Low-Top with Layered Story Strata Eyelets & Bicolano Heritage Stitch',
    price: 1800,
    originalPrice: 2200,
    batch: 'Batch 05',
    slotsTotal: 20,
    slotsRemaining: 5,
    image: etnikoImg,
    gallery: [etnikoImg, packagingImg, workshopImg],
    description: 'Our flagship sneaker and the heart of our circular economy. Hand-cut from 14oz sanitized thrifted denim and stitched with layered "Story Strata" eyelets. Each pair is built on a vulcanized rubber unit sole engineered for tropical walking commutes.',
    ukaySource: 'Naga City Thrift Depot (Curated Heavyweight Jeans)',
    textileOrigin: 'Traditional Handloom Weavers of Bicol',
    wasteDivertedGrams: 380,
    masterArtisan: 'Master Kuya Nonoy & Kinan (Founder-Artisan)',
    soleType: 'Vulcanized Recycled Natural Crepe Rubber',
    availableSizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    features: [
      '100% Upcycled 14oz Dark-Wash Thrifted Denim Upper',
      'Layered Story Strata Eyelets with Contrast Artisanal Stitching',
      'Orthopedic Memory-Foam Insole with Breathable Canvas Lining',
      'Individual Living Archive QR Code for Provenance Tracking',
      'Reinforced Heel Counter and Waxed Organic Cotton Laces'
    ],
    materialsBreakdown: {
      upper: 'Upcycled Heavyweight Denim (Thrifted Naga City)',
      accents: 'Handwoven Bicol Geometric Trim & Raw Seams',
      lining: 'Breathable Unbleached Canvas (Deadstock Fabric)',
      insole: 'Dual-Density Recycled EVA + Cork Top Layer',
      outsole: 'Vulcanized Natural Non-Slip Crepe Rubber'
    }
  },
  {
    id: 'pamitisan-etniko-high-cut',
    code: 'PAM-0092',
    name: 'ETNIKO High-Cut Denim Sneaker',
    tagline: 'Ankle Support High-Top with Antiqued Solid Brass Eyelets & Double Denim Counter',
    price: 1900,
    originalPrice: 2300,
    batch: 'Batch 05',
    slotsTotal: 10,
    slotsRemaining: 2,
    image: mayonImg,
    gallery: [mayonImg, workshopImg, packagingImg],
    description: 'Engineered for all-day urban exploration and rugged regional commutes. Constructed with dual-layer reinforced denim ankle support, antiqued solid brass eyelets, and a high-traction vulcanized tread built to withstand monsoon rains.',
    ukaySource: 'Bicol Region Thrift Depot (Vintage Heavy Denim & Deadstock Canvas)',
    textileOrigin: 'Camarines Sur Artisan Guild',
    wasteDivertedGrams: 460,
    masterArtisan: 'Master Tatay Romy (40 Years Lasting Experience)',
    soleType: 'Reinforced Deep-Tread Vulcanized Rubber',
    availableSizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    features: [
      'Heavyweight 16oz Reinforced Upcycled Denim High-Top Collar',
      'Solid Antiqued Brass Eyelets & Double-Stitched Seams',
      'Padded Ergonomic Collar with Recycled Cotton Padding',
      'High-Traction Deep-Tread Outsole for Rainy Season Durability',
      'Living Archive QR Tag Stamped on Insole'
    ],
    materialsBreakdown: {
      upper: '16oz Upcycled Denim + Deadstock Reinforced Canvas',
      accents: 'Bicolano Artisan Stitching & Raw Edge Binding',
      lining: 'Soft Natural Cotton Drill',
      insole: 'Cushioned Ergonomic Footbed with Arch Support',
      outsole: 'Deep Lug Non-Marking Recycled Rubber'
    }
  },
  {
    id: 'pamitisan-etniko-habi',
    code: 'PAM-0240',
    name: 'ETNIKO Habi Sneakers (Premium Weaves)',
    tagline: 'Masterpiece Tier Combining Indigenous Philippine Weaves & Upcycled Denim',
    price: 2400,
    originalPrice: 2900,
    batch: 'Batch 05',
    slotsTotal: 10,
    slotsRemaining: 1,
    image: hinabiImg,
    gallery: [hinabiImg, etnikoImg, packagingImg],
    description: 'The pinnacle of cultural storytelling and slow fashion. Full handloom geometric Hinabi weave upper framed with raw indigo denim overlays. Direct economic partnership sustaining master weavers and Bicolano cobblers.',
    ukaySource: 'Naga City Thrift Markets (Raw Indigo Denim Trims)',
    textileOrigin: 'Master Weavers Cooperative of Bicol & Northern Luzon',
    wasteDivertedGrams: 350,
    masterArtisan: 'Nanay Elena (Master Weaver) & Kuya Nonoy (Cobbler)',
    soleType: 'Cushioned High-Grade Vulcanized Rubber',
    availableSizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    features: [
      'Museum-Grade Handloom Geometric Hinabi Weave Upper',
      '100% Upcycled Denim Structure & Tongue Reinforcements',
      'Includes The Living Archive Wooden Box & Provenance Certificate',
      'Free Heel Monogram Embossing & Custom Cotton Dustbag',
      'Standardized Wholesale Line for Kultura Filipino Showcase'
    ],
    materialsBreakdown: {
      upper: 'Authentic Indigenous Handwoven Hinabi Cotton-Poly Weave',
      accents: 'Upcycled Denim Edge Binding & Heel Pull',
      lining: 'Unbleached Organic Cotton Canvas',
      insole: 'Dual-Density Shock-Absorbing Memory Cushion',
      outsole: 'Flexible Siped Eco-Rubber'
    }
  },
  {
    id: 'pamitisan-custom-sneakers',
    code: 'PAM-0500',
    name: 'Custom 1-of-1 Bespoke Tailored Pair',
    tagline: 'Co-Design Your Unique Wearable Art with Founder Kinan & Master Cobblers',
    price: 2000,
    originalPrice: 2500,
    batch: 'Batch 05',
    slotsTotal: 5,
    slotsRemaining: 1,
    image: workshopImg,
    gallery: [workshopImg, etnikoImg, mayonImg],
    description: 'Have your pair tailored from scratch. Work directly with founder Kinan to choose specific thrifted denim washes, custom Hinabi patterns, leather initial monograms, or supply your own sentimental denim for upcycling.',
    ukaySource: 'Custom Client Denim or Curated Atelier Archive',
    textileOrigin: 'Bicol Weavers Guild & Client-Selected Heritage Weaves',
    wasteDivertedGrams: 420,
    masterArtisan: 'Kinan (Founder-Artist) & Naga Atelier Bench',
    soleType: 'Client-Selected Low-Cut or High-Cut Vulcanized Sole',
    availableSizes: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    features: [
      'Direct 1-on-1 Design Consultation via Messenger / Workshop',
      'Option to Upcycle Your Own Sentimental Denim Pants',
      'Custom Embossed Leather Heel Stamp & Colorway Selection',
      'Individual Video Micro-Documentary of Your Pair Being Built',
      'Zero-Risk Perfect Fit Guarantee with Free Atelier Re-Lasting'
    ],
    materialsBreakdown: {
      upper: 'Bespoke Curated Upcycled Denim / Sentimental Garment',
      accents: 'Client-Selected Heritage Weave & Brass Hardware',
      lining: 'Soft Natural Cotton Drill',
      insole: 'Orthopedic Custom-Molded Footbed',
      outsole: 'Vulcanized Crepe Rubber Unit Sole'
    }
  }
];

export const LIVING_ARCHIVE_DATA: Record<string, ArchiveRecord> = {
  'PAM-0184': {
    id: 'pam-0184',
    pairCode: 'PAM-0184',
    pairTitle: 'Pamitisan ETNIKO Classic #0184',
    serialNumber: 'PAM-2026-B05-0184',
    batchNumber: 'Batch 05 (Hinabi & Indigo)',
    craftDate: 'August 18, 2026',
    masterArtisan: 'Master Kuya Nonoy',
    artisanLocation: 'Barangay Peñafrancia, Naga City, Bicol',
    materialProvenance: 'Upcycled Dark Wash Levi\'s 501 (Ukay Sourced at Naga Public Market) + Inabel Hinabi Terracotta Heritage Accent.',
    ukayOrigin: 'Sourced from Ukay-Ukay Bales, Naga City Centro',
    weaveType: 'Traditional Hinabi Terracotta Diamond Weave',
    environmentalImpact: 'Diverted 380g of textile waste from regional landfills, saving ~2,400 liters of freshwater in virgin fabric manufacturing.',
    wasteDivertedGrams: 380,
    waterSavedLiters: 2400,
    upperComposition: '85% Upcycled Cotton Denim, 15% Handloom Cotton Weave',
    soleType: '100% Recycled Natural Rubber Crepe',
    ownerName: 'Carlo Mendoza',
    ownerLocation: 'Legazpi City, Albay',
    certificateHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    image: etnikoImg,
    artisanQuote: 'Every stitch carries the memory of thrifted denim and the proud hands of Bicolano craftsmen. Wear them with pride.'
  },
  'PAM-0092': {
    id: 'pam-0092',
    pairCode: 'PAM-0092',
    pairTitle: 'Mayon High-Top Artisan #0092',
    serialNumber: 'PAM-2026-B05-0092',
    batchNumber: 'Batch 05 (Hinabi & Indigo)',
    craftDate: 'August 22, 2026',
    masterArtisan: 'Master Tatay Romy',
    artisanLocation: 'Naga Footwear Guild Workshop, Camarines Sur',
    materialProvenance: 'Volcanic Ash Deadstock Heavyweight Duck Canvas + Selvedge Thrifted Indigo Denim Counter + Solid Brass Rivets.',
    ukayOrigin: 'Curated Raw Denim Ukay Bales, Milaor Bicol',
    weaveType: 'Bicol Hinabi Diamond Tribal Weave',
    environmentalImpact: 'Diverted 450g of textile waste from regional landfills, saving ~3,100 liters of freshwater.',
    wasteDivertedGrams: 450,
    waterSavedLiters: 3100,
    upperComposition: '70% Heavy Deadstock Duck Canvas, 30% Upcycled Denim',
    soleType: 'Lug-Tread Natural Eco-Rubber',
    ownerName: 'Maria Santos',
    ownerLocation: 'Quezon City, Metro Manila',
    certificateHash: 'sha256:9a4b2c184e7f3d6501fa88219c0de2389146abf109247852c002167d89ea3421',
    image: mayonImg,
    artisanQuote: 'Crafted like the resilience of Mayon. Tough on the outside, gentle and grounded on your feet.'
  },
  'PAM-0315': {
    id: 'pam-0315',
    pairCode: 'PAM-0315',
    pairTitle: 'Hinabi Heritage Slip-On #0315',
    serialNumber: 'PAM-2026-B05-0315',
    batchNumber: 'Batch 05 (Hinabi & Indigo)',
    craftDate: 'August 24, 2026',
    masterArtisan: 'Nanay Elena & Kuya Nonoy',
    artisanLocation: 'Buhi & Naga City Weaving Cluster, Bicol',
    materialProvenance: 'Handloom Geometric Hinabi Textile (Woven on traditional wooden frame) + Dark Indigo Denim Padded Collar.',
    ukayOrigin: 'Sourced from thrifted selvedge jacket remnants, Naga City',
    weaveType: 'Traditional Buhi Handloom Hinabi',
    environmentalImpact: 'Diverted 320g of textile waste from regional landfills, saving ~1,900 liters of freshwater.',
    wasteDivertedGrams: 320,
    waterSavedLiters: 1900,
    upperComposition: '75% Handloom Cotton-Poly Hinabi, 25% Upcycled Denim',
    soleType: 'Flexible Siped Crepe Rubber',
    ownerName: 'Antonio De Guzman',
    ownerLocation: 'Naga City, Camarines Sur',
    certificateHash: 'sha256:3c8812af0991823901bc048293774883192a0149bb892301dfca883902194883',
    image: hinabiImg,
    artisanQuote: 'Handwoven thread by thread under the quiet morning light of Bicol.'
  }
};

export const INITIAL_ORDERS: OrderTrackRecord[] = [
  {
    orderId: 'PAM-8821',
    phone: '09178821920',
    customerName: 'Jobert Alcantara',
    email: 'jobert.alcantara@gmail.com',
    shoeName: 'Pamitisan ETNIKO Classic #0184',
    shoeCode: 'PAM-0184',
    euSize: 42,
    footCm: 27.0,
    batch: 'Batch 05',
    orderDate: 'Aug 26, 2026',
    estimatedDelivery: 'Oct 18, 2026',
    courier: 'LBC Express (Door-to-Door Nationwide)',
    trackingNumber: 'LBC-PH-992817441',
    deliveryAddress: 'Unit 402, Acacia Residences, Taguig City, Metro Manila',
    paymentMethod: 'GCash (Verified)',
    paymentPlan: 'full',
    paymentStatus: 'Verified',
    totalPaid: 1800,
    remainingBalance: 0,
    customInitials: 'JD',
    denimShade: 'Raw Deep Indigo',
    smsUpdatesEnabled: true,
    currentStage: 2,
    livingArchiveId: 'PAM-0184',
    stages: [
      {
        stage: 1,
        title: 'Denim Sourced & Precision Cut',
        description: 'Curated 14oz dark-wash thrifted Levi\'s denim inspected, sanitized, and hand-cut according to EU 42 last patterns.',
        date: 'Aug 27, 2026 - 10:30 AM',
        isCompleted: true,
        isCurrent: false,
        artisanNote: 'Sanitized with botanical eucalyptus wash and precision-cut along raw grain.'
      },
      {
        stage: 2,
        title: 'Upper Hand-Stitched by Master Artisan',
        description: 'Upper panels and Hinabi geometric accents are being hand-stitched by Master Kuya Nonoy on the wooden shoemaking bench.',
        date: 'Aug 29, 2026 - In Progress',
        isCompleted: false,
        isCurrent: true,
        artisanNote: 'Upper 80% complete. Hinabi side panels attached with reinforced double-pass nylon thread.'
      },
      {
        stage: 3,
        title: 'Sole Lasting & Vulcanized Quality Test',
        description: 'Upper will be shaped onto the wooden shoe last and vulcanized to the recycled natural rubber crepe outsole.',
        isCompleted: false,
        isCurrent: false,
        artisanNote: 'Scheduled for bench assembly next week.'
      },
      {
        stage: 4,
        title: 'Living Archive Boxed & Dispatched',
        description: 'Pair will be stamped with unique 1-of-1 QR code cert, packed in unbleached cotton dustbag & kraft box, and dispatched.',
        isCompleted: false,
        isCurrent: false
      }
    ]
  },
  {
    orderId: 'PAM-9042',
    phone: '09285551234',
    customerName: 'Klarisse Ramos',
    email: 'klarisse.ramos@yahoo.com',
    shoeName: 'Mayon High-Top Artisan #0092',
    shoeCode: 'PAM-0092',
    euSize: 39,
    footCm: 24.8,
    batch: 'Batch 05',
    orderDate: 'Aug 25, 2026',
    estimatedDelivery: 'Oct 15, 2026',
    courier: 'J&T Express Express Air',
    trackingNumber: 'JT-9820019283',
    deliveryAddress: 'San Agustin Village, Naga City, Camarines Sur (Local Naga Delivery)',
    paymentMethod: 'Maya (Verified)',
    paymentPlan: 'split_deposit',
    paymentStatus: 'Verified',
    totalPaid: 1225,
    remainingBalance: 1225,
    customInitials: 'KR',
    denimShade: 'Stonewash Faded',
    smsUpdatesEnabled: true,
    currentStage: 3,
    livingArchiveId: 'PAM-0092',
    stages: [
      {
        stage: 1,
        title: 'Denim Sourced & Precision Cut',
        description: 'Volcanic ash deadstock canvas and raw selvedge denim selected and hand-patterned.',
        date: 'Aug 26, 2026',
        isCompleted: true,
        isCurrent: false
      },
      {
        stage: 2,
        title: 'Upper Hand-Stitched by Master Artisan',
        description: 'High-top collar, terracotta Hinabi strap, and brass eyelets hand-fixed by Master Tatay Romy.',
        date: 'Aug 28, 2026',
        isCompleted: true,
        isCurrent: false
      },
      {
        stage: 3,
        title: 'Sole Lasting & Vulcanized Quality Test',
        description: 'Currently mounted on EU 39 last. Outsole bonding and compression test in progress.',
        date: 'Aug 30, 2026 - Active Bench',
        isCompleted: false,
        isCurrent: true,
        artisanNote: 'Bonding cure under natural humidity control. Passed initial torsion stress test.'
      },
      {
        stage: 4,
        title: 'Living Archive Boxed & Dispatched',
        description: 'Final inspection, QR serialization, and local dispatch in Naga City.',
        isCompleted: false,
        isCurrent: false
      }
    ]
  }
];

export const IMPACT_METRICS = {
  denimPantsUpcycled: 1250,
  pairsHandcrafted: 850,
  kgWasteDiverted: 420,
  yardsHinabiWoven: 600,
  artisanFamiliesSupported: 18,
  litersWaterConserved: 2840000
};
