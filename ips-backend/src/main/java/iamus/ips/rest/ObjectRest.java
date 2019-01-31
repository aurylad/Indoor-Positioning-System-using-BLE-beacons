package iamus.ips.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import iamus.ips.jpa.entity.ObjectEntity;
import iamus.ips.jpa.repository.ObjectRepository;
import io.swagger.annotations.ApiParam;
import iamus.ips.server.api.TrackedObjectApi;
import iamus.ips.server.model.TrackedObject;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:4200", allowedHeaders="*")
public class ObjectRest implements TrackedObjectApi {

	@Autowired
	private ObjectRepository objectRepository;

	public ObjectRest() {
		this.objectRepository = null;
	}

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
		tgt.setObjectCode(src.getObjectId());
		tgt.setObjectName(src.getObjName());
		tgt.setObjectType(src.getObjType());
		return tgt;
	}

	private ResponseEntity<Void> save(final TrackedObject src, Long objectId) {
		final ObjectEntity tgt = new ObjectEntity(objectId);
		tgt.setObjectId(src.getObjectCode());
		tgt.setAccessLevel(src.getObjectAccessLevel());
		tgt.setObjName(src.getObjectName());
		tgt.setObjType(src.getObjectType());
		objectRepository.save(tgt);
		return ResponseEntity.ok().build();
	}

}
