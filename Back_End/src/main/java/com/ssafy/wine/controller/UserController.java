package com.ssafy.wine.controller;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
//github.com/woob0129/pp.git
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wine.dto.UserDto;
import com.ssafy.wine.entity.User;
import com.ssafy.wine.exception.CUserNotFoundException;
import com.ssafy.wine.handler.CommonResult;
import com.ssafy.wine.handler.SingleResult;
import com.ssafy.wine.repo.UserRepository;
import com.ssafy.wine.service.ResponseService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

/**
 * @author 김병인
 *
 */
@Api(tags = { "2. User" })
@RestController
@RequestMapping(value = "/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {

	private final ResponseService responseService; // 결과를 처리할 Service
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	private ModelMapper modelMapper;

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "회원 단건 조회(FrontEnd에서 사용 금지)", notes = "access_token으로 회원을 조회한다")
	@GetMapping(value = "/")
	public SingleResult<UserDto> findUserById() {
		// SecurityContext에서 인증받은 회원의 정보를 얻어온다.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String uid = authentication.getName();
		User user = userRepository.findById(Long.parseLong(uid)).orElseThrow(CUserNotFoundException::new);
		UserDto userDto = modelMapper.map(user, UserDto.class);
		return responseService.getSingleResult(userDto);
	}

	@ApiOperation(value = "회원 전체 목록, name값을 안줄경우 전체 목록 반환")
	@GetMapping(value = "/findByName")
	public SingleResult<List<UserDto>> findByName(@RequestParam(required = false) String name) {
		List<User> users = new ArrayList<>();
		if (name == null)
			users = userRepository.findAll();
		else
			users = userRepository.findByNickNameLike("%" + name + "%");
		Type typeToken = new TypeToken<List<UserDto>>() {
		}.getType();
		List<UserDto> userDtos = modelMapper.map(users, typeToken);
		return responseService.getSingleResult(userDtos);
	}

	@ApiOperation(value = "uid 회원 정보 조회")
	@GetMapping(value = "/findByUid")
	public SingleResult<UserDto> findByUid(@RequestParam Long uid) {
		User users = userRepository.findById(uid).orElseThrow(NoSuchElementException::new);
		UserDto userDto = modelMapper.map(users, UserDto.class);
		return responseService.getSingleResult(userDto);
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "회원 수정", notes = "회원정보를 수정한다")
	@PutMapping(value = "/")
	public CommonResult modify(@ApiParam(value = "이메일") @RequestParam String email,
			@ApiParam(value = "닉네임") @RequestParam String nickName,
			@ApiParam(value = "비밀번호") @RequestParam String password) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String uid = authentication.getName();
		userRepository.updateEmailUser(uid, email, nickName, passwordEncoder.encode(password));
		return responseService.getSuccessResult();
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "SNS 회원 수정", notes = "SNS 회원정보를 수정한다")
	@PutMapping(value = "/sns/")
	public CommonResult SNSmodify(@ApiParam(value = "닉네임") @RequestParam String nickName) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String uid = authentication.getName();
		userRepository.updateSNSUser(uid, nickName);
		return responseService.getSuccessResult();
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "회원 삭제")
	@DeleteMapping(value = "/")
	public CommonResult delete() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String uid = authentication.getName();
		userRepository.deleteById(Long.parseLong(uid));
		return responseService.getSuccessResult();
	}
}