package iamus.ips.jpa.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper = true)
@Entity(name = "Restricted_are")
@Table(name = "restricted_area", uniqueConstraints = //
@UniqueConstraint(columnNames = { "coordinate_top_x", "coordinate_top_y", "coordinate_bottom_x", "coordinate_bottom_y", "area_id" }))
public class RestrictedAreaEntity extends AbstractBaseEntity {
	
	@Column(name = "area_id", nullable = false)
	private String areaId;
	
	@Column(name = "coordinate_top_x", nullable = false)
	private Float coordinateTopX;
	
	@Column(name = "coordinate_top_y", nullable = false)
	private Float coordinateTopY;
	
	@Column(name = "coordinate_bottom_x", nullable = false)
	private Float coordinateBottomX;
	
	@Column(name = "coordinate_bottom_y", nullable = false)
	private Float coordinateBottomY;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plan_id", nullable = false)
	private PlanEntity plan;
	
	public RestrictedAreaEntity(Long id) {
		super(id);
	}

	public RestrictedAreaEntity() {
		
	}
	
}
