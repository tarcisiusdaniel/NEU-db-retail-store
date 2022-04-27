package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.OrderDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.Order;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin(origins = "*")
public class OrderService {


  @Autowired
  OrderDao orderDao;

  public Order createOrder(Order order) {
    return orderDao.save(order);
  }

  public List<Order> findAllOrder() {
    return orderDao.findAllOrders();
  }


  public Order findOrderById(Integer id) {
    return orderDao.findOrderById(id);
  }

  public void deleteOrder(Integer id) {
    orderDao.deleteById(id);
  }


  public Order updateOrder(Order order) {
    return orderDao.save(order);
  }

  public List<Order> findOrderByBuyerId(Integer buyerId){
    return orderDao.findOrderByBuyerId(buyerId);
  }
}
