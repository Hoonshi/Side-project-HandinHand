import { useState } from 'react'
import * as S from './HomeMain.styles'

const Home = () => {
  const NOW_PLAYING = [
    { id: 1, name: '조명가게1', rating: '3.5' },
    { id: 2, name: '조명가게2', rating: '3.5' },
    { id: 3, name: '조명가게3', rating: '3.5' },
    { id: 4, name: '조명가게4', rating: '3.5' },
    { id: 5, name: '조명가게5', rating: '3.5' },
    { id: 6, name: '조명가게6', rating: '3.5' },
    { id: 7, name: '조명가게7', rating: '3.5' },
    { id: 8, name: '조명가게8', rating: '3.5' },
    { id: 9, name: '조명가게9', rating: '3.5' },
    { id: 10, name: '조명가게10', rating: '3.5' },
    { id: 11, name: '조명가게11', rating: '3.5' },
    { id: 12, name: '조명가게12', rating: '3.5' }
  ]

  const POPULAR = [
    { id: 1, name: '야채가게1', rating: '3.5' },
    { id: 2, name: '야채가게2', rating: '3.5' },
    { id: 3, name: '야채가게3', rating: '3.5' },
    { id: 4, name: '야채가게4', rating: '3.5' },
    { id: 5, name: '야채가게5', rating: '3.5' },
    { id: 6, name: '야채가게6', rating: '3.5' },
    { id: 7, name: '야채가게7', rating: '3.5' },
    { id: 8, name: '야채가게8', rating: '3.5' },
    { id: 9, name: '야채가게9', rating: '3.5' },
    { id: 10, name: '야채가게10', rating: '3.5' },
    { id: 11, name: '야채가게11', rating: '3.5' },
    { id: 12, name: '야채가게12', rating: '3.5' }
  ]

  const TOP_RATED = [
    {
      id: 1,
      name: '행복가게1',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 2,
      name: '행복가게2',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 3,
      name: '행복가게3',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 4,
      name: '행복가게4',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 5,
      name: '행복가게5',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 6,
      name: '행복가게6',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 7,
      name: '행복가게7',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 8,
      name: '행복가게8',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 9,
      name: '행복가게9',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 10,
      name: '행복가게10',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 11,
      name: '행복가게11',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    },
    {
      id: 12,
      name: '행복가게12',
      rating: '3.5',
      desc: '예매율 53% 누적 관객 2.5만명'
    }
  ]

  const [nowPlayingIndex, setNowPlayingIndex] = useState(0)
  const [popularIndex, setPopularIndex] = useState(0)
  const [topRatedIndex, setTopRatedIndex] = useState(0)
  const [isFadingNowPlaying, setIsFadingNowPlaying] = useState(false)
  const [isFadingTopRated, setIsFadingTopRated] = useState(false)
  const [isFadingPopular, setIsFadingPopular] = useState(false)

  const showMoreItems = (category: string) => {
    if (category === 'nowPlaying') {
      setIsFadingNowPlaying(true)
      setTimeout(() => {
        setNowPlayingIndex(nowPlayingIndex + 5)
        setIsFadingNowPlaying(false)
      }, 500)
    } else if (category === 'topRated') {
      setIsFadingTopRated(true)
      setTimeout(() => {
        setTopRatedIndex(topRatedIndex + 5)
        setIsFadingTopRated(false)
      }, 500)
    } else if (category === 'popular') {
      setIsFadingPopular(true)
      setTimeout(() => {
        setPopularIndex(popularIndex + 5)
        setIsFadingPopular(false)
      }, 500)
    }
  }

  const showLessItems = (category: string) => {
    if (category === 'nowPlaying') {
      setIsFadingNowPlaying(true)
      setTimeout(() => {
        setNowPlayingIndex(nowPlayingIndex - 5)
        setIsFadingNowPlaying(false)
      }, 500)
    } else if (category === 'topRated') {
      setIsFadingTopRated(true)
      setTimeout(() => {
        setTopRatedIndex(topRatedIndex - 5)
        setIsFadingTopRated(false)
      }, 500)
    } else if (category === 'popular') {
      setIsFadingPopular(true)
      setTimeout(() => {
        setPopularIndex(popularIndex - 5)
        setIsFadingPopular(false)
      }, 500)
    }
  }

  return (
    <S.HomeMainWrapper>
      <S.HomeMainContainer>
        <S.HomeTitle>Now Playing</S.HomeTitle>
        <S.HomeRow className={isFadingNowPlaying ? 'fade-out' : ''}>
          {nowPlayingIndex > 0 && (
            <S.FaArrowAltCircleLeft
              onClick={() => showLessItems('nowPlaying')}
            />
          )}
          {NOW_PLAYING.slice(nowPlayingIndex, nowPlayingIndex + 5).map(item => (
            <S.HomeColumn
              key={item.id}
              className={isFadingNowPlaying ? 'fade-in' : ''}>
              <S.HomePoster></S.HomePoster>
              <S.HomeName>{item.name}</S.HomeName>
              <S.HomeRating>평점 ★{item.rating}</S.HomeRating>
            </S.HomeColumn>
          ))}
          {nowPlayingIndex + 5 < NOW_PLAYING.length && (
            <S.FaArrowAltCircleRight
              onClick={() => showMoreItems('nowPlaying')}
            />
          )}
        </S.HomeRow>

        <S.HomeTitle>Top Rated</S.HomeTitle>
        <S.HomeRow className={isFadingTopRated ? 'fade-out' : ''}>
          {topRatedIndex > 0 && (
            <S.FaArrowAltCircleLeft onClick={() => showLessItems('topRated')} />
          )}
          {TOP_RATED.slice(topRatedIndex, topRatedIndex + 5).map(item => (
            <S.HomeColumn
              key={item.id}
              className={isFadingTopRated ? 'fade-in' : ''}>
              <S.HomePoster></S.HomePoster>
              <S.HomeName>{item.name}</S.HomeName>
              <S.HomeRating>평점 {item.rating}</S.HomeRating>
              <S.HomeDescription>{item.desc}</S.HomeDescription>
            </S.HomeColumn>
          ))}
          {topRatedIndex + 5 < TOP_RATED.length && (
            <S.FaArrowAltCircleRight
              onClick={() => showMoreItems('topRated')}
            />
          )}
        </S.HomeRow>

        <S.HomeTitle>Popular</S.HomeTitle>
        <S.HomeRow className={isFadingPopular ? 'fade-out' : ''}>
          {popularIndex > 0 && (
            <S.FaArrowAltCircleLeft onClick={() => showLessItems('popular')} />
          )}
          {POPULAR.slice(popularIndex, popularIndex + 5).map(item => (
            <S.HomeColumn
              key={item.id}
              className={isFadingPopular ? 'fade-in' : ''}>
              <S.HomePoster></S.HomePoster>
              <S.HomeName>{item.name}</S.HomeName>
              <S.HomeRating>평점 ★{item.rating}</S.HomeRating>
            </S.HomeColumn>
          ))}
          {popularIndex + 5 < POPULAR.length && (
            <S.FaArrowAltCircleRight onClick={() => showMoreItems('popular')} />
          )}
        </S.HomeRow>
      </S.HomeMainContainer>
    </S.HomeMainWrapper>
  )
}

export default Home
