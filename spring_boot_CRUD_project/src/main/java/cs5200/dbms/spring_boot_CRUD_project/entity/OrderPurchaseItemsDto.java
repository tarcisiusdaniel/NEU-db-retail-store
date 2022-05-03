package cs5200.dbms.spring_boot_CRUD_project.entity;

public class OrderPurchaseItemsDto {
  private int productId;
  private int orderId;
  private int quantity;
  private String productName;


  public String getProductName() {
    return productName;
  }

  public int getQuantity() {
    return quantity;
  }

  public int getOrderId() {
    return orderId;
  }

  public int getProductId() {
    return productId;
  }

  public void setProductId(int productId) {
    this.productId = productId;
  }

  public void setOrderId(int orderId) {
    this.orderId = orderId;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public void setProductName(String productName) {
    this.productName = productName;
  }
}
