package com.ssafy.wine.repo;

import org.springframework.data.repository.CrudRepository;

import com.ssafy.wine.entity.FeedLike;

public interface FeedLikeRepository extends CrudRepository<FeedLike, Long> {
}
