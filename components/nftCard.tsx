import React from "react";

export default function NFTCard({ nft }: { nft: any }) {
  console.log("NFT:", nft);
  return (
    <div className="flex flex-col w-1/4">
      <div className="rounded-md">
        <img
          src={nft.media[0].gateway}
          alt=""
          className="object-cover h-128 w-full rounded-t-md "
        />
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
        <div>
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">Id: {nft.id.tokenId.slice(-5)}</p>
          <p className="text-gray-600 text-xs font-mono">
            {nft.contract.address}
          </p>
        </div>
        <div className="flex-grow mt-2">
          <p className="text-gray-600">{nft.description}</p>
        </div>
      </div>
    </div>
  );
}
