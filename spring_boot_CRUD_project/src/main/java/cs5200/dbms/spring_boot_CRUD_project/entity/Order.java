package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "buyer_id")
  private User buyer;

  private double totalPrice;
  @Enumerated(EnumType.ORDINAL)
  private Order_Status orderStatus;
  private Date createdOn;

  /**
   * Constructs an empty Order
   */
  public Order() {
  }

  /**
   * Constructs an Order object using below details
   *
   * @param totalPrice price
   * @param status     status of an order
   */
  public Order(double totalPrice, String status) {
    //this.buyer = buyer;
    this.totalPrice = totalPrice;
    this.orderStatus = Order_Status.valueOf(status);
  }

  /**
   * Returns a buyer details
   *
   * @return a buyer as Object
   */
  public User getBuyer() {
    return this.buyer;
  }

  /**
   * Sets buyer
   *
   * @param buyer as Object
   */
  public void setBuyer(User buyer) {
    this.buyer = buyer;
  }

  /**
   * Returns order status
   *
   * @return orser status
   */
  public Order_Status getOrderStatus() {
    return this.orderStatus;
  }

  /**
   * Sets order status
   *
   * @param orderStatus order status
   */
  public void setOrderStatus(Order_Status orderStatus) {
    this.orderStatus = orderStatus;
  }

  /**
   * Returns a total price of an order
   *
   * @return total price
   */
  public double getTotalPrice() {
    return this.totalPrice;
  }

  /**
   * Sets a total price
   *
   * @param totalPrice as double
   */
  public void setTotalPrice(double totalPrice) {
    this.totalPrice = totalPrice;
  }

  public Integer getId() {
    return this.id;
  }
}
