import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Activity, GripVertical, Trash2 } from 'lucide-react-native';
import { ChallengeStep } from '../../stores/challengeStore';

interface ChallengeBoxProps {
  step: ChallengeStep;
  index: number;
  onRemove?: () => void;
}

const TYPE_LABELS: Record<ChallengeStep['type'], string> = {
  run: 'Corrida',
  pushups: 'Flexões',
  pullups: 'Barras',
  cycling: 'Ciclismo',
  swim: 'Natação',
  other: 'Outro',
};

const TYPE_COLORS: Record<ChallengeStep['type'], string> = {
  run: 'bg-athledia-dark/10 text-athledia-dark border-athledia-dark/20',
  pushups: 'bg-athledia-slate/10 text-athledia-slate border-athledia-slate/20',
  pullups: 'bg-emerald-600/10 text-emerald-700 border-emerald-600/30',
  cycling: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
  swim: 'bg-cyan-600/10 text-cyan-700 border-cyan-600/30',
  other: 'bg-athledia-lightSlate/10 text-athledia-lightSlate border-athledia-lightSlate/20',
};

export function ChallengeBox({ step, index, onRemove }: ChallengeBoxProps) {
  const colorClass = TYPE_COLORS[step.type];

  return (
    <View className="flex-row items-center bg-athledia-card border border-athledia-slate/10 p-4 rounded-2xl mb-3 shadow-sm">
      <View className="mr-3">
        <GripVertical size={20} color="#868E96" />
      </View>
      
      <View className={`w-12 h-12 rounded-xl items-center justify-center border ${colorClass.split(' ')[0]} ${colorClass.split(' ')[2]}`}>
        <Activity size={24} color="currentColor" className={colorClass.split(' ')[1]} />
      </View>

      <View className="flex-1 ml-4 justify-center">
        <Text className="text-athledia-slate text-xs font-bold uppercase tracking-wider mb-1">
          Etapa {index + 1}
        </Text>
        <Text className="text-athledia-dark text-lg font-black font-serif">
          {TYPE_LABELS[step.type]}
        </Text>
      </View>

      <View className="items-end justify-center mr-4">
        <Text className="text-athledia-dark text-2xl font-black">
          {step.targetValue}
        </Text>
        <Text className="text-athledia-slate text-xs font-bold uppercase tracking-widest mt-0.5">
          {step.targetUnit}
        </Text>
      </View>

      {onRemove && (
        <TouchableOpacity 
          onPress={onRemove}
          className="p-2 ml-2 bg-red-500/10 rounded-full"
        >
          <Trash2 size={18} color="#ef4444" />
        </TouchableOpacity>
      )}
    </View>
  );
}
