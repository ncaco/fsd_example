-- 기본 메뉴 데이터 추가
INSERT INTO TB_MENU (
    MENU_SN,            /* 메뉴 일련번호 */
    SITE_ID,            /* 사이트 아이디 */
    MENU_NAME,          /* 메뉴 이름 */
    MENU_URL,           /* 메뉴 주소 */
    MENU_ICON,          /* 메뉴 아이콘 */
    MENU_LEVEL,         /* 메뉴 레벨 */
    MENU_ORDER,         /* 메뉴 순서 */
    IS_EXTERNAL_URL,    /* 외부 링크 여부 */
    IS_ACTIVE,          /* 활성화 여부 */
    IS_VISIBLE,         /* 보여짐 여부 */
    PARENT_MENU_ID      /* 부모 메뉴 아이디 */
) VALUES 
-- 1단계 메뉴
(2, 'a', '사용자 관리', '/a/user', 'user', 1, 1, FALSE, TRUE, TRUE, NULL),
(3, 'a', '메뉴 관리', '/a/menu', 'menu', 1, 2, FALSE, TRUE, TRUE, NULL); 