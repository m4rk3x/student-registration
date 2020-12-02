package com.duocode.studentregistration.config;

/**
 * Created by m4rk1n0 on 11/29/20
 **/
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .components(new Components())
                .info(new Info().title("Student-Course registration Application API").description(
                        "This is a demo Spring Boot RESTful service for TRUEXTEND."));
    }
}
