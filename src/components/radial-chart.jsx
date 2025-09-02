import Progress from 'react-circle-progress-bar';

const loginData = {
  attempts: 30,
  success: 10,
  failure: 2,
};

const chartCards = [
  {
    title: "Total Login Attempts",
    value: loginData.attempts,
    valueMax: 300,
    color: "#017a1e"
  },
  {
    title: "Successful Logins",
    value: loginData.success,
    valueMax: 300,
    color: "#017a1e"
  },
  {
    title: "Failed Logins",
    value: loginData.failure,
    valueMax: 300,
    color: "#dc2626" // Red for failures
  },
  {
    title: "Success Rate in %",
    value: ((loginData.success / loginData.attempts) * 100).toFixed(0),
    valueMax: 100,
    color: "#017a1e",
    suffix: '%'
  },
];

export function LoginRadialCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {chartCards.map((card, index) => (
        <div key={index} className="p-4 rounded-lg shadow flex flex-col items-center ">
          <h3 className="text-base lg:text-lg mb-2 text-center">{card.title}</h3>
          <div className='w-[200px] h-[200px]'>
                <Progress progress={card.value} ballStrokeWidth={0} strokeWidth={8} maxValue={card.valueMax}
                    gradient={[{stop: 0, color: card.color}, {stop: 1, color: card.color}]}/>
          </div>
          
        </div>
      ))}
    </div>
  );
}