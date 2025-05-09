import { BaseResponse } from "./common";

/** 공통코드 타입 */
export interface CmmCd extends BaseResponse {
    upCmmCd: string;        // 상위공통코드
    cmmCd: string;          // 공통코드
    cmmCdNm: string;        // 공통코드명
    sortSn: number;         // 정렬순서
    useYn: string;          // 사용여부(Y/N)
    abbrNm?: string;        // 약어명
    useBgngYmd?: string;    // 사용시작일시
    useEndYmd?: string;     // 사용종료일시
    rgtrId: string;         // 등록자아이디
    regDt: string;          // 등록일시
    mdfrId?: string;        // 수정자아이디
    mdfcnDt?: string;       // 수정일시
}

/** 공통코드 그룹 맵 타입 */
export interface CmmCdGroupMap {
    [upCmmCd: string]: CmmCd[];
} 