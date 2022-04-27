package cs5200.dbms.spring_boot_CRUD_project.entity;

public class CheckoutOrder {
  private int orderId;
  private Order_Status status;
  private boolean isPay;

  public int getOrderId() {
    return orderId;
  }

  public Order_Status getStatus() {
    return status;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }

  public void setStatus(Order_Status status) {
    this.status = status;
  }

  public boolean getIsPay() {
    return isPay;
  }

  public void setIsPay(boolean pay) {
    isPay = pay;
  }
}
