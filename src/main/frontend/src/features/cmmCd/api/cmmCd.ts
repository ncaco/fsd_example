import apiInstance from '@/shared/api';
import { CmmCd, CmmCdGroupMap } from '@/entities';

export const cmmCdApi = {
    /**
     * 모든 공통코드 조회
     * @returns 공통코드 목록
     */
    getAllCmmCds: async (): Promise<CmmCd[]> => {
        const response = await apiInstance.get('/a/cmmCd');
        return response.data.data;
    },

    /**
     * 사용 중인 공통코드만 조회
     * @returns 사용 중인 공통코드 목록
     */
    getActiveCmmCds: async (): Promise<CmmCd[]> => {
        const response = await apiInstance.get('/a/cmmCd/active');
        return response.data.data;
    },

    /**
     * 상위 공통코드 목록 조회
     * @returns 상위 공통코드 목록
     */
    getDistinctUpCmmCd: async (): Promise<string[]> => {
        const response = await apiInstance.get('/a/cmmCd/upCmmCd');
        return response.data.data;
    },

    /**
     * 상위 공통코드로 하위 공통코드 목록 조회
     * @param upCmmCd 상위 공통코드
     * @returns 하위 공통코드 목록
     */
    getCmmCdsByUpCmmCd: async (upCmmCd: string): Promise<CmmCd[]> => {
        const response = await apiInstance.get(`/a/cmmCd/${upCmmCd}`);
        return response.data.data;
    },

    /**
     * 특정 공통코드 조회
     * @param upCmmCd 상위 공통코드
     * @param cmmCd 공통코드
     * @returns 공통코드 정보
     */
    getCmmCdByUpCmmCdAndCmmCd: async (upCmmCd: string, cmmCd: string): Promise<CmmCd> => {
        const response = await apiInstance.get(`/a/cmmCd/${upCmmCd}/${cmmCd}`);
        return response.data.data;
    },

    /**
     * 공통코드 그룹별 조회
     * @returns 그룹별 공통코드 맵
     */
    getCmmCdsByGroup: async (): Promise<CmmCdGroupMap> => {
        try {
            const response = await apiInstance.get(`/a/cmmCd/group`);
            return response.data.data;
        } catch (error) {
            console.error('공통코드 그룹별 조회 API 호출 오류:', error);
            throw error;
        }
    },

    /**
     * 공통코드 생성
     * @param cmmCd 공통코드 정보
     * @returns 생성된 공통코드 정보
     */
    createCmmCd: async (cmmCd: CmmCd): Promise<CmmCd> => {
        const response = await apiInstance.post('/a/cmmCd', cmmCd);
        return response.data.data;
    },

    /**
     * 공통코드 수정
     * @param upCmmCd 상위 공통코드
     * @param cmmCd 공통코드
     * @param cmmCdDetails 수정할 공통코드 정보
     * @returns 수정된 공통코드 정보
     */
    updateCmmCd: async (upCmmCd: string, cmmCd: string, cmmCdDetails: CmmCd): Promise<CmmCd> => {
        const response = await apiInstance.put(`/a/cmmCd/${upCmmCd}/${cmmCd}`, cmmCdDetails);
        return response.data.data;
    },

    /**
     * 공통코드 삭제
     * @param upCmmCd 상위 공통코드
     * @param cmmCd 공통코드
     */
    deleteCmmCd: async (upCmmCd: string, cmmCd: string): Promise<void> => {
        await apiInstance.delete(`/a/cmmCd/${upCmmCd}/${cmmCd}`);
    }
}; 