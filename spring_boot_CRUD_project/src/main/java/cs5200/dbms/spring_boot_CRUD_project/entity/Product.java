package cs5200.dbms.spring_boot_CRUD_project.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Represents a Product
 */
@Entity
@Table(name = "products")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @Column(name = "product_name")
  private String productName;
  @Column(name = "manufacturer")
  private String manufacturerName;

  private Double price;
  @Enumerated(EnumType.STRING)
  @Column(name = "product_category")
  private Product_Category category;
  private Integer quantity;

  @ManyToOne
  @JoinColumn(name = "purchase_id")
  private Purchase purchase;

  private Integer createdBy;
  /**
   * Constructs a Product using below details
   *
   * @param productName      product name as String
   * @param manufacturerName manufacturer name as String
   * @param price            price in double
   * @param category         category
   * @param quantity         quantity
   */
  public Product(String productName, String manufacturerName, double price,
      int quantity,
      Product_Category category) {
    setProductName(productName);
    this.manufacturerName = manufacturerName;
    this.price = price;
    this.quantity = quantity;
  }

  /**
   * Constructs an empty Product
   */
  public Product() {

  }

  /**
   * Returns a product name
   *
   * @return product name as String
   */
  public String getProductName() {
    return this.productName;
  }

  /**
   * Sets a product name
   *
   * @param productName as String
   */
  public void setProductName(String productName) {
    if (productName != null && !productName.isBlank()) {
      this.productName = productName;
    } else {
      throw new RuntimeException("model.Product Name can not be null");
    }
  }

  /**
   * Returns a manufacturer name
   *
   * @return manufacturer name as String
   */
  public String getManufacturerName() {
    return this.manufacturerName;
  }

  /**
   * Sets manufacturer name
   *
   * @param manufacturerName in String
   */
  public void setManufacturerName(String manufacturerName) {
    if (manufacturerName != null && !manufacturerName.isBlank()) {
      this.manufacturerName = manufacturerName;
    } else {
      throw new RuntimeException("Manufacturer Name can not be null");
    }
  }

  /**
   * Returns a price
   *
   * @return price as double
   */
  public double getPrice() {
    return this.price;
  }

  /**
   * Sets a price
   *
   * @param price as double
   */
  public void setPrice(double price) {
    if (price > 0) {
      this.price = price;
    } else {
      throw new RuntimeException("Price can less than zero");
    }
  }

  /**
   * Returns a quantity
   *
   * @return quantity as integer
   */
  public int getQuantity() {
    return this.quantity;
  }

  /**
   * Sets a quantity
   *
   * @param quantity as integer
   */
  public void setQuantity(int quantity) {
    //if(quantity <1)
    this.quantity = quantity;
  }

  public Integer getId() {
    return this.id;
  }

  public Integer getCreatedBy() {
    return createdBy;
  }

  public void setCreatedBy(Integer createdBy) {
    this.createdBy = createdBy;
  }
}
