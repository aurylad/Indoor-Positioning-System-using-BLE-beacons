package lt.kvk.ppj.pws1.dao;

import static lt.kvk.ppj.pws1.dao.Utils.openCsvToBean;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lt.kvk.ppj.pws1.jpa.entity.PriceEntity;
import lt.kvk.ppj.pws1.jpa.entity.JobTypeEntity;
import lt.kvk.ppj.pws1.jpa.repository.PriceRepository;
import lt.kvk.ppj.pws1.jpa.repository.JobTypeRepository;

@Service
public class PricesImporter {

	@Autowired
	private final PriceRepository priceRepository;

	@Autowired
	private final JobTypeRepository jobTypeRepository;

	public PricesImporter() {
		this.priceRepository = null;
		this.jobTypeRepository = null;
	}

	public void importCsv(final InputStream is) throws IOException {
		final List<PriceEntity> entitiesToSave = new ArrayList<>();
		for (final PriceCsvRow src : openCsvToBean(PriceCsvRow.class, is)) {

			// NOTE. Make SQL call for every product has low performance.
			// However, for amount and frequency import is used performance looks OK.
			final JobTypeEntity jobType = jobTypeRepository.findOneOrCreateByJobName(src.getJobName());

			final PriceEntity tgt = new PriceEntity();
			tgt.setPriceJobType(jobType);
			tgt.setDateFrom(src.getDateFrom());
			tgt.setHourlyRate(src.getHourlyRate());
			tgt.setDateFrom(src.getDateFrom());
			tgt.setDateTill(src.getDateTill());
			entitiesToSave.add(tgt);
		}
		if (!entitiesToSave.isEmpty()) {

			// We use batch update to have better speed and
			// rollback transaction for whole file.
			priceRepository.saveAll(entitiesToSave);
		}
	}
}
