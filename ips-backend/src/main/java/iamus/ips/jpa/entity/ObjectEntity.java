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
@ToString(callSuper = true, exclude = { "logEntity" })
@EqualsAndHashCode(callSuper = true, exclude = { "logEntity" })
@Entity(name = "Object")
@Table(name = "objects", uniqueConstraints = //
@UniqueConstraint(columnNames = { "identification_code" }))
public class ObjectEntity extends AbstractBaseEntity {
	
	@Column(name = "identification_code", nullable = false)
	private String objectId;

	@Column(name = "type", nullable = false)
	private String objType;

	@Column(name = "name", nullable = false)
	private String objName;

	@Column(name = "access_level", nullable = false)
	private String accessLevel;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "object")
	private Set<LogEntity> logEntity;

	public ObjectEntity(Long id) {
		super(id);
	}

	public ObjectEntity() {

	}
}
