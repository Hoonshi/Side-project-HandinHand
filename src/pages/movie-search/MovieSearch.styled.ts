import styled from 'styled-components'

export const Container = styled.div`
  width: 70%;
  margin: var(--space-medium) auto;
`

export const MainContent = styled.div`
  padding: var(--space-xlarge);
  border-bottom: 1px solid var(--color-dark-gray);
`

export const SectionTitle = styled.h2`
  font-size: 2.25rem; // 해당 사이즈의 경우, 디자인토큰 사이즈에선 적절한 사이즈가 개별 조정.
  margin-bottom: var(--space-small);
  color: var(--color-white);
`

export const ResultBox = styled.div`
  display: flex;
  padding: var(--space-large) var(--space-large) var(--space-large) 0;
  gap: var(--space-large);
`

export const MoviePoster = styled.img`
  max-width: 150px;
  height: auto;
  object-fit: cover;
  aspect-ratio: 2/3;
`

export const MovieDetailBox = styled.div`
  padding: var(--space-medium) var(--space-xlarge) var(--space-xlarge)
    var(--space-medium);
`

export const MovieTitle = styled.div`
  color: white;
  margin-bottom: var(--space-medium);
`

export const MovieDate = styled.span`
  color: var(--color-dark-gray);
`

export const MovieInfo = styled.span`
  color: var(--color-dark-gray);
  margin-left: var(--space-medium);
`
