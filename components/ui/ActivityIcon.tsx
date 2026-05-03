import React from 'react';
import Svg, { Circle, Path, Line, Polyline, G } from 'react-native-svg';

export type ActivityKind =
  | 'run' | 'trail' | 'cycle' | 'mtb' | 'swim' | 'openwater'
  | 'strength' | 'calisthenics' | 'hiit' | 'crossfit' | 'yoga'
  | 'combat' | 'mountain' | 'team' | 'racket'
  | 'streak' | 'sunrise' | 'moon' | 'calendar' | 'chart'
  | 'triathlon' | 'duathlon' | 'medal' | 'lock';

interface Props {
  kind: ActivityKind;
  size?: number;
  color?: string;
  strokeWidth?: number;
  accent?: string;
}

export function ActivityIcon({
  kind, size = 24, color = '#141619', strokeWidth = 1.75, accent,
}: Props) {
  const c = color;
  const a = accent ?? color;
  const sw = strokeWidth;
  const common = {
    stroke: c, strokeWidth: sw, fill: 'none',
    strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  };
  const aCommon = { ...common, stroke: a };

  const viewBox = '0 0 24 24';

  switch (kind) {
    case 'run':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="14" cy="5" r="1.6" {...common} />
          <Path d="M9 20 L12 14 L10 11 L14 9 L17 12 L20 11" {...common} />
          <Path d="M14 9 L13 6" {...aCommon} />
          <Path d="M10 11 L6.5 13" {...common} />
          <Line x1="3" y1="22" x2="6" y2="22" {...aCommon} />
        </Svg>
      );
    case 'trail':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M3 19 L8 12 L11 15 L15 9 L21 19" {...common} />
          <Path d="M13 12 L16 6" {...aCommon} />
          <Circle cx="16" cy="6" r="1" {...aCommon} />
          <Line x1="3" y1="19" x2="21" y2="19" {...common} />
        </Svg>
      );
    case 'cycle':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="5.5" cy="17" r="3.5" {...common} />
          <Circle cx="18.5" cy="17" r="3.5" {...common} />
          <Path d="M5.5 17 L10 8 L15 8 L18.5 17" {...aCommon} />
          <Path d="M10 8 L13 17" {...common} />
          <Circle cx="13" cy="6" r="0.9" {...common} />
        </Svg>
      );
    case 'mtb':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="5.5" cy="17" r="3.2" {...common} />
          <Circle cx="18.5" cy="17" r="3.2" {...common} />
          <Path d="M5.5 17 L10 9 L15 9 L18.5 17" {...common} />
          <Path d="M2 20 L22 20" {...aCommon} strokeDasharray="1 3" />
        </Svg>
      );
    case 'swim':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="7" cy="7" r="1.5" {...common} />
          <Path d="M4 11 L9 13 L13 9 L18 11 L21 10" {...common} />
          <Path d="M2 17 Q5 15 8 17 T14 17 T20 17" {...aCommon} />
          <Path d="M2 21 Q5 19 8 21 T14 21 T20 21" {...common} opacity={0.5} />
        </Svg>
      );
    case 'openwater':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M2 12 Q6 9 10 12 T18 12 T22 11" {...common} />
          <Path d="M2 16 Q6 13 10 16 T18 16 T22 15" {...aCommon} />
          <Path d="M2 20 Q6 17 10 20 T18 20 T22 19" {...common} opacity={0.5} />
          <Circle cx="12" cy="5" r="2" {...aCommon} />
        </Svg>
      );
    case 'strength':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Line x1="3" y1="12" x2="21" y2="12" {...aCommon} />
          <Path d="M5 8 V16 M8 6 V18 M16 6 V18 M19 8 V16" {...common} />
        </Svg>
      );
    case 'calisthenics':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="12" cy="5" r="1.6" {...common} />
          <Path d="M8 11 L12 8 L16 11" {...common} />
          <Path d="M12 8 V17" {...aCommon} />
          <Path d="M8 21 L12 17 L16 21" {...common} />
        </Svg>
      );
    case 'hiit':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M13 3 L6 13 L11 13 L10 21 L18 10 L13 10 Z" {...aCommon} />
        </Svg>
      );
    case 'crossfit':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M4 4 L20 20 M20 4 L4 20" {...common} />
          <Circle cx="12" cy="12" r="4" {...aCommon} />
        </Svg>
      );
    case 'yoga':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="12" cy="5" r="1.6" {...common} />
          <Path d="M12 7 V14" {...common} />
          <Path d="M5 11 Q12 9 19 11" {...aCommon} />
          <Path d="M7 21 L12 14 L17 21" {...common} />
        </Svg>
      );
    case 'combat':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M7 8 H15 Q18 8 18 11 V17 Q18 20 15 20 H9 Q6 20 6 17 V11 Q6 8 9 8" {...common} />
          <Path d="M15 8 V6 Q15 4 13 4 H10 Q8 4 8 6 V8" {...aCommon} />
          <Line x1="8" y1="14" x2="12" y2="14" {...common} />
        </Svg>
      );
    case 'mountain':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M3 20 L9 10 L13 15 L16 11 L21 20 Z" {...common} />
          <Path d="M9 10 L10.5 12" {...aCommon} />
          <Path d="M16 11 L17.5 13.5" {...aCommon} />
        </Svg>
      );
    case 'team':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="6" cy="6" r="1.8" {...common} />
          <Circle cx="18" cy="6" r="1.8" {...common} />
          <Circle cx="12" cy="18" r="1.8" {...aCommon} />
          <Path d="M6 6 L18 6 M6 6 L12 18 M18 6 L12 18" {...common} opacity={0.6} />
        </Svg>
      );
    case 'racket':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="9" cy="9" r="5" {...common} />
          <Path d="M9 4 V14 M4 9 H14" {...common} opacity={0.5} />
          <Line x1="12.5" y1="12.5" x2="20" y2="20" {...aCommon} />
        </Svg>
      );
    case 'streak':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M12 3 Q16 9 15 13 Q15 10 12 9 Q10 14 12 21 Q6 18 7 13 Q8 14 9 13 Q8 8 12 3 Z" {...aCommon} />
        </Svg>
      );
    case 'sunrise':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M3 18 H21" {...common} />
          <Path d="M7 13 Q12 7 17 13" {...aCommon} />
          <Line x1="12" y1="4" x2="12" y2="6" {...common} />
          <Line x1="5" y1="9" x2="6.5" y2="10.5" {...common} />
          <Line x1="19" y1="9" x2="17.5" y2="10.5" {...common} />
        </Svg>
      );
    case 'moon':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M20 15 A8 8 0 1 1 11 4 A6 6 0 0 0 20 15 Z" {...aCommon} />
        </Svg>
      );
    case 'calendar':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M5 6 H19 V20 H5 Z" {...common} />
          <Line x1="5" y1="10" x2="19" y2="10" {...common} />
          <Line x1="9" y1="4" x2="9" y2="7" {...common} />
          <Line x1="15" y1="4" x2="15" y2="7" {...common} />
          <Circle cx="12" cy="15" r="1.2" {...aCommon} />
        </Svg>
      );
    case 'chart':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M3 20 H21" {...common} />
          <Polyline points="5,16 9,11 13,13 17,6 21,9" {...aCommon} />
        </Svg>
      );
    case 'triathlon':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M12 4 L20 20 L4 20 Z" {...common} />
          <Path d="M12 10 L8 17 L16 17 Z" {...aCommon} />
        </Svg>
      );
    case 'duathlon':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Circle cx="7" cy="17" r="3" {...common} />
          <Path d="M12 5 L17 17" {...aCommon} />
          <Path d="M7 17 L12 5" {...common} />
        </Svg>
      );
    case 'medal':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M8 3 L10 10 M16 3 L14 10" {...common} />
          <Circle cx="12" cy="15" r="5" {...aCommon} />
          <Path d="M10 15 L12 17 L14 14" {...common} />
        </Svg>
      );
    case 'lock':
      return (
        <Svg width={size} height={size} viewBox={viewBox}>
          <Path d="M6 11 H18 V20 H6 Z" {...common} />
          <Path d="M9 11 V8 Q9 5 12 5 Q15 5 15 8 V11" {...common} />
        </Svg>
      );
    default:
      return null;
  }
}
