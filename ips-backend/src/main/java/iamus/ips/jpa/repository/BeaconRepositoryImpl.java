package iamus.ips.jpa.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import iamus.ips.jpa.entity.BeaconEntity;

@Repository
public class BeaconRepositoryImpl implements BeaconRepositoryCustom {

	private final BeaconRepository beaconRepository;
	
	@Autowired
	public BeaconRepositoryImpl(@Lazy BeaconRepository beaconRepository) {
		this.beaconRepository = beaconRepository;
	}

	@Override
	public BeaconEntity findOneOrCreateByBeaconId(String beaconId) {
		BeaconEntity beacon = beaconRepository.findOneByBeaconId(beaconId);
		if (beacon == null) {
			beacon = new BeaconEntity();
			beacon.setBeaconId(beaconId);
			beacon = beaconRepository.save(beacon);
		}
		return beacon;
	}
}
