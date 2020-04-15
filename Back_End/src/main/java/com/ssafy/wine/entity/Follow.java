package com.ssafy.wine.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@IdClass(FollowId.class)
@Table(name = "follow")
public class Follow {

	@Id
	@ManyToOne
	@JoinColumn(name = "from_email")
	private User from;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "to_email")
	private User to;

	@Builder
	public Follow(User from, User to) {
		this.from = from;
		this.to = to;
	}
}
