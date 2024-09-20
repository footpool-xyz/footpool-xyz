import Image from "next/image";
import { UserGroupIcon } from "@heroicons/react/24/solid";

type MatchWeekCardProps = {
    title: string;
    season: string;
    stakeholdersCount: number;
    amountIn: number;
};

const MatchWeekCard = ({ title, season, stakeholdersCount, amountIn }: MatchWeekCardProps) => {
    return (
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-5">
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
                    <h2 className="text-2xl font-bold">
                        {title} - {season}
                    </h2>
                    <div className="flex items-center justify-center sm:justify-start mt-2">
                        <UserGroupIcon className="w-6 h-6 text-gray-500 mr-2" />
                        <p>
                            Currently, <span className="font-bold">{stakeholdersCount}</span> stakeholders.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between sm:ml-10 mt-6 sm:mt-0">
                    <div className="flex items-center mb-4">
                        <div>
                            <p className="font-semibold m-0">Amount in play:</p>
                            <p className="text-xl flex font-bold m-0">
                                {amountIn.toLocaleString()}
                                <Image src="/usdt.png" className="ml-2" width={28} height={28} alt="USDT image" />
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-secondary font-bold py-2 px-4 rounded-xl">Bet now!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchWeekCard;
