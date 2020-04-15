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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.ssafy.wine.dto.FeedInputDto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "feed")
public class Feed extends DateEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long fid;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@Column
	private String title;
	
	@Column(length = 4000)
	private String content;

	@ManyToOne
	@JoinColumn(name = "wine_id")
	private Wine wine;

	@Column
	private BigDecimal rating;

	@Column
	@ColumnDefault("0")
	private Integer visit = 0;

	@Column
	@ColumnDefault("0")
	private Integer likeNum = 0;

	@OneToMany(mappedBy = "feed", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<FeedLike> feedLikes = new ArrayList<>();

	@OneToMany(mappedBy = "feed", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();

	@Builder
	public Feed(User user, Wine wine, BigDecimal rating, String title, String content) {
		this.user = user;
		this.wine = wine;
		this.title = title;
		this.rating = rating;
		this.content = content;
	}

	public Feed updateFeed(Wine wine, FeedInputDto dto) {
		this.wine = wine;
		this.rating = dto.getRating();
		this.title = dto.getTitle();
		this.content = dto.getContent();
		return this;
	}
}
