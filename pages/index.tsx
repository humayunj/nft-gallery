import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import NFTCard from "../components/nftCard";

const Home: NextPage = () => {
  const [wallet, setWalletAddress] = useState(
    "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
  );
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState<any[]>([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [fetching, setFetching] = useState(false);
  const fetchNFTs = async () => {
    let nfts;
    console.log("fetching nfts");
    const api_key = "l1CpcIwWyqCHt0hPv4be4Yn1WVAXCnNV";
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;

    let requestOptions = {
      method: "GET",
    };
    setFetching(true);
    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    } else {
      console.log("fetching urls for collections owned by address");
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
    }
    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
    }
    setFetching(false);
  };

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      var requestOptions = {
        method: "GET",
      };
      const api_key = "l1CpcIwWyqCHt0hPv4be4Yn1WVAXCnNV";
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      );
      if (nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3 bg-slate-100 min-h-screen">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          type="text"
          className="py-2 px-3 w-1/3 rounded-md bg-slate-200"
          disabled={fetchForCollection}
          placeholder="Add your wallet address"
          value={wallet}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <input
          type="text"
          className="py-2 px-3 w-1/3 rounded-md bg-slate-200"
          placeholder="Add the collection address"
          value={collection}
          onChange={(e) => setCollectionAddress(e.target.value)}
        />
        <label className="text-gray-600">
          <input
            type="checkbox"
            className="mr-2"
            onChange={(e) => setFetchForCollection(e.target.checked)}
          />
          Fetch for collection
        </label>
        <button
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection();
            } else fetchNFTs();
          }}
          disabled={fetching}
          className="disabled:bg-slate-500 text-white bg-blue-400 px-10 py-2 mt-3 rounded-sm flex flex-row items-center "
        >
          {fetching ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  fill="#0000"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Fetching...
            </>
          ) : (
            "Let's go!"
          )}
        </button>
      </div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-full gap-x-2 justify-center">
        {NFTs.length > 0 ? NFTs.map((nft) => <NFTCard nft={nft} />) : null}
      </div>
    </div>
  );
};

export default Home;
