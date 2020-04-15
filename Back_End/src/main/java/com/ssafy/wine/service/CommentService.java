package com.ssafy.wine.service;

import java.util.List;

import com.ssafy.wine.dto.CommentDto;
import com.ssafy.wine.entity.Comment;

public interface CommentService {
	
	public Comment create(Long fid, Long uid, Long cid, String content);
	public void delete(Long cid);
	public CommentDto findById(Long cid);
	public List<CommentDto> findByFeed(Long fid);
	public CommentDto update(Long cid, String content);
}
