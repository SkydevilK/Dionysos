package com.ssafy.wine.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.wine.dto.FileDownLoadDto;
import com.ssafy.wine.dto.FileUpLoadDto;
import com.ssafy.wine.enums.FileLoadEnum;
import com.ssafy.wine.service.FileLoadServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * @author 김병인
 *
 */
@RestController
@Api(tags = { "7. FileLoad" }, description = "File Upload & Download REST API")
@RequestMapping(value = "/fileload")
@CrossOrigin(origins = "*")
public class FileLoadController {

	@Autowired
	private FileLoadServiceImpl fileLoadService;

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "파일 업로드 - Swagger는 안됨, Postman 가능, id는 uid or fid, 값이 잘못되면 경로가 이상할 수 있어서 정확해야 됩니다.")
	@PostMapping("/uploadFile")
	public ResponseEntity<Object> uploadFile(@RequestPart("file") MultipartFile[] files,
			@RequestParam FileLoadEnum type, @RequestParam Long id) {
		try {
			List<FileUpLoadDto> fileDtos = new ArrayList<>();
			for (int i = 0; i < files.length; i++) {
				fileDtos.add(fileLoadService.uploadFile(files[i], type, id.toString(), String.valueOf(i)));
			}
			return new ResponseEntity<Object>(fileDtos, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiOperation(value = "파일 불러오기 - id는 uid or fid, 값이 잘못되면 경로가 이상할 수 있어서 정확해야 됩니다.")
	@GetMapping("/downloadFile")
	public ResponseEntity<Object> downloadFile(@RequestParam FileLoadEnum type, @RequestParam Long id,
			HttpServletRequest req) {
		try {
			List<FileDownLoadDto> fileInfoDtos = fileLoadService.downloadFile(type, id.toString(),
					req.getRequestURL().toString().split("/fileload")[0]);
			return new ResponseEntity<Object>(fileInfoDtos, HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

	@ApiImplicitParams({
			@ApiImplicitParam(name = "TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header") })
	@ApiOperation(value = "파일 삭제 - 확장자 명까지 필수, id는 uid or fid, 값이 잘못되면 경로가 이상할 수 있어서 정확해야 됩니다.")
	@DeleteMapping("/deleteFile")
	public ResponseEntity<Object> deleteFile(@RequestParam FileLoadEnum type, @RequestParam Long id,
			@RequestParam String fileName) {
		try {
			String path = fileLoadService.deleteFile(type, id.toString(), fileName);
			return new ResponseEntity<Object>(path + " 파일을 삭제했습니다.", HttpStatus.OK);
		} catch (Exception e) {
			throw e;
		}
	}

}
