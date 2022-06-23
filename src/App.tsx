import React from 'react';
import { Switch, Route } from "react-router-dom";
import { ShopApp } from './pages/shopApp';

export const App: React.FC = () => {
    return (
        <Switch>
            <Route path='/'>
                <ShopApp />
            </Route>
        </Switch>
    );
}
