package iamus.ips.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iamus.ips.jpa.entity.LogEntity;

@RepositoryRestResource(path = "log", exported = false)
public interface LogRepository extends PagingAndSortingRepository<LogEntity, Long>, LogRepositoryCustom {
	
	Iterable<LogEntity> findAllByOrderByIdAsc();
//	LogEntity findOneByObjectId(@Param("object_id") String objectId);
//	LogEntity findOneByPlanId(@Param("plan_id") String planId);
}
