"use client";
import BreadCrumb from "../../_components/BreadCrumb";
import ProductApis from "../../_utils/ProductApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";

function ProdcutDetails({ params }) {
  const path = usePathname();
  const [prodcutDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    getProductById_();
  }, [params?.productId]);
  const getProductById_ = () => {
    ProductApis.getProductById(params?.productId).then((res) => {
      console.log(res.data.data);
      setProductDetails(res.data.data);
      getProductListByCategory(res.data.data);
    });
  };
  const getProductListByCategory = (product) => {
    ProductApis.getProductsByCategory(product?.attributes?.category).then(
      (res) => {
        console.log(res?.data?.data);
        setProductList(res?.data?.data);
      }
    );
  };
  return (
    <div className="px-10 md:px-28">
      <BreadCrumb path={path} />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 justify-around">
        <ProductBanner product={prodcutDetails} />
        <ProductInfo product={prodcutDetails} />
        <div className="">
          <h2 className="mt-24 text-xl">Similar Products</h2>
          <ProductList productList={productList} />
        </div>
      </div>
    </div>
  );
}

export default ProdcutDetails;
