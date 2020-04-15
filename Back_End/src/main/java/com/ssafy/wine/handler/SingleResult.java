package com.ssafy.wine.handler;

import lombok.Getter;
import lombok.Setter;
/**
 * @author 김병인
 *
 */
@Getter
@Setter
public class SingleResult<T> extends CommonResult {
	private T data;
}