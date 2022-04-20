package cs5200.dbms.spring_boot_CRUD_project.entity;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Represents a Shopping cart
 */
@Entity
@Table(name = "carts")
public class ShoppingCart {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "buyer_id")
  private Buyer buyer;
  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "product_id")
  private Set<Product> products;
  private Double totalPrice;
  private Integer quantity;

  /**
   * Constructs a Shopping Cart using below details
   */
  public ShoppingCart(Double price, Integer quantity) {
    this.totalPrice = price;
    this.quantity = quantity;
    this.products = new HashSet<>();
  }

  public ShoppingCart() {

  }
//
//  public void addProduct(Product product){
//    this.products.put(product.getProductName(),product);
//    this.quantity ++;
//    this.totalPrice += product.getPrice();
//  }


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

  /**
   * Returns a buyer
   *
   * @return buyer as object
   */
  public Buyer getBuyer() {
    return buyer;
  }

  /**
   * Sets a buyer
   *
   * @param buyer as object
   */
  public void setBuyer(Buyer buyer) {
    this.buyer = buyer;
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

  /**
   * Returns list of products
   *
   * @return list of products
   */
  public Set<Product> getProducts() {
    return products;
  }

  /**
   * Sets a product
   *
   * @param product
   */
  public void setProducts(Product product) {
    this.products.add(product);
  }

  public Integer getId() {
    return this.id;
  }
}
