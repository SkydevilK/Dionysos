package com.ssafy.wine.service;

import java.util.List;

import com.ssafy.wine.dto.FeedOutputDto;
import com.ssafy.wine.dto.UserDto;
import com.ssafy.wine.entity.FeedLike;

public interface FeedLikeService {

	public FeedLike create(Long uid, Long fid);

	public Integer updateLikeNum(Long fid);

	public void delete(Long uid, Long fid);

	public List<FeedOutputDto> findByUser(Long uid);

	public List<UserDto> findByFeed(Long fid);

}
