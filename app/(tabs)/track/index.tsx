import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Play, Square, Pause } from 'lucide-react-native';
import { LiveMap } from '../../../components/tracking/LiveMap';
import { MetricBar } from '../../../components/tracking/MetricBar';
import { useTracking } from '../../../hooks/useTracking';
import { Button } from '../../../components/ui/Button';
import { useThemeColors } from '../../../lib/tokens';

export default function TrackScreen() {
  const c = useThemeColors();
  const { status, startTracking, pauseTracking, resumeTracking, finishTracking } = useTracking();

  const statusLabel =
    status === 'idle'     ? 'READY · GPS LOCKED'
    : status === 'running'  ? 'LIVE · RECORDING'
    : status === 'paused'   ? 'PAUSED'
    : 'SESSION ENDED';

  return (
    <View className="flex-1" style={{ backgroundColor: c.bg }}>
      <LiveMap />

      {/* Floating Header */}
      <View
        className="absolute top-0 left-0 right-0 px-6 pt-[52px] pb-4"
        style={{ backgroundColor: `${c.bg}E6`, borderBottomWidth: 1, borderBottomColor: c.border }}
      >
        <Text
          className="text-[10px] uppercase mb-1"
          style={{
            color: status === 'running' ? c.accentText : c.textMuted,
            letterSpacing: 2,
            fontFamily: 'Menlo',
          }}
        >
          · {statusLabel}
        </Text>
        <Text
          style={{ color: c.text, fontSize: 34, fontFamily: 'RobotoSlab-Black', letterSpacing: -1.2, lineHeight: 36 }}
        >
          Track
        </Text>
      </View>

      {status !== 'idle' && status !== 'finished' && <MetricBar />}

      {/* Controls */}
      <View className="absolute bottom-28 left-5 right-5">
        {status === 'idle' && (
          <Button
            label="Iniciar Sessão"
            variant="accent"
            size="lg"
            onPress={startTracking}
            leftIcon={<Play size={16} color={c.accentInk} fill={c.accentInk} />}
            className="w-full"
          />
        )}

        {status === 'running' && (
          <Button
            label="Pausar"
            variant="secondary"
            size="lg"
            onPress={pauseTracking}
            leftIcon={<Pause size={18} color={c.text} />}
            className="w-full"
          />
        )}

        {status === 'paused' && (
          <View className="flex-row gap-3">
            <Button
              label="Retomar"
              variant="accent"
              size="lg"
              onPress={resumeTracking}
              className="flex-[2]"
            />
            <Pressable
              onPress={finishTracking}
              className="flex-1 rounded-xl items-center justify-center"
              style={{ backgroundColor: c.danger, paddingVertical: 20 }}
            >
              <Square size={22} color="#fff" fill="#fff" />
            </Pressable>
          </View>
        )}

        {status === 'finished' && (
          <View
            className="rounded-2xl p-6"
            style={{ backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }}
          >
            <Text
              className="text-[10px] uppercase mb-2 text-center"
              style={{ color: c.accentText, letterSpacing: 1.6, fontFamily: 'Menlo' }}
            >
              · Session Summary
            </Text>
            <Text
              className="text-2xl text-center mb-5"
              style={{ color: c.text, fontFamily: 'RobotoSlab-Black', letterSpacing: -0.5 }}
            >
              Treino Concluído
            </Text>
            <Button label="Salvar no Feed" variant="accent" size="lg" className="w-full mb-2" />
            <Pressable className="py-3 items-center">
              <Text
                className="text-xs font-bold uppercase"
                style={{ color: c.textMuted, letterSpacing: 1.6 }}
              >
                Descartar
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}
