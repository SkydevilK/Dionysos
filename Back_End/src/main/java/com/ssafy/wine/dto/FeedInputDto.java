package com.ssafy.wine.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FeedInputDto {
	private String title;
	private String content;
	private Long wid;
	private BigDecimal rating;
}
