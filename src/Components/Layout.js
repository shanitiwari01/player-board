import * as React from 'react';

/**
 * Layout component provides a wrapper for the content of the application.
 * @param {object} props - The component props.
 * @returns {JSX.Element} - The layout container component.
 */
export default function Layout(props) {
    return (
        <div className='layout' >
            {props.children}
        </div>
    );
}