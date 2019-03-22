package iamus.ips.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iamus.ips.server.api.FreeBeaconApi;
import iamus.ips.server.model.Beacon;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders="*")
public class FreeBeaconRest implements FreeBeaconApi {

	@Override
	public ResponseEntity<List<Beacon>> getFreeBeacons() {
		// TODO Auto-generated method stub
		return null;
	}

}
