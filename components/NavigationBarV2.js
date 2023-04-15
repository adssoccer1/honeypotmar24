import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { AuthContext, logout } from '../contexts/AuthContext';
import { Dialog } from '@headlessui/react'

const NavigationBarV2 = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const { logout } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navigation = [
    { name: 'Leaderboard', href: '#' },
    { name: 'Dashboard', href: '/dashboardPage' },
  ]
  
  return (
    <header className="absolute inset-x-0 top-0 z-50">
        
        
    <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
            Leaderboard
        </Link>
        <Link href={user ? '/dashboardPage' : '/login'} className="text-sm font-semibold leading-6 text-gray-900">
            Dashboard
        </Link>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {user ? (
          <button
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleSignOut}
          >
            Sign out {user.accountType === 'advertiser' ? 'advertiser' : 'content creator'} account
          </button>
        ) : (
          <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Sign in <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
        
      </div>
    </nav>

    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link href="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Leaderboard
                  </Link>
                  <Link href={user ? '/dashboardPage' : '/login'} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                      Dashboard
                  </Link>
                </div>
                <div className="py-6">
                
                  {user ? (
                    <button
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={handleSignOut}
                    >
                      Sign out {user.accountType === 'advertiser' ? 'advertiser' : 'content creator'} account
                    </button>
                  ) : (
                    <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
                        Sign in <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
  );
};

export default NavigationBarV2;
