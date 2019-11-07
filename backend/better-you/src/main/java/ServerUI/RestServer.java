package ServerUI;

import Model.User;
import Service.ServiceMOC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/app/better-you")
@ComponentScan("Service")
public class RestServer {

    @Autowired
    private ServiceMOC service;

    private static final String template = "Hello, %s!";

    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return String.format(template, name);
    }

    @RequestMapping(value = "/{email}/{password}", method = RequestMethod.POST)
    public ResponseEntity<?> loggin(@PathVariable String email, @PathVariable String password){
        boolean ok=service.login(email,password);
        if (!ok)
            return new ResponseEntity<Boolean>(ok, HttpStatus.OK);
        else
            return new ResponseEntity<Boolean>(ok, HttpStatus.OK);
    }


}



