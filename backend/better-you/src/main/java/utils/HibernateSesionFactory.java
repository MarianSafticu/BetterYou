package utils;

import Model.Habbit;
import Model.User;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateSesionFactory {

    private static SessionFactory factory= null;
    private HibernateSesionFactory(){

    }
    public static SessionFactory getFactory(){
        if(factory == null){
            factory = new Configuration()
                    .configure()
                    .addAnnotatedClass(Habbit.class)
                    .addAnnotatedClass(User.class)
                    .buildSessionFactory();
        }
        return factory;
    }
}
