package iamus.ips.rest;

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

import iamus.ips.jpa.entity.PlanEntity;
import iamus.ips.jpa.repository.PlanRepository;
import io.swagger.annotations.ApiParam;
import iamus.ips.server.api.PlanApi;
import iamus.ips.server.model.Plan;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class PlanRest implements PlanApi {

	@Autowired
	private PlanRepository planRepository;

	public PlanRest() {
		this.planRepository = null;
	}

	@Override
	public ResponseEntity<Void> addPlan(@ApiParam(value = "") @Valid @RequestBody Plan plan) {
		return save(plan, null);
	}

	@Override
	public ResponseEntity<Void> deletePlan(@ApiParam(value = "Numeric ID of the plan to delete", //
			required = true) @PathVariable("id") Long id) {
		planRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<List<Plan>> getPlan() {
		final List<Plan> list = new ArrayList<>();
		for (final PlanEntity src : planRepository.findAll()) {
			list.add(toPlan(src));
		}
		return Utils.toResponseEntity(list);
	}

	@Override
	public ResponseEntity<Plan> getPlanById(@ApiParam(value = "Numeric ID of the plan to get.", //
			required = true) @PathVariable("id") Long id) {
		Optional<PlanEntity> optional = planRepository.findById(id);
		if (optional.isPresent()) {
			return ResponseEntity.ok(toPlan(optional.get()));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Override
	public ResponseEntity<Void> updatePlan(@ApiParam(value = "") @Valid @RequestBody Plan plan) {
		return save(plan, plan.getId());
	}

	@Override
	public ResponseEntity<Plan> getPlanByPlanName(@ApiParam(value = "Name of the plan to get.", //
			required = true) @PathVariable("planId") String planId) {
		PlanEntity optional = planRepository.findOneByPlanId(planId);
		
		return ResponseEntity.ok(toPlan(optional));
	}

	private ResponseEntity<Void> save(final Plan src, Long id) {
		final PlanEntity tgt = new PlanEntity(id);
		tgt.setPlanId(src.getPlanName());
		tgt.setPlanImage(src.getPlanImage());
		tgt.setPlanScale(src.getPlanScale());
		tgt.setPlanHeight(src.getPlanHeight());
		tgt.setPlanWidth(src.getPlanWidth());
		planRepository.save(tgt);
		return ResponseEntity.ok().build();
	}

	private static Plan toPlan(PlanEntity src) {
		final Plan tgt = new Plan();
		tgt.setId(src.getId());
		tgt.setPlanName(src.getPlanId());
		tgt.setPlanImage(src.getPlanImage());
		tgt.setPlanScale(src.getPlanScale());
		tgt.setPlanHeight(src.getPlanHeight());
		tgt.setPlanWidth(src.getPlanWidth());
		return tgt;
	}

}
