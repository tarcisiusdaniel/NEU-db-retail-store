package cs5200.dbms.spring_boot_CRUD_project.controller;

import cs5200.dbms.spring_boot_CRUD_project.entity.Buyer;
import cs5200.dbms.spring_boot_CRUD_project.service.BuyerService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/buyer")
public class BuyerController {

  @Autowired
  private BuyerService buyerService;

  @GetMapping("/")
  public String index() {
    return "Greetings from Spring Boot!";
  }

  @PostMapping("/create")
  public String add(@RequestBody Buyer buyer) {
    return buyerService.createBuyer(buyer).getId() > 0 ? "Buyer created successfully" : "Failed";
  }

  @GetMapping("/findAll")
  public List<Buyer> getAll(){
    return buyerService.findAllBuyer();
  }

  @GetMapping("/find/{buyerId}")
  public Buyer getBuyer(@PathVariable("buyerId") int id){
    return buyerService.findBuyerById(id);
  }

  @GetMapping("/delete/{buyerId}")
  public void delete(@PathVariable("buyerId") int id){
    buyerService.deleteBuyer(id);
  }

  @PostMapping("/update/{buyerId}")
  public String update(@PathVariable("buyerId") int id,@RequestBody Buyer buyer){
    Buyer oldBuyer = buyerService.findBuyerById(id);
    if(oldBuyer == null)
      throw new RuntimeException("Buyer does not exist as per the given details");

    Buyer newBuyer = buyerService.updateBuyer(buyer);

    if(oldBuyer.getId() != newBuyer.getId())
      throw new RuntimeException("Error occurred while updating buyer details. Please check later.");

    return newBuyer.getId() > 0 ? "Buyer updated successfully" : "Failed";
  }
}
