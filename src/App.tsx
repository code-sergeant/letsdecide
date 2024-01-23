import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button } from './components/button';

interface Scores {
  technicalComplexity: number;
  dependencies: number;
  integrationDataMigration: number;
  performanceConsiderations: number;
  securityCompliance: number;
  testingEfforts: number;
  scalabilityMaintainability: number;
  teamKnowledgeSkillSet: number;
  uncertaintyRisk: number;
  userExperienceDesignComplexity: number;
  crossFunctionalCoordination: number;
  documentationKnowledgeTransfer: number;
}

const App: React.FC = () => {
  const [scores, setScores] = useState<Scores>({
    technicalComplexity: 0,
    dependencies: 0,
    integrationDataMigration: 0,
    performanceConsiderations: 0,
    securityCompliance: 0,
    testingEfforts: 0,
    scalabilityMaintainability: 0,
    teamKnowledgeSkillSet: 0,
    uncertaintyRisk: 0,
    userExperienceDesignComplexity: 0,
    crossFunctionalCoordination: 0,
    documentationKnowledgeTransfer: 0
  });

  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setScores({ ...scores, [e.target.name]: parseInt(e.target.value, 10) });
  };

  const fibonacciMapping = (score: number): string => {
    if (score <= 1) return 'Trivial task (0-1)';
    if (score === 2) return 'Simple task (2)';
    if (score === 3) return 'Moderate complexity (3)';
    if (score <= 5) return 'Complex task (5)';
    return 'Extremely complex, consider breaking down (8)';
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
    const mappedScore = Math.round(totalScore / 3);
    setResult(`Total Score: ${totalScore}, Fibonacci Mapping: ${fibonacciMapping(mappedScore)}`);
  };

  return (
    <div className={'container mx-auto p-8 text-center'}>
      <h1 className="text-4xl ">Story Point Estimation Tool</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(scores).map((key) => (
          <div key={key} className='text-xl my-6'>
            <label>
              {key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)}: 
              <select className='border' name={key} value={scores[key as keyof Scores]} onChange={handleChange}>
                <option value="0">No Impact</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </label>
          </div>
        ))}
        <Button type="submit" className={'text-2xl'}>Calculate</Button>
      </form>
      {result && <p className='text-2xl my-6'>{result}</p>}
    </div>
  );
};

export default App;
