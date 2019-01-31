package iamus.ips;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.RepositoryDetectionStrategy.RepositoryDetectionStrategies;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@SpringBootApplication
@Configuration
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

	// REF.:
	// https://docs.spring.io/spring-data/rest/docs/current/reference/html/
	@Bean
	public RepositoryRestConfigurer repositoryRestConfigurer() {
		return new RepositoryRestConfigurer() {

			@Override
			public void configureRepositoryRestConfiguration(final RepositoryRestConfiguration conf) {
				conf.setBasePath("/api/db");
				conf.setExposeRepositoryMethodsByDefault(false);
				conf.setRepositoryDetectionStrategy(RepositoryDetectionStrategies.ANNOTATED);
			}
		};
	}
}
