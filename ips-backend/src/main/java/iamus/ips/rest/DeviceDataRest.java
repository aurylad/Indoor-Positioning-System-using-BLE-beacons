package iamus.ips.rest;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iamus.ips.jpa.entity.BeaconEntity;
import iamus.ips.jpa.entity.BeaconInPlanEntity;
import iamus.ips.jpa.entity.LogEntity;
import iamus.ips.jpa.entity.ObjectEntity;
import iamus.ips.jpa.entity.PlanEntity;
import iamus.ips.jpa.entity.RestrictedAreaEntity;
import iamus.ips.jpa.entity.ViolationsEntity;
import iamus.ips.jpa.repository.BeaconInPlanRepository;
import iamus.ips.jpa.repository.BeaconRepository;
import iamus.ips.jpa.repository.LogRepository;
import iamus.ips.jpa.repository.ObjectRepository;
import iamus.ips.jpa.repository.PlanRepository;
import iamus.ips.jpa.repository.RestrictedAreaRepository;
import iamus.ips.jpa.repository.ViolationsRepository;
import iamus.ips.server.api.DeviceDataApi;
import iamus.ips.server.model.BeaconInPlan;
import iamus.ips.server.model.DeviceData;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class DeviceDataRest implements DeviceDataApi {

//	// Mock list of transmitters
//			//_______________________________________
//			List<Object> transmitter1 = new ArrayList<>();
//			transmitter1.add(deviceData.getObjectId1());
//			transmitter1.add(deviceData.getSignal1());
//			transmitter1.add(deviceData.getTransmitterId1());
//			
//			List<Object> transmitter2 = new ArrayList<>();
//			transmitter2.add(deviceData.getObjectId2());
//			transmitter2.add(deviceData.getSignal2());
//			transmitter2.add(deviceData.getTransmitterId2());
//			
//			List<Object> transmitter3 = new ArrayList<>();
//			transmitter3.add(deviceData.getObjectId3());
//			transmitter3.add(deviceData.getSignal3());
//			transmitter3.add(deviceData.getTransmitterId3());
//			
//			List<List> transmitterList = new ArrayList<>();
//			transmitterList.add(transmitter1);
//			transmitterList.add(transmitter2);
//			transmitterList.add(transmitter3);
//			//_______________________________________
//	        //
//			
//			System.out.println("Device ALL info:    " + deviceData);
//			List closestTransmitter = proximity(transmitterList);
//			
//			//List closestTransmitter = proximity(transmitterList);
//			System.out.println("Device id:    " + closestTransmitter.get(2));
//		
//
//			final ObjectEntity object = objectRepository.findOneByObjectCode(String.valueOf(closestTransmitter.get(0)));
//			final BeaconEntity beacon = beaconRepository.findOneByBeaconId( String.valueOf(closestTransmitter.get(2)));
//			System.out.println("Beacon:    " + beacon);
//			
////			final ObjectEntity object = objectRepository.findOneByObjectId("ss55");
////			//final BeaconEntity beacon = beaconRepository.findOneByBeaconId("Ak50");
////			
//			final List<BeaconInPlanEntity> beaconInPlanAllData = beaconInPlanRepository
//					.findBeaconInPlanByBeaconId(beacon.getId());
//
//			// Container for info
//			BeaconInPlanEntity beaconInPlanEntity = new BeaconInPlanEntity();
//
//			for (BeaconInPlanEntity src : beaconInPlanAllData) {
//				beaconInPlanEntity.setCoordinateX(src.getCoordinateX());
//				beaconInPlanEntity.setCoordinateY(src.getCoordinateY());
//				beaconInPlanEntity.setBeacon(src.getBeacon());
//				beaconInPlanEntity.setPlan(src.getPlan());
//
//			}
//			
//			
//			
//
//			System.out.println("Device d ALL info:    " + deviceData);
//			// Included Plan object info and Beacon object info
//			System.out.println("BeaconInPlan ALL info:    " + beaconInPlanEntity);
//			// ALL Beacon object info
//			System.out.println("Beacon info:	" + beaconInPlanEntity.getBeacon() + ".get...");
//			// ALL Plan object info
//			System.out.println("Plan info:	" + beaconInPlanEntity.getPlan() + ".get...");
//			//All Object data info
//			System.out.println("Object info:    " + object.getObjName() + ".get...");
//			DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
//			Date date = new Date();
//			
//			LogEntity log = new LogEntity();
//			log.setLogCoordinateX(beaconInPlanEntity.getCoordinateX());
//			log.setLogCoordinateY(beaconInPlanEntity.getCoordinateY());
//			log.setLogDateTime(date);
//			log.setObject(object);
//			log.setPlan(beaconInPlanEntity.getPlan());
//			
//			logRepository.save(log);
//			
//
//			return null;

	@Autowired
	private BeaconRepository beaconRepository;

	@Autowired
	private BeaconInPlanRepository beaconInPlanRepository;

	@Autowired
	private PlanRepository planRepository;

	@Autowired
	private LogRepository logRepository;

	@Autowired
	private ObjectRepository objectRepository;

	@Autowired
	private RestrictedAreaRepository restrictedAreaRepository;

	@Autowired
	public ViolationsRepository violationsRepository;

	public DeviceDataRest() {
		this.beaconRepository = null;
		this.beaconInPlanRepository = null;
		this.objectRepository = null;
		this.logRepository = null;
		this.restrictedAreaRepository = null;
		this.violationsRepository = null;
	}

	@Override
	public ResponseEntity<Void> addDeviceData(@ApiParam(value = "") @Valid @RequestBody DeviceData deviceData) {
		// _______________________________________
		List<Object> transmitter1 = new ArrayList<>();
		transmitter1.add(deviceData.getObjectId1());
		transmitter1.add(deviceData.getSignal1());
		transmitter1.add(deviceData.getTransmitterId1());

		List<Object> transmitter2 = new ArrayList<>();
		transmitter2.add(deviceData.getObjectId2());
		transmitter2.add(deviceData.getSignal2());
		transmitter2.add(deviceData.getTransmitterId2());

		List<Object> transmitter3 = new ArrayList<>();
		transmitter3.add(deviceData.getObjectId3());
		transmitter3.add(deviceData.getSignal3());
		transmitter3.add(deviceData.getTransmitterId3());

		List<List> transmitterList = new ArrayList<>();
		transmitterList.add(transmitter1);
		transmitterList.add(transmitter2);
		transmitterList.add(transmitter3);
		// _______________________________________
		//
		List closestTransmitter = proximity(transmitterList);

		return save(closestTransmitter, null);
	}

	private ResponseEntity<Void> save(final List src, Long deviceDataId) {

		final ObjectEntity object = objectRepository.findOneByObjectCode(String.valueOf(src.get(0)));
		final BeaconEntity beacon = beaconRepository.findOneByBeaconId(String.valueOf(src.get(2)));
		final BeaconInPlanEntity beaconInPlan = beaconInPlanRepository.findOneByBeaconId(beacon.getId());
		Date date = new Date();

		final LogEntity tgt = new LogEntity(deviceDataId);
		tgt.setLogCoordinateX(beaconInPlan.getCoordinateX());
		tgt.setLogCoordinateY(beaconInPlan.getCoordinateY());
		tgt.setLogDateTime(date);
		tgt.setObject(object);
		tgt.setPlan(beaconInPlan.getPlan());
		logRepository.save(tgt);

		return ResponseEntity.ok().build();
	}

	public List proximity(List<List> transmitterList) {
		List closestTransmitter = null;
		float strongestSignal = (float) transmitterList.get(0).get(1);
		for (List transmitter : transmitterList) {
			if ((float) transmitter.get(1) >= strongestSignal) {
				closestTransmitter = transmitter;
				strongestSignal = (float) transmitter.get(1);
			}
		}
		System.out.println("proximity: " + closestTransmitter);
		return closestTransmitter;
	}

	public void checkForViolation(float coordX, float coordY, ObjectEntity object, PlanEntity plan) {
		final List<RestrictedAreaEntity> areasList = new ArrayList<>();
		for (final RestrictedAreaEntity src : restrictedAreaRepository.findRestrictedAreasByPlanId(plan.getId())) {
			areasList.add(src);
		}
		if (!(areasList.isEmpty())) {
			for (RestrictedAreaEntity tempRestrArea : areasList) {
				if (rectPointInside(tempRestrArea.getTopLeftCoordX(), tempRestrArea.getTopRightCoordX(),
						tempRestrArea.getTopLeftCoordY(), tempRestrArea.getBottomLeftCoordY(), coordX, coordY)) {
					if (!(object.getAccessLevel().equalsIgnoreCase(tempRestrArea.getAccessLevel()))) {
						System.out.println("--------------BAD access_level");
						saveViolation(object, tempRestrArea, null);
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

}
