package com.ssafy.wine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * @author 김병인
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDto {
	
	private Long uid;
	private String kakaotalkId;
	private String naverId;
	private String googleId;
	private String facebookId;
	private String email;
	private String nickName;
	
}
