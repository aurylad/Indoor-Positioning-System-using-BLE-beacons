package iamus.ips.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iamus.ips.jpa.entity.BeaconInPlanEntity;
import iamus.ips.jpa.entity.ObjectEntity;
import iamus.ips.jpa.entity.PlanEntity;

@RepositoryRestResource(path = "plans", exported = false)
public interface PlanRepository extends PagingAndSortingRepository<PlanEntity, Long>, PlanRepositoryCustom {

	PlanEntity findOneByPlanId(@Param("planId") String planId);

}
