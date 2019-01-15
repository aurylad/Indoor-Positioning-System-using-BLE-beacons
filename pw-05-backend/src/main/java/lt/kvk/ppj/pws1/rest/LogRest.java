package lt.kvk.ppj.pws1.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiParam;
import lt.kvk.ppj.pw.s1.server.api.LogApi;
import lt.kvk.ppj.pw.s1.server.model.Log;
import lt.kvk.ppj.pw.s1.server.model.Plan;
import lt.kvk.ppj.pw.s1.server.model.TrackedObject;
import lt.kvk.ppj.pws1.jpa.entity.BeaconInPlanEntity;
import lt.kvk.ppj.pws1.jpa.entity.LogEntity;
import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;
import lt.kvk.ppj.pws1.jpa.repository.LogRepository;

@RestController
@RequestMapping("/api")
public class LogRest implements LogApi {

	@Autowired
	private LogRepository logRepository;

	@Override
	public ResponseEntity<List<Log>> getLog() {
		final List<Log> list = new ArrayList<>();
		for (final LogEntity src : logRepository.findAllByOrderByIdAsc()) {
			list.add(toLog(src));
		}
		return Utils.toResponseEntity(list);
	}

	@Override
	public ResponseEntity<Plan> getPlanByObjectId (String objectID) {
		return null;
//		Optional<LogEntity> optional = logRepository.;
//		if (optional.isPresent()) {
//			return ResponseEntity.ok(toLog(optional.get()));
//		} else {
//			return ResponseEntity.notFound().build();
//		}
	}

	@Override
	public ResponseEntity<Plan> getPlanByPlanId(String planId) {
		// TODO Auto-generated method stub
		return null;
	}
 
	private static Log toLog(LogEntity src) {
		final Log tgt = new Log();
		tgt.setId(src.getId());
		tgt.setCoordinateX(src.getLogCoordinateX());
		tgt.setCoordinateY(src.getLogCoordinateY());
		tgt.setRegDateTime(src.getLogDateTime());
		tgt.setObjectId(src.getObject().getObjectId());
		tgt.setPlanId(src.getPlan().getPlanId());
		tgt.setObjectAccessLevel(src.getObject().getAccessLevel());
		tgt.setObjectName(src.getObject().getObjName());
		tgt.setObjectType(src.getObject().getObjType());
		return tgt;
	}

}
