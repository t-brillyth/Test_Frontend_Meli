import React from 'react';
import { Nav } from 'react-bootstrap';
import './Breadcrumbs.sass';

const Breadcrumbs = (props) => {
    return (
        <Nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {props.categories.map((category,idx) => (
                    <li className="breadcrumb-item" key={idx}>{category}</li>
                ))}
            </ol>
        </Nav>
    )
}

export default Breadcrumbs;
