package iamus.ips.jpa.repository;

import org.springframework.data.repository.query.Param;
import java.util.List;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import iamus.ips.jpa.entity.RestrictedAreaEntity;

@RepositoryRestResource(path = "area", exported = false)
public interface RestrictedAreaRepository extends PagingAndSortingRepository<RestrictedAreaEntity, Long> {

	Iterable<RestrictedAreaEntity> findAllByOrderByIdAsc();
	RestrictedAreaEntity findOneByRestrictedAreaName(@Param("restrictedAreaName") String restrictedAreaName);
	List<RestrictedAreaEntity> findRestrictedAreasByPlanId(Long planId);
}

