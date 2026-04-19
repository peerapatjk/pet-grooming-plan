import { Image } from 'expo-image';
import { ReactNode } from 'react';
import { Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

import { pawpointColors, pawpointFonts, pawpointRadius, pawpointShadow, pawpointSpacing } from '@/features/customer/design';
import type { BookingSlot, Pet, Shop } from '@/features/customer/types';
import { formatCurrency, petAccentColor } from '@/features/customer/utils';

export function MobilePage({
  children,
  bottomBar,
  dark = false,
}: {
  children: ReactNode;
  bottomBar?: ReactNode;
  dark?: boolean;
}) {
  const { width } = useWindowDimensions();
  const maxWidth = width > 720 ? 430 : undefined;

  return (
    <View style={{ flex: 1, backgroundColor: dark ? pawpointColors.ink : pawpointColors.paper }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: pawpointSpacing.lg,
          paddingTop: pawpointSpacing.md,
          paddingBottom: pawpointSpacing.xxl,
          alignItems: 'center',
        }}>
        <View style={{ width: '100%', maxWidth, gap: pawpointSpacing.md }}>{children}</View>
      </ScrollView>
      {bottomBar ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: dark ? 'rgba(255,255,255,0.08)' : pawpointColors.paperStrong,
            backgroundColor: dark ? '#14161c' : pawpointColors.paper,
            paddingHorizontal: pawpointSpacing.lg,
            paddingTop: pawpointSpacing.sm,
            paddingBottom: pawpointSpacing.xl,
            alignItems: 'center',
          }}>
          <View style={{ width: '100%', maxWidth }}>{bottomBar}</View>
        </View>
      ) : null}
    </View>
  );
}

export function BrandMark({ size = 64 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: pawpointColors.primary,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor: pawpointColors.accent,
          transform: [{ translateX: size * 0.1 }, { translateY: size * -0.08 }],
          opacity: 0.88,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: size * 0.18,
          height: size * 0.18,
          borderRadius: 999,
          backgroundColor: pawpointColors.paperRaised,
          right: size * 0.18,
          bottom: size * 0.18,
        }}
      />
    </View>
  );
}

export function PageTitle({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <View style={{ gap: pawpointSpacing.xs }}>
      {eyebrow ? (
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.mono,
            fontSize: 11,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: dark ? 'rgba(255,255,255,0.72)' : pawpointColors.inkSoft,
          }}>
          {eyebrow}
        </Text>
      ) : null}
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.serif,
          fontSize: 30,
          lineHeight: 32,
          letterSpacing: -1.1,
          color: dark ? pawpointColors.paperRaised : pawpointColors.ink,
        }}>
        {title}
      </Text>
      {subtitle ? (
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.sans,
            fontSize: 14,
            lineHeight: 22,
            color: dark ? 'rgba(255,255,255,0.76)' : pawpointColors.inkMuted,
          }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

export function TopIconButton({
  label,
  onPress,
  inverted = false,
}: {
  label: string;
  onPress?: () => void;
  inverted?: boolean;
}) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: inverted ? 'rgba(255,255,255,0.18)' : pawpointColors.paperStrong,
            backgroundColor: inverted ? 'rgba(255,255,255,0.08)' : pawpointColors.paperMuted,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.75 : 1,
          }}>
          <Text
            style={{
              fontFamily: pawpointFonts.sans,
              fontSize: 15,
              color: inverted ? pawpointColors.paperRaised : pawpointColors.inkMuted,
            }}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export function Card({
  children,
  tone = 'default',
  compact = false,
}: {
  children: ReactNode;
  tone?: 'default' | 'soft' | 'primary' | 'dark';
  compact?: boolean;
}) {
  const backgroundColor =
    tone === 'primary'
      ? pawpointColors.primaryWash
      : tone === 'soft'
        ? pawpointColors.paperMuted
        : tone === 'dark'
          ? '#14161c'
          : pawpointColors.paperRaised;

  const borderColor =
    tone === 'primary'
      ? pawpointColors.primary
      : tone === 'dark'
        ? 'rgba(255,255,255,0.08)'
        : pawpointColors.paperStrong;

  return (
    <View
      style={{
        borderRadius: pawpointRadius.md,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor,
        backgroundColor,
        padding: compact ? pawpointSpacing.md : pawpointSpacing.lg,
        gap: pawpointSpacing.sm,
      }}>
      {children}
    </View>
  );
}

export function SectionHeader({
  title,
  actionLabel,
  onPress,
}: {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.mono,
          fontSize: 11,
          letterSpacing: 1.6,
          textTransform: 'uppercase',
          color: pawpointColors.inkSoft,
        }}>
        {title}
      </Text>
      {actionLabel ? (
        <Pressable onPress={onPress}>
          {({ pressed }) => (
            <Text
              selectable
              style={{
                fontFamily: pawpointFonts.sans,
                fontSize: 12,
                color: pawpointColors.primaryInk,
                opacity: pressed ? 0.75 : 1,
              }}>
              {actionLabel}
            </Text>
          )}
        </Pressable>
      ) : null}
    </View>
  );
}

