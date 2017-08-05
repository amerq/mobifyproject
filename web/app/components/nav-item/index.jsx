/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

import React from 'react'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import NavItem from 'progressive-web-sdk/dist/components/nav-item'
import Icon from 'progressive-web-sdk/dist/components/icon'

/**
 * Icon used on project-specific nav items
 */
export const NavItemIcon = ({name}) => (
    <div className="c-nav-item__icon">
        <Icon className="c-nav-item__icon-content" name={name} />
    </div>
)

NavItemIcon.propTypes = {
    name: React.PropTypes.string,
}


/**
 * Project-specific NavItem which displays an icon on the left.
 */
export const NavItemWithIcon = (props) => (
    <NavItem {...props} className="pw--with-icon" />
)

NavItemWithIcon.propTypes = NavItem.propTypes


/**
 * Project-specific NavItem which displays an icon on the left.
 */
export const NavItemWithOnClick = (props) => (
    <ListTile {...props} className="c-nav-item c--with-icon" startAction={<NavItemIcon name="user" />}>
        {props.title}
    </ListTile>
)

NavItemWithOnClick.propTypes = NavItem.propTypes


/**
 * Project-specific NavItem which displays an account icon on the left.
 */
export const AccountNavItem = (props) => (
    <NavItemWithIcon {...props}
        beforeContent={<NavItemIcon name="user" />} />
)

AccountNavItem.propTypes = NavItem.propTypes
