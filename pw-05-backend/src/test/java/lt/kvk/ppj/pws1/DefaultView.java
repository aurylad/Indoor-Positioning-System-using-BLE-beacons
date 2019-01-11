package lt.kvk.ppj.pws1;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// REF.:
// https://stackoverflow.com/questions/26057995/changing-default-welcome-page-for-spring-boot-application-deployed-as-a-war
@Configuration
public class DefaultView implements WebMvcConfigurer {

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("redirect:/swagger-ui.html");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
	}
}