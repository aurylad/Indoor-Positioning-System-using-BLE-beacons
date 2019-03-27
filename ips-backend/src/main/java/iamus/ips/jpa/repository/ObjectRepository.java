package iamus.ips.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iamus.ips.jpa.entity.ObjectEntity;

@RepositoryRestResource(path = "objs", exported = false)
public interface ObjectRepository extends PagingAndSortingRepository<ObjectEntity, Long> {
	
	 Iterable<ObjectEntity> findAllByOrderByIdAsc();
	 ObjectEntity findOneByObjectCode(@Param("objectCode") String objectId);
}

