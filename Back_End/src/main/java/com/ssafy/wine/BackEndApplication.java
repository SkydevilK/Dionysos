package com.ssafy.wine;

import java.nio.file.Paths;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ssafy.wine.property.FileLoadProperties;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableJpaAuditing
@SpringBootApplication
@EnableConfigurationProperties({ FileLoadProperties.class })
@EnableSwagger2
@Configuration
public class BackEndApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}
	
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).select().apis(RequestHandlerSelectors.any())
				.paths(PathSelectors.any()).build().apiInfo(metadata());
	}

	private ApiInfo metadata() {
		return new ApiInfoBuilder().title("Wine REST API").description("WINE PROJECT REST SERVCICE").version("1.0")
				.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	
	@Autowired
	private FileLoadProperties fileLoadProperty;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/Wine/**").addResourceLocations(Paths.get(fileLoadProperty.getImgWine()).toUri().toString());
        registry.addResourceHandler("/Profile/**").addResourceLocations(Paths.get(fileLoadProperty.getImgProfile()).toUri().toString());
        registry.addResourceHandler("/Background/**").addResourceLocations(Paths.get(fileLoadProperty.getImgBackground()).toUri().toString());
        registry.addResourceHandler("/Feed/**").addResourceLocations(Paths.get(fileLoadProperty.getImgFeed()).toUri().toString());
        
	}

}
