export type LanguageId = 'th' | 'en' | 'zh';
export type BookingStatus = 'confirmed' | 'pending' | 'declined';
export type SlotState = 'available' | 'pending' | 'disabled';

export type LanguageOption = {
  id: LanguageId;
  label: string;
  nativeLabel: string;
  description: string;
  beta?: boolean;
};

export type Pet = {
  id: string;
  name: string;
  breed: string;
  weightLabel: string;
  coat: string;
  ageLabel: string;
  flags: string[];
  note: string;
  photo: number;
  accent: 'accent' | 'primary' | 'info';
  nextVisitLabel?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  durationLabel: string;
  durationMinutes: number;
  price: number;
  holdAmount: number;
  requestFee: number;
  subtitle?: string;
  highlightLabel?: string;
  tags: string[];
};

export type BookingDay = {
  id: string;
  day: string;
  dateLabel: string;
  shortLabel: string;
  disabled?: boolean;
};

export type BookingSlot = {
  id: string;
  label: string;
  durationLabel: string;
  state: SlotState;
  period: 'morning' | 'afternoon';
};

export type Shop = {
  id: string;
  name: string;
  nativeName?: string;
  area: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  heroImage: number;
  image: number;
  heroTitle: string;
  intro: string;
  detail: string;
  confirmLabel: string;
  confirmMode: 'instant' | 'review' | 'mixed';
  languages: string[];
  openHours: string;
  depositPolicy: string;
  cancelWindow: string;
  trustedNote: string;
  staffPreview: string[];
  services: Service[];
  bookingDays: BookingDay[];
  slots: BookingSlot[];
};

export type PaymentMethod = {
  id: string;
  title: string;
  subtitle: string;
  kind: 'wallet' | 'card' | 'new';
};

export type Visit = {
  id: string;
  shopId: string;
  petId: string;
  title: string;
  subtitle: string;
  statusLabel: string;
  statusTone: 'confirmed' | 'pending' | 'done' | 'cancelled';
  group: 'upcoming' | 'needs-you' | 'past';
};

export type RebookSuggestion = {
  petId: string;
  shopId: string;
  serviceId: string;
  dateLabel: string;
  timeLabel: string;
  price: number;
  holdAmount: number;
};

export type BookingSelection = {
  shopId: string;
  serviceId: string;
  petId: string;
  dayId: string;
  slotId: string;
  requestFeeOverride?: number;
  customDateLabel?: string;
  customTimeLabel?: string;
  groomer: string;
  notes: string;
};

export type BookingDraft = {
  shop: Shop;
  service: Service;
  pet: Pet;
  day: BookingDay;
  slot: BookingSlot;
  groomer: string;
  notes: string;
  requestFee: number;
  holdAmount: number;
  dueAtShop: number;
  totalAmount: number;
  dateTimeLabel: string;
};

export type JourneyBooking = {
  id: string;
  bookingNumber: string;
  status: BookingStatus;
  createdLabel: string;
  draft: BookingDraft;
};
