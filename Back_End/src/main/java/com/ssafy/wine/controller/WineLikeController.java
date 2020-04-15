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

import com.ssafy.wine.dto.UserDto;
import com.ssafy.wine.dto.WineLikeDto;
import com.ssafy.wine.entity.WineLike;
import com.ssafy.wine.service.WineLikeService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Api(tags = { "3. WineLike" }, description = "WineLike 정보 REST API")
@RequestMapping(value = "/winelike")
@CrossOrigin(origins = "*")
@Slf4j
public class WineLikeController {

	@Autowired
	private WineLikeService wineLikeService;

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "좋아요 추가")
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestParam Long wid) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Long uid = Long.parseLong(authentication.getName());
			WineLike like = wineLikeService.create(uid, wid);
			Integer result = wineLikeService.updateLikeNum(wid);
			StringBuilder resStr = new StringBuilder();
			resStr.append("User: ").append(like.getUser().getEmail()).append("\n").append("Wine: ")
					.append(like.getWine().getNameKor()).append("\n")
					.append("현재 좋아요: ").append(result).append("개, 추가되었습니다.");
			return new ResponseEntity<Object>(resStr.toString(), HttpStatus.OK);
		} catch (Exception e) {
			log.error("WineLike Create Fail", e);
			throw e;
		}
	}

	@ApiOperation(value = "해당 유저가 좋아요한 와인")
	@GetMapping("/findByUser")
	public ResponseEntity<Object> findByUser(@RequestParam Long uid) {
		try {
			List<WineLikeDto> wines = wineLikeService.findByUser(uid);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "해당 와인을 좋아요한 유저")
	@GetMapping("/findByWine/{wid}")
	public ResponseEntity<Object> findByWine(@PathVariable Long wid) {
		try {
			List<UserDto> likes = wineLikeService.findByWine(wid);
			return new ResponseEntity<Object>(likes, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "좋아요 취소/삭제")
	@DeleteMapping("/delete")
	public ResponseEntity<Object> delete(@RequestParam Long wid) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uid = authentication.getName();
			wineLikeService.delete(Long.parseLong(uid), wid);
			wineLikeService.updateLikeNum(wid);
			return new ResponseEntity<Object>("WineLike 삭제되었습니다.", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

}
