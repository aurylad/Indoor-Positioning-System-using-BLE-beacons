package lt.kvk.ppj.pws1.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.ppj.pw.s1.server.api.DeviceDataApi;
import lt.kvk.ppj.pw.s1.server.model.DeviceData;
import lt.kvk.ppj.pws1.jpa.entity.BeaconEntity;
import lt.kvk.ppj.pws1.jpa.entity.BeaconInPlanEntity;
import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;
import lt.kvk.ppj.pws1.jpa.repository.BeaconInPlanRepository;
import lt.kvk.ppj.pws1.jpa.repository.BeaconRepository;
import lt.kvk.ppj.pws1.jpa.repository.ObjectRepository;

@RestController
@RequestMapping("/api")
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

		final ObjectEntity object = objectRepository.findOneByObjectId(deviceData.getObjectId1());
		final BeaconEntity beacon = beaconRepository.findOneByBeaconId(deviceData.getTransmitterId1());
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

}
