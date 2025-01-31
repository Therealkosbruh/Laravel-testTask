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
    },
    // {
    //     path: '/makeorder',                    FOR SPESIFIC ORDER 
    //     element: <Makeorder/>
    // },
    // {
    //     path: '/login',
    //     element: <Makeorder/>                  FOR ADMIN LOGIN TO SEEEE ORDERS
    // },


]);

export default router;