import welcome from "../assets/welcome.png";
import welcomeWhite from "../assets/welcome-white.png";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { FrenlyNFT } from "../types/FrenlyNFT";
import publicGood from "../assets/publicgood.mp3";
import { themeState } from "../state/theme";
import { useRecoilValue } from "recoil";
import { rarityMap } from "../constants/rarityMap";

function randomIntFromInterval(min: number, max: number): number {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function NFTFrame(props: { nft: FrenlyNFT }) {
    const rarityName = getRarityStr(props.nft.rarityScore);

    return (
        <div
            className={`bg-slate-100 dark:bg-neutral-900 rounded p-4 ${rarityName.toLowerCase()}`}
        >
            <p className="text-md mb-1 -mt-2">
                <strong>#{props.nft.edition}</strong>
            </p>
            <img
                className=""
                src={`https://metadata.frenlyfaces.xyz/images/${props.nft.edition}.png`}
                alt={"frenly #" + props.nft.edition}
            />
            <div className="mt-4">
                <table className="table-auto text-xs" style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td>
                                <strong>{props.nft.face}</strong>
                            </td>
                            <td className="text-right collapse md:visible">
                                {getRarityValue("Face", props.nft.face)}%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>{props.nft.clothing}</strong>
                            </td>
                            <td className="text-right collapse md:visible">
                                {getRarityValue("Clothing", props.nft.clothing)}
                                %
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>{props.nft.background}</strong>
                            </td>
                            <td className="text-right collapse md:visible">
                                {getRarityValue(
                                    "Background",
                                    props.nft.background
                                )}
                                %
                            </td>
                        </tr>
                    </tbody>

                    <p className="mt-2 text-lg">{rarityName}</p>
                </table>
            </div>
        </div>
    );
}

function getRarityValue(trait_type: string, value: string) {
    switch (trait_type) {
        case "Background":
            return (rarityMap.Background as Record<string, number>)[value] / 10;
        case "Clothing":
            return (rarityMap.Clothing as Record<string, number>)[value] / 10;
        case "Face":
            return (rarityMap.Face as Record<string, number>)[value] / 10;
        default:
            return 0;
    }
}

export function Home() {
    const [displayedFrenlys, setDisplayedFrenlys] = useState<FrenlyNFT[]>([]);
    const recoilTheme = useRecoilValue(themeState);
    const [lastFetched, setLastFetched] = useState(Date.now());

    useEffect(() => {
        const getFrenlys = async () => {
            let ids: number[] = [];
            for (let i = 0; i < 4; i++) {
                ids.push(randomIntFromInterval(1, 1000));
            }

            const frenlys: FrenlyNFT[] = [];
            const promises = [];
            const getFrenly = async (n: number) => {
                const res = await fetch(
                    `https://api.frenlyfaces.xyz/metadata/nft/${n.toString()}`
                );
                if (res.status === 200) {
                    frenlys.push(await res.json());
                }
            };

            for (const id of ids) {
                promises.push(getFrenly(id));
            }
            await Promise.all(promises);
            setDisplayedFrenlys(frenlys);
        };
        getFrenlys();
    }, [lastFetched]);

    return (
        <>
            <div className="font-mono bg-white dark:bg-black dark:text-white">
                <Navbar RightElement={<ConnectButton showBalance={false} />} />
                <div className="mx-4">
                    <div className="mt-5 -ml-2 md:-mt-14">
                        <img
                            src={
                                recoilTheme === "light" ? welcome : welcomeWhite
                            }
                            width={400}
                            alt="welcome to frenly faces"
                        ></img>
                    </div>
                    <p className="mt-4 ">
                        Frenly Faces is a <strong>social experiment</strong> and
                        1000 piece <strong>hand drawn NFT collection</strong> on
                        Canto blockchain that Free minted on 02/01/2023. Frenly
                        Faces are here to make Friends and have some Fun on
                        chain. 👽
                    </p>

                    <ul className="mt-5 ml-1">
                        <li>
                            <a
                                className="underline text-pink-600 font-bold"
                                href="https://alto.build/collections/frenly-faces"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Marketplace (Alto)
                            </a>
                        </li>
                        <li>
                            <a
                                className="underline text-pink-600 font-bold"
                                href="https://twitter.com/frenlyfaces"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Twitter @FrenlyFaces
                            </a>
                        </li>
                        <li>
                            <a
                                className="underline text-pink-600 font-bold"
                                href="https://discord.gg/eJdnQQjwxF"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Discord Chat
                            </a>
                        </li>
                        <li>
                            <a
                                className="underline text-pink-600 font-bold"
                                href="https://github.com/frenlyfaces"
                                target="_blank"
                                rel="noreferrer"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                className="underline text-pink-600 font-bold"
                                href={`${process.env.REACT_APP_BLOCK_EXPLORER_URI}/address/0x020bbfC79C96c22A8677df740379ecCc0297E52C`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Contract
                            </a>
                        </li>
                        <li>
                            <a
                                className="underline text-pink-600 font-bold"
                                href={`${process.env.REACT_APP_BLOCK_EXPLORER_URI}/address/0x431C7354Fd912763c0a9E9dCa86d2d6EB0BA718c`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Treasury
                            </a>
                        </li>
                        <li>
                            <a
                                className="underline text-pink-600 font-bold"
                                href={`https://metadata.frenlyfaces.xyz/`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Metadata (HTTP Mirror)
                            </a>
                        </li>
                        <li>
                            <a
                                className="underline text-pink-600 font-bold"
                                href={`https://frenlyfaces.xyz/verify`}
                                rel="noreferrer"
                            >
                                NFT Verification
                            </a>
                        </li>
                    </ul>

                    <audio className="mt-8" controls src={publicGood}></audio>

                    <button
                        onClick={() => {
                            setLastFetched(Date.now());
                        }}
                        className=" mt-8 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-neutral-900 text-black dark:text-white font-semibold py-2 px-4 border border-gray-400 rounded"
                    >
                        roll dice
                    </button>

                    <div
                        className={`mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6`}
                    >
                        {displayedFrenlys.map((item) => {
                            return <NFTFrame nft={item} key={item.dna} />;
                        })}
                    </div>

                    <div className="mt-8">
                        <a
                            rel="license noreferrer"
                            href="http://creativecommons.org/publicdomain/zero/1.0/"
                            target={"_blank"}
                        >
                            <img
                                src="http://i.creativecommons.org/p/zero/1.0/88x31.png"
                                alt="CC0"
                            />
                        </a>
                    </div>

                    <p className="mt-5">
                        Through art, we are Seen. Through code, we can See.
                        Frenly Faces are <strong>CC0 licensed</strong>. Remix
                        and reuse as you please.
                    </p>

                    <p className="mt-5 text-xs">with ❤️ from FF</p>
                    <p className="text-white dark:text-black">255</p>
                </div>
            </div>
        </>
    );
}

function getRarityStr(score: number) {
    if (score > 235) {
        return "Flawless";
    }
    if (score <= 235 && score > 117) {
        return "Epic";
    }
    if (score <= 117 && score > 80) {
        return "Rare";
    }
    if (score <= 80 && score > 67) {
        return "Uncommon";
    }

    return "Common";
}
