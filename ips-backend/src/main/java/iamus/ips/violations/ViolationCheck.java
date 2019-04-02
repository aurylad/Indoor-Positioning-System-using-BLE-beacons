package iamus.ips.violations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import iamus.ips.jpa.entity.LogEntity;
import iamus.ips.jpa.entity.ObjectEntity;
import iamus.ips.jpa.entity.PlanEntity;
import iamus.ips.jpa.entity.RestrictedAreaEntity;
import iamus.ips.jpa.entity.ViolationsEntity;
import iamus.ips.jpa.repository.LogRepository;
import iamus.ips.jpa.repository.ObjectRepository;
import iamus.ips.jpa.repository.RestrictedAreaRepository;
import iamus.ips.jpa.repository.ViolationsRepository;

@Component
public class ViolationCheck implements ApplicationRunner {

	@Autowired
	private RestrictedAreaRepository restrictedAreaRepository;
	
	@Autowired
	private RestrictedAreaRepository restrictedAreaRepository2;

	@Autowired
	private ViolationsRepository violationsRepository;

	@Autowired
	private LogRepository logRepository; // FOR TESTING
	@Autowired
	private ObjectRepository objectRepository; // FOR TESTING

	public ViolationCheck() {
		this.restrictedAreaRepository = null;
		this.violationsRepository = null;
		this.logRepository = null; // FOR TESTING
		this.objectRepository = null; // FOR TESTING
		this.restrictedAreaRepository2 = null;
	}

	public void checkForViolation(float coordX, float coordY, ObjectEntity object, PlanEntity plan) {
		final List<RestrictedAreaEntity> areasList = new ArrayList<>();
		for (final RestrictedAreaEntity src : restrictedAreaRepository.findRestrictedAreasByPlanId(plan.getId())) {
			areasList.add(toRestrictedArea(src));
		}
		if (!(areasList.isEmpty())) {
			for (RestrictedAreaEntity temp : areasList) {
				if (rectPointInside(temp.getTopLeftCoordX(), temp.getTopRightCoordX(), temp.getTopLeftCoordY(),
						temp.getBottomLeftCoordY(), coordX, coordY)) {
					if (!(object.getAccessLevel().equalsIgnoreCase(temp.getAccessLevel()))) {
						saveViolation(object, temp, null);
						System.out.println("--------------RADO netinkamas access_level");
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
		System.out.println("-------------NERADO");
		return false;
	}

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	// -------------------------FOR TESTING------------------------//

	public void test() { //
		final List<LogEntity> list = new ArrayList<>();
		for (final LogEntity src : logRepository.findAllByOrderByIdAsc()) {
			list.add(toLog(src));
			setDataForChecking(src.getLogCoordinateX(), src.getLogCoordinateY());
		}
	}

	public ObjectEntity testObjectData() {
		Optional<ObjectEntity> optional = objectRepository.findById((long) 1);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
	public RestrictedAreaEntity restrictedAreaEntity(Long id) {
		Optional<RestrictedAreaEntity> optional = restrictedAreaRepository2.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	public void setDataForChecking(double x, double y) {
		final List<RestrictedAreaEntity> list2 = new ArrayList<>();
		for (final RestrictedAreaEntity src : restrictedAreaRepository.findRestrictedAreasByPlanId(Long.valueOf(1))) { // (Long)
			list2.add(toRestrictedArea(src));
		}
		if (!(list2.isEmpty())) {
			for (RestrictedAreaEntity temp : list2) {
				if (rectPointInside(temp.getTopLeftCoordX(), temp.getTopRightCoordX(), temp.getTopLeftCoordY(),
						temp.getBottomLeftCoordY(), x, y)) {
					if (!(testObjectData().getAccessLevel().equalsIgnoreCase(temp.getAccessLevel()))) {
						System.out.println("--------------RADO netinkamas access_level");

						RestrictedAreaEntity tgt = new RestrictedAreaEntity();
						tgt.setAccessLevel(temp.getAccessLevel());
						tgt.setBottomLeftCoordX(temp.getBottomLeftCoordX());
						tgt.setBottomLeftCoordY(temp.getBottomLeftCoordY());
						tgt.setBottomRightCoordX(temp.getBottomRightCoordX());
						tgt.setBottomRightCoordY(temp.getBottomRightCoordX());
						tgt.setTopLeftCoordX(temp.getTopLeftCoordX());
						tgt.setTopLeftCoordY(temp.getTopLeftCoordY());
						tgt.setTopRightCoordX(temp.getTopRightCoordX());
						tgt.setTopRightCoordY(temp.getTopRightCoordY());
						tgt.setPlan(temp.getPlan());
						tgt.setRestrictedAreaName(temp.getRestrictedAreaName());
												
//						saveViolation(testObjectData(), tgt, null);
					}
				}
			}
		}
	}

	private ResponseEntity<Void> saveViolation(ObjectEntity object, RestrictedAreaEntity restrictedArea, Long violationId) {		
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

	private static LogEntity toLog(LogEntity src) {
		final LogEntity tgt = new LogEntity();
		tgt.setLogCoordinateX(src.getLogCoordinateX());
		tgt.setLogCoordinateY(src.getLogCoordinateY());
		tgt.setLogDateTime(src.getLogDateTime());
		tgt.setObject(src.getObject());
		tgt.setPlan(src.getPlan());
		return tgt;
	}

	private static ObjectEntity toTrackedObject(ObjectEntity src) {
		final ObjectEntity tgt = new ObjectEntity();
		tgt.setAccessLevel(src.getAccessLevel());
		tgt.setLogEntity(src.getLogEntity());
		src.setObjectCode(src.getObjectCode());
		src.setObjName(src.getObjName());
		src.setObjType(src.getObjType());
		return tgt;
	}

	@Override
	public void run(ApplicationArguments args) throws Exception {
		System.out.println("--------------------RUNNER START------------");
		test();
	}

//	double distance = 0;
//	double x1 = 4;
//	double y1 = 6;
//	double x2 = 1;
//	double y2 = 2;
//	DecimalFormat decimalFormat = new DecimalFormat("0.##");
//	distance = Math.sqrt(Math.pow(x2 - x1, 2) + (Math.pow(y2-y1, 2)));
//	System.out.println(decimalFormat.format(distance));

}
