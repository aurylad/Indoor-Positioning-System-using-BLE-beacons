package iamus.ips.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iamus.ips.jpa.entity.BeaconInPlanEntity;

@RepositoryRestResource(path = "beacons-in-plan", exported = false)
public interface BeaconInPlanRepository extends PagingAndSortingRepository<BeaconInPlanEntity, Long>, BeaconInPlanRepositoryCustom {

	Iterable<BeaconInPlanEntity> findAllByOrderByIdAsc();
	
}
