package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import cs5200.dbms.spring_boot_CRUD_project.entity.CheckoutOrder;
import cs5200.dbms.spring_boot_CRUD_project.entity.Order;
import cs5200.dbms.spring_boot_CRUD_project.entity.Order_Status;
import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import cs5200.dbms.spring_boot_CRUD_project.entity.Purchase;
import cs5200.dbms.spring_boot_CRUD_project.entity.PurchaseItem;
import cs5200.dbms.spring_boot_CRUD_project.entity.Transaction;
import cs5200.dbms.spring_boot_CRUD_project.entity.UserOrder;
import cs5200.dbms.spring_boot_CRUD_project.service.BuyerService;
import cs5200.dbms.spring_boot_CRUD_project.service.OrderService;
import cs5200.dbms.spring_boot_CRUD_project.service.ProductService;
import cs5200.dbms.spring_boot_CRUD_project.service.PurchaseService;
import cs5200.dbms.spring_boot_CRUD_project.service.TransactionService;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import org.aspectj.weaver.ast.Or;
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
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @Autowired
  private BuyerService buyerService;
  @Autowired
  private ProductService productService;
  @Autowired
  private PurchaseService purchaseService;
  @Autowired
  private TransactionService transactionService;

  @PostMapping("/create")
  public ResponseEntity<?> add(@RequestBody Order order) {
    if(order == null || order.getBuyerId() == null || order.getOrderStatus() == null) {
      return new ResponseEntity<>("Argument is passed null", HttpStatus.BAD_REQUEST);
    }

    Buyer buyer = buyerService.findBuyerById(order.getBuyerId());
    if (buyer == null) {
      return new ResponseEntity<>("Buyer does not exist", HttpStatus.BAD_REQUEST);
    }

    if(!checkIfProductExists(order)){
      return new ResponseEntity<>("Product does not exist", HttpStatus.BAD_REQUEST);
    }

    if(order.getOrderStatus() == Order_Status.CHECKOUT){
      List<String> inValidQuantities = checkQuantitiesInStockForCheckout(order);
      if(inValidQuantities.size() > 0) {
        StringBuilder sb = new StringBuilder();
        for (String str : inValidQuantities) {
          sb.append(str).append("\n");
        }
        order.setOrderStatus(Order_Status.PENDING);
        return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
      }else{
        order.setOrderStatus(Order_Status.SUCCESS);
      }
    }

    Order actualOrder = new Order();
    actualOrder.setBuyerId(order.getBuyerId());
    actualOrder.setOrderStatus(order.getOrderStatus());
    actualOrder.setTotalPrice(order.getTotalPrice());
    actualOrder.setItems(order.getItems());
    actualOrder.setCreatedOn(new Date(System.currentTimeMillis()));

    Order savedOrder = orderService.createOrder(actualOrder);

    String result;
    if(actualOrder.getOrderStatus() == Order_Status.CHECKOUT){
      actualOrder.setOrderStatus(Order_Status.SUCCESS);
      result = createTransaction(actualOrder);
    }else if(actualOrder.getOrderStatus() == Order_Status.PENDING){
      actualOrder.setOrderStatus(Order_Status.PENDING);
      return new ResponseEntity<>(actualOrder,HttpStatus.OK);
    }else{
      actualOrder.setOrderStatus(Order_Status.CANCEL);
      result = "Order cancelled";
    }

    if(order.getOrderStatus() == Order_Status.SUCCESS){
      updateProductsQuantityInStock(actualOrder);
    }

    return savedOrder.getId() > 0  && !result.equals("Order cancelled") ?
        new ResponseEntity<>("Order and transaction created successfully", HttpStatus.OK)
        : new ResponseEntity<>(result,HttpStatus.BAD_REQUEST);
  }

  private boolean checkIfProductExists(Order userOrder) {
    for (PurchaseItem item: userOrder.getItems()) {
      if(productService.findProductById(item.getProductId()) == null){
        return false;
      }
    }
    return true;
  }

  private List<String> checkQuantitiesInStockForCheckout(Order order) {
    List<String> inValidQuantities = new ArrayList<>();
    for (PurchaseItem item : order.getItems()){
      Product productInDB = productService.findProductById(item.getProductId());
      if(productInDB.getQuantity() < item.getQuantity()){
        inValidQuantities.add(productInDB.getProductName());
      }
    }
    return inValidQuantities;
  }

  private void updateProductsQuantityInStock(Order order) {

    var purchaseList = purchaseService.findPurchaseByOrderId(order.getId());
    for (Integer purchase : purchaseList) {
      var product = purchaseService.findProductsByPurchaseId(purchase);
      for (PurchaseItem id : product) {
        Product productInDB = productService.findProductById(id.getProductId());

        productInDB.setQuantity(productInDB.getQuantity() - id.getQuantity());

        productService.updateProduct(productInDB);
      }
    }
  }

  @GetMapping("/findAll")
  public List<Order> getAll() {
    return orderService.findAllOrder();
  }

  @GetMapping("/find/{orderId}")
  public Order getOrder(@PathVariable("orderId") int id) {
    return orderService.findOrderById(id);
  }

  @GetMapping("/delete/{orderId}")
  public void delete(@PathVariable("orderId") int id) {
    orderService.deleteOrder(id);
  }

  @PostMapping("/update/{orderId}")
  public ResponseEntity<?> update(@PathVariable("orderId") Integer orderId, @RequestBody Order order) {
    if (order == null || orderId == null || orderId.intValue() < 1) {
      return new ResponseEntity<>("Argument is passed null", HttpStatus.BAD_REQUEST);
    }
    if (order.getBuyerId() == null) {
      return new ResponseEntity<>("Buyer does not exist", HttpStatus.BAD_REQUEST);
    }
    Order oldOrder = orderService.findOrderById(orderId);

    if (oldOrder == null) {
      return new ResponseEntity<>("Order does not exist", HttpStatus.BAD_REQUEST);
    }

    Order updateOrder = orderService.updateOrder(order);

    if (!Objects.equals(oldOrder.getId(), updateOrder.getId())) {
      return new ResponseEntity<>("Error occurred while updating order details. Please check later."
          , HttpStatus.BAD_REQUEST);
    }

    return updateOrder.getId() > 0 ? new ResponseEntity<>("Order updated successfully",HttpStatus.OK) :
        new ResponseEntity<>("Error occurred while updating order details. Please check later.",
        HttpStatus.BAD_REQUEST);
  }
  @GetMapping("/findOrderByBuyerId/{buyerId}")
  public List<Order> findOrderByBuyerId(@PathVariable ("buyerId") Integer buyerId){
    return orderService.findOrderByBuyerId(buyerId);
  }

  @PostMapping("/checkout")
  public String checkOutOrder(@RequestBody Order checkoutOrder){
    Order order = null;
    if(checkoutOrder == null){
      order = orderService.findOrderById(checkoutOrder.getId());

    }

    if(checkoutOrder.getOrderStatus() == Order_Status.CHECKOUT){
      List<String> inValidQuantities = checkQuantitiesInStockForCheckout(order);
      if(inValidQuantities.size() > 0) {
        StringBuilder sb = new StringBuilder();
        for (String str : inValidQuantities) {
          sb.append(str).append("\n");
        }
        checkoutOrder.setOrderStatus(Order_Status.PENDING);
        return sb.toString();
      }else{
        checkoutOrder.setOrderStatus(Order_Status.SUCCESS);
      }
    }

    String result;
    if(checkoutOrder.getOrderStatus() == Order_Status.CHECKOUT){
      checkoutOrder.setOrderStatus(Order_Status.SUCCESS);
      if(order.getOrderStatus() == Order_Status.SUCCESS){
        updateProductsQuantityInStock(checkoutOrder);
      }
      result = createTransaction(checkoutOrder);
    }else{
      checkoutOrder.setOrderStatus(Order_Status.CANCEL);
      result = "Order cancelled";
    }
    return result;
  }

  private String createTransaction(Order order) {
    Transaction transaction = new Transaction();
    transaction.setOrder(order.getId());
    transaction.setStatus(order.getOrderStatus());
    Integer id = transactionService.createTransaction(transaction).getId();
    return id > 0 ? "Transaction created successfully" : "Transaction creation failed";
  }
}
