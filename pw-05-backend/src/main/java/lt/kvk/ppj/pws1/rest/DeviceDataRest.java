package lt.kvk.ppj.pws1.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.ppj.pw.s1.server.api.DeviceDataApi;
import lt.kvk.ppj.pw.s1.server.model.DeviceData;

@RestController
@RequestMapping("/api")
public class DeviceDataRest implements DeviceDataApi {

	@Override
	public ResponseEntity<Void> addDeviceData(@Valid DeviceData deviceData) {
		System.out.println(deviceData);
		return null;
	}

	

}
