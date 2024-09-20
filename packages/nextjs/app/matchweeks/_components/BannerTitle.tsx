type BannerTitleProps = {
    title: string;
    subtitle: string;
};

const BannerTitle = ({ title, subtitle }: BannerTitleProps) => {
    return (
        <div className="px-5">
            <h1 className="text-center">
                <span className="block text-xl mb-2">{subtitle}</span>
                <span className="block text-4xl font-bold">{title}</span>
            </h1>
        </div>
    );
};

export default BannerTitle;
