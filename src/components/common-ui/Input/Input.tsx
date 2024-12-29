import * as S from './Input.styles'
import { InputProps } from '@/types/input'

/*
사용예시 - PR 예시 화면 참고해주세요
      <InputField
        placeholder="이메일(example@email.com)"
        value={email}
        onChange={e => setEmail(e.target.value)}
        //type="textarea" (textarea일때 명시)
        //(fontSize, width 커스텀 가능)
      />
*/

const Input = ({
  placeholder,
  type = 'text',
  value,
  onChange,
  width,
  fontSize,
  error = false
}: InputProps) => {
  return (
    <>
      {type === 'textarea' ? (
        <S.StyledTextarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          width={width}
          fontSize={fontSize}
          error={error}
        />
      ) : (
        <S.StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          width={width}
          fontSize={fontSize}
          error={error}
        />
      )}
    </>
  )
}

export default Input