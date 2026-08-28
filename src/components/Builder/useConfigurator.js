import { useState, useCallback } from 'react';

export function useConfigurator() {
  const [data, setData] = useState(null);
  const [steps, setSteps] = useState([]);
  const [selections, setSelections] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [modelCode, setModelCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadInstrument = async (jsonPath) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/data/' + jsonPath);
      if (!response.ok) throw new Error('Network response was not ok');
      const instrumentData = await response.json();
      
      setData(instrumentData);
      setSteps(instrumentData.instrument.steps || []);
      
      const initialSelections = {};
      (instrumentData.instrument.steps || []).forEach(step => {
        initialSelections[step.stepId] = [];
      });
      setSelections(initialSelections);
      setCurrentStepIndex(0);
      setProgress(0);
      setIsComplete(false);
      setModelCode(instrumentData.instrument.baseModel || '');
      
    } catch (err) {
      console.error(err);
      setError('Error cargando los datos del instrumento.');
    } finally {
      setLoading(false);
    }
  };

  const calculateModelCode = useCallback((currentSelections, currentSteps, baseModel) => {
    let code = baseModel || '';
    currentSteps.forEach(step => {
      const stepSels = currentSelections[step.stepId] || [];
      if (stepSels.length > 0) {
        code += (step.prefix || '') + stepSels.join('');
      } else {
        const placeholderLength = step.options && step.options[0] && step.options[0].code ? step.options[0].code.length : 1;
        code += (step.prefix || '') + '_'.repeat(placeholderLength);
      }
    });
    return code;
  }, []);

  const calculateProgress = useCallback((currentSelections, currentSteps) => {
    if (!currentSteps || currentSteps.length === 0) return 0;
    const requiredSteps = currentSteps.filter(s => s.required);
    if (requiredSteps.length === 0) return 100;

    let completed = 0;
    requiredSteps.forEach(step => {
      if (currentSelections[step.stepId] && currentSelections[step.stepId].length > 0) {
        completed++;
      }
    });
    return Math.round((completed / requiredSteps.length) * 100);
  }, []);

  const selectOption = (stepId, code, multiSelect = false) => {
    setSelections(prev => {
      const current = prev[stepId] || [];
      let nextSelections;

      if (multiSelect) {
        if (current.includes(code)) {
          nextSelections = current.filter(c => c !== code);
        } else {
          nextSelections = [...current, code];
        }
      } else {
        nextSelections = [code];
      }

      const newSels = { ...prev, [stepId]: nextSelections };
      
      // Update derived state
      setModelCode(calculateModelCode(newSels, steps, data?.instrument?.baseModel));
      const prog = calculateProgress(newSels, steps);
      setProgress(prog);
      setIsComplete(prog === 100);

      return newSels;
    });
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  return {
    data,
    steps,
    selections,
    currentStepIndex,
    progress,
    isComplete,
    modelCode,
    loading,
    error,
    loadInstrument,
    selectOption,
    nextStep,
    prevStep,
    goToStep
  };
}
