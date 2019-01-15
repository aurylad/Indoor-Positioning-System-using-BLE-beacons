package lt.kvk.ppj.pws1.jpa.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@Entity(name = "Log")
@Table(name = "results_log", uniqueConstraints = //
@UniqueConstraint(columnNames = { "coordinate_x", "coordinate_y", "date_time" }))
public class LogEntity extends AbstractBaseEntity {

	@Column(name = "coordinate_x", nullable = false)
	private Float logCoordinateX;

	@Column(name = "coordinate_y", nullable = false)
	private Float logCoordinateY;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_time", nullable = false)
	private Date logDateTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "plan_id", nullable = false)
	private PlanEntity plan;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "object_id", nullable = false)
	private ObjectEntity object;

	public LogEntity(Long id) {
		super(id);
	}

	public LogEntity() {
		super();
	}

}
