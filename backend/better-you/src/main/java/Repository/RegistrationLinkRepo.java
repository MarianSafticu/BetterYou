package Repository;

import Model.RegistrationLink;


public class RegistrationLinkRepo extends AbstractRepo<Long, RegistrationLink> {
    public RegistrationLinkRepo(Class<RegistrationLink> clazz) {
        super(clazz);
    }
}
