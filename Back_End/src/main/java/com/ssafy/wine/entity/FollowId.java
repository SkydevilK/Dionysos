package com.ssafy.wine.entity;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class FollowId implements Serializable{

	private Long from;
	private Long to;
	
}
