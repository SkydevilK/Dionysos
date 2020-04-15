package com.ssafy.wine.service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.wine.dto.CommentDto;
import com.ssafy.wine.entity.Comment;
import com.ssafy.wine.entity.Feed;
import com.ssafy.wine.entity.User;
import com.ssafy.wine.repo.CommentRepository;
import com.ssafy.wine.repo.FeedRepository;
import com.ssafy.wine.repo.UserRepository;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private FeedRepository feedRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Comment create(Long fid, Long uid, Long cid, String content) {
		Feed feed = feedRepository.findById(fid).orElseThrow(NoSuchElementException::new);
		User user = userRepository.findById(uid).orElseThrow(NoSuchElementException::new);
		Comment pComment = cid == null ? null : commentRepository.findById(cid).orElseThrow(NoSuchElementException::new);
		return commentRepository.save(Comment.builder()
				.user(user)
				.feed(feed)
				.content(content)
				.parentComment(pComment)
				.build());
	}

	@Override
	public CommentDto findById(Long cid) {
		Comment comment =  commentRepository.findById(cid).orElseThrow(NoSuchElementException::new);
		return modelMapper.map(comment, CommentDto.class);
	}
	
	@Override
	public List<CommentDto> findByFeed(Long fid) {
		Feed feed = feedRepository.findById(fid).orElseThrow(NoSuchElementException::new);
		Type typeToken = new TypeToken<List<CommentDto>>() {}.getType();
		return modelMapper.map(feed.getComments(), typeToken);
	}

	@Override
	@Transactional
	public CommentDto update(Long cid, String content) {
		Comment comment = commentRepository.findById(cid).orElseThrow(NoSuchElementException::new);
		return modelMapper.map(comment.update(content), CommentDto.class);
	}
	
	@Override
	@Transactional
	public void delete(Long cid) {
		commentRepository.deleteById(cid);
	}

}
