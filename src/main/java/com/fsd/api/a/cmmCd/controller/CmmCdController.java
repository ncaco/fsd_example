package com.fsd.api.a.cmmCd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fsd.api.a.cmmCd.service.CmmCdService;
import com.fsd.common.utils.response.ResponseUtil;
import com.fsd.model.CmmCd;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/a/cmmCd")
public class CmmCdController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CmmCdController.class);

    @Autowired
    private CmmCdService cmmCdService;

    /**
     * 모든 공통코드 조회
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCmmCds() {
        LOGGER.info("\n----------------------------------공통코드 전체 조회----------------------------------");
        try {
            List<CmmCd> cmmCdList = cmmCdService.getAllCmmCds();
            LOGGER.info("조회된 공통코드 수: {}", cmmCdList.size());
            return ResponseUtil.success("공통코드 조회 성공", cmmCdList);
        } catch (Exception e) {
            LOGGER.error("공통코드 조회 중 오류 발생", e);
            return ResponseUtil.error("공통코드 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /**
     * 사용 중인 공통코드만 조회
     */
    @GetMapping("/active")
    public ResponseEntity<Map<String, Object>> getActiveCmmCds() {
        LOGGER.info("\n----------------------------------사용 중인 공통코드 조회----------------------------------");
        try {
            List<CmmCd> cmmCdList = cmmCdService.getActiveCmmCds();
            LOGGER.info("조회된 사용 중인 공통코드 수: {}", cmmCdList.size());
            return ResponseUtil.success("사용 중인 공통코드 조회 성공", cmmCdList);
        } catch (Exception e) {
            LOGGER.error("사용 중인 공통코드 조회 중 오류 발생", e);
            return ResponseUtil.error("사용 중인 공통코드 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /**
     * 상위 공통코드 목록 조회
     */
    @GetMapping("/upCmmCd")
    public ResponseEntity<Map<String, Object>> getDistinctUpCmmCd() {
        LOGGER.info("\n----------------------------------상위 공통코드 목록 조회----------------------------------");
        try {
            List<String> upCmmCdList = cmmCdService.getDistinctUpCmmCd();
            LOGGER.info("조회된 상위 공통코드 수: {}", upCmmCdList.size());
            return ResponseUtil.success("상위 공통코드 목록 조회 성공", upCmmCdList);
        } catch (Exception e) {
            LOGGER.error("상위 공통코드 목록 조회 중 오류 발생", e);
            return ResponseUtil.error("상위 공통코드 목록 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /**
     * 상위 공통코드로 하위 공통코드 목록 조회
     */
    @GetMapping("/{upCmmCd}")
    public ResponseEntity<Map<String, Object>> getCmmCdsByUpCmmCd(@PathVariable String upCmmCd) {
        LOGGER.info("\n----------------------------------하위 공통코드 목록 조회----------------------------------");
        LOGGER.info("상위 공통코드: {}", upCmmCd);
        try {
            List<CmmCd> cmmCdList = cmmCdService.getCmmCdsByUpCmmCd(upCmmCd);
            LOGGER.info("조회된 하위 공통코드 수: {}", cmmCdList.size());
            return ResponseUtil.success("하위 공통코드 목록 조회 성공", cmmCdList);
        } catch (Exception e) {
            LOGGER.error("하위 공통코드 목록 조회 중 오류 발생", e);
            return ResponseUtil.error("하위 공통코드 목록 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /**
     * 특정 공통코드 조회
     */
    @GetMapping("/{upCmmCd}/{cmmCd}")
    public ResponseEntity<Map<String, Object>> getCmmCdByUpCmmCdAndCmmCd(
            @PathVariable String upCmmCd, 
            @PathVariable String cmmCd) {
        LOGGER.info("\n----------------------------------특정 공통코드 조회----------------------------------");
        LOGGER.info("상위 공통코드: {}, 공통코드: {}", upCmmCd, cmmCd);
        try {
            CmmCd cmmCdObj = cmmCdService.getCmmCdByUpCmmCdAndCmmCd(upCmmCd, cmmCd);
            if (cmmCdObj == null) {
                return ResponseUtil.error("해당 공통코드를 찾을 수 없습니다.", "Code not found");
            }
            return ResponseUtil.success("공통코드 조회 성공", cmmCdObj);
        } catch (Exception e) {
            LOGGER.error("공통코드 조회 중 오류 발생", e);
            return ResponseUtil.error("공통코드 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /**
     * 공통코드 그룹별 조회
     */
    @GetMapping("/group")
    public ResponseEntity<Map<String, Object>> getCmmCdsByGroup() {
        LOGGER.info("\n----------------------------------공통코드 그룹별 조회----------------------------------");
        try {
            Map<String, List<CmmCd>> codeMap = cmmCdService.getCmmCdsByGroup();
            LOGGER.info("조회된 공통코드 그룹 수: {}", codeMap.size());
            return ResponseUtil.success("공통코드 그룹별 조회 성공", codeMap);
        } catch (Exception e) {
            LOGGER.error("공통코드 그룹별 조회 중 오류 발생", e);
            return ResponseUtil.error("공통코드 그룹별 조회 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /**
     * 공통코드 생성
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createCmmCd(@RequestBody CmmCd cmmCd) {
        LOGGER.info("\n----------------------------------공통코드 생성----------------------------------");
        LOGGER.info("상위 공통코드: {}, 공통코드: {}", cmmCd.getUpCmmCd(), cmmCd.getCmmCd());
        try {
            CmmCd createdCmmCd = cmmCdService.createCmmCd(cmmCd);
            return ResponseUtil.success("공통코드 생성 성공", createdCmmCd);
        } catch (Exception e) {
            LOGGER.error("공통코드 생성 중 오류 발생", e);
            return ResponseUtil.error("공통코드 생성 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /**
     * 공통코드 수정
     */
    @PutMapping("/{upCmmCd}/{cmmCd}")
    public ResponseEntity<Map<String, Object>> updateCmmCd(
            @PathVariable String upCmmCd, 
            @PathVariable String cmmCd, 
            @RequestBody CmmCd cmmCdDetails) {
        LOGGER.info("\n----------------------------------공통코드 수정----------------------------------");
        LOGGER.info("상위 공통코드: {}, 공통코드: {}", upCmmCd, cmmCd);
        try {
            CmmCd updatedCmmCd = cmmCdService.updateCmmCd(upCmmCd, cmmCd, cmmCdDetails);
            return ResponseUtil.success("공통코드 수정 성공", updatedCmmCd);
        } catch (Exception e) {
            LOGGER.error("공통코드 수정 중 오류 발생", e);
            return ResponseUtil.error("공통코드 수정 중 오류가 발생했습니다.", e.getMessage());
        }
    }

    /**
     * 공통코드 삭제
     */
    @DeleteMapping("/{upCmmCd}/{cmmCd}")
    public ResponseEntity<Map<String, Object>> deleteCmmCd(
            @PathVariable String upCmmCd, 
            @PathVariable String cmmCd) {
        LOGGER.info("\n----------------------------------공통코드 삭제----------------------------------");
        LOGGER.info("상위 공통코드: {}, 공통코드: {}", upCmmCd, cmmCd);
        try {
            cmmCdService.deleteCmmCd(upCmmCd, cmmCd);
            return ResponseUtil.success("공통코드 삭제 성공");
        } catch (Exception e) {
            LOGGER.error("공통코드 삭제 중 오류 발생", e);
            return ResponseUtil.error("공통코드 삭제 중 오류가 발생했습니다.", e.getMessage());
        }
    }
} 