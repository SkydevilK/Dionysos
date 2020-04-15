package com.ssafy.wine.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class FeedOutputDto {

	private Long fid;
	private String title;
	private String content;
	private LocalDateTime createdTimeAt;
	private LocalDateTime updateTimeAt;
	private Integer visit;
	private Integer likeNum;
	private BigDecimal rating;
	private WineDto wine;
	private UserDto user;
	
}
