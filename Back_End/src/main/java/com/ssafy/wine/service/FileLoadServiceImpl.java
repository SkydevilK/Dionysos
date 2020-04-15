package com.ssafy.wine.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.wine.dto.FileDownLoadDto;
import com.ssafy.wine.dto.FileUpLoadDto;
import com.ssafy.wine.enums.FileLoadEnum;
import com.ssafy.wine.exception.FileUploadException;
import com.ssafy.wine.property.FileLoadProperties;
/**
 * @author 김병인
 *
 */
@Service
public class FileLoadServiceImpl implements FileLoadSerivce {

	private final Path profileLocation;
	private final Path backgroundLocation;
	private final Path feedLocation;

	@Autowired
	public FileLoadServiceImpl(FileLoadProperties prop) {
		this.profileLocation = Paths.get(prop.getImgProfile()).toAbsolutePath().normalize();
		this.backgroundLocation = Paths.get(prop.getImgBackground()).toAbsolutePath().normalize();
		this.feedLocation = Paths.get(prop.getImgFeed()).toAbsolutePath().normalize();
		try {
			Files.createDirectories(this.profileLocation);
			Files.createDirectories(this.backgroundLocation);
			Files.createDirectories(this.feedLocation);
		} catch (Exception e) {
			throw new FileUploadException("파일을 업로드할 디렉토리를 생성하지 못했습니다.", e);
		}
	}

	@Override
	public FileUpLoadDto uploadFile(MultipartFile file, FileLoadEnum type, String id, String name) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			Path targetLocation;
			String changeName = name + "." + file.getContentType().split("/")[1];
			StringBuilder addPath = new StringBuilder();
			addPath.append(String.valueOf(id)).append("/").append(changeName);

			switch (type) {
			case PROFILE:
				Files.createDirectories(this.profileLocation.resolve(String.valueOf(id)));
				targetLocation = this.profileLocation.resolve(addPath.toString());
				break;
			case BACKGROUND:
				Files.createDirectories(this.backgroundLocation.resolve(String.valueOf(id)));
				targetLocation = this.backgroundLocation.resolve(addPath.toString());
				break;
			case FEED:
				Files.createDirectories(this.feedLocation.resolve(String.valueOf(id)));
				targetLocation = this.feedLocation.resolve(addPath.toString());
				break;
			default:
				throw new FileUploadException("[" + fileName + "] 파일 업로드에 실패하였습니다. 잘못된 type 값 입니다.");
			}
			Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
			return new FileUpLoadDto(targetLocation.toString(), fileName, changeName, file.getContentType(),
					file.getSize());
		} catch (Exception e) {
			throw new FileUploadException("[" + fileName + "] 파일 업로드에 실패하였습니다. 다시 시도하십시오.", e);
		}
	}

	@Override
	public List<FileDownLoadDto> downloadFile(FileLoadEnum type, String id, String uri) {
		try {
			Path filePath;
			switch (type) {
			case PROFILE:
				filePath = this.profileLocation.resolve(String.valueOf(id)).normalize();
				break;
			case BACKGROUND:
				filePath = this.backgroundLocation.resolve(String.valueOf(id)).normalize();
				break;
			case FEED:
				filePath = this.feedLocation.resolve(String.valueOf(id)).normalize();
				break;
			default:
				throw new FileUploadException("파일 다운로드 실패하였습니다. 잘못된 type 값 입니다.");
			}

			File f = new File(filePath.toString());
			File[] files = f.listFiles();
			List<FileDownLoadDto> fileDownLoads = new ArrayList<>();
			for (File file : files) {
				String fileUrl = uri + file.toURI().toString().split("Img")[1];
				fileDownLoads.add(new FileDownLoadDto(fileUrl, file.getName(), file.length()));
			}
			return fileDownLoads;
		} catch (Exception e) {
			throw new FileUploadException("파일 다운로드 실패하였습니다.", e);
		}
	}

	@Override
	public String deleteFile(FileLoadEnum type, String id, String name) {
		try {
			Path targetPath;
			StringBuilder addPath = new StringBuilder();
			addPath.append(id).append("/").append(name);
			switch (type) {
			case PROFILE:
				targetPath = this.profileLocation.resolve(addPath.toString()).normalize();
				break;
			case BACKGROUND:
				targetPath = this.backgroundLocation.resolve(addPath.toString()).normalize();
				break;
			case FEED:
				targetPath = this.feedLocation.resolve(addPath.toString()).normalize();
				break;
			default:
				throw new FileUploadException("파일 삭제에 실패했습니다. 잘못된 type 값 입니다.");
			}
			Files.delete(targetPath);
			return targetPath.toString();
		} catch (Exception e) {
			throw new FileUploadException("파일 삭제에 실패하였습니다.", e);
		}

	}

}
