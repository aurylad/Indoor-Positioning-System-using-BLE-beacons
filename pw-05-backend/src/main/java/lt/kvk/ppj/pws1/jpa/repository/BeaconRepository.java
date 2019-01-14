package lt.kvk.ppj.pws1.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import lt.kvk.ppj.pws1.jpa.entity.BeaconEntity;

@RepositoryRestResource(path = "beacons", exported = false)
public interface BeaconRepository extends PagingAndSortingRepository<BeaconEntity, Long> {
	
	Iterable<BeaconEntity> findAllByOrderByIdAsc();
}
