import apiInstance from '@/shared/api';
import { Menu } from '@/entities/menu';

export const menuApi = {

    /**
     * 메뉴 목록 조회
     * @returns 메뉴 목록
     */
    getMenuList: async (siteId: string): Promise<Menu[]> => {
        const response = await apiInstance.get(`/v1/menu?siteId=${siteId}`);
        return response.data.data;
    },

    /**
     * 메뉴 생성
     * @param menu 메뉴 정보
     * @returns 생성된 메뉴 정보
     */
    createMenu: async (menu: Menu): Promise<Menu> => {
        const response = await apiInstance.post('/v1/menu', menu);
        return response.data;
    },

    /**
     * 메뉴 수정
     * @param sn 메뉴 번호
     * @param menu 메뉴 정보
     * @returns 수정된 메뉴 정보
     */
    updateMenu: async (sn: number, menu: Menu): Promise<Menu> => {
        const response = await apiInstance.put(`/v1/menu/${sn}`, menu);
        return response.data;
    },  

    /**
     * 메뉴 삭제
     * @param sn 메뉴 번호
     * @returns 삭제된 메뉴 정보
     */ 
    deleteMenu: async (sn: number): Promise<void> => {
        await apiInstance.delete(`/v1/menu/${sn}`);
    },

    /**
     * 메뉴 트리 조회
     * @param siteId 사이트 아이디
     * @returns 메뉴 트리
     */
    getMenuTreeList: async (siteId: string): Promise<Menu[]> => {
        try {
            const response = await apiInstance.get(`/v1/menu/tree?siteId=${siteId}`);
            console.log('API 원본 응답:', response);
            return response.data.data;
        } catch (error) {
            console.error('메뉴 트리 조회 API 호출 오류:', error);
            throw error;
        }
    },

    /**
     * 사용여부 변경
     * @param sn 메뉴 번호
     * @param useYn 사용여부
     * @returns 변경된 메뉴 정보
     */
    setUseYn: async (menuSn: number, useYn: string): Promise<void> => {
        try {
            const response = await apiInstance.put(`/v1/menu/setUseYn`, { menuSn, useYn });
            console.log('API 원본 응답:', response);
            return response.data;
        } catch (error) {
            console.error('사용여부 변경 API 호출 오류:', error);
            throw error;
        }
    }
};