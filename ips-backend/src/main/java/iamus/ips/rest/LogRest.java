package iamus.ips.rest;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iamus.ips.jpa.entity.LogEntity;
import iamus.ips.jpa.entity.ObjectEntity;
import iamus.ips.jpa.entity.PlanEntity;
import iamus.ips.jpa.entity.RestrictedAreaEntity;
import iamus.ips.jpa.entity.ViolationsEntity;
import iamus.ips.jpa.repository.LogRepository;
import iamus.ips.jpa.repository.ObjectRepository;
import iamus.ips.jpa.repository.RestrictedAreaRepository;
import iamus.ips.jpa.repository.ViolationsRepository;
import io.swagger.annotations.ApiParam;
import iamus.ips.server.api.LogApi;
import iamus.ips.server.model.Log;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class LogRest implements LogApi {

	@Autowired
	private LogRepository logRepository;

	@Autowired
	private RestrictedAreaRepository restrictedAreaRepository;
	
	@Autowired
	public ViolationsRepository violationsRepository;
	
	@Autowired
	public ObjectRepository objectRepository; // FOR TESTING

	public LogRest() {
		this.logRepository = null;
		this.restrictedAreaRepository = null;
		this.violationsRepository = null;
		this.objectRepository = null;
	}

	@Override
	public ResponseEntity<List<Log>> getLog() {
		final List<Log> list = new ArrayList<>();
		for (final LogEntity src : logRepository.findAllByOrderByIdAsc()) {
			list.add(toLog(src));
		}
		return Utils.toResponseEntity(list);
	}

	@Override
	public ResponseEntity<List<Log>> getLogByObjectId(@ApiParam(value = "Numeric ID of the object to get log data.", //
			required = true) @PathVariable("id") Long id) {
		final List<Log> list = new ArrayList<>();
		for (final LogEntity src : logRepository.findLogsByObjectId(id)) {
			list.add(toLog(src));
		}
		return Utils.toResponseEntity(list);
	}

	@Override
	public ResponseEntity<List<Log>> getLogByPlanId(@ApiParam(value = "Numeric ID of the plan to get log data.", //
			required = true) @PathVariable("id") Long id) {
		final List<Log> list = new ArrayList<>();
		for (final LogEntity src : logRepository.findLogsByPlanId(id)) {
			list.add(toLog(src));
		}
		return Utils.toResponseEntity(list);
	}

	private static Log toLog(LogEntity src) {
		final Log tgt = new Log();
		tgt.setId(src.getId());
		tgt.setCoordinateX(src.getLogCoordinateX());
		tgt.setCoordinateY(src.getLogCoordinateY());
		tgt.setRegDateTime(src.getLogDateTime());
		tgt.setObjectId(src.getObject().getObjectCode());
		tgt.setPlanId(src.getPlan().getPlanId());
		tgt.setObjectAccessLevel(src.getObject().getAccessLevel());
		tgt.setObjectName(src.getObject().getObjName());
		tgt.setObjectType(src.getObject().getObjType());
		return tgt;
	}

	@Override
	public ResponseEntity<List<Log>> getLogByDatetime(@ApiParam(value = " Datetime of the log to get log data.", //
			required = true) @PathVariable("planId") Long planId) {
		final List<Log> list = new ArrayList<>();
		for (final LogEntity src : logRepository.findLogsByDateTime(planId)) {
			list.add(toLog(src));
		}
		
		System.out.println("---------------------------------------------------------------------------------");
		Date currDateMinusMin = new Date(System.currentTimeMillis() - 3 * 1000);
		System.out.println(currDateMinusMin);
		System.out.println("---------------------------------------------------------------------------------");
		System.out.println(list);
		return Utils.toResponseEntity(list);
	}

}
