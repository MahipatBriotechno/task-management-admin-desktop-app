import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation } from 'react-router-dom';
import "./Header.css"
import AccountDropdownMenu from './AccountDropdownMenu';


const MobileHeader = ({ MenuList, path }) => {
    const location = useLocation();
    const { hash, pathname, search } = location;

    const [open, setOpen] = useState(false);

    useEffect(() => {
        toggleDrawer(false)
    }, [])

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };



    // console.log("open", open + ' ++ ' + pathname)
    return (
        <div className='mobile-header mobile-view mb-6 p-2'>

            <div className='flex justify-between'>
                <div className="text-white text-4xl">LOGO</div>
                <div className="ml-auto">
                    <div className='flex gap-8 items-center'>

                        <AccountDropdownMenu />
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer(true)}
                            sx={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </div>

                </div>

            </div>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                className='drawer-content '
            >
                <div className='flex flex-col justify-between h-full pb-3'>
                    <div
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                        className='mb-6'
                    >
                        <List>
                            {/* {['Home', 'About', 'Services', 'Contact'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
                            {MenuList.map((db) => {
                                return (
                                    <NavLink
                                        className={location.pathname + location.search == db.link ? "border-b-2 bg-primary text-white" : " border-solid border-[1px] border-lightGray"}
                                        to={db.link}
                                    >
                                        {db.title}
                                    </NavLink>
                                );
                            })}
                        </List>


                    </div>
                    <div className="flex flex-col justify-start gap-10">


                    </div>
                </div>

            </Drawer>
        </div>
    );
};

export default MobileHeader;
