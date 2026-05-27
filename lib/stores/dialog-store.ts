type Listener = (state: DialogState | null) => void;
let dialogState: DialogState | null = null;
const subscribers = new Set<Listener>();

export function subscribe(listener: Listener): () => void {
  subscribers.add(listener);

  listener(dialogState);

  return () => {
    subscribers.delete(listener);
  };
}

export function setDialog(state: DialogState | null): void {
  dialogState = state;
  subscribers.forEach((listener) => listener(dialogState));
}

export function getDialog(): DialogState | null {
  return dialogState;
}
