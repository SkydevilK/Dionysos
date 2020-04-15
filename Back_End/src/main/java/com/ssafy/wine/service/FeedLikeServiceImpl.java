package com.ssafy.wine.service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.wine.dto.FeedOutputDto;
import com.ssafy.wine.dto.UserDto;
import com.ssafy.wine.entity.Feed;
import com.ssafy.wine.entity.FeedLike;
import com.ssafy.wine.entity.User;
import com.ssafy.wine.repo.FeedLikeRepository;
import com.ssafy.wine.repo.FeedRepository;
import com.ssafy.wine.repo.UserRepository;

@Service
public class FeedLikeServiceImpl implements FeedLikeService {

	@Autowired
	private FeedLikeRepository feedLikeRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FeedRepository feedRepostitory;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public FeedLike create(Long uid, Long fid) {
		User user = userRepository.findById(uid).orElseThrow(NoSuchElementException::new);
		Feed feed = feedRepostitory.findById(fid).orElseThrow(NoSuchElementException::new);
		return feedLikeRepository.save(FeedLike.builder().user(user).feed(feed).build());
	}

	@Override
	public List<FeedOutputDto> findByUser(Long uid) {
		User user = userRepository.findById(uid).orElseThrow(NoSuchElementException::new);
		List<Feed> feeds = new ArrayList<>();
		for (FeedLike like : user.getFeedLikes()) {
			feeds.add(like.getFeed());
		}
		Type typeToken =  new TypeToken<List<FeedOutputDto>>() {}.getType();
		return modelMapper.map(feeds, typeToken);
	}

	@Override
	public List<UserDto> findByFeed(Long fid) {
		Feed feed = feedRepostitory.findById(fid).orElseThrow(NoSuchElementException::new);
		List<User> users = new ArrayList<>();
		for (FeedLike like : feed.getFeedLikes()) {
			users.add(like.getUser());
		}
		Type typeToken =  new TypeToken<List<UserDto>>() {}.getType();
		return modelMapper.map(users, typeToken);
	}
	
	@Override
	@Transactional
	public Integer updateLikeNum(Long fid) {
		Feed feed = feedRepostitory.findById(fid).orElseThrow(NoSuchElementException::new);
		return feedRepostitory.updateLikeNum(fid, feed.getFeedLikes().size());
	}
	
	@Override
	@Transactional
	public void delete(Long uid, Long fid) {
		User user = userRepository.findById(uid).orElseThrow(NoSuchElementException::new);
		Feed feed = feedRepostitory.findById(fid).orElseThrow(NoSuchElementException::new);
		feedLikeRepository.delete(FeedLike.builder().user(user).feed(feed).build());
	}
}
