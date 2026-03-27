import { useState } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAuthStore } from '../../stores/authStore';
import { supabase } from '../../lib/supabase';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { setSession } = useAuthStore();

  async function handleSignUp() {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
    setLoading(false);

    if (error) {
      Alert.alert('Erro no Cadastro', error.message);
    } else {
      if (data.session) {
        setSession(data.session);
      }
      // Navigate to onboarding flow
      router.replace('/(auth)/onboarding');
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-athledia-bg"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
        <View className="mb-10">
          <Text className="text-athledia-dark text-4xl font-black font-serif tracking-tight">CRIAR CONTA</Text>
          <Text className="text-athledia-slate mt-2 text-base font-medium">Junte-se ao Athledia e alcance seus objetivos.</Text>
        </View>

        <View className="space-y-4 gap-4">
          <Input
            label="Nome Completo"
            placeholder="Gabriel Costa"
            autoCapitalize="words"
            value={name}
            onChangeText={setName}
          />
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
            placeholder="Mínimo de 6 caracteres"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Input
            label="Confirmar Senha"
            placeholder="Repita sua senha"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Button 
            label="Cadastrar" 
            onPress={handleSignUp} 
            isLoading={loading}
            className="mt-6"
          />
        </View>

        <View className="flex-row justify-center mt-12">
          <Text className="text-athledia-slate font-medium">Já tem uma conta? </Text>
          <Link href="/(auth)/login" asChild>
            <Text className="text-athledia-dark font-bold underline">Entrar</Text>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
