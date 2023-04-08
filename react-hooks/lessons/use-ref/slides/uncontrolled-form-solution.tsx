import { useState, useCallback, memo, useRef } from "react";

export function UncontrolledFormComponentSolution() {
  const [state1, setState1] = useState("");
  const [state2, setState2] = useState("");

  const stateRef = useRef({ state1, state2 });
  stateRef.current = { state1, state2 };

  const handleSubmit = useCallback(() => {
    sendSomeRequest({
      state1: stateRef.current.state1,
      state2: stateRef.current.state2,
    });
  }, [stateRef]);

  return (
    <UncontrolledFormComponent
      onSubmit={handleSubmit}
      onState1Change={setState1}
      onState2Change={setState2}
    />
  );
}

interface UncontrolledFormComponentProps {
  onSubmit: (event: React.FormEvent) => void;
  onState1Change: (value: string) => void;
  onState2Change: (value: string) => void;
}

const UncontrolledFormComponent = memo(function UncontrolledFormComponent({
  onSubmit,
  onState1Change,
  onState2Change,
}: UncontrolledFormComponentProps) {
  console.log("render");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={(e) => onState1Change(e.target.value)} />
      <input type="text" onChange={(e) => onState2Change(e.target.value)} />
    </form>
  );
});

function sendSomeRequest({
  state1,
  state2,
}: {
  state1: string;
  state2: string;
}) {
  console.log(state1, state2);
}
