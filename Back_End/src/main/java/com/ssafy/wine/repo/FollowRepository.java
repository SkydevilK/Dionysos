package com.ssafy.wine.repo;


import org.springframework.data.repository.CrudRepository;

import com.ssafy.wine.entity.Follow;
import com.ssafy.wine.entity.FollowId;

public interface FollowRepository extends CrudRepository<Follow, FollowId>{
}
