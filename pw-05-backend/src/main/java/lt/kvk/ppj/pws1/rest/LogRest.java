package lt.kvk.ppj.pws1.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.ppj.pw.s1.server.api.LogApi;
import lt.kvk.ppj.pw.s1.server.model.Log;

@RestController
@RequestMapping("/api")
public class LogRest implements LogApi {

	@Override
	public ResponseEntity<List<Log>> getLog() {
		// TODO Auto-generated method stub
		return null;
	}

}
