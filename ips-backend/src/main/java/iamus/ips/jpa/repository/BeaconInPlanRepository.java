package iamus.ips.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iamus.ips.jpa.entity.BeaconEntity;
import iamus.ips.jpa.entity.BeaconInPlanEntity;
import iamus.ips.jpa.entity.PlanEntity;

@RepositoryRestResource(path = "beacons-in-plan", exported = false)
public interface BeaconInPlanRepository extends PagingAndSortingRepository<BeaconInPlanEntity, Long>, BeaconInPlanRepositoryCustom {

	Iterable<BeaconInPlanEntity> findAllByOrderByIdAsc();

	BeaconInPlanEntity findOneByBeaconId(@Param("beaconId") Long beaconId);
	
	BeaconInPlanEntity findOneByBeaconId(@Param("beaconId") String beaconId);

}
