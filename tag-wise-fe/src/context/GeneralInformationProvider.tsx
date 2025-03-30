import { createContext, ReactNode, useContext, useState } from "react";

type Options = {
  isShopSection: boolean;
  isRequiredConsent: boolean;
  keyword: string[];
};

interface GeneralInformationContextType {
  libraryId: string;
  propertyId: string;
  libraryTotal: number;
  options: Options;
  rulesListName: string[];
  libraryName: string;
  propertyName: string;

  setLibraryName: (name: string) => void;
  setPropertyName: (name: string) => void;
  setLibraryTotal: (number: number) => void;
  setLibraryId: (id: string) => void;
  setPropertyId: (id: string) => void;
  setOptions: (options: Options) => void;
  setRulesListName: (names: string[]) => void;
}

const GeneralInformationContext = createContext<
  GeneralInformationContextType | undefined
>(undefined);

interface GeneralInformationProviderProps {
  children: ReactNode;
}

export function GeneralInformationProvider({
  children,
}: GeneralInformationProviderProps) {
  const [libraryId, setLibraryId] = useState<string>("");
  const [libraryName, setLibraryName] = useState<string>(
    "20250203 DIA Cheil_Date Range_1"
  );
  const [libraryTotal, setLibraryTotal] = useState<number>(0);
  const [propertyId, setPropertyId] = useState<string>("");
  const [propertyName, setPropertyName] = useState<string>(
    "ZP6_HU-Hungary(EU SEH) WebSDK"
  );
  const [options, setOptions] = useState<Options>({
    isShopSection: false,
    isRequiredConsent: false,
    keyword: [],
  });
  const [rulesListName, setRulesListName] = useState<string[]>([]);

  const value = {
    libraryTotal,
    libraryId,
    libraryName,
    setLibraryName,
    propertyName,
    setPropertyName,
    propertyId,
    options,
    setLibraryId,
    setPropertyId,
    setLibraryTotal,
    setOptions,
    rulesListName,
    setRulesListName,
  };

  return (
    <GeneralInformationContext.Provider value={value}>
      {children}
    </GeneralInformationContext.Provider>
  );
}

export function useGeneralInformation() {
  const context = useContext(GeneralInformationContext);
  if (context === undefined) {
    throw new Error(
      "useGeneralInformation must be used within a GeneralInformationProvider"
    );
  }
  return context;
}
