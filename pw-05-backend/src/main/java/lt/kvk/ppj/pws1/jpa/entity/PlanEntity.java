package lt.kvk.ppj.pws1.jpa.entity;

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
@ToString(callSuper=true, exclude = {"beaconInPlan", "log"})
@EqualsAndHashCode(callSuper=true, exclude = {"beaconInPlan", "log"})
@Entity(name = "Plan")
@Table(name = "building_plan", uniqueConstraints = //
@UniqueConstraint(columnNames = { "name" }))
public class PlanEntity extends AbstractBaseEntity {

	@Column(name = "name", nullable = false)
	private String planName;
	
	@Column(name = "scale", nullable = false)
	private Double planScale;
	
	@Column(name = "plan_picture", nullable = false)
	private String planPicture;
	
	@Column(name = "plan_width", nullable = false)
	private Double planWidth;
	
	@Column(name = "plan_height", nullable = false)
	private Double planHeight;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "plan")
	private Set<BeaconInPlanEntity> beaconInPlan;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "plan")
	private Set<LogEntity> log;
	
	public PlanEntity() {
		
	}
}
