package com.fsd.common.utils.session;

import jakarta.servlet.http.HttpSessionBindingEvent;
import jakarta.servlet.http.HttpSessionBindingListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <pre>
 * 세션 바인딩 리스너
 * </pre>
 * 
 * @author 
 */
public class SessionBindingListener implements HttpSessionBindingListener {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(SessionBindingListener.class);
    
    private String sn;
    
    public SessionBindingListener(String sn) {
        this.sn = sn;
    }
    
    @Override
    public void valueBound(HttpSessionBindingEvent event) {
        LOGGER.info("Session bound for user: {}", sn);
    }
    
    @Override
    public void valueUnbound(HttpSessionBindingEvent event) {
        LOGGER.info("Session unbound for user: {}", sn);
    }
} 