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
    RGTR_ID,            /* 등록자 아이디 */
    REG_DT              /* 등록 일시 */
) VALUES 
-- 1단계 메뉴 (최상위 메뉴)
(1, 'a', 1.0, 0, '대시보드', 'C004', '/a', 1, 'Y', 'Y', 'dashboard', 'C001', 'admin', CURRENT_TIMESTAMP),
(2, 'a', 1.0, 0, '사용자 관리', 'C004', '/a/user', 2, 'Y', 'Y', 'user', 'C001', 'admin', CURRENT_TIMESTAMP),
(3, 'a', 1.0, 0, '메뉴 관리', 'C004', '/a/menu', 3, 'Y', 'Y', 'menu', 'C001', 'admin', CURRENT_TIMESTAMP),

-- 2단계 메뉴 (사용자 관리 하위)
(4, 'a', 1.0, 2, '사용자 목록', 'C004', '/a/user/list', 1, 'Y', 'Y', 'user-list', 'C002', 'admin', CURRENT_TIMESTAMP),
(5, 'a', 1.0, 2, '권한 관리', 'C004', '/a/user/auth', 2, 'Y', 'Y', 'shield', 'C002', 'admin', CURRENT_TIMESTAMP),

-- 2단계 메뉴 (메뉴 관리 하위)
(6, 'a', 1.0, 3, '메뉴 목록', 'C004', '/a/menu/list', 1, 'Y', 'Y', 'menu-list', 'C002', 'admin', CURRENT_TIMESTAMP),
(7, 'a', 1.0, 3, '메뉴 설정', 'C004', '/a/menu/setting', 2, 'Y', 'Y', 'setting', 'admin', CURRENT_TIMESTAMP); 