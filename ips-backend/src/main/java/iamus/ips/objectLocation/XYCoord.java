package iamus.ips.objectLocation;

public class XYCoord {
	private double x;
	private double y;
	private double changeInPx;
	
	public XYCoord() {

	
	}
	
	public XYCoord(double x, double y) {
		this.x = x;
		this.y = y;

	
	}
	
	
	public double getChangeInPx() {
		return changeInPx;
	}

	public void setChangeInPx(double changeInPx) {
		this.changeInPx = changeInPx;
	}

	public double getX() {
		return x;
	}
	public void setX(double x) {
		this.x = x;
	}
	public double getY() {
		return y;
	}
	public void setY(double y) {
		this.y = y;
	}


	
	
	
	
	

}
