package uk.mprus.crypto.cryptosystem.xor.repositories;

import org.springframework.stereotype.Repository;
import uk.mprus.crypto.cryptosystem.xor.models.XOR;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
@Repository
public class XORRepository {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public XOR create(XOR XOR) {
        em.persist(XOR);

        return XOR;
    }
    @Transactional
    public XOR update( XOR xor) {
        return em.merge(xor);
    }

    @Transactional
    public XOR getById(long id) {
        return em.find(XOR.class, id);
    }

    @Transactional
    public List<XOR> getAll() {
        return em.createQuery("SELECT XOR FROM XOR XOR", XOR.class).getResultList();
    }
    @Transactional
    public XOR deleteOne(XOR xor) {
        em.remove(xor);
        return xor;
    }

}
