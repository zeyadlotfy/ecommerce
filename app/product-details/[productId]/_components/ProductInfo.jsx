"use client";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import React, { useContext } from "react";
import SkeltonProductInfo from "./SkeltonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from "../../../_utils/CartApis";
import { CartContext } from "../../../_context/CartContext";
function ProductInfo({ product }) {
  const { user } = useUser();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      const data = {
        data: {
          username: user.fullName,
          email: user.primaryEmailAddress.emailAddress,
          products: [product?.id],
        },
      };
      CartApis.addToCart(data)
        .then((res) => {
          console.log(res);
          setCart((oldCard) => [
            ...cart,
            {
              id: res?.data?.data?.id,
              product,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      {product?.id ? (
        <div>
          <h2 className="text-[20px]">{product?.attributes?.title}</h2>
          <h2 className="text-[15px] text-gray-400">
            {product?.attributes?.category}
          </h2>
          <h2> {product?.attributes?.description[0]?.children[0]?.text}</h2>
          <h2 className="text-[11px] text-gray-500 mt-2 flex gap-2 items-center">
            {product?.attributes?.instantDelivery ? (
              <BadgeCheck className="text-green-500 w-5 h-5" />
            ) : (
              <AlertOctagon />
            )}
            Eligible for instant delivery
          </h2>
          <h2 className="text-[32px] text-primary mt-3">
            ${product?.attributes?.price}
          </h2>
          <button
            className="flex gap-2 rounded-lg p-3 bg-primary hover:bg-teal-600"
            onClick={handleAddToCart}
          >
            <ShoppingCart />
            Add To Cart
          </button>
        </div>
      ) : (
        <SkeltonProductInfo />
      )}
    </>
  );
}

export default ProductInfo;
