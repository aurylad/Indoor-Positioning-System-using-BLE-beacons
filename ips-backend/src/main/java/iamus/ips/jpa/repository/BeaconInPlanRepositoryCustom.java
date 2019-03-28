package iamus.ips.jpa.repository;

import java.util.List;

import iamus.ips.jpa.entity.BeaconInPlanEntity;

public interface BeaconInPlanRepositoryCustom {

	List<BeaconInPlanEntity> findBeaconInPlanByBeaconId (String beaconId); 
}
