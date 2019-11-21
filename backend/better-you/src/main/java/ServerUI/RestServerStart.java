package ServerUI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("Service")
@SpringBootApplication
public class RestServerStart {
    public static void main(String[] args) {
        SpringApplication.run(RestServerStart.class,args);

    }
}
