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


