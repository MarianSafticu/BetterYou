package ServerUI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("ServerUI")
@SpringBootApplication
class ResteServiceStart {
    public static void main(String[] args) {
        SpringApplication.run(ResteServiceStart.class,args);

    }
}
