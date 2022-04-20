package cs5200.dbms.spring_boot_CRUD_project.dao;

import org.springframework.data.repository.CrudRepository;

public interface PurchaseItemDao extends
    CrudRepository<cs5200.dbms.spring_boot_CRUD_project.entity.PurchaseItem, Integer> {

}
