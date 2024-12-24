import { z } from 'zod'
import {
  NICKNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH
} from '@/constants/user'

export const baseUserSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: '닉네임을 입력해주세요' })
    .max(NICKNAME_MAX_LENGTH, {
      message: `닉네임은 ${NICKNAME_MAX_LENGTH}자 이하로 입력해주세요`
    }),
  email: z
    .string()
    .min(1, { message: '이메일을 입력해주세요' })
    .max(EMAIL_MAX_LENGTH, {
      message: `이메일은 ${EMAIL_MAX_LENGTH}자 이하로 입력해주세요`
    })
    .email({ message: '유효한 이메일을 입력해주세요' }),
  password: z
    .string()
    .min(1, { message: '비밀번호를 입력해주세요' })
    .min(
      PASSWORD_MIN_LENGTH,
      `비밀번호는 ${PASSWORD_MIN_LENGTH}자리 이상 입력해주세요`
    )
    .max(PASSWORD_MAX_LENGTH, {
      message: `비밀번호는 ${PASSWORD_MAX_LENGTH}자 이하로 입력해주세요`
    }),
  confirmPassword: z
    .string()
    .min(1, { message: '비밀번호를 한 번 더 입력해주세요' })
})
