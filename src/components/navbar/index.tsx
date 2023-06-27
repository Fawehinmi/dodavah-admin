import React from "react";
import Link from "next/link";
import Image from "next/image";

import { BsFillBagPlusFill } from "react-icons/bs";
import { HiShoppingCart, HiOutlineCollection } from "react-icons/hi";

import { AiFillAppstore } from "react-icons/ai";

import profilePic from "../../../public/IMG-20201231-WA0046 (1).jpg";

import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();
  return (
    <div className="sidenav">
      <div className="">
        <div className="">
          {/* <Image
            src={profilePic}
            objectFit="contain"
            alt="Picture of the author"
            layout="fill"
          /> */}
        </div>
        <h1 className="brand-title">Dodavah</h1>
      </div>

      <Link href="/" className="text-decoration-none">
        <div
          className={`sidenav-item-container ${
            router.pathname === "/" && "nav-active"
          }`}
        >
          <div className="sidenav-item">
            <AiFillAppstore size={25} />

            <p>Dashboard</p>
          </div>
        </div>
      </Link>

      <Link href="/product">
        <div
          className={`sidenav-item-container ${
            router.pathname === "/product" && "nav-active"
          }`}
        >
          <div className="sidenav-item">
            <BsFillBagPlusFill size={25} />

            <p>Products</p>
          </div>
        </div>
      </Link>
      <Link href="/categories">
        <div
          className={`sidenav-item-container ${
            router.pathname === "/categories" && "nav-active"
          }`}
        >
          <div className="sidenav-item">
            <HiOutlineCollection size={25} />

            <p>Categories</p>
          </div>
        </div>
      </Link>
      <Link href="/orders">
        <div
          className={`sidenav-item-container ${
            router.pathname === "/orders" && "nav-active"
          }`}
        >
          <div className="sidenav-item">
            <HiShoppingCart size={25} />

            <p>Orders</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SideNav;
