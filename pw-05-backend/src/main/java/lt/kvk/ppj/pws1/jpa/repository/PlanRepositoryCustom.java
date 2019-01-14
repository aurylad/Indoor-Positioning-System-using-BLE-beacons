package lt.kvk.ppj.pws1.jpa.repository;

import lt.kvk.ppj.pws1.jpa.entity.PlanEntity;

public interface PlanRepositoryCustom {

	PlanEntity findOneOrCreateByPlanName(PlanEntity plan);
}
