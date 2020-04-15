package com.ssafy.wine.service;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.wine.dto.WineDto;
import com.ssafy.wine.entity.Wine;
import com.ssafy.wine.enums.WineCountryEnum;
import com.ssafy.wine.enums.WineFindEnum;
import com.ssafy.wine.enums.WineRankEnum;
import com.ssafy.wine.exception.FileUploadException;
import com.ssafy.wine.property.FileLoadProperties;
import com.ssafy.wine.repo.WineRepository;

@Service
public class WineServiceImpl implements WineService {

	@Autowired
	private WineRepository wineRepository;

	@Autowired
	private ModelMapper modelMapper;

	private final Path wineImgLocation;

	private List<WineDto> convertListDto(List<Wine> wines) {
		Type typeToken = new TypeToken<List<WineDto>>() {}.getType();
		return modelMapper.map(wines, typeToken);
	}
	
	
	@Autowired
	public WineServiceImpl(FileLoadProperties prop) {
		wineImgLocation = Paths.get(prop.getImgWine()).toAbsolutePath().normalize();
		try {
			Files.createDirectories(this.wineImgLocation);
		} catch (Exception e) {
			throw new FileUploadException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", e);
		}
	}

	@Override
	public List<WineDto> findAll(WineFindEnum type) {
		
		List<Wine> wines = new ArrayList<>();
		switch (type) {
		case KOR_UP:
			wines = wineRepository.findAllByOrderByNameKorAsc();
			break;
		case ENG_UP:
			wines = wineRepository.findAllByOrderByNameEngAsc();
			break;
		case VISIT_DOWN:
			wines = wineRepository.findAllByOrderByVisitDesc();
			break;
		case LIKE_DOWN:
			wines = wineRepository.findAllByOrderByLikeNumDesc();
			break;
		default:
			break;
		}
		return convertListDto(wines);
	}

	@Override
	public List<WineDto> findRank(WineRankEnum type) {
		List<Wine> wines = new ArrayList<>();
		switch (type) {
		case VISIT_3:
			wines = wineRepository.findTop3ByOrderByVisitDesc();
			break;
		case VISIT_5:
			wines = wineRepository.findTop5ByOrderByVisitDesc();
			break;
		case LIKE_3:
			wines = wineRepository.findTop3ByOrderByLikeNumDesc();
			break;
		case LIKE_5:
			wines = wineRepository.findTop5ByOrderByLikeNumDesc();
			break;
		default:
			break;
		}
		return convertListDto(wines);
	}

	@Override
	public WineDto findByWine(Long wid) {
		Wine wine = wineRepository.findById(wid).orElseThrow(NoSuchElementException::new);
		return modelMapper.map(wine, WineDto.class);
	}

	@Override
	public List<WineDto> findByName(String name) {
		List<Wine> wines = wineRepository.findByNameKorLike("%" + name + "%");
		wines.addAll(wineRepository.findByNameEngLike("%" + name + "%"));
		return convertListDto(wines);
	}

	@Override
	public List<WineDto> smartSearch(String type, Boolean sparkling, WineCountryEnum[] country, Integer sweet, BigDecimal alcohol) {
		List<Wine> wines = new ArrayList<>();
		wineRepository.findAll(wineRepository.smartSearch(type, sparkling, country, sweet, alcohol)).forEach(wines::add);
		return convertListDto(wines);
	}

	@Override
	public List<WineDto> search(WineCountryEnum[] country, String[] use, String name, String food) {
		List<Wine> wines = new ArrayList<>();
		wineRepository.findAll(wineRepository.search(country, use, name, food)).forEach(wines::add);
		return convertListDto(wines);
	}
	

	@Override
	public List<WineDto> findByWhenUse(String name) {
		List<Wine> wines = wineRepository.findByWhenUseContains(name);
		return convertListDto(wines);
	}
	@Override
	public List<WineDto> findByFoodMatch(String name) {
		List<Wine> wines = wineRepository.findByFoodMatchContains(name);
		return convertListDto(wines);
	}
	
	@Override
	public List<String> findCountryAll(){
		return wineRepository.findDistinctCountryAll();
	}

	@Override
	public List<String> findWineryAll() {
		return wineRepository.findDistinctWineryAll();
	}

	@Override
	public List<String> findWineryByCountry(WineCountryEnum country) {
		return wineRepository.findDistinctWineryByCountry(country.toString());
	}	

	@Override
	@Transactional
	public Integer updateVisit(Long wid) {
		Wine wine = wineRepository.findById(wid).orElseThrow(NoSuchElementException::new);
		return wine.updateVisit();
	}

	@Override
	@Transactional
	public void deleteAll() {
		wineRepository.deleteAll();
	}

}
