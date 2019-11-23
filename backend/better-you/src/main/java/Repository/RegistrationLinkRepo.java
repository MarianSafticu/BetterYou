package Repository;

import Model.RegistrationLink;
import org.springframework.stereotype.Component;


/**
 * Repository for {@link RegistrationLink}
 */
@Component
public class RegistrationLinkRepo extends AbstractRepo<Long, RegistrationLink> {
    public RegistrationLinkRepo() {
        super(RegistrationLink.class);
    }
}
