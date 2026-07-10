type ResultCardProps = {
    result: string;
    explanation: string;
    advice: string;
    cardColor: string;
};

export default function ResultCard({
    result,
    explanation,
    advice,
    cardColor,
}: ResultCardProps) {
    return (
        <div className={`mt-6 rounded-xl border p-5 shadow-md ${cardColor}`}>
            <h2 className="text-2xl font-bold">
                {result}
            </h2>
            <div className="mt-4">
                <h3 className="font-semibold">
                    📖 Meaning
                </h3>

                <p className="text-gray-700">
                    {explanation}
                </p>
            </div>

            <div className="mt-4">
                <h3 className="font-semibold">
                    💡 Recommendation
                </h3>

                <p className="text-gray-700">
                    {advice}
                </p>
            </div>

        </div>
    );
}