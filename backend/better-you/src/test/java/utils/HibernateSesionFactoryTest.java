package utils;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

// singleton for DB
public class HibernateSesionFactoryTest {

    private static SessionFactory factory= null;
    private HibernateSesionFactoryTest(){

    }
    public static SessionFactory getFactory() {
        if (factory == null) {
            HibernateSesionFactoryTest cls = new HibernateSesionFactoryTest();
            //configurare hibernate
            factory = new Configuration()
                    .configure(cls.getClass().getClassLoader().getResource("hibernate.cfg.xml"))
                    .buildSessionFactory();
        }
        return factory;
    }
    public static void shutdown() {
        // Close caches and connection pools:
        getFactory().close();
    }
}
