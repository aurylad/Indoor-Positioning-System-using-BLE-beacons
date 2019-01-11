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
	public PlanEntity findOneOrCreateByPlanName(String planName, double planScale, String planPicture, double planWidth,
			double planHeight) {
		PlanEntity plan = planRepository.findOneByPlanName(planName);
		if (plan == null) {
			plan = new PlanEntity();
			plan.setPlanHeight(planHeight);
			plan.setPlanName(planName);
			plan.setPlanPicture(planPicture);
			plan.setPlanScale(planScale);
			plan.setPlanWidth(planWidth);
			plan = planRepository.save(plan);
		}
		return plan;
	}

}
