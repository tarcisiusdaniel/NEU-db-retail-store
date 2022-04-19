package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.ProductDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
  @Autowired
  ProductDao productDao;


  public Product createProduct(Product product) {
    return productDao.save(product);
  }

  public List<Product> findAllProduct() {
    return productDao.findAllProducts();
  }


  public Product findProductById(Integer id) {
    return productDao.findProductById(id);
  }

  public void deleteProduct(Integer id) {
    productDao.deleteById(id);
  }

  public Product updateProduct(Product product) {
    return productDao.save(product);
  }
}
