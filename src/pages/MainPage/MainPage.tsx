import CategoryNavBar from '../../components/CategoryNavBar/CategoryNavBar';
import MainBanner from '../../components/MainBanner/MainBanner';
import FeatureLinks from '../../components/FeatureLinks/FeatureLinks';
import MainBestSeller from "../../components/MainBestSeller/MainBestSeller";
import HotBooks from '../../components/HotBooks/HotBooks';
import MemberReview from '../../components/MemberReviews/MemberReviews';

export default function Main() {
    return (
        <>  
            <CategoryNavBar />
            <MainBanner />
            <FeatureLinks />
            <MainBestSeller />
            <HotBooks />
            <MemberReview />
        </>
    )
}
