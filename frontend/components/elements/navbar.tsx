import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ButtonLink from './button-link';
import NextImage from './image';
import CustomLink from './custom-link';
import LocaleSwitch from '../locale-switch';
import { getButtonAppearance } from '../../src/utils/button';
import NotificationBanner from './notification-banner';

import { Menu, Transition } from '@headlessui/react';
import { Disclosure } from '@headlessui/react';
import { Fragment, useEffect, useRef } from 'react';
import { MdExpandMore } from 'react-icons/md';

interface typesNavbar {
  navbar: {
    logo: {
      url: string;
      alternativeText: string;
      width: number;
      height: number;
    };
    links: (string | number)[];
    button: {
      id: number;
      url: string;
      text: string;
      newTab: boolean;
      type: string;
    };
  };
  pageContext: {
    localizedPaths: string;
  };
  notificationBanner: {
    text: string;
    type: string;
  };
  menus: any;
}

const Navbar: React.FC<typesNavbar> = ({
  navbar,
  pageContext,
  notificationBanner,
  menus,
}) => {
  const router = useRouter();
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
  const [bannerIsShown, setBannerIsShown] = useState(true);

  console.log(menus, 'yuhu');

  return (
    <>
      {/* The actual navbar */}
      <nav className="fixed z-10 w-full py-0 duration-100 delay-100 bg-white border-b-2 border-gray-200">
        {notificationBanner && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}

        <div className="container flex flex-row items-center justify-between py-4">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/">
              <a className="w-32 h-8">
                <NextImage width={120} height={33} media={navbar.logo} />
              </a>
            </Link>
          </div>
          <div className="flex">
            {/* Locale Switch Mobile */}
            {pageContext.localizedPaths && (
              <div className="md:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(!mobileMenuIsShown)}
              className="block p-1 md:hidden"
            >
              {/* <MdMenu className="w-auto h-8" /> */}
              <div
                className={`hamburger-menu ${mobileMenuIsShown ? 'open' : ''}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            {/* List of links on desktop */}
            <ul className="flex-row items-center hidden gap-4 ml-10 list-none md:flex">
              {menus.menuParent.map((menu: any, id: number) =>
                menu.menuChild.length > 0 ? (
                  <Menu
                    as="div"
                    className="relative inline-block text-left"
                    key={id}
                  >
                    <Menu.Button className="inline-flex items-center justify-center p-2 text-gray-700 hover:text-gray-900">
                      {menu.title}
                      <MdExpandMore className="ml-1 text-primary-600" />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {menu.menuChild.map((child: any, id: number) => (
                          <div className="flex px-1 py-1" key={id}>
                            <Menu.Item>
                              {({ active }) => (
                                <Link href={child.url}>
                                  <a
                                    href=""
                                    className="w-full p-2 text-gray-700 hover:text-gray-900"
                                  >
                                    {child.title}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          </div>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <li>
                    <Link href={menu.url}>
                      <a
                        href=""
                        className="p-2 text-gray-700 hover:text-gray-900"
                      >
                        {menu.title}
                      </a>
                    </Link>
                  </li>
                ),
              )}
            </ul>

            {/* Locale Switch Desktop */}
            {pageContext.localizedPaths && (
              <div className="hidden md:block">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            {/* CTA button on desktop */}
            {navbar.button && (
              <div className="hidden md:block">
                <ButtonLink
                  button={navbar.button}
                  appearance={getButtonAppearance(navbar.button.type, 'light')}
                  compact
                />
              </div>
            )}
          </div>
        </div>
        {mobileMenuIsShown && (
          <div className="container absolute pt-12 pb-6 duration-1000 delay-1000 bg-white shadow-lg md:hidden">
            <ul className="flex flex-col items-baseline gap-4 mb-10 text-xl list-none">
              {menus.menuParent.map((menu: any, id: number) => (
                <li key={id} className="block w-full">
                  {menu.menuChild.length > 0 ? (
                    <Disclosure as="div" className="">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex justify-between w-full font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>{menu.title}</span>
                            <MdExpandMore
                              className={`${
                                open ? 'transform rotate-180' : ''
                              } w-5 h-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500">
                            {menu.menuChild.map((child: any, id: number) => (
                              <div className="py-2">
                                <Link href={child.url} key={id}>
                                  <a href="" className="block w-full">
                                    {child.title}
                                  </a>
                                </Link>
                              </div>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ) : (
                    <Link href={menu.url}>
                      <a className="flex flex-row items-center justify-between hover:text-gray-900">
                        <span>{menu.title}</span>
                      </a>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <ButtonLink
              button={navbar.button}
              appearance={getButtonAppearance(navbar.button.type, 'light')}
              compact
            />
          </div>
          //     <div className="container absolute pt-12 pb-6 duration-1000 delay-1000 bg-white shadow-lg md:hidden">
          //     <ul className="flex flex-col items-baseline gap-4 mb-10 text-xl list-none">
          //         {navbar.links.map((navLink: any) => (
          //             <li key={navLink.id} className="block w-full">
          //                 <CustomLink link={navLink}>
          //                     <div className="flex flex-row items-center justify-between hover:text-gray-900">
          //                         <span>{navLink.text}</span>
          //                     </div>
          //                 </CustomLink>
          //             </li>
          //         ))}
          //     </ul>
          //     <ButtonLink
          //         button={navbar.button}
          //         appearance={getButtonAppearance(
          //             navbar.button.type,
          //             "light",
          //         )}
          //         compact
          //     />
          // </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
