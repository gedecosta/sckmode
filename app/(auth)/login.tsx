import { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';
import { CloudBackground } from '../../components/ui/CloudBackground';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const { setSession, signInWithOAuth } = useAuthStore();
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);

  async function handleOAuth(provider: 'google' | 'apple') {
    setOauthLoading(provider);
    const { error } = await signInWithOAuth(provider);
    setOauthLoading(null);
    
    if (error) {
      if (error.message !== 'Login cancelado pelo usuário.') {
        Alert.alert(`Erro no Login com ${provider === 'google' ? 'Google' : 'Apple'}`, error.message);
      }
    } else {
      router.replace('/(tabs)');
    }
  }

  async function handleSignIn() {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      Alert.alert('Erro de Autenticação', error.message);
    } else {
      setSession(data.session);
      router.replace('/(tabs)');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-athledia-bg relative"
    >
      <CloudBackground />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        <View className="mb-14 mt-10 items-center">
          <Text 
            className="text-athledia-dark text-6xl tracking-tighter" 
            style={{ fontFamily: 'RobotoSlab-Black' }}
          >
            Athledia
          </Text>
          <Text className="text-athledia-dark mt-1 text-sm font-bold tracking-widest lowercase">
            built for the grind
          </Text>
        </View>

        <View className="space-y-4 gap-4">
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Senha"
            placeholder="Sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity onPress={() => router.push('/(auth)/register/forgot-password' as any)}>
            <Text className="text-athledia-dark self-end text-sm font-bold mt-2 underline">
              Esqueceu a senha?
            </Text>
          </TouchableOpacity>

          <Button 
            label="Entrar" 
            onPress={handleSignIn} 
            isLoading={loading}
            className="mt-6 shadow-md"
          />

          <View className="flex-row items-center justify-center mt-8 mb-2">
            <View className="flex-1 h-[2px] bg-athledia-slate/10" />
            <Text className="text-athledia-slate mx-4 font-black uppercase text-xs tracking-widest">Ou acesse com</Text>
            <View className="flex-1 h-[2px] bg-athledia-slate/10" />
          </View>

          <View className="flex-row gap-4 mt-2">
            <Button 
              label="Google" 
              variant="secondary"
              isLoading={oauthLoading === 'google'}
              onPress={() => handleOAuth('google')}
              className="flex-1 rounded-[16px] border-athledia-slate/20 shadow-sm bg-white"
            />
            <Button 
              label="Apple" 
              variant="secondary"
              isLoading={oauthLoading === 'apple'}
              onPress={() => handleOAuth('apple')}
              className="flex-1 rounded-[16px] border-athledia-slate/20 shadow-sm bg-white"
            />
          </View>
        </View>

        <View className="flex-row justify-center mt-12 bg-athledia-bg/50 p-2 rounded-xl self-center">
          <Text className="text-athledia-slate font-medium">Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className="text-athledia-dark font-bold underline">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
