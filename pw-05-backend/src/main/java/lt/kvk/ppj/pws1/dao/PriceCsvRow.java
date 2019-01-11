package lt.kvk.ppj.pws1.dao;

import java.math.BigDecimal;
import java.util.Date;

import com.opencsv.bean.CsvBindByPosition;
import com.opencsv.bean.CsvDate;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = {})
public class PriceCsvRow {

	@CsvBindByPosition(position = 0)
	private final String jobName;

	@CsvBindByPosition(position = 1)
	private final BigDecimal hourlyRate;

	@CsvBindByPosition(position = 2)
	@CsvDate("yyyy-MM-dd")
	private final Date dateFrom;

	@CsvBindByPosition(position = 3)
	@CsvDate("yyyy-MM-dd")
	private final Date dateTill;

	public PriceCsvRow() {
		this.jobName = null;
		this.hourlyRate = null;
		this.dateFrom = null;
		this.dateTill = null;
	}
	
}
