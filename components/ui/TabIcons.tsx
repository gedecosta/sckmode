import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

interface TabIconProps {
  color: string;
  size: number;
  focused?: boolean;
}

/**
 * Feed — House with activity pulse line inside
 */
export function FeedIcon({ color, size, focused }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* House outline */}
      <Path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        stroke={color}
        strokeWidth={focused ? 2.2 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Activity pulse inside */}
      <Path
        d="M8 15.5L10 13L12 16L14 11.5L16 15.5"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * Desafios — Shield with lightning bolt
 */
export function ChallengesIcon({ color, size, focused }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Shield */}
      <Path
        d="M12 2L4 5.5V11C4 16.25 7.4 21.04 12 22C16.6 21.04 20 16.25 20 11V5.5L12 2Z"
        stroke={color}
        strokeWidth={focused ? 2.2 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Lightning bolt */}
      <Path
        d="M13 7L10 12.5H14L11 17"
        stroke={color}
        strokeWidth={focused ? 2.2 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * Criar — Rounded square with plus sign, filled when active
 */
export function CreateIcon({ color, size, focused }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="6"
        stroke={color}
        strokeWidth={focused ? 2.2 : 1.8}
        fill={focused ? color : 'none'}
      />
      {/* Plus sign */}
      <Path
        d="M12 8V16M8 12H16"
        stroke={focused ? '#F4F4F4' : color}
        strokeWidth={focused ? 2.4 : 2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/**
 * Treinar — Route path with runner pulse
 */
export function TrackIcon({ color, size, focused }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Map pin */}
      <Path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
        stroke={color}
        strokeWidth={focused ? 2.2 : 1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Inner circle */}
      <Circle
        cx="12"
        cy="9"
        r="2.5"
        stroke={color}
        strokeWidth={focused ? 2 : 1.6}
        fill={focused ? color : 'none'}
      />
      {/* Small route curve at bottom */}
      <Path
        d="M8 18C9 19.5 10.5 20 12 20C13.5 20 15 19.5 16 18"
        stroke={color}
        strokeWidth={focused ? 1.8 : 1.4}
        strokeLinecap="round"
        strokeDasharray={focused ? "0" : "2 2"}
        fill="none"
      />
    </Svg>
  );
}

/**
 * Perfil — Person with achievement badge
 */
export function ProfileIcon({ color, size, focused }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Head */}
      <Circle
        cx="12"
        cy="8"
        r="4"
        stroke={color}
        strokeWidth={focused ? 2.2 : 1.8}
        fill="none"
      />
      {/* Body/shoulders */}
      <Path
        d="M4 21C4 17.134 7.582 14 12 14C16.418 14 20 17.134 20 21"
        stroke={color}
        strokeWidth={focused ? 2.2 : 1.8}
        strokeLinecap="round"
        fill="none"
      />
      {/* Small star badge */}
      <G>
        <Circle
          cx="18"
          cy="6"
          r="3.5"
          fill={focused ? color : 'none'}
          stroke={color}
          strokeWidth={1.2}
        />
        <Path
          d="M18 4.2L18.5 5.4L19.8 5.5L18.8 6.3L19.1 7.6L18 6.9L16.9 7.6L17.2 6.3L16.2 5.5L17.5 5.4L18 4.2Z"
          fill={focused ? '#F4F4F4' : color}
          stroke="none"
        />
      </G>
    </Svg>
  );
}
