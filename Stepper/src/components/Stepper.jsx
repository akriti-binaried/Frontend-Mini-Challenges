import React, { useEffect, useRef, useState } from 'react';

const Stepper = ({ stepsConfig = [] }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });
  const stepRef = useRef([]);

  
  useEffect(() => {
    if (stepRef.current.length > 0) {
      setMargins({
        marginLeft: stepRef.current[0].offsetWidth / 2,
        marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
      });
    }
  }, [stepsConfig.length]);

  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === stepsConfig.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => {
      if (prevStep > 1) {
        setIsComplete(false); 
        return prevStep - 1;
      }
      return prevStep;
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (stepsConfig.length - 1)) * 100;
  };

  
  if (!stepsConfig.length) return <div className="text-center p-5">No Steps Configured</div>;

  const ActiveComponent = stepsConfig[currentStep - 1]?.Component;

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      
      <div className="relative flex justify-between items-center mb-8">
        {stepsConfig.map((step, index) => {
          const isStepComplete = currentStep > index + 1 || isComplete;
          const isStepActive = currentStep === index + 1;

          return (
            <div
              key={step.name}
              ref={(el) => (stepRef.current[index] = el)}
              className="flex flex-col items-center z-10 relative"
            >
             
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isStepComplete
                    ? "bg-green-500 border-green-500 text-white"
                    : isStepActive
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {isStepComplete ? (
                  <span className="text-lg font-bold">✓</span>
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>
              
              
              <div className={`mt-2 text-sm font-medium flex justify-center items-center ${isStepActive ? "text-blue-600" : "text-gray-500"}`}>
                {step.name}
              </div>
            </div>
          );
        })}

        
        <div
          className="absolute top-5 left-0 h-1 bg-gray-200 -z-0"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
          }}
        >
          
          <div
            className="h-full bg-green-500 transition-all duration-300 ease-in-out"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center py-6">
      <ActiveComponent/>
      </div>
      
    

      
      <div className="flex justify-center gap-4">
        {!isComplete && (
          <>
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            
            <button
  onClick={handleNext}
  disabled={currentStep === stepsConfig.length}
  className={`px-6 py-2 rounded-md font-medium transition-all ${
    currentStep === stepsConfig.length
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
  }`}
>
  {currentStep === stepsConfig.length ? "Finish" : "Next"}
</button>

          </>
        )}
        
        
      </div>
    </div>
  );
};

export default Stepper;
