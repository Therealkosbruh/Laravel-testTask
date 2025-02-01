import {createBrowserRouter} from 'react-router-dom';
import Makeorder from './views/makeorder';
import Orderlist from './views/orderlist';

const router = createBrowserRouter([
    {
        path: '/makeorder',
        element: <Makeorder/>
    },

    {
        path: '/orderlist',
        element: <Orderlist/>
    },

    {
        path: '*',
        element: <Makeorder/>
    }
]);

export default router;