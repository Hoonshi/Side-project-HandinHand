import StarRating from '@/components/common-ui/star-rating/StarRating'
import * as S from './MovieDetails.styled'
import { Button, Input, Profile } from '@/components'

export default function MovieDetails() {
  return (
    <S.Container>
      <Header $backgroundColor="black" />
      {/* 첫번째 박스 */}
      <S.MovieHeaderContainer>
        <S.MovieInfo>
          <S.MovieTitle>영화 제목</S.MovieTitle>
          <S.InfoBox>
            <S.Info>연령</S.Info>
            <S.Info>4.1</S.Info>
            <S.Info>2016</S.Info>
            <S.Info>2시간7분</S.Info>
            <S.Info>코메디</S.Info>
            <S.Info>피아노</S.Info>
          </S.InfoBox>

          <S.MovieDescription>
            꿈을 꾸는 사람들을 위한 별들의 도시 ‘라라랜드’. 재즈 피아니스트
            ‘세바스찬’(라이언 고슬링)과 배우 지망생 ‘미아’(엠마 스톤), 인생에서
            가장 빛나는 순간 만난 두 사람은 미완성인 서로의 무대를 만들어가기
            시작한다.
          </S.MovieDescription>
          <StarRating size={48} />
        </S.MovieInfo>

        <S.MoviePoster
          src="https://via.placeholder.com/300x450"
          alt="Movie Poster"
        />
      </S.MovieHeaderContainer>

      {/* 두번째 박스 */}
      <S.SeparatingBox>
        <S.ShowTypes>콘텐츠 정보</S.ShowTypes>
        <S.ShowTypes>관련 콘텐츠</S.ShowTypes>
      </S.SeparatingBox>

      <S.MovieActorContainer>
        <S.ListsTitle>감독/출연</S.ListsTitle>
        <S.ActorBox>
          <S.ActorList>가</S.ActorList>
          <S.ActorList>나</S.ActorList>
          <S.ActorList>다</S.ActorList>
          <S.ActorList>라</S.ActorList>
          <S.ActorList>마</S.ActorList>
        </S.ActorBox>
      </S.MovieActorContainer>

      {/* 세번째 박스 */}
      <S.UserRateContainer>
        <S.UserRateTitle>사용자 평</S.UserRateTitle>

        <S.UserCommentContainer>
          <Profile onClick={profile} />
          <Input
            type="textarea"
            value=""
            onChange={profile}
            width="100%"
            placeholder="의견을 남겨주세요"
          />
          <Button padding="36px">등록</Button>
        </S.UserCommentContainer>
      </S.UserRateContainer>
      <S.CommentContainer>
        <Profile onClick={profile} />
        <S.CommentBox>
          <div>전영훈</div>
          <div>재미있는 영화</div>
        </S.CommentBox>
      </S.CommentContainer>
    </S.Container>
  )
}

function profile() {
  console.log('profile')
}
