package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.service.ProductService;
import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductController {

  @Autowired
  private ProductService productService;

  @PostMapping("/create")
  public String add(@RequestBody Product product) {
    return productService.createProduct(product).getId() > 0 ? "Product created successfully" : "Failed";

  }

  @GetMapping("/findAll")
  public List<Product> getAll(){
    return productService.findAllProduct();
  }

  @GetMapping("/find/{productId}")
  public Product getProduct(@PathVariable("productId") int id){
    return productService.findProductById(id);
  }

  @GetMapping("/delete/{productId}")
  public void delete(@PathVariable("productId") int id){
    productService.deleteProduct(id);
  }

  @PostMapping("/update/{productId}")
  public String update(@PathVariable("productId") Integer productId,@RequestBody Product product){
    if(product == null || productId == null || productId.intValue()<1)
      throw new RuntimeException("Arguments can not be null.");

    Product oldProduct = productService.findProductById(productId);

    if(oldProduct == null)
      throw new RuntimeException("Product does not exist as per the given details");

    Product updatedProduct = productService.updateProduct(product);

    if(!Objects.equals(oldProduct.getId(), updatedProduct.getId()))
      throw new RuntimeException("Error occurred while updating product details. Please check later.");

    return "Product updated successfully";
  }
}
