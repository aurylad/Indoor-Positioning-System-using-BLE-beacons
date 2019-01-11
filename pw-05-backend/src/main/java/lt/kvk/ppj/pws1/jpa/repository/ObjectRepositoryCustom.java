package lt.kvk.ppj.pws1.jpa.repository;

import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;

public interface ObjectRepositoryCustom {

	ObjectEntity findOneOrCreateByObjIdentificationCode(String objIdentificationCode, String objType,
			String objName, String accessLevel);
}
