package iamus.ips.violations;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import iamus.ips.jpa.entity.RestrictedAreaEntity;
import iamus.ips.jpa.repository.RestrictedAreaRepository;

public class Test {

	@Autowired
	private static RestrictedAreaRepository restrictedAreaRepository;
	
	public Test(){
		this.restrictedAreaRepository = null;
	}
	
	public static void test() {
		System.out.println("Suveike");
		RestrictedAreaEntity optional = (RestrictedAreaEntity) restrictedAreaRepository.findAllByOrderByIdAsc();
		System.out.println(optional);
		System.out.println("Po optional");
		
	}

}
