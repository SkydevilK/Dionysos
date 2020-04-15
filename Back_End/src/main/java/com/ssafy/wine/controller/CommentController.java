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

import com.ssafy.wine.dto.CommentDto;
import com.ssafy.wine.entity.Comment;
import com.ssafy.wine.service.CommentService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(tags = { "5. Comment" }, description = "Comment 정보 rest api")
@RequestMapping(value = "/comment")
@CrossOrigin(origins = "*")
public class CommentController {

	@Autowired
	private CommentService commentService;

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "Comment 추가 - 대댓글은 cid 추가")
	@PostMapping("/create")
	public ResponseEntity<Object> create(@RequestParam Long fid, @RequestParam(required = false) Long cid,
			@RequestParam String content) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Long uid = Long.parseLong(authentication.getName());

			Comment comment = commentService.create(fid, uid, cid, content);
			StringBuilder resStr = new StringBuilder();
			resStr.append("User: ").append(comment.getUser().getEmail())
				.append("\nComment_ID: ").append(comment.getCid())
				.append("\nComment가 추가되었습니다.");
			return new ResponseEntity<Object>(resStr.toString(), HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "해당 feed comment 불러오기")
	@GetMapping("/findByFeed/{fid}")
	public ResponseEntity<Object> findByFeed(@PathVariable Long fid) {
		try {
			List<CommentDto> comments = commentService.findByFeed(fid);
			return new ResponseEntity<Object>(comments, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "comment 단일 불러오기")
	@GetMapping("/findById")
	public ResponseEntity<Object> findById(@RequestParam Long cid) {
		try {
			CommentDto comment = commentService.findById(cid);
			return new ResponseEntity<Object>(comment, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "해당 Comment 수정")
	@PostMapping("/update")
	public ResponseEntity<Object> update(@RequestParam Long cid, @RequestParam String content) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uid = authentication.getName();
			CommentDto comment = commentService.findById(cid);

			StringBuilder resStr = new StringBuilder();
			resStr.append("Request User: ").append(uid).append("\nComment 작성자 Uid: ").append(comment.getUser().getUid()).append("\n");

			if (uid.equals(comment.getUser().getUid().toString())) {
				comment = commentService.update(cid, content);
				resStr.append(comment.getCid()).append("번 코멘트가 수정되었습니다.");
				return new ResponseEntity<Object>(resStr, HttpStatus.OK);
			} else {
				resStr.append("\n수정 실패: 수정을 요청한 유저와 삭제할 게시글 작성자와 다릅니다.");
				return new ResponseEntity<Object>(resStr, HttpStatus.ACCEPTED);
			}
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "Comment 제거")
	@DeleteMapping("/delete")
	public ResponseEntity<Object> delete(@RequestParam Long cid) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uid = authentication.getName();
			CommentDto comment = commentService.findById(cid);

			StringBuilder resStr = new StringBuilder();
			resStr.append("Request User: ").append(uid).append("\nComment UID: ").append(comment.getUser().getUid());

			if (uid.equals(comment.getUser().getUid().toString())) {
				commentService.delete(cid);
				resStr.append("\n삭제되었습니다.");
				return new ResponseEntity<Object>(resStr, HttpStatus.OK);
			} else {
				resStr.append("\n삭제 실패: 삭제을 요청한 유저와 삭제할 게시글 작성자와 다릅니다.");
				return new ResponseEntity<Object>(resStr, HttpStatus.ACCEPTED);
			}

		} catch (Exception e) {
			throw e;
		}
	}
}
