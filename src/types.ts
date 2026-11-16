export interface ShoeProduct {
  id: string;
  code: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  batch: string;
  slotsTotal: number;
  slotsRemaining: number;
  image: string;
  gallery: string[];
  description: string;
  ukaySource: string;
  textileOrigin: string;
  wasteDivertedGrams: number;
  masterArtisan: string;
  soleType: string;
  availableSizes: number[]; // EU sizes 35-45
  features: string[];
  materialsBreakdown: {
    upper: string;
    accents: string;
    lining: string;
    insole: string;
    outsole: string;
  };
}

export interface CommunityStory {
  id: string;
  ownerName: string;
  location: string;
  shoeModel: string;
  wearDuration: string;
  image: string;
  quote: string;
  patinaDescription: string;
}

export interface ArchiveRecord {
  id: string;
  pairCode: string;
  pairTitle: string;
  serialNumber: string;
  batchNumber: string;
  craftDate: string;
  masterArtisan: string;
  artisanLocation: string;
  materialProvenance: string;
  ukayOrigin: string;
  weaveType: string;
  environmentalImpact: string;
  wasteDivertedGrams: number;
  waterSavedLiters: number;
  upperComposition: string;
  soleType: string;
  ownerName?: string;
  ownerLocation?: string;
  certificateHash: string;
  image: string;
  artisanQuote: string;
}

export interface OrderTrackingStep {
  stage: number;
  title: string;
  description: string;
  date?: string;
  isCompleted: boolean;
  isCurrent: boolean;
  artisanNote?: string;
}

export interface OrderTrackRecord {
  orderId: string;
  phone: string;
  customerName: string;
  email: string;
  shoeName: string;
  shoeCode: string;
  euSize: number;
  footCm: number;
  batch: string;
  orderDate: string;
  estimatedDelivery: string;
  courier: string;
  trackingNumber: string;
  deliveryAddress: string;
  paymentMethod: string;
  paymentPlan: 'full' | 'split_deposit';
  paymentStatus: 'Verified' | 'Pending Verification' | 'Paid';
  totalPaid: number;
  remainingBalance: number;
  customInitials?: string;
  denimShade?: string;
  smsUpdatesEnabled: boolean;
  currentStage: number; // 1 to 4
  stages: OrderTrackingStep[];
  livingArchiveId: string;
}

export interface DenimDonationPledge {
  id: string;
  donorName: string;
  email: string;
  phone: string;
  itemCount: number;
  itemDescription: string;
  dropoffMethod: 'naga_hub' | 'courier_pickup';
  address?: string;
  discountCode: string;
  discountAmount: number;
  archivePassId: string;
  dateCreated: string;
  status: 'Pledged' | 'Received & Sanitized' | 'Patterned into Shoe';
}

export interface B2BInquiryData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  entityType: 'Retail Hub (e.g. Kultura)' | 'Corporate Gift/Token' | 'Boutique Gallery' | 'Eco-Tourism Partner';
  estimatedPairs: string;
  customRequirements?: string;
}

export interface ReservationData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  footCm: number;
  euSize: number;
  wideFeet: boolean;
  paymentMethod: 'gcash' | 'maya' | 'bank';
  paymentPlan: 'full' | 'split_deposit';
  donationDiscountApplied?: boolean;
  discountCode?: string;
  customInitials?: string;
  denimShade?: string;
  smsUpdatesEnabled: boolean;
  shoeId: string;
  notes?: string;
  proofUploaded?: boolean;
}

