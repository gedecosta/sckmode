import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Svg, { Path, Defs, LinearGradient as SvgGrad, Stop } from 'react-native-svg';
import { OrganicLoader } from '../../components/ui/OrganicLoader';
import { useAuthStore } from '../../stores/authStore';
import { useToastStore } from '../../stores/toastStore';
import { supabase } from '../../lib/supabase';
import { authLimiter } from '../../lib/rateLimiter';
import { analytics } from '../../lib/analytics';
import { loginSchema, type LoginInput } from '../../lib/validators';
import { getUserFriendlyMessage } from '../../lib/errorSanitizer';
import { useThemeColors } from '../../lib/tokens';

export default function LoginScreen() {
  const router = useRouter();
  const { setSession } = useAuthStore();
  const toast = useToastStore();
  const t = useThemeColors();

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginInput) {
    if (!authLimiter.canProceed()) {
      const retrySec = Math.ceil(authLimiter.getRetryAfter() / 1000);
      toast.show(`Muitas tentativas. Tente novamente em ${retrySec}s.`, 'error');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.show(getUserFriendlyMessage(error), 'error');
      analytics.track('error_occurred', { context: 'login', message: error.message });
    } else if (data.session) {
      setSession(data.session);
      analytics.track('login', { method: 'email' });
      if (data.session.user?.id) {
        analytics.identify(data.session.user.id, { email: values.email });
      }
      router.replace('/(tabs)');
    }
  }

  function handleOAuthComingSoon() {
    toast.show('Login social em breve.', 'info');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: t.bg }}
    >
      {/* Mountain silhouette */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 280, opacity: 0.7 }} pointerEvents="none">
        <Svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice">
          <Defs>
            <SvgGrad id="peakGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={t.accent} stopOpacity="0.18" />
              <Stop offset="1" stopColor={t.accent} stopOpacity="0" />
            </SvgGrad>
          </Defs>
          <Path
            d="M0 260 L70 180 L120 210 L180 120 L230 170 L290 90 L340 160 L400 130 L400 0 L0 0 Z"
            fill="url(#peakGrad)"
          />
          <Path
            d="M0 260 L70 180 L120 210 L180 120 L230 170 L290 90 L340 160 L400 130"
            stroke={t.border}
            strokeWidth="1"
            fill="none"
          />
        </Svg>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1, justifyContent: 'center',
          paddingHorizontal: 28, paddingTop: 80, paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Editorial header */}
        <View style={{ marginBottom: 40 }}>
          <Text style={{
            fontFamily: 'Menlo', fontSize: 11, letterSpacing: 3,
            color: t.accentText, textTransform: 'uppercase',
          }}>
            ATHLEDIA · 2026
          </Text>
          <Text style={{
            fontFamily: 'RobotoSlab-Black', fontSize: 56,
            letterSpacing: -2.5, lineHeight: 58,
            color: t.text, marginTop: 6,
          }}>
            Built for{'\n'}the grind.
          </Text>
          <Text style={{
            fontFamily: 'System', fontSize: 15, lineHeight: 22,
            color: t.textMuted, marginTop: 14, maxWidth: 320,
          }}>
            Entre para continuar sua jornada — rastreie, analise e compita com quem importa.
          </Text>
        </View>

        {/* Fields */}
        <View style={{ gap: 14 }}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value, onBlur }, fieldState }) => (
              <FocusField
                label="E-mail"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="atleta@athledia.com"
                keyboardType="email-address"
                autoCapitalize="none"
                error={fieldState.error?.message}
                t={t}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value, onBlur }, fieldState }) => (
              <FocusField
                label="Senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="••••••••"
                secureTextEntry
                error={fieldState.error?.message}
                t={t}
              />
            )}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push('/(auth)/register/forgot-password' as any)}
          style={{ alignSelf: 'flex-end', marginTop: 10, marginBottom: 24 }}
        >
          <Text style={{ fontFamily: 'System', fontSize: 13, fontWeight: '600', color: t.accentText }}>
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>

        {/* CTA */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          activeOpacity={0.85}
          style={{
            height: 54, borderRadius: 14,
            backgroundColor: t.text,
            alignItems: 'center', justifyContent: 'center',
            opacity: isSubmitting ? 0.6 : 1,
          }}
        >
          {isSubmitting ? (
            <OrganicLoader size="sm" tint="inverse" />
          ) : (
            <Text style={{
              color: t.bg, fontFamily: 'System', fontSize: 14, fontWeight: '800',
              letterSpacing: 1.6, textTransform: 'uppercase',
            }}>
              Entrar
            </Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 32, marginBottom: 18 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: t.border }} />
          <Text style={{
            fontFamily: 'Menlo', fontSize: 9, letterSpacing: 2,
            color: t.textDim, textTransform: 'uppercase', marginHorizontal: 14,
          }}>
            ou acesse com
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: t.border }} />
        </View>

        {/* OAuth */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {(['google', 'apple'] as const).map((p) => (
            <TouchableOpacity
              key={p}
              onPress={handleOAuthComingSoon}
              activeOpacity={0.85}
              style={{
                flex: 1, height: 50, borderRadius: 14,
                backgroundColor: t.surface, borderWidth: 1, borderColor: t.border,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Text style={{
                color: t.text, fontFamily: 'System', fontSize: 12, fontWeight: '700',
                letterSpacing: 1.4, textTransform: 'uppercase',
              }}>
                {p === 'google' ? 'Google' : 'Apple'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
          <Text style={{ color: t.textMuted, fontFamily: 'System', fontSize: 13 }}>
            Novo por aqui?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={{
              color: t.text, fontFamily: 'System', fontSize: 13, fontWeight: '700',
              textDecorationLine: 'underline',
            }}>
              Criar conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FocusField({
  label, value, onChangeText, onBlur, placeholder,
  keyboardType, autoCapitalize, secureTextEntry, error, t,
}: any) {
  const [focused, setFocused] = React.useState(false);
  return (
    <View>
      <View
        style={{
          backgroundColor: t.surface,
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: 12,
          borderWidth: 1.5,
          borderColor: error ? t.danger : focused ? t.accent : t.border,
        }}
      >
        <Text style={{
          fontFamily: 'Menlo', fontSize: 9, letterSpacing: 1.8,
          color: error ? t.danger : focused ? t.accentText : t.textDim,
          textTransform: 'uppercase', fontWeight: '700', marginBottom: 2,
        }}>
          {label}
        </Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={t.textDim}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.(); }}
          style={{
            fontFamily: 'System', fontSize: 16,
            color: t.text,
            paddingVertical: Platform.OS === 'ios' ? 6 : 2,
          }}
        />
      </View>
      {error && (
        <Text style={{ fontFamily: 'System', fontSize: 12, color: t.danger, marginTop: 4, marginLeft: 2 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
