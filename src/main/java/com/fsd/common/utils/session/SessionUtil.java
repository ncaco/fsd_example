package com.fsd.common.utils.session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fsd.model.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class SessionUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(SessionUtil.class);

	private static final String A_SN = "A_SN";
	private static final String A_NM = "A_NM";
	private static final String A_EML = "A_EML";
	
	public static boolean loginDataSetSession(User user, int ssnTm) throws Exception {
		try {
			setAttribute(A_SN, user.getSn());
			setAttribute(A_NM, user.getNm());
			setAttribute(A_EML, user.getEml());

			ServletRequestAttributes servletRequestAttribute = (ServletRequestAttributes) RequestContextHolder
					.currentRequestAttributes();
			HttpSession httpSession = servletRequestAttribute.getRequest().getSession(true);

			SessionBindingListener listener = new SessionBindingListener(user.getSn().toString());
			httpSession.setAttribute(user.getSn().toString(), listener);
			httpSession.setMaxInactiveInterval(ssnTm * 60);

			return true;
		} catch (IllegalStateException e) {
			LOGGER.error("loginDataSetSession Error : {}", e.getMessage());
			return false;
		}
	}

	public static String getASn() {
		return getStringAttribute(A_SN);
	}

	public static String getANm() {
		return getStringAttribute(A_NM);
	}

	public static String getAEml() {
		return getStringAttribute(A_EML);
	}

	/**
	 * <pre>
	 * 접속 IP 값 가져오기
	 * </pre>
	 * 
	 * @param request
	 * @return
	 */
	public static String getRemoteAddr(HttpServletRequest request) {
		return request.getRemoteAddr();
	}

	/**
	 * <pre>
	 * attribute 설정 method
	 * </pre>
	 *
	 * @param String attribute key name
	 * @param Object attribute obj
	 * @return void
	 */
	public static void setAttribute(String name, Object object) {
		RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
		if (attributes != null) {
			attributes.setAttribute(name, object, RequestAttributes.SCOPE_SESSION);
		} else {
			LOGGER.warn("Cannot set attribute: RequestAttributes is null");
		}
	}

	/**
	 * <pre>
	 * attribute 값을 가져 오기 위한 method
	 * </pre>
	 *
	 * @param String attribute key name
	 * @return Object attribute obj
	 */
	public static Object getAttribute(String name) {
		RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
		return (attributes != null) ? attributes.getAttribute(name, RequestAttributes.SCOPE_SESSION) : null;
	}

	/**
	 * <pre>
	 * attribute 값을 가져 오기 위한 method
	 * </pre>
	 *
	 * String Type이 아니거나 값이 없을 경우 공백을 되돌려준다.
	 * 
	 * @param String attribute key name
	 * @return String attribute obj
	 * @throws Exception
	 */
	public static String getStringAttribute(String name) {

		Object obj = getAttribute(name);

		if (obj != null) {
			try {
				return (String) obj;
			} catch (ClassCastException e) {
				return "";
			}
		} else {
			return "";
		}
	}

	public static User getSession_A() throws Exception {
		User user = new User();
		user.setSn(Long.parseLong(getASn()));
		user.setNm(getANm());
		user.setEml(getAEml());

		return user;
	}

	public static void removeSession_A(HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.removeAttribute(A_SN);
			session.removeAttribute(A_NM);
			session.removeAttribute(A_EML);
		}
	}

	public static boolean isAdmin() {
		return "ADMIN".equals(getAEml());
	}
}
