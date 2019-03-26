package iamus.ips.jpa.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.stereotype.Repository;
import iamus.ips.jpa.entity.LogEntity;

@Repository
public class LogRepositoryImpl implements LogRepositoryCustom {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List<LogEntity> findLogsByPlanId(Long planId) {
		Query query = entityManager.createNativeQuery("SELECT * FROM results_log WHERE plan_id = ?",
				LogEntity.class);
		query.setParameter(1, planId);
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LogEntity> findLogsByObjectId(Long objectId) {
		Query query = entityManager.createNativeQuery("SELECT * FROM results_log WHERE object_id = ?",
				LogEntity.class);
		query.setParameter(1, objectId);
		return query.getResultList();
	}

}
