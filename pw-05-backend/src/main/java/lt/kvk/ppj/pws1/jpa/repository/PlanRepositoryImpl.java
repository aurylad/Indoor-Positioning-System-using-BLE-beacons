package lt.kvk.ppj.pws1.jpa.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import lt.kvk.ppj.pws1.jpa.entity.PlanEntity;

@Repository
public class PlanRepositoryImpl implements PlanRepositoryCustom {

	private final PlanRepository planRepository;

	@Autowired
	public PlanRepositoryImpl(@Lazy PlanRepository planRepository) {
		this.planRepository = planRepository;
	}

	@Override
	public PlanEntity findOneOrCreateByPlanName(PlanEntity pln) {
		PlanEntity plan = planRepository.findOneByPlanName(pln.getPlanName());
		if (plan == null) {
			plan = new PlanEntity();
			plan.setPlanName(pln.getPlanName());
			plan.setPlanScale(pln.getPlanScale());
			plan.setPlanImage(pln.getPlanImage());
			plan.setPlanWidth(pln.getPlanWidth());
			plan.setPlanHeight(pln.getPlanHeight());
			plan = planRepository.save(plan);
		}
		return plan;
	}

}
