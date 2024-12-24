import styled, { keyframes } from 'styled-components'
import {
  FaArrowAltCircleLeft as LeftIcon,
  FaArrowAltCircleRight as RightIcon
} from 'react-icons/fa'

/* 애니메이션 */
/* 라이브러리가 정해지면 수정 예정입니다*/
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

export const HomeMainWrapper = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--color-white);
  color: var(--color-black);
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const HomeMainContainer = styled.div`
  width: 70%;
  position: relative;
`

export const HomeTitle = styled.div`
  font-size: var(--font-large);
  font-weight: 700;
  margin-top: 4vh;
  margin-bottom: 1vh;
`

export const HomePoster = styled.div`
  width: 90%;
  height: 30vh;
  border: 1px solid var(--color-black);
  border-radius: var(--border-radius-medium);
  margin-bottom: 1vh;
`

export const HomeName = styled.div`
  margin-bottom: 1vh;
`

export const HomeRating = styled.div`
  font-size: 13px;
  color: var(--color-gray);
  font-weight: 400;
`

export const HomeDescription = styled.div`
  font-size: 13px;
  color: var(--color-gray);
  font-weight: 400;
`

export const HomeRow = styled.div`
  display: flex;
  flex-wrap: row;
  position: relative;
`

export const HomeColumn = styled.div`
  flex: 1 1 20%;
  max-width: 20%;

  &.fade-in {
    animation: ${fadeIn} 0.5s ease-in forwards;
  }

  &.fade-out {
    animation: ${fadeOut} 0.5s ease-in forwards;
  }
`

export const FaArrowAltCircleLeft = styled(LeftIcon)`
  cursor: pointer;
  position: absolute;
  left: 0.5%;
  top: 40%;
  font-size: var(--font-large);
`

export const FaArrowAltCircleRight = styled(RightIcon)`
  cursor: pointer;
  position: absolute;
  right: 2.5%;
  top: 40%;
  font-size: var(--font-large);
`
