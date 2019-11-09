package utils;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

// singleton for DB
public class HibernateSesionFactory {

    private static SessionFactory factory= null;
    private HibernateSesionFactory(){

    }
    public static SessionFactory getFactory() {
        if (factory == null) {
            HibernateSesionFactory cls = new HibernateSesionFactory();
            //configurare hibernate
            factory = new Configuration()
                    .configure(cls.getClass().getClassLoader().getResource("hibernate.cfg.xml"))
                    .buildSessionFactory();
        }
        return factory;
    }
    public static void shutdown() {
        // Close caches and connection pools
        getFactory().close();
    }
}
