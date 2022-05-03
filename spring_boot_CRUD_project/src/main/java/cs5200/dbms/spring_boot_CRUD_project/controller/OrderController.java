package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import cs5200.dbms.spring_boot_CRUD_project.entity.CheckoutOrder;
import cs5200.dbms.spring_boot_CRUD_project.entity.Order;
import cs5200.dbms.spring_boot_CRUD_project.entity.OrderPurchaseItemsDto;
import cs5200.dbms.spring_boot_CRUD_project.entity.Order_Status;
import cs5200.dbms.spring_boot_CRUD_project.entity.Product;
import cs5200.dbms.spring_boot_CRUD_project.entity.Purchase;
import cs5200.dbms.spring_boot_CRUD_project.entity.PurchaseItem;
import cs5200.dbms.spring_boot_CRUD_project.entity.Shipment_Provider;
import cs5200.dbms.spring_boot_CRUD_project.entity.Transaction;
import cs5200.dbms.spring_boot_CRUD_project.entity.UserOrder;
import cs5200.dbms.spring_boot_CRUD_project.service.BuyerService;
import cs5200.dbms.spring_boot_CRUD_project.service.OrderService;
import cs5200.dbms.spring_boot_CRUD_project.service.ProductService;
import cs5200.dbms.spring_boot_CRUD_project.service.PurchaseService;
import cs5200.dbms.spring_boot_CRUD_project.service.TransactionService;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import javax.persistence.criteria.CriteriaBuilder.In;
import org.apache.tomcat.jni.Local;
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
import org.springframework.web.client.RestClientResponseException;

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
  public ResponseEntity<?> add(@RequestBody Order order) throws ParseException {
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

    //if(order.getOrderStatus() == Order_Status.CHECKOUT){
      List<String> inValidQuantities = checkQuantitiesInStockForCheckout(order);
      if(inValidQuantities.size() > 0) {
        StringBuilder sb = new StringBuilder("Not enough stock for following products: ");
        for (String str : inValidQuantities) {
          sb.append(str).append("\n");
        }
        return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
      }
   // }

    Order actualOrder = new Order();
    actualOrder.setBuyerId(order.getBuyerId());


    actualOrder.setOrderStatus(order.getOrderStatus());
    actualOrder.setTotalPrice(order.getTotalPrice());
    actualOrder.setItems(order.getItems());

    DateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
    Date todayWithZeroTime = formatter.parse(formatter.format(new Date()));

    actualOrder.setCreatedOn(todayWithZeroTime);


    Order savedOrder = orderService.createOrder(actualOrder);

    if(savedOrder.getOrderStatus() == Order_Status.CANCEL){
      return new ResponseEntity<>(savedOrder, HttpStatus.OK);
    }
    


    if(actualOrder.getOrderStatus() == Order_Status.CHECKOUT){
      savedOrder.setOrderStatus(Order_Status.SUCCESS);
      createTransaction(savedOrder);
    }
    if(actualOrder.getOrderStatus() == Order_Status.SUCCESS){
      updateProductsQuantityInStock(actualOrder);
    }

    return savedOrder.getId() > 0 ?
        new ResponseEntity<>(savedOrder, HttpStatus.OK)
        : new ResponseEntity<>("Error occurred while creating order.",HttpStatus.BAD_REQUEST);
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
    for (Purchase purchase : purchaseList) {
      System.out.println(purchase.getId()+" "+purchase.getQuantity()+" "+ purchase.getProductId());
      Product productInDB = productService.findProductById(purchase.getProductId());
      System.out.println(productInDB.getQuantity());
      productInDB.setQuantity(productInDB.getQuantity() - purchase.getQuantity());
      productService.updateProduct(productInDB);
      System.out.println("done for "+ purchase.getProductId());
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


  @GetMapping("/findPurchaseItems/{orderId}")
  public List<?> findPurchaseItems(@PathVariable ("orderId") Integer orderId){
    var purchaseItemsList = orderService.findPurchaseItems(orderId);
    return purchaseItemsList;
  }
  //

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

    if(order.getOrderStatus() == Order_Status.CHECKOUT){
      List<String> inValidQuantities = checkQuantitiesInStockForCheckout(order);
      if(inValidQuantities.size() > 0) {
        StringBuilder sb = new StringBuilder("Not enough stock for following products: ");
        for (String str : inValidQuantities) {
          sb.append(str).append("\n");
        }
        sb.append("Please update quantities in Purchase products page.");
        order.setOrderStatus(Order_Status.PENDING);
        System.out.println(sb);

        return new ResponseEntity<>(sb.toString(), HttpStatus.BAD_REQUEST);
      }
      oldOrder.setOrderStatus(Order_Status.SUCCESS);
    }

    if(order.getOrderStatus() != Order_Status.CHECKOUT){
      oldOrder.setOrderStatus(order.getOrderStatus());
    }
    Order updateOrder = orderService.updateOrder(oldOrder);

    if(updateOrder.getOrderStatus() == Order_Status.SUCCESS){
      updateProductsQuantityInStock(updateOrder);
      createTransaction(updateOrder);
    }

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
    var orderList = orderService.findOrderByBuyerId(buyerId);
    return orderList;
  }

  @PostMapping("/checkout")
  public String checkOutOrder(@RequestBody Order checkoutOrder){
    Order order = null;
    if(checkoutOrder == null){
      //order = orderService.findOrderById(checkoutOrder.getId());
      //return new ResponseEntity<>(checkoutOrder,HttpStatus.BAD_REQUEST);
    }

    if(checkoutOrder.getOrderStatus() == Order_Status.CHECKOUT){
      List<String> inValidQuantities = checkQuantitiesInStockForCheckout(order);
      if(inValidQuantities.size() > 0) {
        StringBuilder sb = new StringBuilder("Not enough stock for following products: ");
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
    transaction.setCreatedBy(order.getBuyerId());
    transaction.setCreatedOn(new Date(System.currentTimeMillis()));
    transaction.setShipment_provider(Shipment_Provider.USPS);
    Integer id = transactionService.createTransaction(transaction).getId();
    return id > 0 ? "Transaction created successfully" : "Transaction creation failed";
  }
}
