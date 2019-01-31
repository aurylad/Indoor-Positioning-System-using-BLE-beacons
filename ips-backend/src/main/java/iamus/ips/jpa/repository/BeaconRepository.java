package iamus.ips.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iamus.ips.jpa.entity.BeaconEntity;

@RepositoryRestResource(path = "beacons", exported = false)
public interface BeaconRepository extends PagingAndSortingRepository<BeaconEntity, Long>, BeaconRepositoryCustom {
	
	BeaconEntity findOneByBeaconId(@Param("beaconId") String beaconId);
}
