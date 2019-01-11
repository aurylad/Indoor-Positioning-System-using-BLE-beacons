package lt.kvk.ppj.pws1.rest;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lt.kvk.ppj.pw.s1.server.api.ObjectApi;
import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;
import lt.kvk.ppj.pws1.jpa.repository.ObjectRepository;

@RestController
@RequestMapping("/api")
public class ObjectRest implements ObjectApi {
	
	@Autowired
	private ObjectRepository objectRepository;

	@Override
	public ResponseEntity<Void> addObject(@Valid Object object) {
		System.out.println("Testing........");
		return null;
	}

	@Override
	public ResponseEntity<Void> deleteObject(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public ResponseEntity<List<Object>> getObject() {
		return null;
	}

	@Override
	public ResponseEntity<Object> getObjectById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Void> updateObject(@Valid Object object) {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}
