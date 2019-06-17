package iamus.ips.jpa.repository.test;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.AutoConfigurationPackage;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import iamus.ips.jpa.entity.BeaconEntity;
import iamus.ips.jpa.entity.BeaconInPlanEntity;
import iamus.ips.jpa.entity.PlanEntity;
import iamus.ips.jpa.repository.BeaconInPlanRepository;
import iamus.ips.jpa.repository.BeaconRepository;
import iamus.ips.jpa.repository.ObjectRepository;
import iamus.ips.jpa.repository.PlanRepository;
import iamus.ips.server.model.Beacon;

@RunWith(SpringRunner.class)
@DataJpaTest
public class BeaconInPlanRepositoryIntegrationTest {
	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	private BeaconInPlanRepository beaconInPlanRepository;
	@Test
	public void whenFinfById_thenReturnObject() {
		BeaconEntity beacon = new BeaconEntity();
		beacon.setBeaconId("transmitter_1");
		PlanEntity plan = new PlanEntity();
		plan.setPlanHeight(25);
		plan.setPlanWidth(25);
		plan.setPlanId("test_plan");
		plan.setPlanImage("test_img_src");
		plan.setPlanScale((float) 1.23);
		BeaconInPlanEntity beaconInPlan = new BeaconInPlanEntity();
		beaconInPlan.setBeacon(beacon);
		beaconInPlan.setPlan(plan);
		beaconInPlan.setCoordinateX((float) 11.2);
		beaconInPlan.setCoordinateY((float) 11.2);
		entityManager.persist(beaconInPlan);
		entityManager.flush();
		BeaconInPlanEntity found = beaconInPlanRepository.findOneByBeaconId(beacon.getBeaconId());
		assertThat(found.getPlan().getPlanId()).isEqualTo(plan.getPlanId());
		assertThat(found.getBeacon()).isEqualTo(beacon);
	}
}
