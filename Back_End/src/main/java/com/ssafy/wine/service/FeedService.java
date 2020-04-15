package com.ssafy.wine.service;

import java.util.List;

import com.ssafy.wine.dto.FeedInputDto;
import com.ssafy.wine.dto.FeedOutputDto;
import com.ssafy.wine.entity.Feed;
import com.ssafy.wine.enums.FeedRankEnum;
import com.ssafy.wine.enums.FeedReviewEnum;

public interface FeedService {

	public Feed create(Long uid, FeedInputDto feedInput);

	public List<FeedOutputDto> findAll(FeedReviewEnum type);

	public FeedOutputDto findById(Long fid);

	public List<FeedOutputDto> findByWine(Long wid, FeedReviewEnum type);

	public List<FeedOutputDto> findByUser(Long uid, FeedReviewEnum type);

	public List<FeedOutputDto> findRank(FeedRankEnum type);

	public FeedOutputDto update(Long fid, FeedInputDto feedInput);

	public Integer updateVisit(Long fid);

	public void delete(Long fid);
}
