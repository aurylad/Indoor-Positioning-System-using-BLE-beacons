package lt.kvk.ppj.pws1.jpa.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;

@Repository
public class TrackedObjectRepositoryImpl implements TrackedObjectRepositoryCustom {

	private final TrackedObjectRepository objectRepository;

	@Autowired
	public TrackedObjectRepositoryImpl(@Lazy TrackedObjectRepository objectRepository) {
		this.objectRepository = objectRepository;
	}

	@Override
	public ObjectEntity findOneOrCreateByObjIdentificationCode(String objIdentificationCode, String objType,
			String objName, String accessLevel) {
		ObjectEntity object = objectRepository.findOneByObjIdentificationCode(objIdentificationCode);
		if (object == null) {
			object = new ObjectEntity();
			object.setObjIdentificationCode(objIdentificationCode);
			object.setAccessLevel(accessLevel);
			object.setObjName(objName);
			object.setObjType(objType);
			object = objectRepository.save(object);
		}
		return object;
	}

}