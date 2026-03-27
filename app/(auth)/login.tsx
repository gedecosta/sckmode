import { useState } from 'react';
import { View, Text, Alert, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const { setSession } = useAuthStore();

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
      className="flex-1 bg-athledia-bg"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="items-center mb-10">
          <Text className="text-athledia-dark text-5xl font-black font-serif tracking-tighter">ATH<Text className="text-athledia-slate">LEDIA</Text></Text>
          <Text className="text-athledia-slate mt-2 text-base text-center font-medium">Entre para rastrear e compartilhar.</Text>
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
          
          <Link href="/(auth)/register" asChild>
            <Text className="text-athledia-dark self-end text-sm font-bold mt-2 underline">
              Esqueceu a senha?
            </Text>
          </Link>

          <Button 
            label="Entrar" 
            onPress={handleSignIn} 
            isLoading={loading}
            className="mt-6"
          />

          <View className="flex-row items-center justify-center mt-6">
            <View className="flex-1 h-[1px] bg-athledia-slate/20" />
            <Text className="text-athledia-slate mx-4 font-bold uppercase text-xs tracking-wider">Ou continue com</Text>
            <View className="flex-1 h-[1px] bg-athledia-slate/20" />
          </View>

          <View className="flex-row gap-4 mt-6">
            <Button 
              label="Google" 
              variant="secondary"
              className="flex-1"
            />
            <Button 
              label="Apple" 
              variant="secondary"
              className="flex-1"
            />
          </View>
        </View>

        <View className="flex-row justify-center mt-12">
          <Text className="text-athledia-slate font-medium">Não tem uma conta? </Text>
          <Link href="/(auth)/register" asChild>
            <Text className="text-athledia-dark font-bold underline">Cadastre-se</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
