import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { customerPets, customerShops, initialVisits, languageOptions, paymentMethods, rebookSuggestion } from '@/features/customer/data';
import type { BookingSelection, BookingStatus, JourneyBooking, LanguageId, PaymentMethod, Visit } from '@/features/customer/types';
import { buildDraft, visitFromJourney } from '@/features/customer/utils';

type CustomerAppContextValue = {
  onboardingComplete: boolean;
  selectedLanguage: LanguageId;
  otpCode: string;
  activePetId: string;
  selectedPaymentMethodId: string;
  visits: Visit[];
  bookingSelection: BookingSelection;
  journeyBooking: JourneyBooking | null;
  languages: typeof languageOptions;
  pets: typeof customerPets;
  shops: typeof customerShops;
  paymentOptions: typeof paymentMethods;
  bookingDraft: ReturnType<typeof buildDraft>;
  setLanguage: (languageId: LanguageId) => void;
  setOtpCode: (otpCode: string) => void;
  selectPet: (petId: string) => void;
  setPaymentMethod: (paymentMethodId: string) => void;
  skipOnboarding: () => void;
  completeOnboarding: () => void;
  startShopBooking: (shopId: string) => void;
  updateBookingSelection: (partial: Partial<BookingSelection>) => void;
  finalizeBooking: () => JourneyBooking;
  confirmRebook: () => JourneyBooking;
};

const CustomerAppContext = createContext<CustomerAppContextValue | null>(null);

const bookingNumbers = ['BKG-41A7', 'BKG-41C9', 'BKG-51R1', 'BKG-52A5'];

function createDefaultSelection(activePetId = 'dash'): BookingSelection {
  return {
    shopId: 'aroon',
    serviceId: 'full-groom',
    petId: activePetId,
    dayId: 'tue-12',
    slotId: '10-30',
    groomer: 'Pim K.',
    notes: 'Clippers make her nervous — intro slowly.',
  };
}

function nextBookingNumber(counter: number) {
  return bookingNumbers[counter % bookingNumbers.length] ?? `BKG-${counter.toString().padStart(4, '0')}`;
}

export function CustomerAppProvider({ children }: { children: ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('th');
  const [otpCode, setOtpCode] = useState('472849');
  const [activePetId, setActivePetId] = useState('dash');
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState('promptpay');
  const [bookingSelection, setBookingSelection] = useState<BookingSelection>(createDefaultSelection());
  const [journeyBooking, setJourneyBooking] = useState<JourneyBooking | null>(null);
  const [bookingCounter, setBookingCounter] = useState(0);
  const [visits, setVisits] = useState(initialVisits);

  const bookingDraft = useMemo(() => buildDraft(bookingSelection), [bookingSelection]);

  const setLanguage = useCallback((languageId: LanguageId) => {
    setSelectedLanguage(languageId);
  }, []);

  const selectPet = useCallback((petId: string) => {
    setActivePetId(petId);
    setBookingSelection((current) => ({
      ...current,
      petId,
    }));
  }, []);

  const setPaymentMethod = useCallback((paymentMethodId: string) => {
    setSelectedPaymentMethodId(paymentMethodId);
  }, []);

  const skipOnboarding = useCallback(() => {
    setOnboardingComplete(true);
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboardingComplete(true);
  }, []);

  const startShopBooking = useCallback((shopId: string) => {
    const shop = customerShops.find((entry) => entry.id === shopId) ?? customerShops[0];
    const firstAvailableSlot = shop.slots.find((slot) => slot.state !== 'disabled') ?? shop.slots[0];

    setBookingSelection({
      shopId: shop.id,
      serviceId: shop.services[0]?.id ?? 'full-groom',
      petId: activePetId,
      dayId: shop.bookingDays[1]?.id ?? shop.bookingDays[0].id,
      slotId: firstAvailableSlot.id,
      groomer: shop.id === 'aroon' ? 'Pim K.' : 'Front desk match',
      notes:
        activePetId === 'dash'
          ? 'Clippers make her nervous — intro slowly.'
          : 'Puppy appointment — allow a slower introduction to the dryer.',
    });
  }, [activePetId]);

  const updateBookingSelection = useCallback((partial: Partial<BookingSelection>) => {
    setBookingSelection((current) => ({
      ...current,
      ...partial,
    }));
  }, []);

  const commitJourney = useCallback((status: BookingStatus, selection: BookingSelection, createdLabel: string) => {
    const draft = buildDraft(selection);
    const journey: JourneyBooking = {
      id: `journey-${bookingCounter + 1}`,
      bookingNumber: nextBookingNumber(bookingCounter),
      status,
      createdLabel,
      draft,
    };

    setBookingCounter((current) => current + 1);
    setJourneyBooking(journey);
    setVisits((current) => [visitFromJourney(journey), ...current]);

    return journey;
  }, [bookingCounter]);

  const finalizeBooking = useCallback(() => {
    const status: BookingStatus = bookingDraft.slot.state === 'pending' ? 'pending' : 'confirmed';
    return commitJourney(status, bookingSelection, status === 'pending' ? 'Started 13:52 · ends 14:40' : 'Today · 14:02');
  }, [bookingDraft.slot.state, bookingSelection, commitJourney]);

  const confirmRebook = useCallback(() => {
    const selection: BookingSelection = {
      shopId: rebookSuggestion.shopId,
      serviceId: rebookSuggestion.serviceId,
      petId: rebookSuggestion.petId,
      dayId: 'thu-14',
      slotId: '10-30',
      customDateLabel: rebookSuggestion.dateLabel,
      customTimeLabel: rebookSuggestion.timeLabel,
      groomer: 'Pim K.',
      notes: 'Repeat the last successful cut and same slow clipper introduction.',
      requestFeeOverride: 0,
    };

    setBookingSelection(selection);
    return commitJourney('confirmed', selection, 'Today · 11:47');
  }, [commitJourney]);

  const contextValue = useMemo(
    () => ({
      onboardingComplete,
      selectedLanguage,
      otpCode,
      activePetId,
      selectedPaymentMethodId,
      visits,
      bookingSelection,
      journeyBooking,
      languages: languageOptions,
      pets: customerPets,
      shops: customerShops,
      paymentOptions: paymentMethods,
      bookingDraft,
      setLanguage,
      setOtpCode,
      selectPet,
      setPaymentMethod,
      skipOnboarding,
      completeOnboarding,
      startShopBooking,
      updateBookingSelection,
      finalizeBooking,
      confirmRebook,
    }),
    [
      onboardingComplete,
      selectedLanguage,
      otpCode,
      activePetId,
      selectedPaymentMethodId,
      visits,
      bookingSelection,
      journeyBooking,
      bookingDraft,
      setLanguage,
      selectPet,
      setPaymentMethod,
      skipOnboarding,
      completeOnboarding,
      startShopBooking,
      updateBookingSelection,
      finalizeBooking,
      confirmRebook,
    ],
  );

  return (
    <CustomerAppContext.Provider value={contextValue}>
      {children}
    </CustomerAppContext.Provider>
  );
}

export function useCustomerApp() {
  const context = useContext(CustomerAppContext);

  if (!context) {
    throw new Error('useCustomerApp must be used within CustomerAppProvider.');
  }

  return context;
}

export function isPaymentMethodSelected(paymentMethod: PaymentMethod, selectedPaymentMethodId: string) {
  return paymentMethod.id === selectedPaymentMethodId;
}
