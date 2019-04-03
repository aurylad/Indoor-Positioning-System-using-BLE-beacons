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
import iamus.ips.jpa.repository.BeaconInPlanRepository;
import iamus.ips.jpa.repository.BeaconRepository;
import iamus.ips.jpa.repository.LogRepository;
import iamus.ips.jpa.repository.ObjectRepository;
import iamus.ips.jpa.repository.PlanRepository;
import iamus.ips.objectLocation.Proximity;
import iamus.ips.objectLocation.Trilateration;
import iamus.ips.server.api.DeviceDataApi;
import iamus.ips.server.model.BeaconInPlan;
import iamus.ips.server.model.DeviceData;
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

	public DeviceDataRest() {
		this.beaconRepository = null;
		this.beaconInPlanRepository = null;
		this.objectRepository = null;
		this.logRepository = null;

	}

	@Override
	public ResponseEntity<Void> addDeviceData(@ApiParam(value = "") @Valid @RequestBody DeviceData deviceData) {
		//_______________________________________
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
		//_______________________________________
        //
		Proximity proximity = new Proximity();
		Trilateration trilateration = new Trilateration();
		List closestTransmitter = proximity.proximity(transmitterList);
		//List trilaterationResult = trilateration.trilateration(transmitterList);
		
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

//	public List proximity(List<List> transmitterList) {
//		List closestTransmitter = null;
//		float strongestSignal = (float) transmitterList.get(0).get(1);
//		for (List transmitter : transmitterList) {
//			if ((float) transmitter.get(1) >= strongestSignal) {
//				closestTransmitter = transmitter;
//				strongestSignal = (float) transmitter.get(1);
//			}
//		}
//		System.out.println("proximity: " + closestTransmitter);
//		return closestTransmitter;
//	}

}
