import { List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProductItem({ product }) {
  return (
    <Link
      href={`/product-details/${product?.id}`}
      className="hover:border p-1 hover:shadow-md rounded-lg border-teal-400 hover:cursor-pointer"
    >
      <Image
        src={product?.attributes?.banner?.data?.attributes?.url}
        alt="banner-cart"
        width={400}
        height={350}
        className="rounded-t-lg h-[170px] object-cover"
      />
      <div className="flex justify-between p-3 items-center bg-gray-50 rounded-b-lg ">
        <div className="p-3 ">
          <h2 className="text-[12px] font-medium line-clamp-1">
            {product?.attributes?.title}
          </h2>
          <h2 className="text-[12px] text-gray-400 items-center">
            <List /> {product?.attributes?.category}
          </h2>
        </div>
        <h2>{product?.attributes?.price}</h2>
      </div>
    </Link>
  );
}

export default ProductItem;
