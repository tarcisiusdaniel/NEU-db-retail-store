package cs5200.dbms.spring_boot_CRUD_project.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "cart_items")
public class PurchaseItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private int productId;

  public Integer getId() {
    return id;
  }

  public int getProductId() {
    return productId;
  }
}
