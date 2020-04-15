package com.ssafy.wine.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * @author 김병인
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
public class FileUpLoadDto {

	private String filePath;
	private String fileOriginalName;
	private String fileChangeName;
	private String fileType;
	private long fileSize;
}
