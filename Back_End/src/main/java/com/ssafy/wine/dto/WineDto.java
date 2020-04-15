package com.ssafy.wine.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class WineDto {

	private Long wid;
	private String nameKor;
	private String nameEng;
	private String type;
	private Boolean sparkling;
	private String grape;
	private String country;
	private String countrySub;
	private String winery;
	private BigDecimal alcohol;
	private String whenUse;
	private String grade;
	private Integer sweet;
	private Integer body;
	private Integer acid;
	private Integer tannin;
	private String foodMatch;
	private String info;
	private Integer visit;
	private Integer likeNum;
	
}
