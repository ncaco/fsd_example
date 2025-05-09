package com.fsd.api.a.cmmCd.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.fsd.model.CmmCd;

import java.util.List;

@Repository
public interface CmmCdRepository extends JpaRepository<CmmCd, String> {
    
    /**
     * 상위 공통코드와 일치하는 공통코드 리스트 조회
     */
    @Query("SELECT c FROM CmmCd c WHERE c.upCmmCd = :upCmmCd ORDER BY c.sortSn ASC")
    List<CmmCd> findByUpCmmCd(@Param("upCmmCd") String upCmmCd);
    
    /**
     * 상위 공통코드와 공통코드로 특정 공통코드 조회
     */
    @Query("SELECT c FROM CmmCd c WHERE c.upCmmCd = :upCmmCd AND c.cmmCd = :cmmCd")
    CmmCd findByUpCmmCdAndCmmCd(@Param("upCmmCd") String upCmmCd, @Param("cmmCd") String cmmCd);
    
    /**
     * 사용 가능한(useYn = 'Y') 공통코드 리스트 조회
     */
    @Query("SELECT c FROM CmmCd c WHERE c.useYn = 'Y' ORDER BY c.upCmmCd, c.sortSn ASC")
    List<CmmCd> findAllActiveCommonCodes();
    
    /**
     * 상위 공통코드 목록 조회 (중복 제거)
     */
    @Query("SELECT DISTINCT c.upCmmCd FROM CmmCd c ORDER BY c.upCmmCd ASC")
    List<String> findDistinctUpCmmCd(); 
}