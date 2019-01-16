package lt.kvk.ppj.pws1.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiParam;
import lt.kvk.ppj.pw.s1.server.api.BeaconApi;
import lt.kvk.ppj.pw.s1.server.model.Beacon;
import lt.kvk.ppj.pws1.jpa.entity.BeaconEntity;
import lt.kvk.ppj.pws1.jpa.repository.BeaconRepository;

@RestController
@RequestMapping("/api")
public class BeaconRest implements BeaconApi {

	@Autowired
	private BeaconRepository beaconRepository;

	public BeaconRest() {
		this.beaconRepository = null;
	}

	@Override
	public ResponseEntity<Void> addBeacon(@ApiParam(value = "") @Valid @RequestBody Beacon beacon) {
		return save(beacon, null);
	}

	@Override
	public ResponseEntity<Void> deleteBeacon(@ApiParam(value = "Numeric ID of the beacon to delete", //
			required = true) @PathVariable("id") Long id) {
		beaconRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<List<Beacon>> getBeacon() {
		final List<Beacon> list = new ArrayList<>();
		for (final BeaconEntity src : beaconRepository.findAll()) {
			list.add(toBeacon(src));
		}
		return Utils.toResponseEntity(list);
	}

	@Override
	public ResponseEntity<Beacon> getBeaconById(@ApiParam(value = "Numeric ID of the beacon to get.", //
			required = true) @PathVariable("id") Long id) {
		Optional<BeaconEntity> optional = beaconRepository.findById(id);
		if (optional.isPresent()) {
			return ResponseEntity.ok(toBeacon(optional.get()));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Override
	public ResponseEntity<Void> updateBeacon(@ApiParam(value = "") @Valid @RequestBody Beacon beacon) {
		return save(beacon, beacon.getId());
	}

	private static Beacon toBeacon(BeaconEntity src) {
		final Beacon tgt = new Beacon();
		tgt.setId(src.getId());
		tgt.setBeaconId(src.getBeaconId());
		return tgt;
	}

	private ResponseEntity<Void> save(final Beacon src, Long id) {
		final BeaconEntity tgt = new BeaconEntity(id);
		tgt.setBeaconId(src.getBeaconId());
		beaconRepository.save(tgt);
		return ResponseEntity.ok().build();
	}
}
