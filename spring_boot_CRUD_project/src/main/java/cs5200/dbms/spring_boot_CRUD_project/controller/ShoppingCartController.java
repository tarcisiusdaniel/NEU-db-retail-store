package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import cs5200.dbms.spring_boot_CRUD_project.entity.ShoppingCart;
import cs5200.dbms.spring_boot_CRUD_project.entity.ShoppingCartBunch;
import cs5200.dbms.spring_boot_CRUD_project.entity.User;
import cs5200.dbms.spring_boot_CRUD_project.service.BuyerService;
import cs5200.dbms.spring_boot_CRUD_project.service.ProductService;
import cs5200.dbms.spring_boot_CRUD_project.service.ShoppingCartService;
import cs5200.dbms.spring_boot_CRUD_project.service.UserService;
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

  @Autowired
  private UserService userService;

  @PostMapping("/create")
  public String add(@RequestBody ShoppingCart cart) {
    ShoppingCart toSaveCart = cart;


    var product = productService.findProductById(cart.getProductId());
    if (product == null) {
      throw new RuntimeException("Product does not exist in the system");
    }
    Integer buyer_id = cart.getBuyerId();
    Buyer buyer = buyerService.findBuyerById(buyer_id);
    if (buyer == null) {
      throw new RuntimeException("Buyer does not exist");
    }
    toSaveCart.setBuyerId(buyer_id);
    toSaveCart.setTotalPrice(cart.getTotalPrice());
    ShoppingCart savedCart = shoppingCartService.createCart(toSaveCart);

    //productService.updateProduct(cart.g)
    return savedCart.getId() > 0 ? "Cart created successfully" : "Failed";
  }

  @PostMapping("/createBunch")
  public String addBunch(@RequestBody ShoppingCartBunch cart) {
    //ShoppingCartBunch toSaveCartBunch = cart;

    String doProductsExist = checkProductsInDB(cart);
    if(!doProductsExist.equals("pass")){
      throw new RuntimeException(doProductsExist);
    }


    Integer buyer_id = cart.getBuyerId();
    Buyer buyer = buyerService.findBuyerById(buyer_id);
    if (buyer == null) {
      throw new RuntimeException("Buyer does not exist");
    }


    for (Product product : cart.getProducts()) {
      ShoppingCart toSaveCart = new ShoppingCart();
      toSaveCart.setBuyerId(buyer_id);
      toSaveCart.setProductId(product.getId());
      toSaveCart.setQuantity(product.getQuantity());
      toSaveCart.setTotalPrice(cart.getTotalPrice());
      Integer id = shoppingCartService.createCart(toSaveCart).getId();
      if(id < 1){
        throw new RuntimeException("Cart creation failed for product "+product.getProductName());
      }
    }
//    cart.s
//    toSaveCart.setBuyerId(buyer_id);
//    ShoppingCart savedCart = shoppingCartService.createCart(toSaveCart);

    //productService.updateProduct(cart.g)
   // return savedCart.getId() > 0 ? "Cart created successfully" : "Failed";
    return "Cart created successfully";
  }

  private String checkProductsInDB(ShoppingCartBunch cart) {
    for (Product product : cart.getProducts()) {
      var productInDb = productService.findProductById(product.getId());
      if(productInDb == null){
        return String.format("Following product does not exist in system : %s",product.getProductName());
      }
      if(productInDb.getQuantity() < product.getQuantity()){
        return String.format("User selected more number of products than in stock. Please try again.");
      }
    }
    return "pass";
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
    if (cart.getBuyerId() == null) {
      throw new RuntimeException("Buyer Id can not be null while updating Cart.");
    }
    User user = userService.findUserById(
        buyerService.findBuyerById(cart.getBuyerId()).getUser().getId());
    if (user == null) {
      throw new RuntimeException("User Id can not be null while updating Cart.");
    }

    var product = productService.findProductById(cart.getProductId());
    if (product == null) {
      throw new RuntimeException("Product does not exist in the system");
    }
    if(product.getQuantity() < cart.getQuantity()){
      throw new RuntimeException("Cart's quantity is greater than product's quantity.");
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


  @PostMapping("/updateBunch/{cartId}")
  public String updateBunch(@PathVariable("cartId") Integer cartId, @RequestBody ShoppingCartBunch cartBunch) {

    if (cartBunch == null || cartId == null || cartId.intValue() < 1) {
      throw new RuntimeException("Arguments can not be null.");
    }
    ShoppingCart oldCart = shoppingCartService.findCartById(cartId);

    if (oldCart == null) {
      throw new RuntimeException("Cart does not exist as per the given details");
    }
    if (cartBunch.getBuyerId() == null) {
      throw new RuntimeException("Buyer Id can not be null while updating Cart.");
    }
    User user = userService.findUserById(
        buyerService.findBuyerById(cartBunch.getBuyerId()).getUser().getId());
    if (user == null) {
      throw new RuntimeException("User Id can not be null while updating Cart.");
    }

    String doProductsExist = checkProductsInDB(cartBunch);
    if(!doProductsExist.equals("pass")){
      throw new RuntimeException(doProductsExist);
    }

    ShoppingCart toSaveCart = new ShoppingCart();
    for (Product product : cartBunch.getProducts()) {
      toSaveCart.setBuyerId(cartBunch.getBuyerId());
      toSaveCart.setProductId(product.getId());
      toSaveCart.setQuantity(product.getQuantity());
      toSaveCart.setTotalPrice(cartBunch.getTotalPrice());
      ShoppingCart updateOrder = shoppingCartService.updateCart(toSaveCart);
      if (!Objects.equals(oldCart.getId(), updateOrder.getId())) {
        throw new RuntimeException("Error occurred while updating cart details. Please try again later.");
      }
    }

    return "Cart updated successfully";
  }

}
