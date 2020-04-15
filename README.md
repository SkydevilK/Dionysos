**Dionysos 프로젝트에서 제가 구현한 부분은 주석으로 @author 처리 했습니다.**


Dionysos - Wine Web Community
============

> #### 와인 초심자도
> #### 와인 매니아도
> #### 와인에 관심이 있는 사람이라면 누구나
> ### 와인으로 이야기하는 커뮤니티 서비스

## TEAM

- #### 김병인 [Back-End] (팀장)
   - Back-End) 사용자 정보 보안과 소셜 로그인과 파일 업로드
   - Front-End) 스마트 서치 페이지 제작
- #### 허대원 [Back-End]
    - 와인 서비스를 위한 DB구축과 rest 서비스
- #### 최예슬 [Front-End]
    - 입구 페이지, 메인 페이지, 와인 상세 페이지 개발, 전체 서비스 Redux 개발
- #### 박재성 [Front-End]
    - 와인 커뮤니티 페이지 설계 및 구현, 리뷰 업로드 Redux 개발
- #### 김주홍 [Front-End]
    - 와인 List 및 Review 페이지, 전체 페이지 CSS 개발


## 개발툴과 기술스택 및 주요기술

- ### Back-End
    - Spring boot
    - JPA
    - Swagger REST API
    - MySQL
    - JWT
    - Java Security
    - AWS EC2 Server
    - SSL Certificate
    - Ngnix

- ### Front-End
    - React
    - Typescript
    - Redux
    - Webpack
    - Material-ui
    - HTML/CSS

## 주요기능

- ### 와인정보
    - 다양한 와인 정보들을 구할 수 있다.
    - 지역, 종류, 샴페인 등 다양한 필터로 검색이 가능하다.
    - 랭킹 서비스로 인기있는 와인을 알 수 있다.
- ### 커뮤니티
    - 원하는 와인에 대한 평가를 등록할 수 있다.
    - 사용자끼리 선호하는 와인을 공유하고 이야기할 수 있다.
    - 사용자가 선호하는 와인을 저장하고 정보를 확인할 수 있다.


## 실행화면 캡쳐
#### 입구 페이지 
![입구](/img/latest/입구페이지.png "Entrance")
    
#### 메인 페이지 로그인 전
![메인](/img/latest/랭킹페이지_로그인전.png "Main1")

#### 메인 페이지 로그인 후
![메인](/img/latest/랭킹페이지_로그인후.png "Main2")
    
#### 와인 리스트 

#### 와인 리스트 이름 검색
![와인](/img/latest/와인리스트_이름검색.png "Wine_by_name")

#### 와인 리스트 음식 검색
![와인](/img/latest/와인리스트_음식검색.png "Wine_by_food")

#### 와인 리스트 상세 검색
![와인](/img/latest/와인리스트_상세검색.png "Wine_by_category")
![와인](/img/latest/와인리스트_상세검색2.png "Wine_by_category2")
    
#### 와인 상세 페이지 
![와인](/img/latest/와인상세페이지.png "WineInfo")

#### 리뷰 작성 화면
![와인](/img/latest/리뷰작성화면.PNG "write review")

#### 리뷰 리스트
![와인](/img/latest/리뷰리스트.png "Review List")

#### 리뷰 상세 페이지
![와인](/img/latest/리뷰상세.png "Review Detail")

#### 스마트 서치
![와인](/img/latest/스마트서치.png "Smart Search")

#### 스마트 서치 결과
![와인](/img/latest/스마트서치_결과.png "Smart Search 결과")
    
#### MY SNS 페이지 
![SNS](/img/latest/MYSNS.png "MY SNS")

#### 친구 SNS 페이지 
![SNS](/img/latest/친구SNS.png "Friend SNS")

#### 로그인 화면
![SNS](/img/latest/로그인화면.png "Login")

#### 회원가입 페이지 
![SNS](/img/latest/회원가입.png "Register")
    
#### DB Diagram
![DB](/img/db.png "db")
    
## 참고자료
- **Basic**
    -  <a href="https://gist.github.com/ihoneymon/652be052a0727ad59601">마크 다운 문법</a>
    -  <a href="https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C">HTTP 상태 코드</a>

- **React & Redux**
    -  <a href="https://reactjs-kr.firebaseapp.com/docs/hello-world.html">React Reference</a>
    -  <a href="https://deminoth.github.io/redux/">Redux Reference</a>
    -  <a href="https://velog.io/@velopert/use-typescript-and-redux-like-a-pro">TypeScript 환경에서 Redux 사용하기</a>

- **JPA**
    - <a href="https://gmlwjd9405.github.io/2019/08/04/what-is-jpa.html">JPA 란?</a>
    - <a href="https://victorydntmd.tistory.com/208">JPA 연관관계 구성</a>
    - <a href="https://nowonbun.tistory.com/548">JPA Entity 관계설정 - cascade, fetch</a>
    - <a href="https://jojoldu.tistory.com/394">JPA + queryDsl을 이용한 간단한 동적 쿼리</a>

- **JWT***
    - <a href="https://velopert.com/2350">JWT 란?</a>
    - <a href="https://goodteacher.tistory.com/98?category=763707">JWT 사용하기</a>
