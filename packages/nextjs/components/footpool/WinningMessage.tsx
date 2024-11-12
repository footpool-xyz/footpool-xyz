type WinningMessageProps = {
  amount: number;
};

export const WinningMessage = ({ amount }: WinningMessageProps) => {
  return (
    <div className="bg-green-400 border-2 border-green-500 rounded-lg shadow-lg p-6 max-w-md mx-auto flex items-center space-x-4 mb-10">
      <div className="relative flex items-center justify-center w-12 h-12">
        <div className="absolute -top-2 -right-2 text-yellow-400 animate-ping text-2xl">🎉</div>
        <div className="absolute top-0 left-2 text-blue-400 animate-ping text-2xl">🎊</div>
        <div className="absolute bottom-0 -left-2 text-pink-400 animate-ping text-2xl">🎉</div>
      </div>
      <div className="text-center">
        <h1 className="text-lg font-extrabold text-gray-900">Winner! 🎉</h1>
        <p className="text-gray-800">
          You will receive <span className="font-semibold">{amount} USDT</span> on your wallet account!
        </p>
      </div>
    </div>
  );
};
