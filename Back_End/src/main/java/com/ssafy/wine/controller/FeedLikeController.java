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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wine.dto.FeedOutputDto;
import com.ssafy.wine.dto.UserDto;
import com.ssafy.wine.entity.FeedLike;
import com.ssafy.wine.service.FeedLikeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "4. FeedLike" }, description = "FeedLike 정보 REST API")
@RequestMapping(value = "/feedlike")
@CrossOrigin(origins = "*")
public class FeedLikeController {

	@Autowired
	private FeedLikeService feedLikeService;

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "좋아요 추가")
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestParam Long fid) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Long uid = Long.parseLong(authentication.getName());

			FeedLike like = feedLikeService.create(uid, fid);
			feedLikeService.updateLikeNum(fid);
			StringBuilder resStr = new StringBuilder();
			resStr.append("User: ").append(like.getUser().getEmail())
				.append("\nFeed_ID: ").append(like.getFeed().getFid())
				.append("\nFeedLike 추가되었습니다.");
			return new ResponseEntity<Object>(resStr.toString(), HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "해당 유저가 좋아요한 피드")
	@GetMapping("/findByUser")
	public ResponseEntity<Object> findByUser(@RequestParam Long uid) {
		try {
			List<FeedOutputDto> wines = feedLikeService.findByUser(uid);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "해당 피드 좋아요한 유저")
	@GetMapping("/findByWine/{fid}")
	public ResponseEntity<Object> findByWine(@PathVariable Long fid) {
		try {
			List<UserDto> likes = feedLikeService.findByFeed(fid);
			return new ResponseEntity<Object>(likes, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "좋아요 취소/삭제")
	@DeleteMapping("/delete")
	public ResponseEntity<Object> delete(@RequestParam Long fid) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Long uid = Long.parseLong(authentication.getName());
			feedLikeService.delete(uid, fid);
			feedLikeService.updateLikeNum(fid);
			return new ResponseEntity<Object>("FeedLike 삭제되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

}
