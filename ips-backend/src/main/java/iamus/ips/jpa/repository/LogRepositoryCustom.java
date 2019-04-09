package iamus.ips.jpa.repository;

import iamus.ips.jpa.entity.LogEntity;

import java.util.Date;
import java.util.List;

public interface LogRepositoryCustom {

	List<LogEntity> findLogsByPlanId(Long planId);

	List<LogEntity> findLogsByObjectId(Long objectId);

	List<LogEntity> findLogsByDateTime(Long planId);
	
	List<LogEntity> findLogsByPlanIdObjectIdAndDateTime(Long planId, Long objectId, Date startDate, Date endDate);
}
