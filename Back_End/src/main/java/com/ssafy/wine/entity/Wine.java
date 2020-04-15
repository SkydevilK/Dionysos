package com.ssafy.wine.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "wine")
public class Wine {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long wid;

	@Column(name = "name_kor")
	private String nameKor;

	@Column(name = "name_eng")
	private String nameEng;

	@Column
	private String type;

	@Column
	private Boolean sparkling;

	@Column
	private String grape;

	@Column
	private String country;

	@Column(name = "country_sub")
	private String countrySub;

	@Column
	private String winery;

	@Column
	private BigDecimal alcohol;

	@Column(name = "when_use")
	private String whenUse;

	@Column
	private String grade;

	@Column
	private Integer sweet;

	@Column
	private Integer body;

	@Column
	private Integer acid;

	@Column
	private Integer tannin;

	@Column(name = "food_match")
	private String foodMatch;

	@Column(length = 4000)
	private String info;

	@Column(nullable = false)
	private Integer visit;
	
	@Column(nullable = false)
	private Integer likeNum;

	@OneToMany(mappedBy = "wine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<WineLike> wineLikes = new ArrayList<>();
	
	@OneToMany(mappedBy = "wine", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Feed> feeds = new ArrayList<>();

	@Builder
	public Wine(Long wid, String nameKor, String nameEng, String type, Boolean sparkling, String grape, String country,
			String countrySub, String winery, BigDecimal alcohol, String whenUse, String grade, Integer sweet,
			Integer body, Integer acid, Integer tannin, String foodMatch, String info) {
		this.wid = wid;
		this.nameKor = nameKor;
		this.nameEng = nameEng;
		this.type = type;
		this.sparkling = sparkling;
		this.grape = grape;
		this.country = country;
		this.countrySub = countrySub;
		this.winery = winery;
		this.alcohol = alcohol;
		this.whenUse = whenUse;
		this.grade = grade;
		this.sweet = sweet;
		this.body = body;
		this.acid = acid;
		this.tannin = tannin;
		this.foodMatch = foodMatch;
		this.info = info;
	}


	public Integer updateVisit() {
		this.visit += 1;
		return this.getVisit();
	}

	public Integer updateLikeNum(Integer likeNum) {
		this.likeNum = likeNum;
		return this.getLikeNum();
	}
}
