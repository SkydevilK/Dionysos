package com.ssafy.wine.repo;

import org.springframework.data.repository.CrudRepository;

import com.ssafy.wine.entity.Comment;

public interface CommentRepository extends CrudRepository<Comment, Long> {
}
