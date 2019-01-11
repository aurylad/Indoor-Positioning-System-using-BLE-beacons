package lt.kvk.ppj.pws1.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import lt.kvk.ppj.pws1.jpa.entity.LogEntity;

@RepositoryRestResource(path = "log", exported = false)
public interface LogRepository extends PagingAndSortingRepository<LogEntity, Long> {
	Iterable<LogEntity> findAllByOrderByIdAsc();
}