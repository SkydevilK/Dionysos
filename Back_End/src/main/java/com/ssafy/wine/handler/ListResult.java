package com.ssafy.wine.handler;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
/**
 * @author 김병인
 *
 */
@Getter
@Setter
public class ListResult<T> extends CommonResult {
	private List<T> list;
}
