import BottomNav from "@/components/common/bottomnav/BottomNav";
import UpButton from "@/components/common/button/UpButton";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/Header";
import Test from "@/components/common/header/Test";

import React, { PropsWithChildren } from "react";

export const metadata = {
  title: "URR(우르르)",
  description: "인플루언서와 소통하고 공구상품을 구매해보세요!",
  ogImage: "/main.png",
  url: "https://urr-final.vercel.app"
} as const;

const Mainlayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="grow overflow-auto">
        <Test/>
        {children}
        <Footer />
      </main>
      <UpButton />
      <BottomNav />
    </>
  );
};

export default Mainlayout;
