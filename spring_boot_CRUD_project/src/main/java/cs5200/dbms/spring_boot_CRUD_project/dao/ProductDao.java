package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProductDao extends CrudRepository<Product,Integer> {

  @Query(value = "SELECT * FROM products",
      nativeQuery = true)
  public List<Product> findAllProducts();

  @Query(value = "SELECT * FROM products WHERE id=:productId",
      nativeQuery = true)
  public Product findProductById(@Param("productId") Integer id);
}
