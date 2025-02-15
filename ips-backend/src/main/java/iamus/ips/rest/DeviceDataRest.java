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
import iamus.ips.objectLocation.Proximity;
import iamus.ips.objectLocation.Trilateration;
import iamus.ips.objectLocation.XYCoord;
import iamus.ips.server.api.DeviceDataApi;
import iamus.ips.server.model.BeaconInPlan;
import iamus.ips.server.model.DeviceData;
import iamus.ips.server.model.Plan;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class DeviceDataRest implements DeviceDataApi {

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
		this.planRepository = null;
	}
	
	XYCoord lastLocation = new XYCoord(0,0);

	@Override
	public ResponseEntity<Void> addDeviceData(@ApiParam(value = "") @Valid @RequestBody DeviceData deviceData) {
		impl();
		// _______________________________________
//		Creating list of transmitted device data
		List<Object> transmitter1 = new ArrayList<>();
		transmitter1.add(deviceData.getObjectId1());
		transmitter1.add(deviceData.getSignal1());
		transmitter1.add(deviceData.getTransmitterId1());
		transmitter1.add(deviceData.getTxPower1());

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

		
//		Proximity for finding objects location
		Proximity proximity = new Proximity();
		Trilateration trilateration = new Trilateration();
		List closestTransmitter = proximity.proximity(transmitterList);
		
//		Trilateration for finding objects location
		List<XYCoord> coordList = new ArrayList<>();
		List<Double> rssiList = new ArrayList<>();
		List<Integer> txPowerList = new ArrayList<>();
		
		BeaconEntity beacon = beaconRepository.findOneByBeaconId(String.valueOf(transmitterList.get(0).get(2)));
		BeaconInPlanEntity beaconInPlan = beaconInPlanRepository.findOneByBeaconId(beacon.getId());
		XYCoord coord =new XYCoord(beaconInPlan.getCoordinateX(), beaconInPlan.getCoordinateY());
		double rssi = Double.parseDouble(new Float((float) transmitterList.get(0).get(1)).toString());
		coordList.add(coord);
		rssiList.add(rssi);
		txPowerList.add(deviceData.getTxPower1());
		System.out.println("Beacon: "+beacon.getBeaconId());
		
		beacon = beaconRepository.findOneByBeaconId(String.valueOf(transmitterList.get(1).get(2)));
		beaconInPlan = beaconInPlanRepository.findOneByBeaconId(beacon.getId());
		coord = new XYCoord(beaconInPlan.getCoordinateX(), beaconInPlan.getCoordinateY());
		rssi = Double.parseDouble(new Float((float) transmitterList.get(1).get(1)).toString());
		coordList.add(coord);
		rssiList.add(rssi);
		txPowerList.add(deviceData.getTxPower2());
		System.out.println("Beacon: "+beacon.getBeaconId());
		
		beacon = beaconRepository.findOneByBeaconId(String.valueOf(transmitterList.get(2).get(2)));
		beaconInPlan = beaconInPlanRepository.findOneByBeaconId(beacon.getId());
		coord = new XYCoord(beaconInPlan.getCoordinateX(), beaconInPlan.getCoordinateY());
		rssi = Double.parseDouble(new Float((float) transmitterList.get(2).get(1)).toString());
		coordList.add(coord);
		rssiList.add(rssi);
		txPowerList.add(deviceData.getTxPower3());
		System.out.println("Beacon: "+beacon.getBeaconId());
		
		PlanEntity plan = beaconInPlan.getPlan();
		
		XYCoord trilaterationResult = trilateration.getLocationByTrilateration(coordList, rssiList,txPowerList, plan);
		
		System.out.println("_____________________________________________");
		System.out.println("Result: "+trilaterationResult.getX()+" , "+trilaterationResult.getY());
		
		return save(closestTransmitter, trilaterationResult,null);
	}

	public void impl() {
		final Iterable<PlanEntity> plan = planRepository.findAll();
	}

	private ResponseEntity<Void> save(final List src,XYCoord coord, Long deviceDataId) {

//		impl();
		final ObjectEntity object = objectRepository.findOneByObjectCode(String.valueOf(src.get(0)));
		final BeaconEntity beacon = beaconRepository.findOneByBeaconId(String.valueOf(src.get(2)));
		final BeaconInPlanEntity beaconInPlan = beaconInPlanRepository.findOneByBeaconId(beacon.getId());
		Date date = new Date();

		final LogEntity tgt = new LogEntity(deviceDataId);
		tgt.setLogCoordinateX((float) coord.getX());
		tgt.setLogCoordinateY((float) coord.getY());
		tgt.setLogDateTime(date);
		tgt.setObject(object);
		tgt.setPlan(beaconInPlan.getPlan());
//		if (lastLocation.getChangeInPx()>0) {
//			double diference =Math.sqrt(Math.pow((coord.getX()-lastLocation.getX()), 2)+Math.pow((coord.getY()-lastLocation.getY()), 2));
//		    if (diference>=coord.getChangeInPx()) {
//		    	System.out.println("Distance is more than 4m :" +diference);
//		    }else {
//		    			    
//		    	lastLocation = coord;
//		    	logRepository.save(tgt);
//		    }
//		}
//		else {
//			lastLocation = coord;
//			logRepository.save(tgt);
//		}
		logRepository.save(tgt);
	

		checkForViolation(beaconInPlan.getCoordinateX(), beaconInPlan.getCoordinateY(), object,
				beaconInPlan.getPlan().getId());

		return ResponseEntity.ok().build();
	}

	String tempObjectCode;
	Date previous = new Date();
	int index = 1;

	public void checkForViolation(float coordX, float coordY, ObjectEntity object, long planId) {
		final List<RestrictedAreaEntity> areasList = new ArrayList<>();
		for (final RestrictedAreaEntity src : restrictedAreaRepository.findRestrictedAreasByPlanId(planId)) {
			areasList.add(src);
		}
		if (!(areasList.isEmpty())) {
			for (RestrictedAreaEntity tempRestrArea : areasList) {
				if (rectPointInside(tempRestrArea.getTopLeftCoordX(), tempRestrArea.getTopRightCoordX(),
						tempRestrArea.getTopLeftCoordY(), tempRestrArea.getBottomLeftCoordY(), coordX, coordY)) {
					if (!(object.getAccessLevel().equalsIgnoreCase(tempRestrArea.getAccessLevel()))) {
						Date now = new Date();
						saveViolation(object, tempRestrArea, null, now);
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
		return false;
	}

	private ResponseEntity<Void> saveViolation(ObjectEntity object, RestrictedAreaEntity restrictedArea,
			Long violationId, Date now) {

		final ViolationsEntity tgt = new ViolationsEntity(violationId);
		tgt.setObject(object);
		tgt.setRestrictedArea(restrictedArea);
		tgt.setViolationDateTime(now);
		
		if (index == 1) {
			previous = now;
			tempObjectCode = object.getObjectCode();
			violationsRepository.save(tgt);
			index++;
			System.out.println("Index 1");
		} else if (now.getTime() - previous.getTime() >= 1 * 60 * 1000 && tempObjectCode.equalsIgnoreCase(object.getObjectCode())) {
			previous = now;
			tempObjectCode = object.getObjectCode();
			violationsRepository.save(tgt);
			System.out.println("Saved");
		} 
		else if (!(tempObjectCode.equalsIgnoreCase(object.getObjectCode()))) {
			System.out.println(tempObjectCode);
			System.out.println(object.getObjectCode());
			tempObjectCode = object.getObjectCode();
			violationsRepository.save(tgt);
			System.out.println("ELSE");
		}
		return ResponseEntity.ok().build();
	}

}
