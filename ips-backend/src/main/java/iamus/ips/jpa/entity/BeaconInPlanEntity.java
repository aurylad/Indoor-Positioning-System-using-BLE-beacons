package iamus.ips.jpa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Entity(name = "BeaconInPlan")
@Table(name = "beacons_in_plan", uniqueConstraints = //
@UniqueConstraint(columnNames = { "beacon_id" }))
public class BeaconInPlanEntity extends AbstractBaseEntity {

	@Column(name = "coordinate_x", nullable = false)
	private Float coordinateX;

	@Column(name = "coordinate_y", nullable = false)
	private Float coordinateY;

	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "beacon_id", nullable = false)
	private BeaconEntity beacon;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plan_id", nullable = false)
	private PlanEntity plan;

	public BeaconInPlanEntity(Long id) {
		super(id);
	}

	public BeaconInPlanEntity() {
	}

}
