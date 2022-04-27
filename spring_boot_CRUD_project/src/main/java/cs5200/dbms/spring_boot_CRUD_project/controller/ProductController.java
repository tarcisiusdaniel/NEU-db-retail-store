package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import cs5200.dbms.spring_boot_CRUD_project.service.ProductService;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {

  @Autowired
  private ProductService productService;

  @PostMapping("/create/{userId}")
  public ResponseEntity<?> add(@RequestBody Product product,@PathVariable("userId") int userid) {
    product.setCreatedBy(userid);
    int newId = productService.createProduct(product).getId();
    return newId > 0 ?
        new ResponseEntity<>("Product created successfully",HttpStatus.OK) :
        new ResponseEntity<>("Product created failed",HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/findAll")
  public List<Product> getAll() {
    return productService.findAllProduct();
  }

  @GetMapping("/find/{productId}")
  public Product getProduct(@PathVariable("productId") int id) {
    return productService.findProductById(id);
  }

  @GetMapping("/delete/{productId}/{id}")
  public void delete(@PathVariable("productId") int productId,@PathVariable("id") int userId) {
    Product oldProduct = productService.findProductById(productId);

    if(oldProduct.getCreatedBy() != userId){
      throw new RuntimeException("You are not authorized to delete other seller's products");
    }
    productService.deleteProduct(productId);
  }

  @PostMapping("/update/{userId}")
  public ResponseEntity<?> update(@PathVariable("userId") int userId, @RequestBody Product product) {
    if (product == null || userId < 1) {
      return new ResponseEntity<>("Arguments can not be null."
          , HttpStatus.BAD_REQUEST);
    }

    Product oldProduct = productService.findProductById(product.getId());

    if (oldProduct == null) {
      return new ResponseEntity<>("Product does not exist as per the given details"
          , HttpStatus.BAD_REQUEST);
    }

    if(oldProduct.getCreatedBy() != userId){
      return new ResponseEntity<>("You are not authorized to update other seller's products"
          , HttpStatus.BAD_REQUEST);
    }

    Product updatedProduct = productService.updateProduct(product);

    if (!Objects.equals(oldProduct.getId(), updatedProduct.getId())) {
      return new ResponseEntity<>("Error occurred while updating product details. Please check later."
          , HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
  }
  @GetMapping("/findByCategory/{category}")
  public List<Product> findProductsByCategory(@PathVariable("category") String categoryName){
    return productService.findProductsByCategory(categoryName.toUpperCase());
  }
}
