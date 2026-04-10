import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { 
  ChevronLeft, 
  User, 
  Settings as SettingsIcon, 
  Link as LinkIcon, 
  Activity, 
  Ruler, 
  ShieldCheck, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Bluetooth 
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';

function SettingRow({ icon: Icon, label, value, onPress, isDestructive = false }: any) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#F4F4F4',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(73, 80, 87, 0.08)',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon size={20} color={isDestructive ? '#E03131' : '#495057'} />
        <Text style={{ 
          fontSize: 15, 
          fontWeight: isDestructive ? '800' : '600', 
          color: isDestructive ? '#E03131' : '#1F2328',
          marginLeft: 14 
        }}>
          {label}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {value && (
          <Text style={{ color: '#868E96', fontSize: 13, fontWeight: '500', marginRight: 8 }}>
            {value}
          </Text>
        )}
        <ChevronRight size={16} color="#B0B7BF" />
      </View>
    </TouchableOpacity>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <Text style={{
      color: '#868E96',
      fontSize: 11,
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginLeft: 20,
      marginTop: 28,
      marginBottom: 10,
    }}>
      {title}
    </Text>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { signOut, user } = useAuthStore();

  const handleLogout = () => {
    Alert.alert('Sair da Conta', 'Tem certeza que deseja desconectar do Athledia?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Sair', 
        style: 'destructive', 
        onPress: () => {
          signOut();
          router.replace('/(auth)');
        } 
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      {/* Header Modal */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 52,
          paddingBottom: 14,
          backgroundColor: '#E5E5E5',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(73, 80, 87, 0.08)',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 8,
            backgroundColor: '#F4F4F4',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'rgba(73, 80, 87, 0.1)',
          }}
        >
          <ChevronLeft size={22} color="#1F2328" />
        </TouchableOpacity>
        <Text style={{ color: '#1F2328', fontSize: 16, fontWeight: '900', marginLeft: 16,flex:1 }}>
          Configurações
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        <SectionHeader title="Sua Conta" />
        <View style={{ backgroundColor: '#F4F4F4', borderTopWidth: 1, borderTopColor: 'rgba(73, 80, 87, 0.08)' }}>
          <SettingRow icon={User} label="Editar Perfil" value={user?.user_metadata?.full_name || "Completar"} />
          <SettingRow icon={SettingsIcon} label="Detalhes da Conta" value="E-mail / Senha" />
        </View>

        <SectionHeader title="Dispositivos & Conexões" />
        <View style={{ backgroundColor: '#F4F4F4', borderTopWidth: 1, borderTopColor: 'rgba(73, 80, 87, 0.08)' }}>
          <SettingRow icon={Bluetooth} label="Sensores (Cinta Cardíaca)" value="Nenhum" />
          <SettingRow icon={LinkIcon} label="Integrações" value="Strava, Garmin, Apple Health" />
        </View>

        <SectionHeader title="Físico & Preferências" />
        <View style={{ backgroundColor: '#F4F4F4', borderTopWidth: 1, borderTopColor: 'rgba(73, 80, 87, 0.08)' }}>
          <SettingRow icon={Ruler} label="Unidade de Medida" value="Quilômetros (km)" />
          <SettingRow icon={Activity} label="Zonas de Frequência Cardíaca" value="Padrão (190 Máx)" />
        </View>

        <SectionHeader title="Segurança & Apoio" />
        <View style={{ backgroundColor: '#F4F4F4', borderTopWidth: 1, borderTopColor: 'rgba(73, 80, 87, 0.08)' }}>
          <SettingRow icon={ShieldCheck} label="Privacidade" value="Público" />
          <SettingRow icon={HelpCircle} label="Central de Ajuda" />
        </View>

        <View style={{ marginTop: 40, borderTopWidth: 1, borderTopColor: 'rgba(73, 80, 87, 0.1)' }}>
          <SettingRow icon={LogOut} label="Sair da Conta" isDestructive onPress={handleLogout} />
        </View>

        <Text style={{ textAlign: 'center', color: '#868E96', fontSize: 11, fontWeight: '600', marginTop: 32 }}>
          Athledia v1.0.0 (Build 42)
        </Text>

      </ScrollView>
    </View>
  );
}
