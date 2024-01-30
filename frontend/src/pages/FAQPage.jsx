import React, { useState } from "react";
import Footer from "../components/Layout/Footer";
import styles from "../styles/styles";
import Header from "../components/Layout/Header";

const FAQPage = () => {
    return (
        <div>
            <Header />
            <Faq />
            <Footer />
        </div>
    )
}

const Faq = () => {
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
            <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-8 ml-10 text-teal-600">FAQ</h2>

            <div className="mx-auto space-y-4 mb-8">

                {/* Single FAQ */}
                <div className="border-b border-gray-200 pb-4 ml-10 mb-8">
                    <button
                        className="flex items-center justify-bettween w-full"
                        onClick={() => toggleTab(1)}
                    >
                        <span className="text-lg font-medium text-gray-900">
                            How to buy the available crops?
                        </span>
                        {
                            activeTab === 1 ? (
                                <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            )}
                    </button>
                    {
                        activeTab === 1 && (
                            <div className="mt-4">
                                <p className="text-base text-gray-500">
                                    We implement a traditional bidding system where the farmers will
                                    set a minimum price of buying the crops in bulk. Then, the users will
                                    enter the prices starting from the minimum price, and the next person
                                    need to enter a price higher than the previous one.
                                </p>
                            </div>
                        )
                    }
                </div>

                {/* Single FAQ */}
                <div className="border-b border-gray-200 pb-4 ml-10 mb-8">
                    <button
                        className="flex items-center justify-bettween w-full"
                        onClick={() => toggleTab(2)}
                    >
                        <span className="text-lg font-medium text-gray-900">
                            What is the 'lucky draw' and how does it work?
                        </span>
                        {
                            activeTab === 2 ? (
                                <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6 text-gray-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            )}
                    </button>
                    {
                        activeTab === 2 && (
                            <div className="mt-4">
                                <p className="text-base text-gray-500">
                                    To protect the Earth, we decided to donate the defect crops instead of
                                    throwing them away. Instead of a normal donation system, we implemented a randomised
                                    generated lucky draw. The chosen participant will be random and not
                                    be chosen by the farmer (non-biased).
                                </p>
                            </div>
                        )
                    }
                </div>





            </div>
        </div>
    )

}

export default FAQPage