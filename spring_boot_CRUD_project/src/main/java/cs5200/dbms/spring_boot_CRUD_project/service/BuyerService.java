package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.BuyerDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@CrossOrigin(origins = "*")
public class BuyerService {

  @Autowired
  private BuyerDao buyerDao;


  public Buyer createBuyer(Buyer buyer) {
    return buyerDao.save(buyer);
  }

  public List<Buyer> findAllBuyer() {
    return buyerDao.findAllBuyers();
  }

  public Buyer findBuyerById(@PathVariable("buyerId") Integer id) {
    return buyerDao.findBuyerById(id);
  }

  public void deleteBuyer(Integer id) {
    buyerDao.deleteById(id);
  }

  public Buyer updateBuyer(Buyer newBuyer) {

    return buyerDao.save(newBuyer);
  }
  public Buyer findBuyerByUserId(Integer id) {
    return buyerDao.findBuyerByUserId(id);
  }
}
