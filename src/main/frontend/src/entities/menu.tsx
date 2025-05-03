import { BaseResponse } from "./common";

/** 메뉴 정보 타입 */
export interface Menu extends BaseResponse {
    menuSn: number;                 // 메뉴일련번호
    siteId: string;                 // 사이트아이디
    menuVer?: number;               // 메뉴버전
    menuUpSn: number;               // 메뉴상위일련번호
    menuNm: string;                 // 메뉴명
    menuSeCd: string;               // 메뉴구분코드
    menuHelpCn?: string;            // 메뉴도움말내용
    prgrmId?: string;               // 프로그램아이디
    bbsId?: string;                 // 게시판아이디
    contsId?: string;               // 콘텐츠아이디
    lnkgUrl?: string;               // 링크URL
    sortSn: number;                 // 정렬일련번호
    useYn: string;                  // 사용여부(Y/N)
    expsrYn: string;                // 노출여부(Y/N)
    memoCn?: string;                // 메모내용
    icon?: string;                  // 아이콘
    picUseYn?: string;              // 담당자사용여부
    dgstfnUseYn?: string;           // 만족도사용여부
    ognzSn?: number;                // 조직일련번호
    filterSeCdList?: string;        // 필터구분코드목록
    menuPosCd: string;              // 메뉴위치코드
    moblUseYn: string;              // 모바일사용여부
    moblPosCd: string;              // 모바일위치코드
    rgtrId: string;                 // 등록자아이디
    regDt: string;                  // 등록일시
    mdfrId?: string;                // 수정자아이디
    mdfcnDt?: string;               // 수정일시
    parentMenu?: Menu;              // 부모 메뉴
    childMenus: Menu[];             // 자식 메뉴 목록
}

