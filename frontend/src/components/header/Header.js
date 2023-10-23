import React from 'react';
import headerStyles from './headerStyles.scss'
import {Link} from "react-router-dom";
import Home from "../../pages/Home";
import FullPost from "../../pages/FullPost";

const MyComponent = () => {
    return (
        <div className="my-component">
            <div className="my-component-header">Заголовок компонента</div>
            <div className="my-component-content">
                чтот
            </div>
            <ul>
                <li >
                    <Link to={'/'}> home</Link>
                </li>
                <li>
                    <Link to={'/FullPost'}>FullPost</Link>
                </li>
            </ul>
        </div>
    );
};

export default MyComponent;