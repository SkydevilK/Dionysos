package com.ssafy.wine.service;

import java.util.List;

import com.ssafy.wine.dto.UserDto;
import com.ssafy.wine.entity.Follow;

public interface FollowService {

	public Follow create(Long fromUid, Long toUid);

	public List<UserDto> findByFollowing(Long fromUid);

	public List<UserDto> findByFollower(Long toUid);

	public void delete(Long fromUid, Long toUid);

}
