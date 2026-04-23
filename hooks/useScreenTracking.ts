import { useEffect } from 'react';
import { logger } from '../lib/logger';

/**
 * Registra a visualização de uma tela para analytics.
 * Abstrai o provider de analytics (PostHog, Amplitude, etc.) por trás
 * de uma interface simples — troque a implementação sem tocar nas telas.
 *
 * @example
 * useScreenTracking('Feed');
 * useScreenTracking('ChallengeDetails', { challengeId: '123' });
 */
export function useScreenTracking(
  screenName: string,
  properties?: Record<string, unknown>
) {
  useEffect(() => {
    // ── Analytics abstraction ────────────────────────────────────────────────
    // Swap this block for your real analytics provider:
    //   PostHog:   posthog.screen(screenName, properties)
    //   Amplitude: amplitude.logEvent(`Screen: ${screenName}`, properties)
    //   Firebase:  analytics().logScreenView({ screen_name: screenName })

    logger.info(`Screen viewed: ${screenName}`, properties, 'Analytics');

    // Example: uncomment to wire up PostHog
    // import posthog from 'posthog-react-native';
    // posthog.screen(screenName, properties);
  }, [screenName]);
}
