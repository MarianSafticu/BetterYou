package Repository;

import Model.HasId;

import java.util.Map;

public abstract class AbstractRepo<ID,E extends HasId<ID>> {
    private Map<ID,E> all;
    public E get(ID id){
        return null;
    }

}
