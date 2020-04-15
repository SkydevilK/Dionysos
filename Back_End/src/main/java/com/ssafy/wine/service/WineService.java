package com.ssafy.wine.service;

import java.math.BigDecimal;
import java.util.List;

import com.ssafy.wine.dto.WineDto;
import com.ssafy.wine.enums.WineCountryEnum;
import com.ssafy.wine.enums.WineFindEnum;
import com.ssafy.wine.enums.WineRankEnum;

public interface WineService {

	public List<WineDto> findAll(WineFindEnum type);

	public List<WineDto> findRank(WineRankEnum type);

	public WineDto findByWine(Long wid);

	public List<WineDto> findByName(String name);

	public List<WineDto> smartSearch(String type, Boolean sparkling, WineCountryEnum[] country, Integer sweet, BigDecimal alcohol);
	
	public List<WineDto> search(WineCountryEnum[] country, String[] use, String name, String food);

	public List<String> findCountryAll();

	public List<String> findWineryAll();
	
	public List<String> findWineryByCountry(WineCountryEnum country);
	
	public List<WineDto> findByWhenUse(String name);

	public List<WineDto> findByFoodMatch(String name);

	public Integer updateVisit(Long wid);
	
	public void deleteAll();

}
