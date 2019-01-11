package lt.kvk.ppj.pws1.jpa.entity;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

@MappedSuperclass
@Access(AccessType.FIELD)
abstract class AbstractBaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "_id_", unique = true, nullable = false)
	private final Long id;

	// REF.:
	// https://stackoverflow.com/questions/2572566/java-jpa-version-annotation
	@Version
	@Column(name = "_optlock_", nullable = false)
	private long version = 0L;

	AbstractBaseEntity(Long id) {
		this.id = id;
	}

	AbstractBaseEntity() {
		this.id = null;
	}

	public final Long getId() {
		return id;
	}

	public long getVersion() {
		return version;
	}
	
}