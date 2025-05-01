package com.fsd.common.utils.request;

import jakarta.servlet.http.HttpServletRequest;

public class HttpRequestUtils {
    
    public static String getSiteId(HttpServletRequest request) {
        try {
            String path = request.getRequestURI();
            String[] pathSegments = path.split("/");
            String firstPathSegment = pathSegments.length > 1 ? pathSegments[1] : "";
            return firstPathSegment;
        } catch (Exception e) {
            return null;
        }
    }
}
