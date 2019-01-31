package iamus.ips;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DbContainerInitializer {

//	private static final Logger LOG = LoggerFactory.getLogger(DbContainerInitializer.class);
//
//	@Autowired
//	private final PriceRepository priceRepository;
//
//	@Autowired
//	private final PricesImporter pricesImporter;
//
//	@Autowired
//	private final WorkLogImporter workResultImporter;
//
//	public DbContainerInitializer() {
//		priceRepository = null;
//		pricesImporter = null;
//		workResultImporter = null;
//	}
//
//	public static void initTestDb(Connection connection) throws SQLException, IOException {
//		// e.g. run schema set.up or Flyway/liquibase/etc DB migrations here...
//		LOG.info("initTestDb(Connection connection) invoked");
//		try (Statement stm = connection.createStatement()) {
//			String sql = IOUtils.toString(new FileInputStream( //
//					"src/docker/postgres/initdb.d/01-init-stk.sql"), "UTF-8");
//			stm.execute(sql);
//		}
//	}
//	//-----------
//	void fillWithTestData() throws IOException {
//		LOG.info("fillWithTestData() invoked");
//		if (priceRepository.count() > 0) {
//			// There is already data in database we don't need fill it again
//			return;
//		}
//		//u=pildymas test duomenimis
//		pricesImporter.importCsv(openResourceStream("darbu_ivertinimo_normatyvai"));
//		workResultImporter.importCsv(openResourceStream("darbininko_darbo_rezultatas"));
//	}
//
//	private static InputStream openResourceStream(String name) {
//		return DbContainerInitializer.class.getResourceAsStream("/" + name + ".csv");
//	}
}
