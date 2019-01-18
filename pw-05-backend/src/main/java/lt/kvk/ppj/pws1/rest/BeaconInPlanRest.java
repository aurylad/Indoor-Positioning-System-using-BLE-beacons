package lt.kvk.ppj.pws1.rest;

import static lt.kvk.ppj.pws1.rest.Utils.toResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiParam;
import lt.kvk.ppj.pw.s1.server.api.BeaconInPlanApi;
import lt.kvk.ppj.pw.s1.server.model.BeaconInPlan;
import lt.kvk.ppj.pws1.jpa.entity.BeaconEntity;
import lt.kvk.ppj.pws1.jpa.entity.BeaconInPlanEntity;
import lt.kvk.ppj.pws1.jpa.entity.PlanEntity;
import lt.kvk.ppj.pws1.jpa.repository.BeaconInPlanRepository;
import lt.kvk.ppj.pws1.jpa.repository.BeaconRepository;
import lt.kvk.ppj.pws1.jpa.repository.PlanRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders="*")
public class BeaconInPlanRest implements BeaconInPlanApi {

	@Autowired
	private BeaconRepository beaconRepository;

	@Autowired
	private PlanRepository planRepository;

	@Autowired
	private BeaconInPlanRepository beaconInPlanRepository;

	public BeaconInPlanRest() {
		this.beaconRepository = null;
		this.planRepository = null;
		this.beaconInPlanRepository = null;
	}

	@Override
	public ResponseEntity<Void> addBeaconInPlan(@ApiParam(value = "") @Valid @RequestBody BeaconInPlan beaconInPlan) {
		return save(beaconInPlan, null);
	}

	@Override
	public ResponseEntity<Void> deleteBeaconInPlan(@ApiParam(value = "Numeric ID of the beacon in plan to delete.", //
			required = true) @PathVariable("id") Long id) {
		beaconInPlanRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<List<BeaconInPlan>> getBeaconInPlan() {
		final List<BeaconInPlan> list = new ArrayList<>();
		for (final BeaconInPlanEntity src : beaconInPlanRepository.findAllByOrderByIdAsc()) {
			list.add(toBeaconInPlan(src));
		}
		return toResponseEntity(list);
	}

	@Override
	public ResponseEntity<BeaconInPlan> getBeaconInPlanById(
			@ApiParam(value = "Numeric ID of the beacon in plan to get.", //
					required = true) @PathVariable("id") Long id) {
		Optional<BeaconInPlanEntity> optional = beaconInPlanRepository.findById(id);
		if (optional.isPresent()) {
			return ResponseEntity.ok(toBeaconInPlan(optional.get()));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Override
	public ResponseEntity<Void> updateBeaconInPlan(
			@ApiParam(value = "") @Valid @RequestBody BeaconInPlan beaconInPlan) {
		return save(beaconInPlan, beaconInPlan.getId());
	}

	private ResponseEntity<Void> save(final BeaconInPlan src, Long beaconInPlanId) {
		final BeaconEntity beacon = beaconRepository.findOneOrCreateByBeaconId(src.getBeaconId());
		final PlanEntity plan = planRepository.findOneByPlanId(src.getPlandId());
//		final PlanEntity planAll = planRepository.findOneOrCreateByPlanName(plan);
		final BeaconInPlanEntity tgt = new BeaconInPlanEntity(beaconInPlanId);
		tgt.setBeacon(beacon);
		tgt.setCoordinateX(src.getBeaconCoordinateX());
		tgt.setCoordinateY(src.getBeaconCoordinateY());
		tgt.setPlan(plan);
		beaconInPlanRepository.save(tgt);

		return ResponseEntity.ok().build();
	}

	private static BeaconInPlan toBeaconInPlan(BeaconInPlanEntity src) {
		final BeaconInPlan tgt = new BeaconInPlan();
		tgt.setId(src.getId());
		tgt.setBeaconId(src.getBeacon().getBeaconId());
		tgt.setPlandId(src.getPlan().getPlanId());
		tgt.setBeaconCoordinateX(src.getCoordinateX());
		tgt.setBeaconCoordinateY(src.getCoordinateY());
		return tgt;
	}

}
