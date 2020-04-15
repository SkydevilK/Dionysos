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

import com.ssafy.wine.dto.UserDto;
import com.ssafy.wine.entity.Follow;
import com.ssafy.wine.entity.User;
import com.ssafy.wine.repo.FollowRepository;
import com.ssafy.wine.repo.UserRepository;

@Service
public class FollowServiceImpl implements FollowService {

	@Autowired
	private FollowRepository followRepository;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Follow create(Long fromUid, Long toUid) {
		User from = userRepository.findById(fromUid).orElseThrow(NoSuchElementException::new);
		User to = userRepository.findById(toUid).orElseThrow(NoSuchElementException::new);
		return followRepository.save(new Follow(from, to));
	}

	@Override
	public List<UserDto> findByFollowing(Long fromUid) {
		User from = userRepository.findById(fromUid).orElseThrow(NoSuchElementException::new);
		List<User> following = new ArrayList<>();
		for (Follow follow : from.getFollowing()) {
			following.add(follow.getTo());
		}	
		Type typeToken =  new TypeToken<List<UserDto>>() {}.getType();
		return modelMapper.map(following, typeToken);
	}

	@Override
	public List<UserDto> findByFollower(Long toUid) {
		User to = userRepository.findById(toUid).orElseThrow(NoSuchElementException::new);
		List<User> follower = new ArrayList<>();
		for (Follow follow : to.getFollower()) {
			follower.add(follow.getFrom());
		}
		Type typeToken =  new TypeToken<List<UserDto>>() {}.getType();
		return modelMapper.map(follower, typeToken);
	}

	@Override
	@Transactional
	public void delete(Long fromUid, Long toUid) {
		User from = userRepository.findById(fromUid).orElseThrow(NoSuchElementException::new);
		User to = userRepository.findById(toUid).orElseThrow(NoSuchElementException::new);
		followRepository.delete(new Follow(from, to));
	}

}
