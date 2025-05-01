import { BaseResponse } from "./common";

/** 메뉴 정보 타입 */
export interface Menu extends BaseResponse {
    sn: number;
    siteId: string;
    menuName: string;
    menuUrl: string;
    menuIcon: string;
    menuLevel: number;
    menuOrder: number;
    isExternalUrl: boolean;
    isActive: boolean;
    isVisible: boolean;
    parentMenu: Menu;
    childMenus: Menu[];
}

