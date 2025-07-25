package com.eva_oarisa_orni.springboot_backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // List the exact allowed origins
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000", "http://localhost:3002", "http://localhost:3003")  // Add http://localhost:3005 here
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true);  // Allow credentials (cookies, headers)
            }
        };
    }
}











