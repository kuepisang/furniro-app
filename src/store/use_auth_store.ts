import { create } from "zustand";
import { createJSONStorage, persist} from 'zustand/middleware' 

type TUseAuthStore = {
    objectId: string;
    username: string;
    email: string;
    setAuthStore: ({_email, _username, _objectId}: {_email: string, _username: string, _objectId: string}) => void;
};

const useAuthStore = create<TUseAuthStore>()(persist((set) => ({
    objectId: '',
    username:'',
    email: '',
    // _email yang didapat dari login_page di assign ke props email yang ada di line 4
    setAuthStore: ({_email, _username, _objectId}) => set(() => ({email: _email, username: _username, objectId: _objectId})),
}),
{
    name: 'user-storage',
    storage: createJSONStorage(()=> localStorage),
    partialize: (state) => () => { objectId: state.objectId}
        
    },
));

export default useAuthStore;
