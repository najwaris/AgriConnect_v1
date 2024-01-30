import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
// import styles from "../styles/styles";
import Header from "../components/Layout/Header";

const AboutUs = () => {
    return (
        <div>
            <Header />
            <About />
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-8 ml-10 text-teal-600">About Us</h2>

            <div className="mx-auto space-y-4 mb-8">

                
            </div>
        </div>
    )

}

export default AboutUs