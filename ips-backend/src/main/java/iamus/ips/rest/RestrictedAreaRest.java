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
import iamus.ips.jpa.entity.RestrictedAreaEntity;
import iamus.ips.jpa.repository.PlanRepository;
import iamus.ips.jpa.repository.RestrictedAreaRepository;
import iamus.ips.server.api.RestrictedAreaApi;
import iamus.ips.server.model.RestrictedArea;
import iamus.ips.violations.ViolationCheck;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class RestrictedAreaRest implements RestrictedAreaApi {

	@Autowired
	private PlanRepository planRepository;

	@Autowired
	private RestrictedAreaRepository restrictedAreaRepository;

	public RestrictedAreaRest() {
		this.planRepository = null;
		this.restrictedAreaRepository = null;
	}

	@Override
	public ResponseEntity<Void> addRestrictedArea(@ApiParam(value = "") @Valid @RequestBody RestrictedArea object) {
		return save(object, null);
	}

	@Override
	public ResponseEntity<Void> deleteRestrictedArea(@ApiParam(value = "Numeric ID of the restricted area to delete.", //
			required = true) @PathVariable("id") Long id) {
		restrictedAreaRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	@Override
	public ResponseEntity<List<RestrictedArea>> getRestrictedArea() {
		final List<RestrictedArea> list = new ArrayList<>();
		for (final RestrictedAreaEntity src : restrictedAreaRepository.findAllByOrderByIdAsc()) {
			list.add(toRestrictedArea(src));
		}
		return Utils.toResponseEntity(list);
	}

	@Override
	public ResponseEntity<RestrictedArea> getRestrictedAreaById(@ApiParam(value = "Numeric ID of the object to get.", //
			required = true) @PathVariable("id") Long id) {
		Optional<RestrictedAreaEntity> optional = restrictedAreaRepository.findById(id);
		if (optional.isPresent()) {
			return ResponseEntity.ok(toRestrictedArea(optional.get()));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Override
	public ResponseEntity<Void> updateRestrictedArea(@ApiParam(value = "") @Valid @RequestBody RestrictedArea object) {
		return save(object, object.getId());
	}

	private ResponseEntity<Void> save(final RestrictedArea src, Long objectId) {
		final PlanEntity plan = planRepository.findOneByPlanId(src.getPlanId());
		final RestrictedAreaEntity tgt = new RestrictedAreaEntity(objectId);
		tgt.setBottomLeftCoordX(src.getBottomLeftCoordX());
		tgt.setBottomLeftCoordY(src.getBottomLeftCoordY());
		tgt.setBottomRightCoordX(src.getBottomRightCoordX());
		tgt.setBottomRightCoordY(src.getBottomRightCoordY());
		tgt.setTopLeftCoordX(src.getTopLeftCoordX());
		tgt.setTopLeftCoordY(src.getTopLeftCoordY());
		tgt.setTopRightCoordX(src.getTopRightCoordX());
		tgt.setTopRightCoordY(src.getTopRightCoordY());
		tgt.setRestrictedAreaName(src.getRestrictedAreaName());
		tgt.setAccessLevel(src.getAccessLevel());
		tgt.setPlan(plan);
		restrictedAreaRepository.save(tgt);
		return ResponseEntity.ok().build();
	}

	private static RestrictedArea toRestrictedArea(RestrictedAreaEntity src) {
		final RestrictedArea tgt = new RestrictedArea();
		tgt.setId(src.getId());
		tgt.setBottomLeftCoordX(src.getBottomLeftCoordX());
		tgt.setBottomLeftCoordY(src.getBottomLeftCoordY());
		tgt.setBottomRightCoordX(src.getBottomRightCoordX());
		tgt.setBottomRightCoordY(src.getBottomRightCoordY());
		tgt.setTopLeftCoordX(src.getTopLeftCoordX());
		tgt.setTopLeftCoordY(src.getTopLeftCoordY());
		tgt.setTopRightCoordX(src.getTopRightCoordX());
		tgt.setTopRightCoordY(src.getTopRightCoordY());
		tgt.setRestrictedAreaName(src.getRestrictedAreaName());
		tgt.setPlanId(src.getPlan().getPlanId());
		tgt.setAccessLevel(src.getAccessLevel());
		return tgt;
	}

}
