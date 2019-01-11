package lt.kvk.ppj.pws1.dao;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

class Utils {

	private Utils() {
		throw new AssertionError();
	}

	static <T> CsvToBean<T> openCsvToBean(Class<T> type, InputStream is) throws IOException {
		Reader reader = new InputStreamReader(is, "UTF-8");
		CsvToBean<T> csvToBean = new CsvToBeanBuilder<T>(reader).withType(type).withSeparator(';').build();
		return csvToBean;
	}
}
