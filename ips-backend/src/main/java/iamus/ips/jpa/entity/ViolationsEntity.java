package iamus.ips.jpa.entity;

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
@ToString(callSuper=true)
@EqualsAndHashCode(callSuper = true)
@Entity(name = "Violations")
@Table(name = "violations", uniqueConstraints = //
@UniqueConstraint(columnNames = { "object_id", "date_time"}))
public class ViolationsEntity extends AbstractBaseEntity {
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "object_id", nullable = false)
	private ObjectEntity object;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "area_id", nullable = false)
	private RestrictedAreaEntity restrictedArea;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "date_time", nullable = false)
	private Date violationDateTime;
	
	public ViolationsEntity(Long id) {
		super(id);
	}

	public ViolationsEntity() {
		
	}
}
