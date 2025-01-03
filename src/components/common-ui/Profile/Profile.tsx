import * as S from './Profile.styles'
import { ProfileButtonProps } from '@/types/profile'
import { DEFAULT_PROFILE_PATH } from '@/constants/user'

/* 사용예시 
      <Profile
        //imageUrl={} (넣을 이미지가 있을때, 명시안해주면 기본프로필)
        //altText="User Profile"
        onClick={handleProfileClick}
        size="large"
      />
      <Profile 
        onClick={handleProfileClick}
        size="100px" // custom size
      />
      - 마이페이지 프로필: large
      - 댓글 작성 프로필: medium
      - 댓글 조회 프로필: small   이외에 커스텀 가능
*/

export const Profile = ({
  imageUrl,
  altText = 'Profile',
  onClick,
  size = 'medium'
}: ProfileButtonProps) => {
  return (
    <S.ProfileButtonWrapper
      onClick={onClick}
      size={size}>
      <S.ProfileImage
        src={imageUrl ?? DEFAULT_PROFILE_PATH}
        alt={altText}
        onError={e => {
          e.currentTarget.src = DEFAULT_PROFILE_PATH // 폴백 이미지
        }}
      />
    </S.ProfileButtonWrapper>
  )
}
