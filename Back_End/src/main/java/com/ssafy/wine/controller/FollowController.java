package com.ssafy.wine.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wine.dto.UserDto;
import com.ssafy.wine.entity.Follow;
import com.ssafy.wine.service.FollowService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "6. Follow" }, description = "팔로우 정보 REST API")
@RequestMapping(value = "/follow")
@CrossOrigin(origins = "*")
public class FollowController {

	@Autowired
	private FollowService followService;

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "follow 추가")
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestParam Long toUid) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Long fromUid = Long.parseLong(authentication.getName());
			if (fromUid.equals(toUid))
				return new ResponseEntity<Object>("same email", HttpStatus.NOT_ACCEPTABLE);
			Follow follow = followService.create(fromUid, toUid);
			StringBuilder resStr = new StringBuilder();
			resStr.append("From: ").append(follow.getFrom().getEmail()).append("\n").append("to: ")
					.append(follow.getTo().getEmail()).append("\n").append("follow를 추가했습니다.");
			return new ResponseEntity<Object>(resStr.toString(), HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "following - 해당 유저가 팔로우하는 전체 그룹 반환")
	@GetMapping("/findByFollowing")
	public ResponseEntity<Object> findByFollowing(@RequestParam Long fromUid) {
		try {
			List<UserDto> following = followService.findByFollowing(fromUid);
			return new ResponseEntity<Object>(following, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "follower - 해당 유저를 팔로우한 전체 그룹 반환")
	@GetMapping("/findByFollower")
	public ResponseEntity<Object> findByFollower(@RequestParam Long toUid) {
		try {
			List<UserDto> follower = followService.findByFollower(toUid);
			return new ResponseEntity<Object>(follower, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "follow 취소/삭제")
	@DeleteMapping("/delete")
	public ResponseEntity<Object> delete(@RequestParam Long toUid) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Long fromUid = Long.parseLong(authentication.getName());
			followService.delete(fromUid, toUid);
			return new ResponseEntity<Object>("Follow를 삭제했습니다.", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
}
