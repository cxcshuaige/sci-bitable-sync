import React from 'react';
import { useRoutes, RouteObject } from 'react-router-dom';
import homeRoutes from '@/pages/home/route';

const routes: RouteObject[] = [
    ...homeRoutes
];

const MyRoutes:React.FC = () => {
    return useRoutes(routes);    
}

export default MyRoutes;