export function PawpointButton({
  label,
  onPress,
  variant = 'primary',
  fullWidth = false,
}: {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent';
  fullWidth?: boolean;
}) {
  const backgroundColor =
    variant === 'primary'
      ? pawpointColors.primary
      : variant === 'accent'
        ? pawpointColors.accent
        : variant === 'secondary'
          ? pawpointColors.paperRaised
          : 'transparent';
  const color =
    variant === 'primary' || variant === 'accent' ? pawpointColors.paperRaised : pawpointColors.ink;
  const borderColor =
    variant === 'secondary'
      ? pawpointColors.paperStrong
      : variant === 'ghost'
        ? 'transparent'
        : backgroundColor;

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            width: fullWidth ? '100%' : undefined,
            paddingHorizontal: pawpointSpacing.lg,
            paddingVertical: pawpointSpacing.md,
            borderRadius: pawpointRadius.pill,
            borderCurve: 'continuous',
            borderWidth: 1,
            borderColor,
            backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.8 : 1,
          }}>
          <Text
            selectable
            style={{
              fontFamily: pawpointFonts.sans,
              fontSize: 14,
              fontWeight: 600,
              color,
            }}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export function StatusBadge({
  label,
  tone,
  compact = false,
}: {
  label: string;
  tone: 'instant' | 'pending' | 'confirmed' | 'done' | 'cancelled';
  compact?: boolean;
}) {
  const tones = {
    instant: { backgroundColor: pawpointColors.okWash, color: pawpointColors.ok },
    pending: { backgroundColor: pawpointColors.infoWash, color: pawpointColors.info },
    confirmed: { backgroundColor: pawpointColors.primaryWash, color: pawpointColors.primaryInk },
    done: { backgroundColor: pawpointColors.paperMuted, color: pawpointColors.inkMuted },
    cancelled: { backgroundColor: pawpointColors.dangerWash, color: pawpointColors.danger },
  } as const;

  const toneStyle = tones[tone];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        paddingHorizontal: compact ? 8 : 10,
        paddingVertical: compact ? 4 : 6,
        borderRadius: 10,
        backgroundColor: toneStyle.backgroundColor,
      }}>
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          backgroundColor: toneStyle.color,
        }}
      />
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.mono,
          fontSize: compact ? 9 : 11,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
          color: toneStyle.color,
        }}>
        {label}
      </Text>
    </View>
  );
}

export function AppChip({
  label,
  active = false,
  tone = 'neutral',
}: {
  label: string;
  active?: boolean;
  tone?: 'neutral' | 'accent';
}) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: pawpointRadius.pill,
        backgroundColor: active
          ? tone === 'accent'
            ? pawpointColors.accentWash
            : pawpointColors.primaryWash
          : pawpointColors.paperRaised,
        borderWidth: 1,
        borderColor: active
          ? tone === 'accent'
            ? pawpointColors.accent
            : pawpointColors.primary
          : pawpointColors.paperStrong,
      }}>
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.sans,
          fontSize: 12,
          color: active
            ? tone === 'accent'
              ? pawpointColors.accentInk
              : pawpointColors.primaryInk
            : pawpointColors.inkMuted,
        }}>
        {label}
      </Text>
    </View>
  );
}

export function InfoBanner({
  title,
  body,
  tone = 'accent',
}: {
  title: string;
  body: string;
  tone?: 'accent' | 'info' | 'ok';
}) {
  const styles =
    tone === 'info'
      ? { backgroundColor: pawpointColors.infoWash, iconBg: pawpointColors.info }
      : tone === 'ok'
        ? { backgroundColor: pawpointColors.okWash, iconBg: pawpointColors.ok }
        : { backgroundColor: pawpointColors.accentWash, iconBg: pawpointColors.accent };

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: pawpointSpacing.sm,
        borderRadius: pawpointRadius.md,
        borderCurve: 'continuous',
        backgroundColor: styles.backgroundColor,
        padding: pawpointSpacing.md,
      }}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 8,
          backgroundColor: styles.iconBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{ color: pawpointColors.paperRaised, fontWeight: 700, fontSize: 12 }}>i</Text>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.sans,
            fontSize: 13,
            fontWeight: 600,
            color: pawpointColors.ink,
          }}>
          {title}
        </Text>
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.sans,
            fontSize: 12,
            lineHeight: 18,
            color: pawpointColors.inkMuted,
          }}>
          {body}
        </Text>
      </View>
    </View>
  );
}

