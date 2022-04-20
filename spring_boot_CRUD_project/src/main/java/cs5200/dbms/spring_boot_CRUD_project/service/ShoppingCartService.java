package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.ShoppingCartDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.ShoppingCart;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin(origins = "*")
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

  public void addProduct(ShoppingCart cart) {

    shoppingCartDao.save(cart);
  }
}
