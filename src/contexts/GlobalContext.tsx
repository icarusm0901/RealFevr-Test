import React, {
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const initialValue = [
  { title: "😊", start: new Date() },
  { title: "🎶😍", start: new Date() },
];

interface EmojiData {
  title: string;
  start: Date;
}

interface IGlobalContext {
  emojiData: Array<EmojiData>;
  addEmoji(value: EmojiData): void;
}

const GlobalContext = React.createContext<IGlobalContext>({
  emojiData: [],
  addEmoji: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [emojiData, setEmojiData] = useState<Array<EmojiData>>(initialValue);

  const addEmoji = useCallback(
    (value: EmojiData) => {
      setEmojiData([...emojiData, value]);
    },
    [emojiData]
  );

  const contextValue = useMemo(
    () => ({
      emojiData,
      addEmoji,
    }),
    [emojiData, addEmoji]
  );
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
