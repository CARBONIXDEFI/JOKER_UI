import React from 'react';
import Layout from './Layouts/LayoutLandingHome';
import PriceStability from './Sections/PriceStability';
import HomeBanner from './Sections/HomeBannerProtocol';
import ELEMGovernance from './Sections/ELEMGovernance';
import Economy from './Sections/Economy';
import PartnersInvestorsHome from './Sections/PartnersInvestorsHome';
import StablecoinPortfolio from './Sections/StablecoinPortfolio';
import { VisitHistoryPost } from "../api/api";
// import PartnersInvestors from './Sections/PartnersInvestors';
// import {Container} from 'react-bootstrap';


function HomePage() {
    React.useEffect(() => {
        // Function to post visit history
        const postVisitHistoryData = async () => {
            try {
                const walletAddress = localStorage.getItem("walletAddress") || "";
                const pageName = "HomePage"; // Replace with the actual page name

                const response = await VisitHistoryPost(walletAddress, pageName);

                if (response) {
                    // Handle success if needed
                    // console.log("Visit history successfully posted:", response);
                } else {
                    // Handle failure if needed
                    // console.error("Failed to post visit history:", response);
                }
            } catch (error) {
                console.error("Error occurred while posting visit history:", error);
            }
        };

        // Call the function to post visit history
        postVisitHistoryData();
        window.scrollTo(0, 0);
        localStorage.setItem("walletAddress", "");
    });
    return (
        
            <div className="page-home-protocol">
                <Layout>
                <HomeBanner />
                <PriceStability />
                {/* <StablecoinPortfolio />
                <ELEMGovernance />
                <Economy /> 
                <PartnersInvestorsHome /> */}
                </Layout>               
            </div>
        
    );
}

export default HomePage;