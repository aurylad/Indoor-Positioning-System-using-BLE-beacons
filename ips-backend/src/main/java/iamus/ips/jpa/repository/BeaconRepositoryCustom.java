package iamus.ips.jpa.repository;

import iamus.ips.jpa.entity.BeaconEntity;

public interface BeaconRepositoryCustom {

	BeaconEntity findOneOrCreateByBeaconId(String baconId);
}
