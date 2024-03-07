
import { History } from 'history';

export module "use-router" {
    function useRouter(router:any):any;
    interface IWithRouter {
        history: History
        location: string;
    }
}