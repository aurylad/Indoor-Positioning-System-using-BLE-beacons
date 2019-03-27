package iamus.ips.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iamus.ips.server.api.ViolationsApi;
import iamus.ips.server.model.Violations;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders="*")
public class ViolationRest implements ViolationsApi {

	@Override
	public ResponseEntity<List<Violations>> getViolation() {
		// TODO Auto-generated method stub
		return null;
	}

}
