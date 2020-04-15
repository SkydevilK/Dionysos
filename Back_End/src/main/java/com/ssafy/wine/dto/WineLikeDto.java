package com.ssafy.wine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class WineLikeDto {
	private Long wid;
	private String nameKor;
	private String nameEng;
}
