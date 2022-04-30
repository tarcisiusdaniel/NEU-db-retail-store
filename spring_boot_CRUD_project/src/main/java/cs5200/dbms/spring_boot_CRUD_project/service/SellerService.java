package cs5200.dbms.spring_boot_CRUD_project.service;

import cs5200.dbms.spring_boot_CRUD_project.dao.SellerDao;
import cs5200.dbms.spring_boot_CRUD_project.dao.UserDao;
import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import cs5200.dbms.spring_boot_CRUD_project.entity.Seller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;

@Service
@CrossOrigin(origins = "*")
public class SellerService {

  @Autowired
  private SellerDao sellerDao;

  @Autowired
  private UserDao userDao;


  public Seller createSeller(Seller seller) {
    return sellerDao.save(seller);
  }

  public List<Seller> findAllSeller() {
    return sellerDao.findAllSellers();
  }

  public Seller findSellerById(@PathVariable("sellerId") Integer id) {
    return sellerDao.findSellerById(id);
  }

  public void deleteSeller(Integer id) {
    sellerDao.deleteById(id);
  }

  public Seller updateSeller(Seller newSeller) {
    return sellerDao.save(newSeller);
  }

  public Seller findSellerByUserId(Integer id) {
    return sellerDao.findSellerByUserId(id);
  }
}
