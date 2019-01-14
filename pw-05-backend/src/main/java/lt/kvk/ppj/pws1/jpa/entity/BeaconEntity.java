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
@ToString(callSuper=true, exclude = {"beaconInPlan"})
@EqualsAndHashCode(callSuper = true, exclude = {"beaconInPlan"})
@Entity(name = "Beacon")
@Table(name = "beacons", uniqueConstraints = //
@UniqueConstraint(columnNames = { "beacon_id" }))
public class BeaconEntity extends AbstractBaseEntity {

	@Column(name = "beacon_id", nullable = true)
	private String beaconId;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "beacon")
	private Set<BeaconInPlanEntity> beaconInPlan;

	public BeaconEntity(Long id) {
		super(id);
	}
	
	public BeaconEntity() {

	}
}
