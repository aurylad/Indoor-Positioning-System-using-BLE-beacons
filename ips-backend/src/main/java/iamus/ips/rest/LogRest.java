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
import iamus.ips.violations.Test;
import iamus.ips.violations.ViolationCheck;

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
		test();
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

	
	
	
	
	
	
	
	
	public void test() {
		final List<LogEntity> list = new ArrayList<>();
		for (final LogEntity src : logRepository.findAllByOrderByIdAsc()) {
			list.add(toLogs(src));
			checkForViolation(src.getLogCoordinateX(), src.getLogCoordinateY());
		}
	}
	
	public ObjectEntity testObjectData() {
		Optional<ObjectEntity> optional = objectRepository.findById((long) 1);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
	public RestrictedAreaEntity testAreaData() {
		Optional<RestrictedAreaEntity> optional = restrictedAreaRepository.findById((long) 1);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
//	public void checkForViolation(float coordX, float coordY, ObjectEntity object, PlanEntity plan) {
		public void checkForViolation(float coordX, float coordY) {
		final List<RestrictedAreaEntity> areasList = new ArrayList<>();
		for (final RestrictedAreaEntity src : restrictedAreaRepository.findRestrictedAreasByPlanId((long) 1)) {
			areasList.add(src);
		}
		if (!(areasList.isEmpty())) {
			for (RestrictedAreaEntity tempRestrArea : areasList) {
				if (rectPointInside(tempRestrArea.getTopLeftCoordX(), tempRestrArea.getTopRightCoordX(), tempRestrArea.getTopLeftCoordY(),
						tempRestrArea.getBottomLeftCoordY(), coordX, coordY)) {
					if (!(testObjectData().getAccessLevel().equalsIgnoreCase(tempRestrArea.getAccessLevel()))) {
						System.out.println("--------------BAD access_level");
						
						saveViolation(testObjectData(), tempRestrArea, null);
					}
				}
			}
		}
	}

	public boolean rectPointInside(double LTopX, double RTopX, double LTopY, double LBottY, double x, double y) {
		if (x >= LTopX && x <= RTopX) {
			if (y >= LTopY && y <= LBottY) {
				return true;
			}
		}
		System.out.println("-------------NOT FOUND");
		return false;
	}

	private ResponseEntity<Void> saveViolation(ObjectEntity object, RestrictedAreaEntity restrictedArea,
			Long violationId) {
		Date violationDateTime = new Date();
		final ViolationsEntity tgt = new ViolationsEntity(violationId);
		tgt.setObject(object);
		tgt.setRestrictedArea(restrictedArea);
		tgt.setViolationDateTime(violationDateTime);
		violationsRepository.save(tgt);
		return ResponseEntity.ok().build();
	}

	private static RestrictedAreaEntity toRestrictedArea(RestrictedAreaEntity src) {
		final RestrictedAreaEntity tgt = new RestrictedAreaEntity();
		tgt.setBottomLeftCoordX(src.getBottomLeftCoordX());
		tgt.setBottomLeftCoordY(src.getBottomLeftCoordY());
		tgt.setBottomRightCoordX(src.getBottomRightCoordX());
		tgt.setBottomRightCoordY(src.getBottomRightCoordY());
		tgt.setTopLeftCoordX(src.getTopLeftCoordX());
		tgt.setTopLeftCoordY(src.getTopLeftCoordY());
		tgt.setTopRightCoordX(src.getTopRightCoordX());
		tgt.setTopRightCoordY(src.getTopRightCoordY());
		tgt.setRestrictedAreaName(src.getRestrictedAreaName());
		tgt.setPlan(src.getPlan());
		tgt.setAccessLevel(src.getAccessLevel());
		return tgt;
	}
	
	private static LogEntity toLogs(LogEntity src) {
		final LogEntity tgt = new LogEntity();
		tgt.setLogCoordinateX(src.getLogCoordinateX());
		tgt.setLogCoordinateY(src.getLogCoordinateY());
		tgt.setLogDateTime(src.getLogDateTime());
		tgt.setObject(src.getObject());
		tgt.setPlan(src.getPlan());
		return tgt;
	}
	
}
