package com.ssafy.wine.entity;

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

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "comment")
public class Comment extends DateEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cid;

	@ManyToOne
	@JoinColumn(name = "uid")
	private User user;

	@ManyToOne
	@JoinColumn(name = "fid")
	private Feed feed;

	@Column(length = 4000)
	private String content;

	@ManyToOne
	@JoinColumn(name = "parent")
	private Comment parentComment;

	@OneToMany(mappedBy = "parentComment", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	List<Comment> comments = new ArrayList<>();

	@Builder
	public Comment(User user, Feed feed, String content, Comment parentComment) {
		this.user = user;
		this.feed = feed;
		this.content = content;
		this.parentComment = parentComment;
	}

	public Comment update(String content) {
		this.content = content;
		return this;
	}
	
}
