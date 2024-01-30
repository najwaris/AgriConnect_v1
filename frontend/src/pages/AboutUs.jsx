import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
// import styles from "../styles/styles";
import Header from "../components/Layout/Header";
import Testimonials from "./Testimonials";
import Sponsored from "../components/Route/Sponsored";

const AboutUs = () => {
    return (
        <div>
            <Header />
            <About />
            <Sponsored />
            <Footer />
        </div>
    )
}

const About = () => {
    const [activeTab, setActiveTab] = useState(0);

    const toggleTab = (tab) => {
        if (activeTab === tab) {
            setActiveTab(0)
        } else {
            setActiveTab(tab);
        }
    }

    return (
        <div className="{'${styles.section} my-8'}">

            <div className="text-center">
                <h2 className="mt-6 mb-4 text-3xl font-bold text-teal-600 sm:text-4xl xl:text-5xl font-pj">About Us</h2>
            </div>

            <div className="mx-auto space-y-4 mb-8">
                {/* About Start */}
                <div className="grid grid-cols-1 gap-4">
                    <div className="mb-4 mt-4 mr-8 ml-8 bg-white rounded-lg shadow-md p-4 text-justify">
                        <p className="text-lg">
                            At AgriConnect, we empower farmers to connect directly with end users and industrial buyers, cutting out the need for middlemen.
                            We believe in fair pricing, transparent transactions, and a thriving agricultural ecosystem where everyone benefits.
                            By providing farmers with a platform to sell their crops in bulk directly to consumers and businesses, we aim to improve their livelihoods and build a more sustainable food system.
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <h2 className="mt-4 mb-4 text-3xl font-bold text-teal-600 sm:text-4xl xl:text-5xl font-pj">Why Choose Us?</h2>
            </div>
            <div className="mx-auto space-y-4 mb-8">
                <div className="grid grid-cols-1 gap-4">
                    <div className="mt-4 mr-8 ml-8 bg-white rounded-lg shadow-md p-4 text-justify">
                        <ul className="list-disc pl-4">
                            <li >
                                <span className="font-bold text-lg">Pioneer Platform: </span>
                                <br />
                                <span className="ml-4 text-[16px]">We're the first website to connect farmers directly with end users through a unique bidding system. </span>
                            </li>
                            <li>
                                <span className="font-bold text-lg">Empowering Farmers: </span>
                                <br />
                                <span className="ml-4 text-[16px]">We give farmers control over their pricing and connect them with a wider market, maximizing their profit potential. </span>
                            </li>
                            <li>
                                <span className="font-bold text-lg">Fair & Transparent: </span>
                                <br />
                                <span className="ml-4 text-[16px]">Our bidding system ensures competitive pricing and transparent transactions, benefiting both farmers and buyers. </span>
                            </li>
                            <li>
                                <span className="font-bold text-lg">Thriving Community: </span>
                                <br />
                                <span className="ml-4 text-[16px]">We foster a supportive community where farmers can connect with buyers, share best practices, and build lasting relationships. </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Testiomonials */}
            <div className="{'${styles.section} my-8'}">
                <Testimonials />
            </div>

        </div>

    )

}

export default AboutUs