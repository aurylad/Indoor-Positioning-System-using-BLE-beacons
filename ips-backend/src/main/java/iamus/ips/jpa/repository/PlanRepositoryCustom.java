package iamus.ips.jpa.repository;

import iamus.ips.jpa.entity.PlanEntity;

public interface PlanRepositoryCustom {

	PlanEntity findOneOrCreateByPlanId(PlanEntity plan);
}
