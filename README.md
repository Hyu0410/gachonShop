# gachonShop
Node.js 사용해 쇼핑몰 홈페이지 만들기

# 테이블 정보

### person 테이블
 사용자 정보 저장(PRIMARY KEY: loginid)

### merchandise 테이블
 상품 정보 저장(PRIMARY KEY: mer_id)

### code_tbl 테이블
 상품 분류 정보 저장(PRIMARY KEY: main_id, sub_id)

### boardtype 테이블
 게시판 종류 정보 저장(PRIMARY KEY: type_id)

### board 테이블
 게시글 정보 저장(PRIMARY KEY: board_id)
 1. 로그인하지 않은 사람과 경영자(class: 00)는 게시판 열람만 가능
 2. 일반 사용자(class: 02)는 모든 게시물 열람 가능 / 본인이 작성한 게시물만 수정, 삭제 가능
 3. 일반 사용자(class: 02)는 write_YN 필드가 Y인 게시판에 대해서만 게시물을 작성 가능
 4. 관리자(class: 01)는 모든 게시물에 대해 열람, 수정, 삭제 가능
 5. 모든 게시판에는 paging 기능 존재

