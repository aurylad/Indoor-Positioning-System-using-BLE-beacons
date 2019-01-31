package iamus.ips.rest;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iamus.ips.jpa.entity.BeaconEntity;
import iamus.ips.jpa.entity.BeaconInPlanEntity;
import iamus.ips.jpa.entity.ObjectEntity;
import iamus.ips.jpa.repository.BeaconInPlanRepository;
import iamus.ips.jpa.repository.BeaconRepository;
import iamus.ips.jpa.repository.ObjectRepository;
import iamus.ips.server.api.DeviceDataApi;
import iamus.ips.server.model.DeviceData;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders="*")
public class DeviceDataRest implements DeviceDataApi {

	@Autowired
	private BeaconRepository beaconRepository;

	@Autowired
	private BeaconInPlanRepository beaconInPlanRepository;
	
	@Autowired
	private ObjectRepository objectRepository;

	public DeviceDataRest() {
		this.beaconRepository = null;
		this.beaconInPlanRepository = null;
		this.objectRepository = null;
	}

	@Override
	public ResponseEntity<Void> addDeviceData(@Valid DeviceData deviceData) {
		
		// Mock list of transmitters
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
		
		System.out.println("Device ALL info:    " + deviceData);
		List closestTransmitter = proximity(transmitterList);
		
		//List closestTransmitter = proximity(transmitterList);
		System.out.println("Device id:    " + closestTransmitter.get(2));
	

		final ObjectEntity object = objectRepository.findOneByObjectId(String.valueOf(closestTransmitter.get(0)));
		final BeaconEntity beacon = beaconRepository.findOneByBeaconId( String.valueOf(closestTransmitter.get(2)));
		System.out.println("Beacon:    " + beacon);
		
//		final ObjectEntity object = objectRepository.findOneByObjectId("ss55");
//		//final BeaconEntity beacon = beaconRepository.findOneByBeaconId("Ak50");
//		
		final List<BeaconInPlanEntity> beaconInPlanAllData = beaconInPlanRepository
				.findBeaconInPlanByBeaconId(beacon.getId());

		// Container for info
		BeaconInPlanEntity beaconInPlanEntity = new BeaconInPlanEntity();

		for (BeaconInPlanEntity src : beaconInPlanAllData) {
			beaconInPlanEntity.setCoordinateX(src.getCoordinateX());
			beaconInPlanEntity.setCoordinateY(src.getCoordinateY());
			beaconInPlanEntity.setBeacon(src.getBeacon());
			beaconInPlanEntity.setPlan(src.getPlan());

		}

		System.out.println("Device d ALL info:    " + deviceData);
		// Included Plan object info and Beacon object info
		System.out.println("BeaconInPlan ALL info:    " + beaconInPlanEntity);
		// ALL Beacon object info
		System.out.println("Beacon info:	" + beaconInPlanEntity.getBeacon() + ".get...");
		// ALL Plan object info
		System.out.println("Plan info:	" + beaconInPlanEntity.getPlan() + ".get...");
		//All Object data info
		System.out.println("Object info:    " + object.getObjName() + ".get...");

		return null;
	}
	
	
	public List proximity(List<List>transmitterList) {
		List closestTransmitter = null;
		float strongestSignal = (float) transmitterList.get(0).get(1);
		for (List transmitter : transmitterList) {
			if((float) transmitter.get(1) >= strongestSignal) {
				closestTransmitter = transmitter;
				strongestSignal = (float) transmitter.get(1);
			}
		}
		
		
		System.out.println("proximity: "+closestTransmitter);
		return closestTransmitter;
		
		
		
	}

}
