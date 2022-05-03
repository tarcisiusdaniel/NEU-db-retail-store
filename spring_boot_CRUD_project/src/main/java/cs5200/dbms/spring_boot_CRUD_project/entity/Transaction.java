package cs5200.dbms.spring_boot_CRUD_project.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "transactions")
public class Transaction implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Enumerated(EnumType.ORDINAL)
  private Order_Status status;

  @Column(name="order_id")
  private Integer order;

  private Date createdOn;
  private int createdBy;
  @Enumerated(EnumType.STRING)
  private Shipment_Provider shipment_provider;
  @JsonInclude()
  @Transient
  private double total_price;

  public Transaction(String status, Order order) {
    this.status = Order_Status.valueOf(status);
    //this.order = order;
    this.createdOn = new java.sql.Date(System.currentTimeMillis());
  }

  public Transaction() {

  }

  public double getTotal_price() {
    return total_price;
  }

  public void setTotal_price(double total_price) {
    this.total_price = total_price;
  }

  public void setCreatedOn(Date createdOn) {
    this.createdOn = createdOn;
  }

  public void setCreatedBy(int createdBy) {
    this.createdBy = createdBy;
  }

  public Integer getId() {
    return this.id;
  }

  public void setOrder(Integer order) {
    this.order = order;
  }

  public Integer getOrder() {
    return order;
  }

  public Order_Status getStatus() {
    return this.status;
  }

  public void setStatus(Order_Status status) {
    this.status = status;
  }

  public void setShipment_provider(
      Shipment_Provider shipment_provider) {
    this.shipment_provider = shipment_provider;
  }

  public Shipment_Provider getShipment_provider() {
    return shipment_provider;
  }
}
