package com.ssafy.wine.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.ssafy.wine.exception.CUserNotFoundException;
import com.ssafy.wine.repo.UserRepository;

import lombok.RequiredArgsConstructor;
/**
 * @author 김병인
 *
 */
@RequiredArgsConstructor
@Service
public class MyUserDetailService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String id) {
		return userRepository.findById(Long.parseLong(id)).orElseThrow(CUserNotFoundException::new);
	}
}