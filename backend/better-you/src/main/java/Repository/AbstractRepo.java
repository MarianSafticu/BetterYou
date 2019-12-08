package Repository;

import Model.HasId;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.resource.transaction.spi.TransactionStatus;
import utils.HibernateSesionFactory;

import javax.persistence.NoResultException;
import javax.persistence.OptimisticLockException;
import javax.persistence.PersistenceException;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;



public abstract class AbstractRepo<ID,E extends HasId<ID>> {
    private Class<E> clazz;
    protected SessionFactory sessionFactory;


    /***
     * The constructor contains the class of entity that is used for common queries
     * all classes that extend this class must call "super(Entity.class)" where entity is the concrete entity class
     * @param clazz is the class of entity
     */


    public AbstractRepo(Class<E> clazz){
        sessionFactory = HibernateSesionFactory.getFactory();
        this.clazz = clazz;
    }
    public AbstractRepo(Class<E> clazz, SessionFactory sf){
        sessionFactory = sf;
        this.clazz = clazz;
    }
    /***
     * This method search and get an entity with given id
     * @param id is id of the searched entity
     * @return the entity with given id or null if the entity does not exist
     */
    public E get(ID id)  {
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();
        try {
            CriteriaBuilder cb = s.getCriteriaBuilder();
            CriteriaQuery<E> criteriaQuery = cb.createQuery(clazz);
            Root<E> root = criteriaQuery.from(clazz);
            criteriaQuery.select(root);
            criteriaQuery.where(cb.equal(root.get("id"), id));
            E e = s.createQuery(criteriaQuery).getSingleResult();
            tx.commit();
            return e;
        }catch (NoResultException e){
            tx.rollback();
            return null;
        }finally {
            s.close();
        }
    }

    /***
     * This method save a entity to DB
     * the id of the entity will be overwritten to be unique by an autogenerated value
     * @param e is the entity to be added
     * @throws RepoException if the params for entity violates any unique restriction
     */
    public void add(E e) throws RepoException {
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();
        try{
//            e.setId(null);
            s.save(e);
            tx.commit();
        } catch (Exception ex) {
            if ( tx.getStatus() == TransactionStatus.ACTIVE
                    || tx.getStatus() == TransactionStatus.MARKED_ROLLBACK ) {
                tx.rollback();
            }
            throw new RepoException("Existent username\n");
        } finally {
            s.close();
        }
    }

    /***
     * This method update an entity with given id
     * the method changes all info from db with attributes of e
     * @param id is the id of the entity
     * @param e is the entity with modified values
     * @throws RepoException if there is no entity with given id in DB
     *                       or the new params for entity violates any unique restriction
     */
    public void update(ID id,E e) throws RepoException{
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();
        try {
            e.setId(id);
            s.update(e);
            tx.commit();
        }catch (OptimisticLockException ex){
            if ( tx.getStatus() == TransactionStatus.ACTIVE
                    || tx.getStatus() == TransactionStatus.MARKED_ROLLBACK ) {
                tx.rollback();
            }
            throw new RepoException("Invalid ID \n no entity with this id\n");
        } catch (PersistenceException ex) {
            if ( tx.getStatus() == TransactionStatus.ACTIVE
                    || tx.getStatus() == TransactionStatus.MARKED_ROLLBACK ) {
                tx.rollback();
            }
            throw new RepoException("Error on unique table names\n");
        } finally {
            s.close();
        }
    }
    /***
     * This method delete an entity with given id from DB
     * @param id is the id of the entity
     * @throws RepoException if there is no entity with given id in db
     */
    public void delete(ID id) throws RepoException {
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();
        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaDelete<E> criteriaQuery = cb.createCriteriaDelete(clazz);
        Root<E> root = criteriaQuery.from(clazz);
        criteriaQuery.where(cb.equal(root.get("id"), id));
        int res = s.createQuery(criteriaQuery).executeUpdate();
        tx.commit();
        if (res == 0) {
            s.close();
            throw new RepoException("No Entity with given id\n");
        }
        s.close();
    }

    /***
     * This method returns all entities of type E that are in the database
     * @return a list with all entities (empty if the table in DB is empty)
     */
    public List<E> getAll(){
        Session s = sessionFactory.openSession();
        Transaction tx = s.beginTransaction();

        CriteriaBuilder cb = s.getCriteriaBuilder();
        CriteriaQuery<E> criteriaQuery = cb.createQuery(clazz);
        Root<E> root = criteriaQuery.from(clazz);
        criteriaQuery.select( root );
        List<E> all = s.createQuery(criteriaQuery).getResultList();

        tx.commit();
        s.close();
        return all;
    }


}
