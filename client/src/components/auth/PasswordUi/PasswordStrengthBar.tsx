export const PasswordStrengthBar = ({ score }: { score: number }) => {
  const strengthColors = [
    'bg-red-500',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-blue-500',
    'bg-green-500',
  ];
  return (
    <div className="flex h-2 overflow-hidden rounded bg-gray-200 mt-2">
      {[0, 1, 2, 3, 4].map((level) => (
        <div
          key={level}
          className={`flex-1 transition-all ${level <= score ? strengthColors[score] : 'bg-gray-300'}`}
        />
      ))}
    </div>
  );
};
