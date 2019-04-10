package iamus.ips.jpa.repository;

import java.sql.Timestamp;
import java.util.Date;
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
		Query query = entityManager.createNativeQuery("SELECT * FROM results_log WHERE plan_id = ?", LogEntity.class);
		query.setParameter(1, planId);
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LogEntity> findLogsByObjectId(Long objectId) {
		Query query = entityManager.createNativeQuery("SELECT * FROM results_log WHERE object_id = ?", LogEntity.class);
		query.setParameter(1, objectId);
		return query.getResultList();
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<LogEntity> findLogsByDateTime(Long planId) {
		Date currDateMinusMin = new Date(System.currentTimeMillis() - 86400 * 1000);

//		Query query = entityManager.createNativeQuery("SELECT * FROM results_log WHERE date_time > ? AND plan_id = ?",
		Query query = entityManager.createNativeQuery("SELECT * FROM results_log WHERE date_time > ?",
				LogEntity.class); // later change this < to this >
		query.setParameter(1, currDateMinusMin);
//		query.setParameter(2, planId);
		return query.getResultList();
	}

	@Override
	public List<LogEntity> findLogsByPlanIdObjectIdAndDateTime(Long planId, Long objectId, Date startDate,
			Date endDate) {
		Query query = entityManager.createNativeQuery("SELECT * FROM results_log WHERE object_id = ? AND plan_id = ? AND date_time > ? AND date_time < ?;",
				LogEntity.class); // later change this < to this >
		query.setParameter(1, objectId);
		query.setParameter(2, planId);
		query.setParameter(3, startDate);
		query.setParameter(4, endDate);
		return query.getResultList();
	}

}
