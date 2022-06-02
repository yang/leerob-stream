import React, {
  cloneElement,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { usePlasmicCanvasContext } from "@plasmicapp/host";

export interface MultistepFormState {
  currentStep: string;
}

const MultistepFormContext = createContext<undefined | MultistepFormState>(
  undefined
);

export interface MultistepFormProps {
  children?: ReactNode;
  className?: string;
  previewStep?: string;
  defaultStep?: string;
}

export function MultistepForm({
  children,
  className,
  defaultStep = "",
  previewStep = defaultStep,
}: MultistepFormProps) {
  const [currentStep, setCurrentStep] = useState(defaultStep);
  const inEditor = usePlasmicCanvasContext();
  const actualStep = inEditor ? previewStep ?? currentStep : currentStep;
  return (
    <div className={className}>
      <MultistepFormContext.Provider value={{ currentStep: actualStep }}>
        {children}
      </MultistepFormContext.Provider>
    </div>
  );
}

export interface FormStepProps {
  children?: ReactNode;
  className?: string;
  stepName?: string;
}

export function FormStep({
  children,
  className,
  stepName = "",
}: FormStepProps) {
  const { currentStep } = useContext(MultistepFormContext)!;
  return currentStep === stepName ? (
    <div className={className}>
      <div>{children}</div>
    </div>
  ) : null;
}

export interface SimpleMultistepFormProps {
  children?: ReactNode;
  className?: string;
  previewStep?: number;
}

export function SimpleMultistepForm({
  children,
  className,
  previewStep = 0,
}: SimpleMultistepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const inEditor = usePlasmicCanvasContext();
  const viewedStep = inEditor ? previewStep ?? currentStep : currentStep;
  const childs = React.Children.toArray(children);
  return (
    <div className={className}>
      {childs[viewedStep]
        ? cloneElement(childs[viewedStep] as any, {
            onNext: () => setCurrentStep(viewedStep + 1),
          })
        : null}
    </div>
  );
}

interface SimpleFormStepProps {
  children?: ReactNode;
  className?: string;
  onNext?: () => void;
}

export function SimpleFormStep({
  children,
  className,
  onNext,
}: SimpleFormStepProps) {
  return (
    <form
      className={className}
      onSubmit={(e) => {
        const data = new FormData(e.currentTarget);
        // do whatever with the data
        onNext?.();
      }}
    >
      {children}
    </form>
  );
}
