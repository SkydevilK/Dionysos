package com.ssafy.wine.exception;
/**
 * @author 김병인
 *
 */
public class CUserNotFoundException extends RuntimeException {
	public CUserNotFoundException(String msg, Throwable t) {
		super(msg, t);
	}

	public CUserNotFoundException(String msg) {
		super(msg);
	}

	public CUserNotFoundException() {
		super();
	}
}