package lt.kvk.ppj.pws1.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;

class Utils {

	private Utils() {
		throw new AssertionError();
	}

	static <T> ResponseEntity<List<T>> toResponseEntity(List<T> list) {
		if (list == null || list.isEmpty()) {
			// You many decide to return HttpStatus.NOT_FOUND
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(list);
	}
}
