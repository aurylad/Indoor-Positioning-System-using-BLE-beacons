package iamus.ips.jpa.repository;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import iamus.ips.jpa.entity.BeaconInPlanEntity;

import javax.persistence.Query;

@Repository
public class BeaconInPlanRepositoryImpl implements BeaconInPlanRepositoryCustom {

	@PersistenceContext
	EntityManager entityManager;

	@SuppressWarnings("unchecked")
	@Override
	public List <BeaconInPlanEntity> findBeaconInPlanByBeaconId(String beaconId) {
//		Query query = entityManager
//				.createNativeQuery("SELECT * FROM beacons_in_plan WHERE beacons_in_plan.beacon_id LIKE ?", BeaconInPlanEntity.class);
//		query.setParameter(1, beaconId + "%");
//		return query.getResultList();
		return null;
	}

}
