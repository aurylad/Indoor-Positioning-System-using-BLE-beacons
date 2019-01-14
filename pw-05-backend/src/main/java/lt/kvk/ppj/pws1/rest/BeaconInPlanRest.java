package lt.kvk.ppj.pws1.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.ppj.pw.s1.server.api.BeaconInPlanApi;
import lt.kvk.ppj.pw.s1.server.model.BeaconInPlan;
import lt.kvk.ppj.pw.s1.server.model.TrackedObject;
import lt.kvk.ppj.pws1.jpa.entity.BeaconInPlanEntity;
import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;

@RestController
@RequestMapping("/api")
public class BeaconInPlanRest implements BeaconInPlanApi {

	@Override
	public ResponseEntity<Void> addBeaconInPlan(@Valid BeaconInPlan beaconInPlan) {
		return null;
	}

	@Override
	public ResponseEntity<Void> deleteBeaconInPlan(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<List<BeaconInPlan>> getBeaconInPlan() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<BeaconInPlan> getBeaconInPlanById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Void> updateBeaconInPlan(@Valid BeaconInPlan beaconInPlan) {
		// TODO Auto-generated method stub
		return null;
	}
	
	private ResponseEntity<Void> save(final BeaconInPlan src, Long beaconInPlanId) {
//		final BeaconInPlanEntity tgt = new BeaconInPlanEntity();
//		tgt.set
		return ResponseEntity.ok().build();
	}

}
