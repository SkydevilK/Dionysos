package com.ssafy.wine.entity;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode
public class WineLikeId implements Serializable {
	private Long user;
	private Long wine;
}
