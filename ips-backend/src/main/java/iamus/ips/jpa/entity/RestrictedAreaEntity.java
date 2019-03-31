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
@UniqueConstraint(columnNames = { "top_left_x", "top_right_x", "area_id" }))
public class RestrictedAreaEntity extends AbstractBaseEntity {
	
	@Column(name = "area_id", nullable = false)
	private String restrictedAreaName;
	
	@Column(name = "access_level", nullable = false)
	private String accessLevel;

	@Column(name = "top_left_x", nullable = false)
	private Float topLeftCoordX;
	
	@Column(name = "top_left_y", nullable = false)
	private Float topLeftCoordY;
	
	@Column(name = "top_right_x", nullable = false)
	private Float topRightCoordX;
	
	@Column(name = "top_right_y", nullable = false)
	private Float topRightCoordY;
	
	@Column(name = "bottom_left_x", nullable = false)
	private Float bottomLeftCoordX;
	
	@Column(name = "bottom_left_y", nullable = false)
	private Float bottomLeftCoordY;
	
	@Column(name = "bottom_right_x", nullable = false)
	private Float bottomRightCoordX;
	
	@Column(name = "bottom_right_y", nullable = false)
	private Float bottomRightCoordY;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plan_id", nullable = false)
	private PlanEntity plan;
	
	public RestrictedAreaEntity(Long id) {
		super(id);
	}

	public RestrictedAreaEntity() {
		
	}
	
}
