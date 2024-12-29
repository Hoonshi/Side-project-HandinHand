import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FaRegStar } from 'react-icons/fa'
import { SlDrawer } from 'react-icons/sl'
import {
  HeaderProps,
  HeaderLiProps,
  HeaderLinkProps,
  HeaderIconProps
} from '@/types/commonUi'

export const HeaderContainer = styled.header<HeaderProps>`
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor || 'transparent'};
  padding: var(--space-medium);
  display: flex;
  justify-content: space-between;
  gap: var(--space-large); // 최소 gap
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  transition: all 0.3s ease;
`

export const LogoWrapper = styled.div`
  @media (width <= 576px) {
    display: none;
  }
`

export const Logo = styled.img`
  aspect-ratio: 1;
  width: clamp(0px, 5vw, 50px);
  height: auto;
  object-fit: contain;
`

// 기본 링크
export const BaseLink = styled(NavLink)`
  color: inherit;
`
// 로그인 안됐을때 막을 링크
export const RestrictedLink = styled(BaseLink)<HeaderLinkProps>`
  cursor: ${({ $signedUp = false }) => ($signedUp ? 'pointer' : 'not-allowed')};
  pointer-events: ${({ $signedUp = false }) => ($signedUp ? 'auto' : 'none')};
`

// 홈, 영화, 드라마 nav
export const NavUL = styled.ul`
  flex: 1;
  display: flex;
  gap: var(--space-medium);
  align-items: center;
`

export const Li = styled.li<HeaderLiProps>`
  font-size: var(--font-large);
  color: ${({ $active }) =>
    $active ? 'var(--color-white)' : 'var(--color-light-gray)'};

  &:hover {
    color: ${({ $signedUp }) =>
      $signedUp ? 'var(--color-white)' : 'var(--color-light-gray)'};
  }

  @media (width <= 576px) {
    font-size: var(--font-medium);
  }
`

// 유저 관련 nav
export const AuthContainer = styled.div`
  display: flex;
  gap: var(--space-medium);
  align-items: center;
`

const iconStyles = css<HeaderIconProps>`
  font-size: var(--font-large);
  color: ${({ $active }) =>
    $active ? 'var(--color-white)' : 'var(--color-light-gray)'};
  cursor: pointer;

  &:hover {
    color: var(--color-white);
  }

  @media (width <= 576px) {
    font-size: var(--font-medium);
  }
`

export const FavoriteIcon = styled(FaRegStar)<HeaderIconProps>`
  ${iconStyles}
`

export const StorageIcon = styled(SlDrawer)<HeaderIconProps>`
  ${iconStyles}
`

// 컴포넌트로 변경 후 삭제해야함
export const ProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`
