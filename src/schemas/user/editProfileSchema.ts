import { z } from 'zod'
import { baseUserSchema } from './baseUserSchema'

export const editProfileSchema = z
  .object({
    nickname: baseUserSchema.shape.nickname.optional(),
    password: baseUserSchema.shape.password.optional(),
    confirmPassword: baseUserSchema.shape.confirmPassword.optional(),
    profilePicturePath: z.string().optional()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword']
  })

export type TEditProfileFormValues = z.infer<typeof editProfileSchema>

export interface TEditProfileRequestValues {
  password?: string
  data: {
    nickname?: string
    profile_picture_path?: string | undefined
  }
}
