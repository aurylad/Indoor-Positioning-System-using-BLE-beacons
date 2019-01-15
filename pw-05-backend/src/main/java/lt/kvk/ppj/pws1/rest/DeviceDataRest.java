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
import lt.kvk.ppj.pws1.jpa.entity.PlanEntity;
import lt.kvk.ppj.pws1.jpa.repository.BeaconInPlanRepository;
import lt.kvk.ppj.pws1.jpa.repository.BeaconRepository;
import lt.kvk.ppj.pws1.jpa.repository.PlanRepository;

@RestController
@RequestMapping("/api")
public class DeviceDataRest implements DeviceDataApi {

	@Autowired
	private BeaconRepository beaconRepository;

	@Autowired
	private PlanRepository planRepository;

	@Autowired
	private BeaconInPlanRepository beaconInPlanRepository;

	public DeviceDataRest() {
		this.beaconRepository = null;
		this.planRepository = null;
		this.beaconInPlanRepository = null;
	}

	@Override
	public ResponseEntity<Void> addDeviceData(@Valid DeviceData deviceData) {

		toDeviceData(deviceData);

		return null;
	}

	public void toDeviceData (DeviceData src) {
		final BeaconEntity beacon = beaconRepository.findOneByBeaconId(src.getObjectId1());
		final BeaconInPlanEntity beaconInPlan = beaconInPlanRepository.findOneByBeaconId(src.getObjectId1());
		final PlanEntity plan = planRepository.findOneByPlanId(beaconInPlan.getPlan().getPlanId());
	}

}
