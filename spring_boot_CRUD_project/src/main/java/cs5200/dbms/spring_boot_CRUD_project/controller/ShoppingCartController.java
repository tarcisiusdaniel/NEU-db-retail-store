package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import cs5200.dbms.spring_boot_CRUD_project.entity.ShoppingCart;
import cs5200.dbms.spring_boot_CRUD_project.service.BuyerService;
import cs5200.dbms.spring_boot_CRUD_project.service.ProductService;
import cs5200.dbms.spring_boot_CRUD_project.service.ShoppingCartService;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "*")
public class ShoppingCartController {


  @Autowired
  private ShoppingCartService shoppingCartService;

  @Autowired
  private ProductService productService;

  @Autowired
  private BuyerService buyerService;

  @PostMapping("/create")
  public String add(@RequestBody ShoppingCart cart) {
    ShoppingCart toSaveCart = cart;

    //cart.setBuyer(buyerRestRepository.findBuyerById(id));
    // return shoppingCartRepository.save(cart);

    var product = productService.findProductById(cart.getProductId());
    if(product == null){
      throw new RuntimeException("Product does not exist in the system");
    }
    Integer buyer_id = cart.getBuyer().getId();
    Buyer buyer = buyerService.findBuyerById(buyer_id);
    toSaveCart.setBuyer(buyer);
    ShoppingCart savedCart = shoppingCartService.createCart(toSaveCart);

    //productService.updateProduct(cart.g)
    return savedCart.getId() > 0 ? "Cart created successfully" : "Failed";
  }

  @GetMapping("/findAll")
  public List<ShoppingCart> getAll() {
    return shoppingCartService.findAllCarts();
  }

  @GetMapping("/find/{cartId}")
  public ShoppingCart getOrder(@PathVariable("cartId") int id) {
    return shoppingCartService.findCartById(id);
  }

  @GetMapping("/delete/{cartId}")
  public void delete(@PathVariable("cartId") int id) {
    shoppingCartService.deleteCart(id);
  }

  @PostMapping("/update/{cartId}")
  public String update(@PathVariable("cartId") Integer cartId, @RequestBody ShoppingCart cart) {
    if (cart == null || cartId == null || cartId.intValue() < 1) {
      throw new RuntimeException("Arguments can not be null.");
    }
    if(cart.getBuyer().getId() == null){
      throw new RuntimeException("Buyer Id can not be null while updating Cart.");
    }
    if(cart.getBuyer().getUser().getId() == null){
      throw new RuntimeException("User Id can not be null while updating Cart.");
    }
    var product = productService.findProductById(cart.getProductId());
    if(product == null){
      throw new RuntimeException("Product does not exist in the system");
    }
    ShoppingCart oldCart = shoppingCartService.findCartById(cartId);

    if (oldCart == null) {
      throw new RuntimeException("Cart does not exist as per the given details");
    }

    ShoppingCart updateOrder = shoppingCartService.updateCart(cart);

    if (!Objects.equals(oldCart.getId(), updateOrder.getId())) {
      throw new RuntimeException("Error occurred while updating cart details. Please check later.");
    }

    return "Cart updated successfully";
  }
//
//  @PostMapping("/addProduct")
//  public void addProducts(@RequestBody ShoppingCart cart, @RequestBody Product product){
//    if(product == null)
//      throw new RuntimeException("Product can not be null");
//    //Set<Product> productSet = cart.getProducts();
//    //cart.setProducts(product);
//    shoppingCartService.addProduct(cart);
//  }

}
