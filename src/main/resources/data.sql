-- 기본 메뉴 데이터 추가
INSERT INTO TB_MENU (
    MENU_SN,            /* 메뉴 일련번호 */
    SITE_ID,            /* 사이트 아이디 */
    MENU_VER,           /* 메뉴 버전 */
    MENU_UP_SN,         /* 메뉴 상위 일련번호 */
    MENU_NM,            /* 메뉴명 */
    MENU_SE_CD,         /* 메뉴 구분 코드 */
    LNKG_URL,           /* 링크 URL */
    SORT_SN,            /* 정렬 일련번호 */
    USE_YN,             /* 사용 여부 */
    EXPSR_YN,           /* 노출 여부 */
    ICON,               /* 아이콘 */
    MENU_POS_CD,        /* 위치 코드 */
    MOBL_USE_YN,        /* 모바일 사용 여부 */
    MOBL_POS_CD,        /* 모바일 위치 코드 */
    RGTR_ID,            /* 등록자 아이디 */
    REG_DT              /* 등록 일시 */
) VALUES 
-- 상단 메뉴 & 모바일 메뉴 (1번 메뉴)
(1, 'a', 1.0, 0, '대시보드', 'C004', '/a', 1, 'Y', 'Y', 'dashboard', 'C002', 'Y', 'C001', 'admin', CURRENT_TIMESTAMP)
,(2, 'a', 1.0, 0, '사용자 관리', 'C004', '/a/user', 2, 'Y', 'Y', 'user', 'C002', 'N', NULL, 'admin', CURRENT_TIMESTAMP)
,(4, 'a', 1.0, 2, '사용자 목록', 'C004', '/a/user/list', 1, 'Y', 'Y', 'user-list', 'C002', 'N', NULL, 'admin', CURRENT_TIMESTAMP)
,(5, 'a', 1.0, 2, '권한 관리', 'C004', '/a/user/auth', 2, 'Y', 'Y', 'shield', 'C002', 'N', NULL, 'admin', CURRENT_TIMESTAMP)
,(3, 'a', 1.0, 0, '메뉴 관리', 'C004', '/a/menu', 3, 'Y', 'Y', 'menu', 'C002', 'N', NULL, 'admin', CURRENT_TIMESTAMP)
,(6, 'a', 1.0, 3, '메뉴 목록', 'C004', '/a/menu/list', 1, 'Y', 'Y', 'menu-list', 'C002', 'N', NULL, 'admin', CURRENT_TIMESTAMP)
,(7, 'a', 1.0, 3, '메뉴 설정', 'C004', '/a/menu/setting', 2, 'Y', 'Y', 'setting', 'C002', 'N', NULL, 'admin', CURRENT_TIMESTAMP)
,(8, 'a', 1.0, 0, '설정', 'C004', '/a/setting', 1, 'Y', 'Y', 'setting', 'C004', 'N', NULL, 'admin', CURRENT_TIMESTAMP)
,(9, 'a', 1.0, 0, '로그아웃', 'C004', '/a/logout', 2, 'Y', 'Y', 'logout', 'C004', 'N', NULL, 'admin', CURRENT_TIMESTAMP)
,(10, 'a', 1.0, 0, '검색', 'C004', '/a/search', 1, 'Y', 'Y', 'search', NULL, 'Y', 'C002', 'admin', CURRENT_TIMESTAMP)
,(11, 'a', 1.0, 0, '즐겨찾기', 'C004', '/a/favorite', 1, 'Y', 'Y', 'favorite', NULL, 'Y', 'C003', 'admin', CURRENT_TIMESTAMP)
,(12, 'a', 1.0, 0, '마이페이지', 'C004', '/a/mypage', 1, 'Y', 'Y', 'mypage', NULL, 'Y', 'C004', 'admin', CURRENT_TIMESTAMP)
; 


-- 공통코드(CmmCd) 데이터 입력
INSERT INTO TB_CMM_CD (
    UP_CMM_CD,      -- 상위공통코드
    CMM_CD,         -- 공통코드
    CMM_CD_NM,      -- 공통코드명
    SORT_SN,        -- 정렬순서
    USE_YN,         -- 사용여부
    ABBR_NM,        -- 약어명
    USE_BGNG_YMD,   -- 사용시작일시
    USE_END_YMD,    -- 사용종료일시
    RGTR_ID,        -- 등록자ID
    REG_DT,         -- 등록일시
    MDFR_ID,        -- 수정자ID
    MDFCN_DT        -- 수정일시
) VALUES
('ROOT', 'U001', '메뉴구분코드', 1, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL),
('U001', 'C000', '메뉴목록', 1, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL),
('U001', 'C001', '프로그램', 2, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL),
('U001', 'C002', '게시판', 3, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL),
('U001', 'C003', '콘텐츠', 4, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL),
('U001', 'C004', '링크', 5, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('ROOT', 'U002', '메뉴위치코드', 1, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('U002', 'C001', 'TOP', 1, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('U002', 'C002', 'LEFT', 2, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('U002', 'C003', 'RIGHT', 3, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('U002', 'C004', 'BOTTOM', 4, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('ROOT', 'U003', '모바일위치코드', 1, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('U003', 'C001', '첫번째 메뉴', 1, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('U003', 'C002', '두번째 메뉴', 2, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('U003', 'C003', '세번째 메뉴', 3, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
,('U003', 'C004', '네번째 메뉴', 4, 'Y', NULL, NULL, NULL, 'admin', CURRENT_TIMESTAMP, NULL, NULL)
;
