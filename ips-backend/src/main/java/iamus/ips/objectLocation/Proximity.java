package iamus.ips.objectLocation;

import java.util.List;

public class Proximity {


public List proximity(List<List> transmitterList) {
	List closestTransmitter = null;
	float strongestSignal = (float) transmitterList.get(0).get(1);
	for (List transmitter : transmitterList) {
		if ((float) transmitter.get(1) >= strongestSignal) {
			closestTransmitter = transmitter;
			strongestSignal = (float) transmitter.get(1);
		}
	}
	return closestTransmitter;
}
}
