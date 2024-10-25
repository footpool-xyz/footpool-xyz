import Image from "next/image";

type TeamProps = {
  name: string;
  logo: string;
};

const Team = ({ name, logo }: TeamProps) => {
  return (
    <>
      <Image src={logo} alt={`${name} logo`} width={60} height={60} className="w-12 h-12 object-cover mb-1" />
      <span className="font-bold text-lg">{name}</span>
    </>
  );
};

export default Team;
