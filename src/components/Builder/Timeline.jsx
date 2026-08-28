import React from 'react';

export default function Timeline({ steps, currentStepIndex, selections, onStepClick }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10 px-4 py-6 shadow-sm overflow-x-auto">
      <div className="flex items-center min-w-max max-w-5xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = selections[step.stepId] && selections[step.stepId].length > 0;
          const isActive = index === currentStepIndex;
          const isPending = !isCompleted && !isActive;

          return (
            <React.Fragment key={step.stepId}>
              <div 
                className={`flex flex-col items-center cursor-pointer transition-colors px-2 ${isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                onClick={() => onStepClick(index)}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 mb-2 transition-all
                  ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                  ${isActive ? 'bg-blue-900 border-blue-900 text-white ring-4 ring-blue-100' : ''}
                  ${isPending ? 'bg-white border-gray-300 text-gray-500' : ''}
                `}>
                  {isCompleted ? '\u2713' : (index + 1)}
                </div>
                <div className={`text-xs font-semibold whitespace-nowrap ${isActive ? 'text-blue-900' : 'text-gray-500'}`}>
                  {step.shortLabel || step.label}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex-grow mx-4 h-0.5 bg-gray-200 min-w-[30px]">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: isCompleted ? '100%' : '0%' }}
                  ></div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
