package cs5200.dbms.spring_boot_CRUD_project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder.In;

/**
 * Represents a Shopping cart
 */
@Entity
@Table(name = "carts")
public class ShoppingCart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;


  private Integer productId;

  private Integer buyerId;

  @Column(name = "total_price")
  private Double totalPrice;
  private Integer quantity;

  /**
   * Constructs a Shopping Cart using below details
   */
  public ShoppingCart(Double price, Integer quantity, Integer productId) {
    this.totalPrice = price;
    this.quantity = quantity;
    this.productId = productId;
  }

  public ShoppingCart() {

  }



  public Integer getProductId() {
    return productId;
  }

  public void setProductId(Integer productId) {
    this.productId = productId;
  }

  /**
   * Returns a total price
   *
   * @return total price
   */
  public double getTotalPrice() {
    return totalPrice;
  }

  /**
   * Sets price
   *
   * @param totalPrice as double
   */
  public void setTotalPrice(double totalPrice) {
    this.totalPrice = totalPrice;
  }

  public Integer getBuyerId() {
    return buyerId;
  }

  public void setBuyerId(int buyerId) {
    this.buyerId = buyerId;
  }

  /**
   * Returns quantity
   *
   * @return quantity
   */
  public int getQuantity() {
    return quantity;
  }

  /**
   * sets quantity
   *
   * @@param quantity
   */
  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public Integer getId() {
    return this.id;
  }
}
