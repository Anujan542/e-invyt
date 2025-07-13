import zxcvbn from 'zxcvbn';

export const PasswordHints = ({ password }: { password: string }) => {
  const { score, feedback } = zxcvbn(password);

  const getStrengthLabel = (score: number) => {
    return ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][score];
  };

  return (
    <div className="mt-2 text-sm">
      <p className="font-medium text-gray-700 dark:text-gray-300">
        Strength: <span className="font-semibold">{getStrengthLabel(score)}</span>
      </p>
      {feedback.warning && (
        <p className="text-orange-500 dark:text-orange-400">⚠️ {feedback.warning}</p>
      )}
      <ul className="list-disc ml-5 text-gray-600 dark:text-gray-400">
        {feedback.suggestions.map((sug, i) => (
          <li key={i}>{sug}</li>
        ))}
      </ul>
    </div>
  );
};
