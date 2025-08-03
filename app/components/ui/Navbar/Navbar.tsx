"use client";

import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@heroui/react";
import { LanguageSwitcher } from '../../LanguageSwitcher';
import { ThemeSwitcher } from '../../ThemeSwitcher';
import { useLanguage } from '../../../lib/language-context';


type Props = {}

const Nav = (props: Props) => {
	const { t } = useLanguage();
	
	return (
		<>
			<Navbar shouldHideOnScroll className='fixed '>
      <NavbarBrand>
				

        <p className="font-bold text-large font-serif text-foreground">{t('navbar.brand')}</p>
      </NavbarBrand>
     
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">

        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>

		</>
	)
}

export default Nav