package lt.kvk.ppj.pws1.jpa.repository;

import lt.kvk.ppj.pws1.jpa.entity.BeaconEntity;

public interface BeaconRepositoryCustom {

	BeaconEntity findOneOrCreateByBeaconId(String beaconId);
}
