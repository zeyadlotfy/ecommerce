import Image from "next/image";
import Hero from "./_components/Hero";
import ProductSections from "./_components/ProductSections";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ProductSections />
    </div>
  );
}
