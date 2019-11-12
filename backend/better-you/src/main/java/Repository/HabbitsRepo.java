package Repository;

import Model.Habbit;

public class HabbitsRepo extends AbstractRepo<Long,Habbit> {
    public HabbitsRepo(){
        super(Habbit.class);
    }
}
