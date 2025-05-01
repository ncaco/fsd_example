package com.fsd.common.utils.request;

import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpRequestUtils {
    private static final Logger LOGGER = LoggerFactory.getLogger(HttpRequestUtils.class);

    public static String getSiteId(HttpServletRequest request) {
        try {
            String path = request.getRequestURI();
            // 요청을 보낸 URL 가져오기
            String referer = request.getHeader("Referer");
            
            if (referer != null) {
                LOGGER.info("referer: {}", referer);
            }
            LOGGER.info("path: {}", path);

            // 첫 번째 경로 세그먼트 추출
            String[] pathSegments = path.split("/");
            String firstPathSegment = pathSegments.length > 1 ? pathSegments[1] : "";
            
            LOGGER.info("firstPathSegment: {}", firstPathSegment);
            return firstPathSegment;
        } catch (Exception e) {
            return null;
        }
    }
}
