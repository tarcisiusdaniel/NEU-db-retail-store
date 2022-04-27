package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import cs5200.dbms.spring_boot_CRUD_project.service.BuyerService;
import java.util.List;
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
@RequestMapping("/buyer")
@CrossOrigin(origins = "*")
public class BuyerController {

  @Autowired
  private BuyerService buyerService;

  @GetMapping("/")
  public String index() {
    return "Greetings from Spring Boot!";
  }

  @PostMapping("/create")
  public ResponseEntity<?> add(@RequestBody Buyer buyer) {
    int newId = buyerService.createBuyer(buyer).getId();
    return newId > 0 ?
        new ResponseEntity<>("Buyer created successfully", HttpStatus.OK) :
        new ResponseEntity<>("Buyer creation failed",HttpStatus.BAD_REQUEST);
  }

  @GetMapping("/findAll")
  public List<Buyer> getAll() {
    return buyerService.findAllBuyer();
  }

  @GetMapping("/find/{buyerId}")
  public Buyer getBuyer(@PathVariable("buyerId") int id) {
    return buyerService.findBuyerById(id);
  }

  @GetMapping("/delete/{buyerId}")
  public void delete(@PathVariable("buyerId") int id) {
    buyerService.deleteBuyer(id);
  }

  @PostMapping("/update/{buyerId}")
  public ResponseEntity<?> update(@PathVariable("buyerId") int id, @RequestBody Buyer buyer) {
    if (buyer == null) {
      return new ResponseEntity<>("Buyer can not be null.",
          HttpStatus.BAD_REQUEST);
    }
    if (buyer.getUser().getId() == null) {
      return new ResponseEntity<>("User Id can not be null while updating buyer.",
          HttpStatus.BAD_REQUEST);
    }
    Buyer oldBuyer = buyerService.findBuyerById(id);
    if (oldBuyer == null) {
      return new ResponseEntity<>("Buyer does not exist as per the given details",
          HttpStatus.BAD_REQUEST);
    }

    Buyer newBuyer = buyerService.updateBuyer(buyer);

    if (oldBuyer.getId() != newBuyer.getId()) {
      return new ResponseEntity<>("Error occurred while updating buyer details. Please check later.",
          HttpStatus.BAD_REQUEST);
    }
    return newBuyer.getId() > 0 ?
        new ResponseEntity<>("Buyer updated successfully", HttpStatus.OK) :
        new ResponseEntity<>("Buyer updation failed",HttpStatus.BAD_REQUEST);
  }
}
