package com.ssafy.wine.exception;
/**
 * @author 김병인
 *
 */
public class FileDownloadException extends RuntimeException {

	public FileDownloadException(String message) {
		super(message);
	}

	public FileDownloadException(String message, Throwable cause) {
		super(message, cause);
	}

}
