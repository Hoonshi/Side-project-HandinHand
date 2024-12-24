import { z } from 'zod'
import { baseUserSchema } from './baseUserSchema'

export const signUpSchema = baseUserSchema.refine(
  data => data.password === data.confirmPassword,
  {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword']
  }
)

export type TSignUpFormValues = z.infer<typeof signUpSchema>
