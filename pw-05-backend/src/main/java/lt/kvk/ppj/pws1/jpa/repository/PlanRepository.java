package lt.kvk.ppj.pws1.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import lt.kvk.ppj.pws1.jpa.entity.BeaconEntity;
import lt.kvk.ppj.pws1.jpa.entity.PlanEntity;

@RepositoryRestResource(path = "plans", exported = false)
public interface PlanRepository extends PagingAndSortingRepository<PlanEntity, Long>, PlanRepositoryCustom {

	PlanEntity findOneByPlanName(@Param("planName") String planName);
}
