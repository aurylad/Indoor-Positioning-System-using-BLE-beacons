package iamus.ips;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.RepositoryDetectionStrategy.RepositoryDetectionStrategies;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import iamus.ips.App;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

@SpringBootApplication
@Configuration
@EnableSwagger2WebMvc
@Import({ SpringDataRestConfiguration.class })
@ComponentScan(excludeFilters = @Filter(type = FilterType.ASSIGNABLE_TYPE, value = App.class)) 
public class AppDev {

	public static void main(String[] args) throws Exception {
		System.setProperty("spring.jackson.serialization.INDENT_OUTPUT", "true");
		final ConfigurableApplicationContext ctx = SpringApplication.run(AppDev.class, args);
	}

	@Bean
	public Docket docket() {
		return new Docket(DocumentationType.SWAGGER_2) //
				.select() //
				.apis(RequestHandlerSelectors.any()) //
				.paths(PathSelectors.any()).build();
	}

	// REF.:
	// https://docs.spring.io/spring-data/rest/docs/current/reference/html/
//	@Bean
//	public RepositoryRestConfigurer repositoryRestConfigurer() {
//		return new RepositoryRestConfigurer() {
//
//			@Override
//			public void configureRepositoryRestConfiguration(final RepositoryRestConfiguration conf) {
//				conf.setBasePath("/api/db");
//				conf.setExposeRepositoryMethodsByDefault(true);
//				conf.setRepositoryDetectionStrategy(RepositoryDetectionStrategies.ALL);
//			}
//		};
//	}
}
