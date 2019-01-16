package lt.kvk.ppj.pws1.jpa.repository;

import java.util.List;

import lt.kvk.ppj.pws1.jpa.entity.BeaconInPlanEntity;

public interface BeaconInPlanRepositoryCustom {

	List<BeaconInPlanEntity> findBeaconInPlanByBeaconId (Long beaconId); 
}
