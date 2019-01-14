package lt.kvk.ppj.pws1.jpa.repository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;

@RepositoryRestResource(path = "object", exported = false)
public interface TrackedObjectRepository extends PagingAndSortingRepository<ObjectEntity, Long>, TrackedObjectRepositoryCustom {

	ObjectEntity findOneByObjIdentificationCode(@Param("objIdentificationCode") String objIdentificationCode);
}
