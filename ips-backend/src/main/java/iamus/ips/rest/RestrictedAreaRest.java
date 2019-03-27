package iamus.ips.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iamus.ips.server.api.RestrictedAreaApi;
import iamus.ips.server.model.RestrictedArea;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class RestrictedAreaRest implements RestrictedAreaApi {

	@Override
	public ResponseEntity<Void> addRestrictedArea(@Valid RestrictedArea object) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Void> deleteRestrictedArea(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<List<RestrictedArea>> getRestrictedArea() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<RestrictedArea> getRestrictedAreaById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Void> updateRestrictedArea(@Valid RestrictedArea object) {
		// TODO Auto-generated method stub
		return null;
	}

}
