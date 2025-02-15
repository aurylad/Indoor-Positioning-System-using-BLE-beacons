package iamus.ips.jpa.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper = true, exclude = { "beaconInPlan", "log", "restrictedArea" })
@EqualsAndHashCode(callSuper = true, exclude = { "beaconInPlan", "log", "restrictedArea" })
@Entity(name = "Plan")
@Table(name = "building_plan", uniqueConstraints = //
@UniqueConstraint(columnNames = { "name" }))
public class PlanEntity extends AbstractBaseEntity {
	
	@Column(name = "name", nullable = false)
	private String planId;

	@Column(name = "scale", nullable = false)
	private Float planScale;

	@Column(name = "plan_picture", nullable = false, columnDefinition = "TEXT")
	private String planImage;

	@Column(name = "plan_width", nullable = false)
	private Integer planWidth;

	@Column(name = "plan_height", nullable = false)
	private Integer planHeight;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "plan")
	private Set<BeaconInPlanEntity> beaconInPlan;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "plan")
	private Set<LogEntity> log;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "plan")
	private Set<RestrictedAreaEntity> restrictedArea;
	
	public PlanEntity(Long id) {
		super(id);
	}

	public PlanEntity() {

	}
}
