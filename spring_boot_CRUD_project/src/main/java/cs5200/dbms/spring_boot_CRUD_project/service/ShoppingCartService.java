package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.ShoppingCartDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import cs5200.dbms.spring_boot_CRUD_project.entity.ShoppingCart;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartService {

  @Autowired
  ShoppingCartDao shoppingCartDao;

  public ShoppingCart createCart(ShoppingCart cart) {
    return shoppingCartDao.save(cart);
  }

  public List<ShoppingCart> findAllCarts() {
    return shoppingCartDao.findAllCarts();
  }

  public ShoppingCart findCartById(Integer id) {
    return shoppingCartDao.findCartById(id);
  }

  public void deleteCart(Integer id) {
    shoppingCartDao.deleteById(id);
  }

  public ShoppingCart updateCart(ShoppingCart cart) {
    return shoppingCartDao.save(cart);
  }

  public void addProduct(Product product, ShoppingCart cart){
    Set<Product> productSet = cart.getProducts();
    cart.setProducts(product);
    shoppingCartDao.save(cart);
  }
}
