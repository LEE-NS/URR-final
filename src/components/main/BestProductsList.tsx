"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "../../../types/common";
import defaultImg from "../../../public/images/default.png";
import MiniRightArrowIcon from "../../../public/icon/minirightarrow.svg";

function BestProductsList({ productsList }: { productsList: Product[] }) {
  return (
    <>
      <div className="w-full h-auto mx-auto px-4 py-8">
        <div className="flex items-center">
          <h2 className="font-bold text-xl mb-5 xl:text-[22px] xl:my-8">인기상품</h2>
          <Link className="ml-auto text-xs flex-end flex" href={"/products/list"}>
            <div className="text-[14px] mb-5 mr-2 font-semibold text-[#4C4F52] xl:text-[16px] xl:my-8">더보기</div>
            <div className=" xl:mt-[36px]">
            <MiniRightArrowIcon/>
            </div>
          </Link>
        </div>
        <div className="w-full overflow-x-auto flex flex-nowrap scrollbar xl:mb-10">
          <div className="grid grid-flow-col gap-[18px] xl:gap-[48px]">
            {productsList.map((list) => {
              const cost = list.cost;
              const price = list.price;
              const discountRate = Math.round(((cost - price) / cost) * 100);
              return (
                <Link href={`/products/detail/${list.id}`} key={list.id}>
                  <div className="w-[121px] xl:w-[250px]">
                    <div className="relative w-[121px] h-[131px] xl:w-[250px] xl:h-[300px] mb-2">
                      <Image
                        src={list.main_img || defaultImg}
                        alt="img"
                        fill
                        sizes="121px xl:250px"
                        className="rounded-md object-cover"
                      />
                    </div>
                    <p className="text-[#B2B5B8] text-sm xl:text-[16px]">{list.nickname}</p>
                    <p className="text-[16px] truncate xl:text-[18px]">{list.title}</p>
                    <div className="flex gap-1">
                      <p className="text-[#F03F33] font-semibold xl:text-[18px]">{discountRate}%</p>
                      <p className="font-bold xl:text-[18px]">{price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default BestProductsList;