export function PetBadge({ pet, small = false }: { pet: Pet; small?: boolean }) {
  const accent = petAccentColor(pet);
  const size = small ? 40 : 56;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: accent.background,
        borderWidth: 1,
        borderColor: accent.border,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.serif,
          fontSize: small ? 16 : 22,
          color: accent.text,
        }}>
        {pet.name.slice(0, 1)}
      </Text>
    </View>
  );
}

export function ShopCard({
  shop,
  onPress,
  highlighted = false,
}: {
  shop: Shop;
  onPress?: () => void;
  highlighted?: boolean;
}) {
  const slots = shop.slots.slice(0, 4);

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            gap: pawpointSpacing.sm,
            padding: pawpointSpacing.sm,
            borderRadius: pawpointRadius.md,
            borderCurve: 'continuous',
            borderWidth: 1,
            borderColor: highlighted ? pawpointColors.primary : pawpointColors.paperStrong,
            backgroundColor: highlighted ? pawpointColors.primaryWash : pawpointColors.paperRaised,
            opacity: pressed ? 0.9 : 1,
          }}>
          <Image
            source={shop.image}
            style={{
              width: 76,
              height: 76,
              borderRadius: 12,
            }}
            contentFit="cover"
          />
          <View style={{ flex: 1, gap: 6 }}>
            <View style={{ gap: 4 }}>
              <Text
                selectable
                style={{
                  fontFamily: pawpointFonts.serif,
                  fontSize: 18,
                  lineHeight: 20,
                  color: pawpointColors.ink,
                }}>
                {shop.name}
              </Text>
              <Text
                selectable
                style={{
                  fontFamily: pawpointFonts.sans,
                  fontSize: 11,
                  color: pawpointColors.inkSoft,
                }}>
                ★ {shop.rating.toFixed(1)} · {shop.distanceKm.toFixed(1)} km · {shop.area}
              </Text>
            </View>
            <StatusBadge
              compact
              tone={shop.confirmMode === 'review' ? 'pending' : 'instant'}
              label={shop.confirmLabel}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {slots.map((slot) => (
                <SlotPill key={slot.id} slot={slot} />
              ))}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

export function SlotPill({ slot, selected = false }: { slot: BookingSlot; selected?: boolean }) {
  const disabled = slot.state === 'disabled';
  const isPending = slot.state === 'pending';
  const backgroundColor = disabled
    ? pawpointColors.paperMuted
    : selected
      ? pawpointColors.primary
      : isPending
        ? pawpointColors.warnWash
        : pawpointColors.paperRaised;
  const textColor = disabled
    ? pawpointColors.inkSoft
    : selected
      ? pawpointColors.paperRaised
      : isPending
        ? pawpointColors.warn
        : pawpointColors.ink;

  return (
    <View
      style={{
        minWidth: 72,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 12,
        borderCurve: 'continuous',
        backgroundColor,
        borderWidth: 1,
        borderColor: selected
          ? pawpointColors.primary
          : disabled
            ? pawpointColors.paperStrong
            : isPending
              ? pawpointColors.warn
              : pawpointColors.paperStrong,
        alignItems: 'center',
      }}>
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.mono,
          fontSize: 12,
          color: textColor,
          fontVariant: ['tabular-nums'],
        }}>
        {slot.label}
      </Text>
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.sans,
          fontSize: 10,
          color: textColor,
          opacity: disabled ? 0.7 : 1,
        }}>
        {slot.durationLabel}
      </Text>
    </View>
  );
}

export function HeroCover({ shop }: { shop: Shop }) {
  return (
    <View
      style={{
        minHeight: 212,
        borderRadius: pawpointRadius.lg,
        overflow: 'hidden',
        backgroundColor: pawpointColors.primary,
      }}>
      <Image source={shop.heroImage} style={{ position: 'absolute', inset: 0 }} contentFit="cover" />
      <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(24, 21, 18, 0.34)' }} />
      <View
        style={{
          flex: 1,
          padding: pawpointSpacing.lg,
          justifyContent: 'space-between',
          gap: pawpointSpacing.md,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text
            selectable
            style={{
              fontFamily: pawpointFonts.mono,
              fontSize: 10,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.72)',
            }}>
            {shop.area} · est. 2019
          </Text>
          <StatusBadge tone={shop.confirmMode === 'review' ? 'pending' : 'instant'} label={shop.confirmLabel} />
        </View>

        <View style={{ gap: pawpointSpacing.xs }}>
          <Text
            selectable
            style={{
              fontFamily: pawpointFonts.serif,
              fontSize: 34,
              lineHeight: 36,
              letterSpacing: -1.2,
              color: pawpointColors.paperRaised,
            }}>
            {shop.name}
          </Text>
          <Text
            selectable
            style={{
              fontFamily: pawpointFonts.sans,
              fontSize: 13,
              lineHeight: 20,
              color: 'rgba(255,255,255,0.84)',
            }}>
            ★ {shop.rating.toFixed(1)} · {shop.reviewCount} reviews · {shop.languages.join(' · ')}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function BottomActionBar({
  kicker,
  value,
  button,
}: {
  kicker: string;
  value?: string;
  button: ReactNode;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: pawpointSpacing.sm }}>
      <View style={{ flex: 1, gap: 4 }}>
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.mono,
            fontSize: 10,
            letterSpacing: 1.6,
            textTransform: 'uppercase',
            color: pawpointColors.inkSoft,
          }}>
          {kicker}
        </Text>
        {value ? (
          <Text
            selectable
            style={{
              fontFamily: pawpointFonts.serif,
              fontSize: 22,
              lineHeight: 24,
              letterSpacing: -0.8,
              color: pawpointColors.ink,
            }}>
            {value}
          </Text>
        ) : null}
      </View>
      {button}
    </View>
  );
}

