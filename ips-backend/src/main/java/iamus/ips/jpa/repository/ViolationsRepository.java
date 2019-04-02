package iamus.ips.jpa.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import iamus.ips.jpa.entity.ObjectEntity;
import iamus.ips.jpa.entity.ViolationsEntity;

@RepositoryRestResource(path = "viola", exported = false)
public interface ViolationsRepository  extends PagingAndSortingRepository<ViolationsEntity, Long> {

	Iterable<ViolationsEntity> findAllByOrderByIdAsc();
}
