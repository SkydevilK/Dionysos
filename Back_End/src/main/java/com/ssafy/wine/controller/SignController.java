package com.ssafy.wine.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.wine.email.MailUtils;
import com.ssafy.wine.email.TempKey;
import com.ssafy.wine.entity.User;
import com.ssafy.wine.exception.CEmailSigninFailedException;
import com.ssafy.wine.handler.CommonResult;
import com.ssafy.wine.handler.ListResult;
import com.ssafy.wine.handler.SingleResult;
import com.ssafy.wine.repo.UserRepository;
import com.ssafy.wine.security.JwtService;
import com.ssafy.wine.service.ResponseService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

/**
 * @author 김병인
 *
 */
@Api(tags = { "1. Sign" })
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins = "*")
public class SignController {

	@Autowired
	private JavaMailSender mailSender;

	private final UserRepository userRepository;
	private final JwtService jwtService;
	private final ResponseService responseService;
	private final PasswordEncoder passwordEncoder;

	@ApiOperation(value = "로그인", notes = "이메일 회원 로그인을 한다.")
	@GetMapping(value = "/signin")
	public ListResult<String> signin(@ApiParam(value = "회원ID : 이메일") @RequestParam String email,
			@ApiParam(value = "비밀번호") @RequestParam String password) {
		User user = userRepository.findByEmail(email).orElseThrow(CEmailSigninFailedException::new);
		if (!passwordEncoder.matches(password, user.getPassword()))
			throw new CEmailSigninFailedException();
		List<String> result = new ArrayList<String>();
		result.add(jwtService.createToken(user.getUsername(), user.getRoles()));
		result.add(user.getUid().toString());
		result.add(user.getNickName());
		return responseService.getListResult(result);
	}

	@ApiOperation(value = "가입", notes = "회원가입을 한다.")
	@PostMapping(value = "/signup")
	public CommonResult signin(@ApiParam(value = "회원ID : 이메일") @RequestParam String email,
			@ApiParam(value = "비밀번호") @RequestParam String password,
			@ApiParam(value = "닉네임") @RequestParam String nickName) {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user != null) {
			System.out.println(user.getEmail());
			return responseService.getFailResult(-9999, "중복 회원");
		}

		// 난수 생성
		String authkey = new TempKey().getKey(50, false);

		userRepository.save(User.builder().email(email).password(passwordEncoder.encode(password)).nickName(nickName)
				.emailCertify(authkey).roles(Collections.singletonList("EMAIL_USER")).build());
		MailUtils sendMail;
		try {
			sendMail = new MailUtils(mailSender);
			sendMail.setTo(email);
			sendMail.setSubject("[Dionysos] 회원가입 이메일 인증");
			sendMail.setText(new StringBuffer().append("<h1>[이메일 인증]</h1>").append("<p>아래 링크를 클릭하시면 이메일 인증이 완료됩니다.</p>")
					.append("<a href='http://localhost:8090/WineProject/user/Confirm?email=").append(email)
					.append("&authkey=").append(authkey).append("' target='_blenk'>이메일 인증 확인</a>").toString());
			sendMail.setFrom("noreply@Dionysos.com", "Dionysos Master");
			sendMail.send();
		} catch (MessagingException | UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return responseService.getSuccessResult();
	}

	@ApiOperation(value = "이메일 인증", notes = "이메일 인증용")
	@GetMapping(value = "/Confirm")
	public CommonResult emailConfirm(@RequestParam String email, @ApiParam(value = "비밀번호") @RequestParam String authkey)
			throws Exception {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user != null) {
			if (user.getEmailCertify() == "Y") {
				return responseService.getSuccessResult();
			}
			if (user.getEmailCertify().equals(authkey)) {
				userRepository.updateEmail(email);
				return responseService.getSuccessResult();
			} else
				return responseService.getFailResult(-9999, "인증키가 다릅니다.");
		}
		return responseService.getFailResult(-9999, "회원 검색 실패");
	}

	@ApiOperation(value = "SNS 가입 및 로그인", notes = "SNS 회원가입 및 로그인을 한다.")
	@PostMapping(value = "/sns/signup")
	public ListResult<String> sns_signin(@ApiParam(value = "SNS_ID") @RequestParam String sns_id,
			@ApiParam(value = "닉네임") @RequestParam String nickName,
			@ApiParam(value = "SNS 타입") @RequestParam String snsType) {
		User user = null;
		switch (snsType) {
		case "KAKAO":
			user = userRepository.findByKakaotalkId(sns_id).orElse(null);
			if (user == null)
				user = userRepository.save(User.builder().kakaotalkId(sns_id).nickName(nickName)
						.roles(Collections.singletonList("SNS_USER")).build());
			break;
		case "GOOGLE":
			user = userRepository.findByGoogleId(sns_id).orElse(null);
			if (user == null)
				user = userRepository.save(User.builder().googleId(sns_id).nickName(nickName)
						.roles(Collections.singletonList("SNS_USER")).build());
			break;
		case "NAVER":
			user = userRepository.findByNaverId(sns_id).orElse(null);
			if (user == null)
				user = userRepository.save(User.builder().naverId(sns_id).nickName(nickName)
						.roles(Collections.singletonList("SNS_USER")).build());
			break;
		}
		List<String> result = new ArrayList<String>();
		result.add(jwtService.createToken(user.getUsername(), user.getRoles()));
		result.add(user.getUid().toString());
		result.add(user.getNickName());
		return responseService.getListResult(result);
	}

	@ApiOperation(value = "이메일 중복 검사", notes = "이메일 중복 검사")
	@PostMapping(value = "/checkEmail")
	public CommonResult checkDuplicateEmail(@ApiParam(value = "email") @RequestParam String email) {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user == null) {
			return responseService.getSuccessResult();
		} else {
			return responseService.getFailResult(-9999, "중복된 회원");
		}
	}
}