export function KVRow({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: pawpointSpacing.md,
        paddingVertical: pawpointSpacing.sm,
        borderTopWidth: 1,
        borderTopColor: pawpointColors.paperStrong,
      }}>
      <Text
        selectable
        style={{
          flex: 1,
          fontFamily: pawpointFonts.sans,
          fontSize: 13,
          color: pawpointColors.inkMuted,
        }}>
        {label}
      </Text>
      <Text
        selectable
        style={{
          flex: 1,
          textAlign: 'right',
          fontFamily: pawpointFonts.sans,
          fontSize: 13,
          color: muted ? pawpointColors.inkSoft : pawpointColors.ink,
        }}>
        {value}
      </Text>
    </View>
  );
}

export function TimelineStep({
  title,
  subtitle,
  tone = 'default',
}: {
  title: string;
  subtitle?: string;
  tone?: 'default' | 'current' | 'done';
}) {
  const dotColor =
    tone === 'done'
      ? pawpointColors.primary
      : tone === 'current'
        ? pawpointColors.accent
        : pawpointColors.paperStrong;

  return (
    <View style={{ flexDirection: 'row', gap: pawpointSpacing.sm }}>
      <View style={{ alignItems: 'center', width: 12 }}>
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            marginTop: 6,
            backgroundColor: dotColor,
          }}
        />
      </View>
      <View style={{ flex: 1, paddingBottom: pawpointSpacing.md }}>
        <Text
          selectable
          style={{
            fontFamily: pawpointFonts.sans,
            fontSize: 14,
            fontWeight: 600,
            color: pawpointColors.ink,
          }}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            selectable
            style={{
              fontFamily: pawpointFonts.mono,
              fontSize: 11,
              letterSpacing: 0.6,
              color: pawpointColors.inkSoft,
            }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

export function VisitRow({
  icon,
  title,
  subtitle,
  badge,
  onPress,
  tone = 'default',
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  badge: ReactNode;
  onPress?: () => void;
  tone?: 'default' | 'warn';
}) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: pawpointSpacing.sm,
            padding: pawpointSpacing.md,
            borderRadius: pawpointRadius.md,
            borderCurve: 'continuous',
            borderWidth: 1,
            borderColor: tone === 'warn' ? pawpointColors.warn : pawpointColors.paperStrong,
            backgroundColor: tone === 'warn' ? pawpointColors.warnWash : pawpointColors.paperRaised,
            opacity: pressed ? 0.9 : 1,
          }}>
          {icon}
          <View style={{ flex: 1, gap: 2 }}>
            <Text
              selectable
              style={{
                fontFamily: pawpointFonts.sans,
                fontSize: 14,
                fontWeight: 600,
                color: pawpointColors.ink,
              }}>
              {title}
            </Text>
            <Text
              selectable
              style={{
                fontFamily: pawpointFonts.sans,
                fontSize: 11,
                color: pawpointColors.inkSoft,
              }}>
              {subtitle}
            </Text>
          </View>
          {badge}
        </View>
      )}
    </Pressable>
  );
}

export function PriceSummary({
  title,
  value,
  caption,
}: {
  title: string;
  value: number;
  caption: string;
}) {
  return (
    <Card compact>
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.mono,
          fontSize: 10,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
          color: pawpointColors.inkSoft,
        }}>
        {title}
      </Text>
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.serif,
          fontSize: 24,
          lineHeight: 26,
          color: pawpointColors.ink,
        }}>
        {formatCurrency(value)}
      </Text>
      <Text
        selectable
        style={{
          fontFamily: pawpointFonts.sans,
          fontSize: 11,
          color: pawpointColors.inkSoft,
        }}>
        {caption}
      </Text>
    </Card>
  );
}
