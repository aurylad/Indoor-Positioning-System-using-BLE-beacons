package lt.kvk.ppj.pws1.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.ppj.pw.s1.server.api.PlanApi;
import lt.kvk.ppj.pw.s1.server.model.Plan;

@RestController
@RequestMapping("/api")
public class PlanRest implements PlanApi {

	@Override
	public ResponseEntity<Void> addPlan(@Valid Plan plan) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Void> deletePlan(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<List<Plan>> getPlan() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Plan> getPlanById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Void> updatePlan(@Valid Plan plan) {
		// TODO Auto-generated method stub
		return null;
	}

}
