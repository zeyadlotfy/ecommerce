"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../_context/CartContext";
import CartApis from "../_utils/CartApis";
import Cart from "./Cart";
import Link from "next/link";

const Header = () => {
  const { user } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [openCart, setOpenCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes("sign-in"));
  }, []);
  useEffect(() => {
    user && getCartItems();
  }, [user]);
  const getCartItems = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
      (res) => {
        console.log(res);
        res?.data?.data.forEach((citem) => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: citem.id,
              product: citem?.attributes?.products?.data[0],
            },
          ]);
        });
      }
    );
  };
  return (
    !isLoggedIn && (
      <header className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 shadow-md">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Image src="/logo.svg" alt="Logo" width={50} height={50} />
            </div>

            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="/"
                    >
                      Homre{" "}
                    </Link>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Explore
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Projects
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>

                  <li>
                    <a
                      className="text-gray-500 transition hover:text-gray-500/75"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {!user ? (
                  <>
                    <a
                      className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium
                 text-white shadow hover:text-teal-500"
                      href="/sign-in"
                    >
                      Login
                    </a>

                    <div className="hidden sm:flex">
                      <a
                        className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                        href="/sign-up"
                      >
                        Register
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="flex gap-5 items-center">
                    <h2 className="flex gap-1 cursor-pointer">
                      <ShoppingCart onClick={() => setOpenCart(!openCart)} />
                      {cart?.length > 0 ? (
                        <span>({cart?.length})</span>
                      ) : (
                        <span>(0)</span>
                      )}
                    </h2>
                    <UserButton afterSignOutUrl="/" />
                    {openCart && <Cart />}
                  </div>
                )}
              </div>

              <div className="block md:hidden">
                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
