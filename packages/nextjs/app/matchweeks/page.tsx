import Image from "next/image";
import type { NextPage } from "next";
import { UserGroupIcon } from "@heroicons/react/24/solid";

const MatchWeekPage: NextPage = () => {
    return (
        <div className="flex items-center flex-col flex-grow pt-10">
            <div className="px-5">
                <h1 className="text-center">
                    <span className="block text-xl mb-2">
                        Compete with Footpool users to find the best bettor and win cash prizes.
                    </span>
                    <span className="block text-4xl font-bold">On going Matchweeks</span>
                </h1>
            </div>

            <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
                <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
                    <div className="flex flex-col sm:flex-row bg-base-100 px-10 py-10 max-w-4xl rounded-3xl">
                        <div className="flex items-center justify-center">
                            <Image
                                src="/laliga.png"
                                alt="Liga Española"
                                className="w-32 h-32 object-cover rounded-xl"
                                width={150}
                                height={150}
                            />
                        </div>

                        <div className="flex flex-col justify-center text-center sm:text-left sm:ml-10">
                            <h2 className="text-2xl font-bold">Matchweek 1 - Season 2024/2025</h2>
                            <div className="flex items-center justify-center sm:justify-start mt-2">
                                <UserGroupIcon className="w-6 h-6 text-gray-500 mr-2" />
                                <p>
                                    Currently, <span className="font-bold">350</span> stakeholders.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between sm:ml-10 mt-6 sm:mt-0">
                            <div className="flex items-center mb-4">
                                <div>
                                    <p className="font-semibold m-0">Amount in play:</p>
                                    <p className="text-xl flex font-bold m-0">
                                        15,000
                                        <Image
                                            src="/usdt.png"
                                            className="ml-2"
                                            width={28}
                                            height={28}
                                            alt="USDT image"
                                        />
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button className="bg-secondary font-bold py-2 px-4 rounded-xl">Bet now!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchWeekPage;
