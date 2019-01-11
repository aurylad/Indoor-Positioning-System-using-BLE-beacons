package lt.kvk.ppj.pws1.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.ppj.pw.s1.server.api.BeaconApi;
import lt.kvk.ppj.pw.s1.server.model.Beacon;

@RestController
@RequestMapping("/api")
public class BeaconRest implements BeaconApi {

	@Override
	public ResponseEntity<Void> addBeacon(@Valid Beacon beacon) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Void> deleteBeacon(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<List<Beacon>> getBeacon() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Beacon> getBeaconById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Void> updateBeacon(@Valid Beacon beacon) {
		// TODO Auto-generated method stub
		return null;
	}

}
