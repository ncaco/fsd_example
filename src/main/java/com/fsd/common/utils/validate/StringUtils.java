package com.fsd.common.utils.validate;

public class StringUtils {
    
    /** 문자열이 비어있는지 확인합니다. */
    public static String nullConvertToString(Object obj) {
        if (obj == null) {
            return "";
        }else if (obj instanceof String) {
            return (String) obj;
        }else {
            return obj.toString();
        }
    }
}
