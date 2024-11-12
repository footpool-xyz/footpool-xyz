import { BackwardIcon } from "@heroicons/react/24/outline";
import { useGlobalState } from "~~/services/store/store";

type HeroBannerProps = {
  title: string;
  subtitle: string;
};

export const HeroBanner = ({ title, subtitle }: HeroBannerProps) => {
  const { selectedMatchWeek, clearSelectedMatchWeek } = useGlobalState();

  return (
    <div className="px-5 flex items-center flex-col py-10">
      <h1 className="text-center">
        <span className="block text-xl mb-2">{subtitle}</span>
        <span className="block text-4xl font-bold">{title} - Season 2024/25</span>
      </h1>
      {selectedMatchWeek && (
        <button className="btn btn-accent btn-xs" onClick={clearSelectedMatchWeek}>
          <BackwardIcon className="h-4 w-4" />
          Go back
        </button>
      )}
    </div>
  );
};
