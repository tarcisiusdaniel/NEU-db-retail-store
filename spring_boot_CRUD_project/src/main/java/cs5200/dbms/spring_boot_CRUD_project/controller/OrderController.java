package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Order;
import cs5200.dbms.spring_boot_CRUD_project.service.OrderService;
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
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @PostMapping("/create")
  public String add(@RequestBody Order order) {
    return orderService.createOrder(order).getId() > 0 ? "Product created successfully" : "Failed";

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
  public String update(@PathVariable("orderId") Integer orderId, @RequestBody Order order) {
    if (order == null || orderId == null || orderId.intValue() < 1) {
      throw new RuntimeException("Arguments can not be null.");
    }

    Order oldOrder = orderService.findOrderById(orderId);

    if (oldOrder == null) {
      throw new RuntimeException("Order does not exist as per the given details");
    }

    Order updateOrder = orderService.updateOrder(order);

    if (!Objects.equals(oldOrder.getId(), updateOrder.getId())) {
      throw new RuntimeException(
          "Error occurred while updating order details. Please check later.");
    }

    return "Order updated successfully";
  }

}
