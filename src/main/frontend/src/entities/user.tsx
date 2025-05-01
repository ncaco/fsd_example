import { BaseResponse } from "./common";

/** 사용자 정보 타입 */
export interface User extends BaseResponse {
    sn: number;
    nm: string;
    eml: string;
    pswd: string;
    token: string;
    refreshToken: string;
}