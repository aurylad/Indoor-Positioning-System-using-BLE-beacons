package lt.kvk.ppj.pws1.dao;

import static lt.kvk.ppj.pws1.dao.Utils.openCsvToBean;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.kvk.ppj.pws1.jpa.entity.EmployeeEntity;
import lt.kvk.ppj.pws1.jpa.entity.JobTypeEntity;
import lt.kvk.ppj.pws1.jpa.entity.WorkLogEntity;
import lt.kvk.ppj.pws1.jpa.repository.EmployeeRepository;
import lt.kvk.ppj.pws1.jpa.repository.JobTypeRepository;
import lt.kvk.ppj.pws1.jpa.repository.WorkLogRepository;

@Service
public class WorkLogImporter {

	@Autowired
	private final WorkLogRepository workLogRepository;

	@Autowired
	private final EmployeeRepository employeeRepository;

	@Autowired
	private final JobTypeRepository jobTypeRepository;

	public WorkLogImporter() {
		this.workLogRepository = null;
		this.jobTypeRepository = null;
		this.employeeRepository = null;
	}

	public void importCsv(final InputStream is) throws IOException {
		final List<WorkLogEntity> entitiesToSave = new ArrayList<>();
		for (final WorkLogCsvRow src : openCsvToBean(WorkLogCsvRow.class, is)) {

			// NOTE. Make SQL call for every product and employee has low performance.
			// However, for amount and frequency import is used performance looks OK.
			final EmployeeEntity employee = employeeRepository.findOneOrCreateByLastNameAndAddress(src.getLastName(),  src.getAddress());
			final JobTypeEntity jobType = jobTypeRepository.findOneOrCreateByJobName(src.getJobName());

			final WorkLogEntity tgt = new WorkLogEntity();
			tgt.setEmployee(employee);
			tgt.setJobType(jobType);
			tgt.setBeginDateTime(src.getBeginDateTime());
			tgt.setEndDateTime(src.getEndDateTime());
			entitiesToSave.add(tgt);
		}
		if (!entitiesToSave.isEmpty()) {
			// We use batch update to have better speed and
			// rollback transaction for whole file.
			workLogRepository.saveAll(entitiesToSave);
		}
	}
}
