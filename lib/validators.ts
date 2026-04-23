import { z } from 'zod';

// ── XSS prevention helper ────────────────────────────────────────────────────
const XSS_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /<[^>]+on\w+\s*=/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /data:text\/html/gi,
];

const hasXSS = (val: string) => XSS_PATTERNS.some((pattern) => pattern.test(val));

const noXSS = (field: string) =>
  z.string().refine((val) => !hasXSS(val), {
    message: `${field} contém conteúdo inválido.`,
  });

// ── Comment schema ───────────────────────────────────────────────────────────
export const commentSchema = z.object({
  content: noXSS('Comentário')
    .min(1, 'Comentário não pode ser vazio.')
    .max(500, 'Comentário deve ter no máximo 500 caracteres.'),
});

export type CommentInput = z.infer<typeof commentSchema>;

// ── Activity create schema ────────────────────────────────────────────────────
export const activityCreateSchema = z.object({
  type: z.enum(['run', 'cycling', 'swim', 'hiking', 'yoga', 'crossfit', 'other'], {
    errorMap: () => ({ message: 'Tipo de atividade inválido.' }),
  }),
  distanceKm: z.number().min(0, 'Distância não pode ser negativa.').max(1000),
  durationSeconds: z.number().min(1, 'Duração inválida.').max(86400),
  notes: noXSS('Notas').max(1000).optional(),
  isPublic: z.boolean().default(true),
});

export type ActivityCreateInput = z.infer<typeof activityCreateSchema>;

// ── URL schema ────────────────────────────────────────────────────────────────
export const urlSchema = z.string().url('URL inválida.').refine(
  (val) => val.startsWith('https://'),
  'Apenas URLs HTTPS são permitidas.'
);

// ── Challenge create schema ──────────────────────────────────────────────────
export const createChallengeSchema = z.object({
  title: noXSS('Título')
    .min(3, 'Título deve ter pelo menos 3 caracteres.')
    .max(80, 'Título deve ter no máximo 80 caracteres.'),
  description: noXSS('Descrição')
    .min(10, 'Descrição deve ter pelo menos 10 caracteres.')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres.'),
  difficulty: z.enum(['easy', 'medium', 'hard', 'extreme'], {
    errorMap: () => ({ message: 'Dificuldade inválida.' }),
  }),
  isPublic: z.boolean().default(true),
  steps: z
    .array(
      z.object({
        type: z.enum(['run', 'pushups', 'pullups', 'cycling', 'swim', 'other']),
        targetValue: z.number().min(1).max(10000),
        targetUnit: z.string().min(1).max(20),
      })
    )
    .min(1, 'Adicione pelo menos uma etapa.'),
});

export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;

// ── Profile update schema ────────────────────────────────────────────────────
export const profileUpdateSchema = z.object({
  full_name: noXSS('Nome')
    .min(2, 'Nome deve ter pelo menos 2 caracteres.')
    .max(60)
    .optional(),
  bio: noXSS('Bio').max(300, 'Bio deve ter no máximo 300 caracteres.').optional(),
  location: noXSS('Localização').max(80).optional(),
  website: urlSchema.optional().or(z.literal('')),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

// ── Auth schemas ─────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.string().email('E-mail inválido.'),
    password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres.'),
    confirmPassword: z.string(),
    full_name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres.').max(60),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
