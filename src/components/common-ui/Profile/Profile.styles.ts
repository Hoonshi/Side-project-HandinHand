import { ProfileButtonSize } from '@/types/profile'
import styled from 'styled-components'

export const ProfileButtonWrapper = styled.button<{ size?: ProfileButtonSize }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: ${({ size }) => {
    if (size === 'small') return '40px'
    if (size === 'medium') return '65px'
    if (size === 'large') return '200px'
    return size || '65px'
  }};
  height: ${({ size }) => {
    if (size === 'small') return '40px'
    if (size === 'medium') return '65px'
    if (size === 'large') return '200px'
    return size || '65px'
  }};
  border-radius: var(--border-radius-xlarge);
  overflow: hidden;
  &:hover {
    filter: brightness(1.1);
  }
`

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
