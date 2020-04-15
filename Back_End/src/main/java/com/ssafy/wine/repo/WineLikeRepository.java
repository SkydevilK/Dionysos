package com.ssafy.wine.repo;


import org.springframework.data.repository.CrudRepository;

import com.ssafy.wine.entity.WineLike;
import com.ssafy.wine.entity.WineLikeId;

public interface WineLikeRepository extends CrudRepository<WineLike, WineLikeId> {
}
