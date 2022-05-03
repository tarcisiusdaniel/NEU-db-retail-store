package cs5200.dbms.spring_boot_CRUD_project.dao;

import cs5200.dbms.spring_boot_CRUD_project.entity.Order;
import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProductDao extends CrudRepository<Product, Integer> {

  @Query(value = "SELECT * FROM products where quantity > 0",
      nativeQuery = true)
  List<Product> findAllProducts();

  @Query(value = "SELECT * FROM products WHERE id=:productId",
      nativeQuery = true)
  Product findProductById(@Param("productId") Integer id);

  @Query(value = "SELECT * FROM products WHERE product_category=:category and quantity > 0",
      nativeQuery = true)
  List<Product> findProductByCategory(@Param("category") String category);

  @Query(value = "SELECT * FROM products WHERE created_by=:sellerId",
      nativeQuery = true)
  List<Product> findBySellerId(@Param("sellerId") Integer sellerId);
}
