import { QuestionMarkCircleIcon } from '@heroicons/react/16/solid';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { Button } from './components/button';
import { Dialog } from './components/dialog';

type ComplexityFactors = {
  technicalComplexity: { value: number, description: string };
  dependencies: { value: number, description: string };
  integrationDataMigration: { value: number, description: string };
  performanceConsiderations: { value: number, description: string };
  securityCompliance: { value: number, description: string };
  testingEfforts: { value: number, description: string };
  scalabilityMaintainability: { value: number, description: string };
  knowledgeSkillSet: { value: number, description: string };
  uncertaintyRisk: { value: number, description: string };
  userExperienceDesignComplexity: { value: number, description: string };
  crossFunctionalCoordination: { value: number, description: string };
  documentationKnowledgeTransfer: { value: number, description: string };
}

const defaultComplexityFactors: ComplexityFactors = {
  technicalComplexity: { value: 0, description: 'Technical Complexity: Consider the complexity of server-side logic, database interactions, APIs, data processing, and integration with other services or microservices. Assess the complexity related to UI/UX design, interactivity, state management, responsiveness, and client-side logic.' },
  dependencies: { value: 0, description: 'Dependencies: Evaluate dependencies within the project, such as modules, components, or services that the story depends on. Also consider third-party services, libraries, or APIs that the feature relies on and the potential risks or delays they might introduce.' },
  integrationDataMigration: { value: 0, description: 'Integration and Data Migration: Assess the effort required to integrate the new feature with existing parts of the application. Consider the complexity of any data migration or transformation that might be necessary.' },
  performanceConsiderations: { value: 0, description: 'Performance Considerations: Analyze if the new feature will impact the application’s performance and the effort required to optimize it.' },
  securityCompliance: { value: 0, description: 'Security and Compliance: Evaluate security requirements, especially if the feature involves handling sensitive data or needs to comply with specific regulations.' },
  testingEfforts: { value: 0, description: 'Testing Efforts: Consider the complexity of writing unit tests, integration tests, and end-to-end tests. Think about the effort required for manual testing, especially for UI/UX aspects.' },
  scalabilityMaintainability: { value: 0, description: 'Scalability and Maintainability: Assess how the new feature will impact the scalability of the application. Consider the maintainability of the code being added or modified.' },
  knowledgeSkillSet: { value: 0, description: `Knowledge and Skillset: Evaluate familiarity with the technologies and tools involved. Consider the learning curve if the feature requires new technologies or approaches.` },
  uncertaintyRisk: { value: 0, description: 'Uncertainty and Risk: Factor in uncertainties or risks that could impact the delivery, such as unclear requirements or potential technical hurdles.' },
  userExperienceDesignComplexity: { value: 0, description: 'User Experience Design Complexity: Consider the complexity of the design and the user experience, especially for features with significant UI/UX components.' },
  crossFunctionalCoordination: { value: 0, description: 'Cross Functional Coordination: Assess the need for coordination with other teams, such as Platform, in order to accomplish the task.' },
  documentationKnowledgeTransfer: { value: 0, description: 'Documentation and Knowledge Transfer: Include the effort required for documentation and knowledge transfer, especially for complex features that might impact multiple parts of the system.' }
}

const convertKeyToTitle = (key: string) => key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').slice(1)

const App: React.FC = () => {
  const [factors, setFactors] = useState<ComplexityFactors>(defaultComplexityFactors);
  const [description, setDescription] = useState('');

  const [result, setResult] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFactors({ ...factors, [e.target.name]: { description: factors[e.target.name as keyof ComplexityFactors].description, value: parseInt(e.target.value, 10) } });
  };

  useEffect(() => {
    const totalScore = Object.values(factors).reduce((acc, curr) => acc + curr.value, 0);
    const mappedScore = Math.round(totalScore / 3);
    setResult(`Total Score: ${totalScore}, Fibonacci Mapping: ${fibonacciMapping(mappedScore)}`);
  }, [factors]);

  const fibonacciMapping = (score: number): string => {
    if (score <= 1) return 'Trivial task (0-1)';
    if (score === 2) return 'Simple task (2)';
    if (score === 3) return 'Moderate complexity (3)';
    if (score <= 5) return 'Complex task (5)';
    return 'Extremely complex (8). When a story is this complex, it usually means that it is not clear what the requirements are, or the requirements are not well defined. It also means that the story in its current state is too large to be completed in a single sprint. This story needs to be broken into smaller stories.';
  };

  const resetValues = () => {
    setFactors(defaultComplexityFactors);
    setResult('');
  }

  return (
    <div className={'container max-lg mx-auto p-8 text-center'}>
      <h1 className="text-4xl my-2 font-bold">Story Complexity Rubric</h1>
      <p className="text-xl my-2">The purpose of this rubric is to facilitate communication around the pointing of a story using a collection of complexity factors that have been identified as common considerations across teams for evaluating story complexity. This rubric is meant to map to Fibonacci numbers (0, 1 ,2 ,3, 5, 8), with a maximum allowed complexity of an 8. </p>
      <h2 className="text-2xl my-2 font-semibold">For each item below, select from the following options</h2>

      <ol>
        <li className='text-xl'><span className='font-semibold'>No Impact (0 Point):</span> The factor has no negative impact on the work in this story (ie, we have all the expertise we need for a story without additional research required)</li>
        <li className='text-xl'><span className='font-semibold'>Low (1 Point):</span> The factor has a minimal impact, or complexity is very low for this story.</li>
        <li className='text-xl'><span className='font-semibold'>Medium (2 Points):</span> The factor presents moderate complexity or impact to the story.</li>
        <li className='text-xl'><span className='font-semibold'>High (3 Points):</span> The factor presents significant complexity or impact to the story.</li>
      </ol>
      <section>
        {Object.keys(factors).map((factor) => (
          <div key={factor} className='text-xl my-6'>
            <label>
              <QuestionMarkCircleIcon className="inline m-2 h-4" onClick={() => { setDescription(factors[factor as keyof ComplexityFactors].description); setOpen(true); }} />
              <span>{convertKeyToTitle(factor)}</span>:
              <select className='border' name={factor} value={factors[factor as keyof ComplexityFactors].value} onChange={handleChange}>
                <option value="0">No Impact</option>
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
            </label>
          </div>
        ))}
        {/* <Button type="submit" className={'text-2xl'}>Calculate</Button> */}
        <Button type="button" onClick={resetValues} outline className={'text-2xl ml-4'}>Reset</Button>
        {result && <p className={`text-2xl my-6 font-semibold ${result.includes('(8)') ? 'text-red-800' : 'text-green-600'}`} >{result}</p>}
        <Dialog open={open} onClose={() => setOpen(false)} size='3xl' className={'rounded-xl p-10'}>
          {description}
        </Dialog>
      </section>
    </div>
  );
};

export default App;
