import { customerPets, customerShops } from '@/features/customer/data';
import type { BookingDraft, BookingSelection, BookingSlot, JourneyBooking, Pet, Service, Shop, Visit } from '@/features/customer/types';

export function formatCurrency(amount: number) {
  return `฿${amount.toLocaleString('en-US')}`;
}

export function getShop(shopId: string) {
  return customerShops.find((shop) => shop.id === shopId) ?? customerShops[0];
}

export function getPet(petId: string) {
  return customerPets.find((pet) => pet.id === petId) ?? customerPets[0];
}

export function getService(shop: Shop, serviceId: string) {
  return shop.services.find((service) => service.id === serviceId) ?? shop.services[0];
}

export function getDay(shop: Shop, dayId: string) {
  return shop.bookingDays.find((day) => day.id === dayId) ?? shop.bookingDays[1];
}

export function getSlot(shop: Shop, slotId: string) {
  return shop.slots.find((slot) => slot.id === slotId) ?? shop.slots.find((slot) => slot.state !== 'disabled') ?? shop.slots[0];
}

export function getSlotPreviewLabels(slotState: BookingSlot['state']) {
  if (slotState === 'pending') {
    return {
      headline: '“Confirm” slots',
      detail: 'Shop confirms within 1 hour. You’re only charged after they accept.',
    };
  }

  return {
    headline: 'Instant slots',
    detail: 'Shield hold is placed the moment you confirm payment.',
  };
}

export function buildDraft(selection: BookingSelection): BookingDraft {
  const shop = getShop(selection.shopId);
  const pet = getPet(selection.petId);
  const service = getService(shop, selection.serviceId);
  const day = getDay(shop, selection.dayId);
  const slot = getSlot(shop, selection.slotId);
  const requestFee = selection.requestFeeOverride ?? service.requestFee;
  const holdAmount = service.holdAmount;
  const totalAmount = service.price + requestFee;
  const dueAtShop = Math.max(totalAmount - holdAmount, 0);
  const datePart = selection.customDateLabel ?? day.dateLabel;
  const timePart = selection.customTimeLabel ?? slot.label;

  return {
    shop,
    pet,
    service,
    day,
    slot,
    groomer: selection.groomer,
    notes: selection.notes,
    requestFee,
    holdAmount,
    dueAtShop,
    totalAmount,
    dateTimeLabel: `${datePart} · ${timePart}`,
  };
}

export function visitFromJourney(journey: JourneyBooking): Visit {
  const statusTone = journey.status === 'confirmed' ? 'confirmed' : journey.status === 'pending' ? 'pending' : 'cancelled';

  return {
    id: `${journey.id}-visit`,
    shopId: journey.draft.shop.id,
    petId: journey.draft.pet.id,
    title: `${journey.draft.shop.name} · ${journey.draft.dateTimeLabel}`,
    subtitle:
      journey.status === 'pending'
        ? `${journey.draft.pet.name} · ${journey.draft.service.title} · awaiting shop confirm`
        : `${journey.draft.pet.name} · ${journey.draft.service.title} · Shield hold ${formatCurrency(journey.draft.holdAmount)}`,
    statusLabel: journey.status === 'pending' ? 'Pending' : journey.status === 'declined' ? 'Cancelled' : 'Confirmed',
    statusTone,
    group: journey.status === 'pending' ? 'needs-you' : journey.status === 'declined' ? 'past' : 'upcoming',
  };
}

export function petAccentColor(pet: Pet) {
  if (pet.accent === 'primary') {
    return { background: '#edf2f9', border: '#234871', text: '#193755' };
  }

  if (pet.accent === 'info') {
    return { background: '#edf2fb', border: '#5579b7', text: '#5579b7' };
  }

  return { background: '#fbf0e5', border: '#bf7a3c', text: '#915620' };
}

export function shopMeta(shop: Service | Shop) {
  if ('distanceKm' in shop) {
    return `${shop.distanceKm.toFixed(1)} km · ${shop.area}`;
  }

  return `${formatCurrency(shop.price)} · ${shop.durationLabel}`;
}
