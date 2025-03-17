import Loading from "../../components/Loading";
import ProfileResult, { ProfileResultData } from "./ProfileResult";
import SearchProfile, { FieldType } from "./SearchProfile";
import { useSearchProfile } from "./useSearchProfile";

function AdobeAnalyticProfile() {
  const { isSearchingProfile, searchProfile, searchProfileResult } =
    useSearchProfile();

  const handleSearch = async (searchValues: FieldType) => {
    await searchProfile({
      siteCode: searchValues.siteCode!.trim(),
      subsidinary: searchValues.subsidinary!.trim(),
    });
  };

  if (isSearchingProfile) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <SearchProfile
        isSearchingProfile={isSearchingProfile}
        onSearch={handleSearch}
      />
      <hr className="border-slate-300" />
      {searchProfileResult ? (
        <ProfileResult
          searchProfileResult={
            searchProfileResult as unknown as ProfileResultData
          }
        />
      ) : (
        <div>No profile data available.</div>
      )}
    </div>
  );
}

export default AdobeAnalyticProfile;
