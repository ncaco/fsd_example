package com.fsd.api.a.cmmCd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fsd.api.a.cmmCd.repository.CmmCdRepository;
import com.fsd.model.CmmCd;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class CmmCdService {
    private static final Logger LOGGER = LoggerFactory.getLogger(CmmCdService.class);

    @Autowired
    private CmmCdRepository cmmCdRepository;

    /**
     * 모든 공통코드 조회
     */
    public List<CmmCd> getAllCmmCds() {
        return cmmCdRepository.findAll();
    }

    /**
     * 사용중인 공통코드만 조회
     */
    public List<CmmCd> getActiveCmmCds() {
        return cmmCdRepository.findAllActiveCommonCodes();
    }

    /**
     * 상위 공통코드로 하위 공통코드 목록 조회
     */
    public List<CmmCd> getCmmCdsByUpCmmCd(String upCmmCd) {
        return cmmCdRepository.findByUpCmmCd(upCmmCd);
    }

    /**
     * 상위 공통코드와 공통코드로 특정 공통코드 조회
     */
    public CmmCd getCmmCdByUpCmmCdAndCmmCd(String upCmmCd, String cmmCd) {
        return cmmCdRepository.findByUpCmmCdAndCmmCd(upCmmCd, cmmCd);
    }

    /**
     * 상위 공통코드 목록 조회 (중복 제거)
     */
    public List<String> getDistinctUpCmmCd() {
        return cmmCdRepository.findDistinctUpCmmCd();
    }

    /**
     * 공통코드 생성
     */
    @Transactional
    public CmmCd createCmmCd(CmmCd cmmCd) {
        LOGGER.info("공통코드 생성 시작 - 상위코드: {}, 코드: {}", cmmCd.getUpCmmCd(), cmmCd.getCmmCd());

        // 현재 시간 설정
        cmmCd.setRegDt(new Date());
        
        // 사용여부 기본값 설정
        if (cmmCd.getUseYn() == null) {
            cmmCd.setUseYn("Y");
        }
        
        // 정렬순서 기본값 설정
        if (cmmCd.getSortSn() == null) {
            cmmCd.setSortSn(1);
        }

        // 저장
        CmmCd savedCmmCd = cmmCdRepository.save(cmmCd);
        LOGGER.info("공통코드 생성 완료 - 상위코드: {}, 코드: {}", savedCmmCd.getUpCmmCd(), savedCmmCd.getCmmCd());
        
        return savedCmmCd;
    }

    /**
     * 공통코드 수정
     */
    @Transactional
    public CmmCd updateCmmCd(String upCmmCd, String cmmCd, CmmCd cmmCdDetails) {
        LOGGER.info("공통코드 수정 시작 - 상위코드: {}, 코드: {}", upCmmCd, cmmCd);

        // 기존 공통코드 조회
        CmmCd existingCmmCd = cmmCdRepository.findByUpCmmCdAndCmmCd(upCmmCd, cmmCd);
        
        if (existingCmmCd == null) {
            LOGGER.error("공통코드 수정 실패 - 존재하지 않는 코드: {}, {}", upCmmCd, cmmCd);
            throw new RuntimeException("수정할 공통코드를 찾을 수 없습니다.");
        }

        // 변경 가능한 필드만 업데이트
        existingCmmCd.setCmmCdNm(cmmCdDetails.getCmmCdNm());
        existingCmmCd.setSortSn(cmmCdDetails.getSortSn());
        existingCmmCd.setUseYn(cmmCdDetails.getUseYn());
        existingCmmCd.setAbbrNm(cmmCdDetails.getAbbrNm());
        existingCmmCd.setUseBgngYmd(cmmCdDetails.getUseBgngYmd());
        existingCmmCd.setUseEndYmd(cmmCdDetails.getUseEndYmd());
        existingCmmCd.setMdfrId(cmmCdDetails.getMdfrId());
        existingCmmCd.setMdfcnDt(new Date());

        // 저장
        CmmCd updatedCmmCd = cmmCdRepository.save(existingCmmCd);
        LOGGER.info("공통코드 수정 완료 - 상위코드: {}, 코드: {}", updatedCmmCd.getUpCmmCd(), updatedCmmCd.getCmmCd());
        
        return updatedCmmCd;
    }

    /**
     * 공통코드 삭제
     */
    @Transactional
    public void deleteCmmCd(String upCmmCd, String cmmCd) {
        LOGGER.info("공통코드 삭제 시작 - 상위코드: {}, 코드: {}", upCmmCd, cmmCd);

        // 기존 공통코드 조회
        CmmCd existingCmmCd = cmmCdRepository.findByUpCmmCdAndCmmCd(upCmmCd, cmmCd);
        
        if (existingCmmCd == null) {
            LOGGER.error("공통코드 삭제 실패 - 존재하지 않는 코드: {}, {}", upCmmCd, cmmCd);
            throw new RuntimeException("삭제할 공통코드를 찾을 수 없습니다.");
        }

        // 삭제
        cmmCdRepository.delete(existingCmmCd);
        LOGGER.info("공통코드 삭제 완료 - 상위코드: {}, 코드: {}", upCmmCd, cmmCd);
    }

    /**
     * 코드 그룹으로 구성된 맵 반환
     * 상위코드를 키로 하고, 해당 상위코드에 속한 하위코드 리스트를 값으로 하는 맵
     */
    public Map<String, List<CmmCd>> getCmmCdsByGroup() {
        LOGGER.info("공통코드 그룹 맵 조회 시작");
        
        Map<String, List<CmmCd>> codeMap = new HashMap<>();
        List<String> upCmmCdList = cmmCdRepository.findDistinctUpCmmCd();
        
        for (String upCmmCd : upCmmCdList) {
            List<CmmCd> subCodes = cmmCdRepository.findByUpCmmCd(upCmmCd);
            codeMap.put(upCmmCd, subCodes);
        }
        
        LOGGER.info("공통코드 그룹 맵 조회 완료 - {} 그룹", codeMap.size());
        return codeMap;
    }
} 