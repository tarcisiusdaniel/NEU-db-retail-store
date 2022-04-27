package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.HashMap;
import java.util.Map;

public class UserOrder {
  private Integer id;
  private Integer buyerId;
  private double totalPrice;
  private Order_Status orderStatus;
  private Map<Integer, Integer> items = new HashMap<>();

  public Integer getBuyerId() {
    return buyerId;
  }

  public void setBuyerId(Integer buyerId) {
    this.buyerId = buyerId;
  }

  public double getTotalPrice() {
    return totalPrice;
  }

  public void setTotalPrice(double totalPrice) {
    this.totalPrice = totalPrice;
  }

  public void setOrderStatus(Order_Status orderStatus) {
    this.orderStatus = orderStatus;
  }

  public Order_Status getOrderStatus() {
    return orderStatus;
  }

  public Map<Integer, Integer> getItems() {
    return items;
  }

  public void setItems(Map<Integer, Integer> items) {
    this.items = items;
  }
}
