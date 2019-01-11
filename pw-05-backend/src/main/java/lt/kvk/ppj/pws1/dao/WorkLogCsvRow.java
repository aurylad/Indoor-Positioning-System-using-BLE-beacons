package lt.kvk.ppj.pws1.dao;

import java.util.Date;

import com.opencsv.bean.CsvBindByPosition;
import com.opencsv.bean.CsvDate;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = {})
public class WorkLogCsvRow {

	@CsvBindByPosition(position = 0)
	private final String lastName;

	@CsvBindByPosition(position = 1)
	private final String address;

	@CsvBindByPosition(position = 2)
	private final String jobName;

	@CsvBindByPosition(position = 3)
	@CsvDate("yyyy-MM-dd HH:mm")
	private final Date beginDateTime;

	@CsvBindByPosition(position = 4)
	@CsvDate("yyyy-MM-dd HH:mm")
	private final Date endDateTime;

	public WorkLogCsvRow() {
		this.lastName = null;
		this.address = null;
		this.jobName = null;
		this.beginDateTime = null;
		this.endDateTime = null;
	}
	
}
