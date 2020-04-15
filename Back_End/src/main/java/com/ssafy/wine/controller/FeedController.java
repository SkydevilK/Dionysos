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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wine.dto.FeedInputDto;
import com.ssafy.wine.dto.FeedOutputDto;
import com.ssafy.wine.entity.Feed;
import com.ssafy.wine.enums.FeedRankEnum;
import com.ssafy.wine.enums.FeedReviewEnum;
import com.ssafy.wine.service.FeedService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Api(tags = { "4. Feed" }, description = "Feed 정보 REST API")
@RequestMapping(value = "/feed")
@CrossOrigin(origins = "*")
@Slf4j
public class FeedController {

	@Autowired
	private FeedService feedService;

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "Feed 추가 - rating == null = Feed / rating != null = review")
	@PostMapping("/create")
	public ResponseEntity<Object> createFeed(@RequestBody FeedInputDto feedInput) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Long uid = Long.parseLong(authentication.getName());

			if (feedInput.getWid() != null && feedInput.getWid() == 0)
				feedInput.setWid(null);
			if (feedInput.getWid() == null && feedInput.getRating() != null)
				return new ResponseEntity<Object>("입력오류!\n rating값이 존재하는데 wine값이 존재하지 않습니다", HttpStatus.ACCEPTED);

			Feed feed = feedService.create(uid, feedInput);
			StringBuilder resStr = new StringBuilder();
			resStr.append("User: ").append(feed.getUser().getEmail())
				.append("\nFeed_Id: ").append(feed.getFid())
				.append("\nFeed 작성완료");
			return new ResponseEntity<Object>(resStr, HttpStatus.OK);
		} catch (Exception e) {
			log.error("Feed Create Fail", e);
			return new ResponseEntity<Object>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@ApiOperation(value = "모든 피드 불러오기")
	@GetMapping("/findAll")
	public ResponseEntity<Object> findAll(@RequestParam FeedReviewEnum type) {
		try {
			List<FeedOutputDto> feeds = feedService.findAll(type);
			return new ResponseEntity<Object>(feeds, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "해당 유저 Feed 불러오기")
	@GetMapping("/findByUser")
	public ResponseEntity<Object> findByUser(@RequestParam Long uid, @RequestParam FeedReviewEnum type) {
		try {
			List<FeedOutputDto> feeds = feedService.findByUser(uid, type);
			return new ResponseEntity<Object>(feeds, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "해당 와인 feed(review) 불러오기")
	@GetMapping("/findByWine/{wid}")
	public ResponseEntity<Object> findByWine(@RequestParam Long wid, @RequestParam FeedReviewEnum type) {
		try {
			List<FeedOutputDto> feeds = feedService.findByWine(wid, type);
			return new ResponseEntity<Object>(feeds, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "리뷰랭크: 조회수, 좋아요 - 리뷰만(rating != null) 불러온다")
	@GetMapping("/ReviewRank/{type}")
	public ResponseEntity<Object> ReviewRank(@PathVariable FeedRankEnum type) {
		try {
			List<FeedOutputDto> feeds = feedService.findRank(type);
			return new ResponseEntity<Object>(feeds, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "Feed 단일 가져오기")
	@GetMapping("/findById")
	public ResponseEntity<Object> findById(@RequestParam Long fid) {
		try {
			FeedOutputDto feed = feedService.findById(fid);
			return new ResponseEntity<Object>(feed, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "Feed 수정")
	@PostMapping("/update")
	public ResponseEntity<Object> update(@RequestParam Long fid, @RequestBody FeedInputDto feedInput) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String uid = authentication.getName();
			FeedOutputDto feed = feedService.findById(fid);

			StringBuilder resStr = new StringBuilder();
			resStr.append("Request User: ").append(uid).append("\nFeed UID: ").append(feed.getUser().getUid())
					.append("\n");

			if (uid.equals(feed.getUser().getUid().toString())) {
				if (feedInput.getWid() != null && feedInput.getWid() == 0)
					feedInput.setWid(null);
				if (feedInput.getWid() == null && feedInput.getRating() != null)
					return new ResponseEntity<Object>("입력에 문제가 있습니다.\nrating값이 존재하는데 wine값이 존재하지 않습니다",
							HttpStatus.ACCEPTED);
				feed = feedService.update(fid, feedInput);
				resStr.append(feed.getFid()).append("번 피드 수정되었습니다.");
				return new ResponseEntity<Object>(resStr, HttpStatus.OK);
			} else {
				resStr.append("\n수정 실패: 수정을 요청한 유저와 수정할 게시글 작성자와 다릅니다.");
				return new ResponseEntity<Object>(resStr, HttpStatus.ACCEPTED);
			}
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "해당 Feed 조회수 +1")
	@PutMapping("/updateVisit")
	public ResponseEntity<Object> updateVisit(@RequestParam Long fid) {
		try {
			Integer result = feedService.updateVisit(fid);
			return new ResponseEntity<Object>(result + "개 feed 조회수 +1", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "Feed 제거")
	@DeleteMapping("/delete")
	public ResponseEntity<Object> delete(@RequestParam Long fid) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

			String uid = authentication.getName();
			FeedOutputDto feed = feedService.findById(fid);

			StringBuilder resStr = new StringBuilder();
			resStr.append("Request User: ").append(uid).append("\nFeed UID: ").append(feed.getUser().getUid());

			if (uid.equals(feed.getUser().getUid().toString())) {
				feedService.delete(fid);
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
