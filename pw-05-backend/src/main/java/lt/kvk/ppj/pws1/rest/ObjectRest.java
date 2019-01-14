package lt.kvk.ppj.pws1.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiParam;
import lt.kvk.ppj.pw.s1.server.api.TrackedObjectApi;
import lt.kvk.ppj.pw.s1.server.model.TrackedObject;
import lt.kvk.ppj.pws1.jpa.entity.ObjectEntity;
import lt.kvk.ppj.pws1.jpa.repository.ObjectRepository;
import lt.kvk.ppj.pws1.jpa.repository.TrackedObjectRepository;

@RestController
@RequestMapping("/api")
public class ObjectRest implements TrackedObjectApi {

	@Autowired
	private ObjectRepository objectRepository;

	@Override
	public ResponseEntity<Void> addObject(@ApiParam(value = "") @Valid @RequestBody TrackedObject object) {
		return save(object, null);
	}

	@Override
	public ResponseEntity<Void> deleteObject(@ApiParam(value = "Numeric ID of the object to delete", //
			required = true) @PathVariable("id") Long id) {
		objectRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<List<TrackedObject>> getObject() {
		final List<TrackedObject> list = new ArrayList<>();
		for (final ObjectEntity src : objectRepository.findAllByOrderByIdAsc()) {
			list.add(toTrackedObject(src));
		}
		return Utils.toResponseEntity(list);
	}

	@Override
	public ResponseEntity<TrackedObject> getObjectById(@ApiParam(value = "Numeric ID of the object to get.", //
			required = true) @PathVariable("id") Long id) {
		Optional<ObjectEntity> optional = objectRepository.findById(id);
		if (optional.isPresent()) {
			return ResponseEntity.ok(toTrackedObject(optional.get()));
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@Override
	public ResponseEntity<Void> updateObject(@ApiParam(value = "") @Valid @RequestBody TrackedObject object) {
		return save(object, object.getId());
	}

	private static TrackedObject toTrackedObject(ObjectEntity src) {
		final TrackedObject tgt = new TrackedObject();
		tgt.setId(src.getId());
		tgt.setObjectAccessLevel(src.getAccessLevel());
		tgt.setObjectCode(src.getObjIdentificationCode());
		tgt.setObjectName(src.getObjName());
		tgt.setObjectType(src.getObjType());
		return tgt;
	}

	private ResponseEntity<Void> save(final TrackedObject src, Long objectId) {
		final ObjectEntity tgt = new ObjectEntity(objectId);
		tgt.setObjIdentificationCode(src.getObjectCode());
		tgt.setAccessLevel(src.getObjectAccessLevel());
		tgt.setObjName(src.getObjectName());
		tgt.setObjType(src.getObjectType());
		objectRepository.save(tgt);
		return ResponseEntity.ok().build();
	}

}
