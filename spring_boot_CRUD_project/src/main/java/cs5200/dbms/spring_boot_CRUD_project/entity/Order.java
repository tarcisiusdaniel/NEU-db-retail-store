package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name="buyer_id")
  private Integer buyerId;

  private double totalPrice;
  @Enumerated(EnumType.STRING)
  private Order_Status orderStatus;
  private Date createdOn;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
  @JoinColumn(name = "order_id", referencedColumnName = "id")
  private List<PurchaseItem> items = new ArrayList<>();

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
  public Integer getBuyerId() {
    return buyerId;
  }

  /**
   * Sets buyer
   *
   * @param buyerId as Object
   */
  public void setBuyerId(Integer buyerId) {
    this.buyerId = buyerId;
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

  public void setItems(List<PurchaseItem> items) {
    this.items = items;
  }

  public List<PurchaseItem> getItems() {
    return items;
  }
}
