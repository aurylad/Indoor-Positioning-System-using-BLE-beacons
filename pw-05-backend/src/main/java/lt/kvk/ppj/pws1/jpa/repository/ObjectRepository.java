package lt.kvk.ppj.pws1.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;

@RepositoryRestResource(path = "objs", exported = false)
public interface ObjectRepository extends PagingAndSortingRepository<ObjectEntity, Long> {
	
	 Iterable<ObjectEntity> findAllByOrderByIdAsc();
}

