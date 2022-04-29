package cs5200.dbms.spring_boot_CRUD_project.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "purchase_items")
public class PurchaseItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private int productId;

  private Integer quantity;

  private Integer price;
  public Integer getId() {
    return id;
  }

  public int getProductId() {
    return productId;
  }

  public Integer getQuantity() {
    return this.quantity;
  }

  public void setQuantity(Integer quantity) {
    this.quantity = quantity;
  }

  public void setProductId(int productId) {
    this.productId = productId;
  }
}
