package com.ssafy.wine.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ssafy.wine.dto.FileDownLoadDto;
import com.ssafy.wine.dto.FileUpLoadDto;
import com.ssafy.wine.enums.FileLoadEnum;
/**
 * @author 김병인
 *
 */
public interface FileLoadSerivce {

	public FileUpLoadDto uploadFile(MultipartFile file, FileLoadEnum type, String id, String num);

	public List<FileDownLoadDto> downloadFile(FileLoadEnum type, String id, String uri);

	public String deleteFile(FileLoadEnum type, String id, String name);

}
