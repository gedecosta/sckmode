import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { Session, User, Provider } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

interface AuthState {
  user: User | null;
  session: Session | null;
  initialized: boolean;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: Provider) => Promise<{ error: Error | null; url?: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  initialized: false,

  setSession: (session) =>
    set({ session, user: session?.user || null, initialized: true }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },

  signInWithOAuth: async (provider) => {
    try {
      const redirectTo = makeRedirectUri({
        scheme: 'athledia', // Match scheme in app.json
        path: '(tabs)',
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          skipBrowserRedirect: true, // We must launch the browser manually in React Native
        },
      });

      if (error) throw error;

      if (data?.url) {
        const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
        
        if (res.type === 'success') {
          // Parse the URL to pass tokens to Supabase if auto-handling fails
          const { url } = res;
          // In most Supabase + Expo setups, the onAuthStateChange listener captures the deep link automatically
          return { error: null, url };
        } else {
          return { error: new Error('Login cancelado pelo usuário.') };
        }
      }
      return { error: new Error('Não foi possível iniciar a sessão.') };
    } catch (err: any) {
      return { error: err };
    }
  },
}));

// Initialize the store from Supabase Auth listener
supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setSession(session);
});
