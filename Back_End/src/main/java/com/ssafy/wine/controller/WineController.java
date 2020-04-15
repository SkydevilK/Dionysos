package com.ssafy.wine.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wine.dto.WineDto;
import com.ssafy.wine.enums.WineCountryEnum;
import com.ssafy.wine.enums.WineFindEnum;
import com.ssafy.wine.enums.WineRankEnum;
import com.ssafy.wine.service.WineService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Api(tags = { "3. Wine" })
@RequestMapping(value = "/wine")
@CrossOrigin(origins = "*")
@Slf4j
public class WineController {

	@Autowired
	private WineService wineService;

	@ApiOperation(value = "와인 전체 목록")
	@GetMapping("/fineAll/{type}")
	public ResponseEntity<Object> fineAll(@PathVariable WineFindEnum type) {
		try {
			List<WineDto> wines = wineService.findAll(type);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			log.error("findAll fail", e);
			throw e;
		}
	}

	@ApiOperation(value = "와인랭크 - 조회수,좋아요")
	@GetMapping("/findRank/{type}")
	public ResponseEntity<Object> findRank(@PathVariable WineRankEnum type) {
		try {
			List<WineDto> wines = wineService.findRank(type);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "와인 번호 검색 - 개별선택할때")
	@GetMapping("/findByWid/{wid}")
	public ResponseEntity<Object> findByWid(@PathVariable Long wid) {
		try {
			WineDto wine = wineService.findByWine(wid);
			return new ResponseEntity<Object>(wine, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "와인 이름 검색")
	@GetMapping("/findByName/{name}")
	public ResponseEntity<Object> findByName(@PathVariable String name) {
		try {
			List<WineDto> wines = wineService.findByName(name);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "와인 스마트 검색 - type, sparkling, country[], sweet")
	@GetMapping("/smartSearch")
	public ResponseEntity<Object> smartSearch(
			@RequestParam(required = false) String type,
			@RequestParam(required = false) Boolean sparkling,
			@RequestParam(required = false) WineCountryEnum[] country,
			@RequestParam(required = false) Integer sweet,
			@RequestParam(required = false) BigDecimal alcohol) {
		try {
			List<WineDto> wines = wineService.smartSearch(type, sparkling, country, sweet, alcohol);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "와인 검색 - country[], use[], name, food")
	@GetMapping("/search")
	public ResponseEntity<Object> search(
			@RequestParam(required = false) WineCountryEnum[] country,
			@RequestParam(required = false) String[] use,
			@RequestParam(required = false) String name,
			@RequestParam(required = false) String food) {
		try {
			List<WineDto> wines = wineService.search(country, use, name, food);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "와인 When_Use 검색")
	@GetMapping("/findByWhenUse/{name}")
	public ResponseEntity<Object> findByWhenUse(@PathVariable String name) {
		try {
			List<WineDto> wines = wineService.findByWhenUse(name);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "와인 Food_Match 검색")
	@GetMapping("/findByFoodMatch/{name}")
	public ResponseEntity<Object> findByFoodMatch(@PathVariable String name) {
		try {
			List<WineDto> wines = wineService.findByFoodMatch(name);
			return new ResponseEntity<Object>(wines, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "모든 국가 검색")
	@GetMapping("/findCountryAll")
	public ResponseEntity<Object> findCountryAll() {
		try {
			List<String> countrys = wineService.findCountryAll();
			return new ResponseEntity<Object>(countrys, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}
	
	@ApiOperation(value = "모든 와이너리 검색")
	@GetMapping("/findWineryAll")
	public ResponseEntity<Object> findWineryAll() {
		try {
			List<String> winerys = wineService.findWineryAll();
			return new ResponseEntity<Object>(winerys, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "국가별 와이너리 검색")
	@GetMapping("/findWineryByCountry")
	public ResponseEntity<Object> findWineryByCountry(@RequestParam WineCountryEnum country) {
		try {
			List<String> winerys = wineService.findWineryByCountry(country);
			return new ResponseEntity<Object>(winerys, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "해당 와인 조회수 ++")
	@PutMapping("/updateVisit/{wid}")
	public ResponseEntity<Object> updateVisit(@PathVariable Long wid) {
		try {
			Integer result = wineService.updateVisit(wid);
			if (result != null) {
				return new ResponseEntity<Object>("조회수 업데이트!\n현재 조회수: " + result, HttpStatus.OK);
			} else {
				return new ResponseEntity<Object>("조회수 업데이트 실패", HttpStatus.NOT_ACCEPTABLE);
			}
		} catch (Exception e) {
			log.error("updateVisit fail", e);
			throw e;
		}
	}
}
