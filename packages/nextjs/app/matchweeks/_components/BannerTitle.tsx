type BannerTitleProps = {
  title: string;
  subtitle: string;
};

export const BannerTitle = ({ title, subtitle }: BannerTitleProps) => {
  return (
    <div className="px-5 flex items-center flex-col pt-10">
      <h1 className="text-center">
        <span className="block text-xl mb-2">{subtitle}</span>
        <span className="block text-4xl font-bold">{title} Season 2024/25</span>
      </h1>
    </div>
  );
};
