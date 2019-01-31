package iamus.ips.jpa.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import iamus.ips.jpa.entity.PlanEntity;

@Repository
public class PlanRepositoryImpl implements PlanRepositoryCustom {

	private final PlanRepository planRepository;

	@Autowired
	public PlanRepositoryImpl(@Lazy PlanRepository planRepository) {
		this.planRepository = planRepository;
	}

	@Override
	public PlanEntity findOneOrCreateByPlanId(PlanEntity pln) {
		PlanEntity plan = planRepository.findOneByPlanId(pln.getPlanId());
		if (plan == null) {
			plan = new PlanEntity();
			plan.setPlanId(pln.getPlanId());
			plan.setPlanScale(pln.getPlanScale());
			plan.setPlanImage(pln.getPlanImage());
			plan.setPlanWidth(pln.getPlanWidth());
			plan.setPlanHeight(pln.getPlanHeight());
			plan = planRepository.save(plan);
		}
		return plan;
	}

}
