export interface ProfileResultData {
  orgCategory: string;
  reporterType: string;
  mapping: string;
}

export interface ProfileResultProps {
  searchProfileResult: ProfileResultData;
}

function ProfileResult({ searchProfileResult }: ProfileResultProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-base">
      <p className="font-medium mb-4">
        Org Type: {searchProfileResult.orgCategory}
      </p>
      <p className="font-medium mb-4">
        Reporter Type: {searchProfileResult.reporterType}
      </p>
      <pre className="whitespace-pre-line font-medium text-base">
        {searchProfileResult.mapping}
      </pre>
    </div>
  );
}

export default ProfileResult;
